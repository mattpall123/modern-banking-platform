package com.marigold.marigoldapi.ai.guardrails;

import com.marigold.marigoldapi.domain.model.AiInteractionLog;

import java.time.Instant;

public record AiInteractionLogResponse(
        Long id,
        String userEmail,
        String feature,
        String prompt,
        String response,
        boolean flagged,
        String flagReason,
        Integer promptTokens,
        Integer completionTokens,
        long latencyMs,
        Instant createdAt
) {
    public static AiInteractionLogResponse from(AiInteractionLog log) {
        return new AiInteractionLogResponse(
                log.getId(),
                log.getUserEmail(),
                log.getFeature(),
                log.getPrompt(),
                log.getResponse(),
                log.isFlagged(),
                log.getFlagReason(),
                log.getPromptTokens(),
                log.getCompletionTokens(),
                log.getLatencyMs(),
                log.getCreatedAt()
        );
    }
}
