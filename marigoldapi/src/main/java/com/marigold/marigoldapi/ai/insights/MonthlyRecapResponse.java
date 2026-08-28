package com.marigold.marigoldapi.ai.insights;

import com.marigold.marigoldapi.domain.dto.CategorySpend;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record MonthlyRecapResponse(
        Long accountId,
        Instant periodStart,
        Instant periodEnd,
        BigDecimal totalIncome,
        BigDecimal totalSpent,
        BigDecimal netChange,
        List<CategorySpend> spendingByCategory,
        String narrative
) implements Serializable {
}
