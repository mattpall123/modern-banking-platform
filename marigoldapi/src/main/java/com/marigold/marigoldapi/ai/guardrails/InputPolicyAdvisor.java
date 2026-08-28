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

@Component
public class InputPolicyAdvisor implements CallAdvisor {

    private final GuardrailProperties properties;

    public InputPolicyAdvisor(GuardrailProperties properties) {
        this.properties = properties;
    }

    @Override
    public String getName() {
        return "input-policy-advisor";
    }

    @Override
    public int getOrder() {
        return -50;
    }

    @Override
    public ChatClientResponse adviseCall(ChatClientRequest request, CallAdvisorChain chain) {
        String text = request.prompt().getUserMessage().getText();
        String matched = findMatch(text, properties.blockedInputPatterns());

        if (matched != null) {
            AssistantMessage message = new AssistantMessage(
                    "I can't help with that request. If you think this is a mistake, please contact support.");
            ChatResponse chatResponse = new ChatResponse(List.of(new Generation(message)));
            return ChatClientResponse.builder()
                    .chatResponse(chatResponse)
                    .context("guardrail.blocked", true)
                    .context("guardrail.reason", "input policy matched: \"" + matched + "\"")
                    .build();
        }

        return chain.nextCall(request);
    }

    private String findMatch(String text, List<String> patterns) {
        String lower = text.toLowerCase(Locale.ROOT);
        return patterns.stream().filter(p -> lower.contains(p.toLowerCase(Locale.ROOT))).findFirst().orElse(null);
    }
}
