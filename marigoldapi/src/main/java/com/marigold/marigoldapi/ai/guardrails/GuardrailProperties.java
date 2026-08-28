package com.marigold.marigoldapi.ai.guardrails;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

@ConfigurationProperties(prefix = "app.guardrail")
public record GuardrailProperties(List<String> blockedInputPatterns, List<String> blockedOutputPatterns) {

    public GuardrailProperties {
        if (blockedInputPatterns == null) {
            blockedInputPatterns = List.of(
                    "ignore previous instructions",
                    "ignore all previous instructions",
                    "ignore the above",
                    "disregard your instructions",
                    "reveal your system prompt",
                    "reveal your instructions",
                    "you are now",
                    "transfer all my money",
                    "transfer everything",
                    "wire all funds"
            );
        }
        if (blockedOutputPatterns == null) {
            blockedOutputPatterns = List.of(
                    "you are marigold bank's customer support assistant"
            );
        }
    }
}
