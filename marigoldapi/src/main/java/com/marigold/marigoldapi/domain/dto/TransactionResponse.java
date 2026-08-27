package com.marigold.marigoldapi.domain.dto;

import java.math.BigDecimal;
import java.time.Instant;

public record TransactionResponse(
        Long transactionId,
        String description,
        String category,
        BigDecimal amount,
        Instant occurredAt
) {
}
