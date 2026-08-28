package com.marigold.marigoldapi.ai.guardrails;

import org.springframework.ai.chat.client.ChatClientRequest;
import org.springframework.ai.chat.client.ChatClientResponse;
import org.springframework.ai.chat.client.advisor.api.CallAdvisor;
import org.springframework.ai.chat.client.advisor.api.CallAdvisorChain;
import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.model.Generation;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Locale;
import java.util.regex.Pattern;

@Component
public class OutputPolicyAdvisor implements CallAdvisor {

    private static final Pattern SSN_LIKE = Pattern.compile("\\b\\d{3}-\\d{2}-\\d{4}\\b");

    private final GuardrailProperties properties;

    public OutputPolicyAdvisor(GuardrailProperties properties) {
        this.properties = properties;
    }

    @Override
    public String getName() {
        return "output-policy-advisor";
    }

    @Override
    public int getOrder() {
        return 50;
    }

    @Override
    public ChatClientResponse adviseCall(ChatClientRequest request, CallAdvisorChain chain) {
        ChatClientResponse response = chain.nextCall(request);

        if (Boolean.TRUE.equals(response.context().get("guardrail.blocked"))) {
            return response;
        }

        String text = response.chatResponse().getResult().getOutput().getText();
        String reason = violationReason(text);

        if (reason == null) {
            return response;
        }

        AssistantMessage message = new AssistantMessage(
                "I need to hold back that response since it may have included sensitive information. "
                        + "Please rephrase your question or contact support for help.");
        ChatResponse redacted = new ChatResponse(List.of(new Generation(message)));
        return ChatClientResponse.builder()
                .chatResponse(redacted)
                .context(response.context())
                .context("guardrail.blocked", true)
                .context("guardrail.reason", reason)
                .build();
    }

    private String violationReason(String text) {
        if (SSN_LIKE.matcher(text).find()) {
            return "output matched SSN-like pattern";
        }
        String lower = text.toLowerCase(Locale.ROOT);
        for (String pattern : properties.blockedOutputPatterns()) {
            if (lower.contains(pattern.toLowerCase(Locale.ROOT))) {
                return "output policy matched: \"" + pattern + "\"";
            }
        }
        return null;
    }
}
