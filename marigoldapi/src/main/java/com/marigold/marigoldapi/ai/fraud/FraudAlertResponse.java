package com.marigold.marigoldapi.ai.fraud;

import com.marigold.marigoldapi.domain.model.FraudAlert;

import java.time.Instant;
import java.util.Arrays;
import java.util.List;

public record FraudAlertResponse(
        Long id,
        Long transactionId,
        String transactionDescription,
        Long accountId,
        String accountNumber,
        int riskScore,
        List<String> reasonCodes,
        String narrative,
        String recommendedAction,
        FraudAlertStatus status,
        String reviewedBy,
        Instant reviewedAt,
        Instant createdAt
) {
    public static FraudAlertResponse from(FraudAlert alert) {
        String codes = alert.getReasonCodes();
        return new FraudAlertResponse(
                alert.getId(),
                alert.getTransaction().getId(),
                alert.getTransaction().getDescription(),
                alert.getAccount().getId(),
                alert.getAccount().getAccountNumber(),
                alert.getRiskScore(),
                codes == null || codes.isBlank() ? List.of() : Arrays.asList(codes.split(",")),
                alert.getNarrative(),
                alert.getRecommendedAction(),
                alert.getStatus(),
                alert.getReviewedBy(),
                alert.getReviewedAt(),
                alert.getCreatedAt()
        );
    }
}
