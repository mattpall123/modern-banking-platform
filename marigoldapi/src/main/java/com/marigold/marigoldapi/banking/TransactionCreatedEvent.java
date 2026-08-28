package com.marigold.marigoldapi.banking;

import java.math.BigDecimal;

public record TransactionCreatedEvent(Long transactionId, Long fromAccountId, Long toAccountId, BigDecimal amount) {
}
