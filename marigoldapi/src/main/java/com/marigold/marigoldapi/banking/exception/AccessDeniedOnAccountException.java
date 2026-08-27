package com.marigold.marigoldapi.banking.exception;

public class AccessDeniedOnAccountException extends RuntimeException {
    public AccessDeniedOnAccountException(Long accountId) {
        super("Not authorized to access account: " + accountId);
    }
}
