package com.marigold.marigoldapi.ai.insights;

import com.marigold.marigoldapi.domain.dto.CategorySpend;
import com.marigold.marigoldapi.domain.repository.LedgerEntryRepository;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InsightsService {

    private static final String SYSTEM_PROMPT = """
            You are a personal finance assistant for Marigold Bank writing a
            short, friendly monthly spending recap for a customer, based only
            on the aggregated numbers provided to you. Be concise (3-5
            sentences), specific about the numbers given, and call out the
            largest spending category and the trend versus the prior period.
            Do not invent transactions or numbers you weren't given.
            """;

    private final ChatClient chatClient;
    private final LedgerEntryRepository ledgerEntryRepository;

    public InsightsService(ChatClient.Builder chatClientBuilder, LedgerEntryRepository ledgerEntryRepository) {
        this.chatClient = chatClientBuilder.defaultSystem(SYSTEM_PROMPT).build();
        this.ledgerEntryRepository = ledgerEntryRepository;
    }

    @Cacheable(cacheNames = "monthlyRecap")
    public MonthlyRecapResponse getMonthlyRecap(Long accountId) {
        Instant now = Instant.now();
        Instant periodStart = now.minus(30, ChronoUnit.DAYS);
        Instant priorPeriodStart = now.minus(60, ChronoUnit.DAYS);

        BigDecimal income = ledgerEntryRepository.sumInflowSince(accountId, periodStart);
        BigDecimal outflowLast30 = ledgerEntryRepository.sumOutflowSince(accountId, periodStart).abs();
        BigDecimal outflowLast60 = ledgerEntryRepository.sumOutflowSince(accountId, priorPeriodStart).abs();
        BigDecimal priorPeriodOutflow = outflowLast60.subtract(outflowLast30);

        List<CategorySpend> byCategory = ledgerEntryRepository.sumSpendingByCategorySince(accountId, periodStart);

        String breakdown = byCategory.stream()
                .map(c -> c.category() + ": $" + c.total().abs())
                .collect(Collectors.joining(", "));

        String prompt = """
                Write a short monthly spending recap for this customer.

                Last 30 days:
                - Total income/deposits: $%s
                - Total spending: $%s
                - Spending by category: %s
                - Spending in the prior 30-day period for comparison: $%s
                """.formatted(income, outflowLast30, breakdown, priorPeriodOutflow);

        String narrative = chatClient.prompt().user(prompt).call().content();

        return new MonthlyRecapResponse(accountId, periodStart, now, income, outflowLast30,
                income.subtract(outflowLast30), byCategory, narrative);
    }
}
