package com.marigold.marigoldapi.ai.guardrails;

import com.marigold.marigoldapi.domain.model.AiInteractionLog;
import com.marigold.marigoldapi.domain.repository.AiInteractionLogRepository;
import com.marigold.marigoldapi.security.CurrentUserService;
import org.springframework.ai.chat.client.ChatClientRequest;
import org.springframework.ai.chat.client.ChatClientResponse;
import org.springframework.ai.chat.client.advisor.api.CallAdvisor;
import org.springframework.ai.chat.client.advisor.api.CallAdvisorChain;
import org.springframework.ai.chat.metadata.Usage;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
public class AuditLoggingAdvisor implements CallAdvisor {

    private final AiInteractionLogRepository repository;
    private final CurrentUserService currentUserService;

    public AuditLoggingAdvisor(AiInteractionLogRepository repository, CurrentUserService currentUserService) {
        this.repository = repository;
        this.currentUserService = currentUserService;
    }

    @Override
    public String getName() {
        return "audit-logging-advisor";
    }

    @Override
    public int getOrder() {
        return -100;
    }

    @Override
    public ChatClientResponse adviseCall(ChatClientRequest request, CallAdvisorChain chain) {
        Instant start = Instant.now();
        String prompt = request.prompt().getUserMessage().getText();
        String email = safeCurrentEmail();

        AiInteractionLog.AiInteractionLogBuilder logBuilder = AiInteractionLog.builder()
                .userEmail(email)
                .feature("chat")
                .prompt(prompt);

        try {
            ChatClientResponse response = chain.nextCall(request);
            populateFromResponse(logBuilder, response, start);
            repository.save(logBuilder.build());
            return response;
        } catch (RuntimeException ex) {
            logBuilder.flagged(true)
                    .flagReason("error: " + ex.getMessage())
                    .latencyMs(millisSince(start));
            repository.save(logBuilder.build());
            throw ex;
        }
    }

    private void populateFromResponse(AiInteractionLog.AiInteractionLogBuilder logBuilder,
                                       ChatClientResponse response, Instant start) {
        String text = response.chatResponse().getResult().getOutput().getText();
        logBuilder.response(text).latencyMs(millisSince(start));

        boolean blocked = Boolean.TRUE.equals(response.context().get("guardrail.blocked"));
        if (blocked) {
            logBuilder.flagged(true).flagReason(String.valueOf(response.context().get("guardrail.reason")));
        }

        Usage usage = response.chatResponse().getMetadata().getUsage();
        if (usage != null) {
            logBuilder.promptTokens(usage.getPromptTokens()).completionTokens(usage.getCompletionTokens());
        }
    }

    private long millisSince(Instant start) {
        return java.time.Duration.between(start, Instant.now()).toMillis();
    }

    private String safeCurrentEmail() {
        try {
            return currentUserService.getCurrentEmail();
        } catch (RuntimeException ex) {
            return null;
        }
    }
}
