package com.marigold.marigoldapi.banking.exception;

public class InsufficientFundsException extends RuntimeException {
    public InsufficientFundsException(Long accountId) {
        super("Insufficient funds in account: " + accountId);
    }
}
