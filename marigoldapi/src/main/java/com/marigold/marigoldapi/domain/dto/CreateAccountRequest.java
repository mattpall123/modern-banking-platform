package com.marigold.marigoldapi.domain.dto;

import com.marigold.marigoldapi.domain.model.AccountType;
import jakarta.validation.constraints.NotNull;

public record CreateAccountRequest(@NotNull AccountType type) {
}
