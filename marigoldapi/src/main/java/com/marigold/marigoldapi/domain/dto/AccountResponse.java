package com.marigold.marigoldapi.domain.dto;

import com.marigold.marigoldapi.domain.model.Account;

import java.math.BigDecimal;

public record AccountResponse(
        Long id,
        String accountNumber,
        String type,
        String currency,
        BigDecimal balance
) {
    public static AccountResponse from(Account account) {
        return new AccountResponse(
                account.getId(),
                account.getAccountNumber(),
                account.getType().name(),
                account.getCurrency(),
                account.getBalanceCache()
        );
    }
}
