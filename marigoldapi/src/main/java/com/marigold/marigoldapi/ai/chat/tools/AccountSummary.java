package com.marigold.marigoldapi.ai.chat.tools;

import java.math.BigDecimal;

public record AccountSummary(Long id, String accountNumber, String type, BigDecimal balance) {
}
