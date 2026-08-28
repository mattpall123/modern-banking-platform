package com.marigold.marigoldapi.ai.fraud;

import java.util.List;

public record FraudVerdict(
        int riskScore,
        List<String> reasonCodes,
        String narrative,
        String recommendedAction
) {
}
