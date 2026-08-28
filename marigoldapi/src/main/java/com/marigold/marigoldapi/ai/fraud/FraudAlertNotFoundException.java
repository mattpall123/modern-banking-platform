package com.marigold.marigoldapi.ai.fraud;

public class FraudAlertNotFoundException extends RuntimeException {
    public FraudAlertNotFoundException(Long id) {
        super("Fraud alert not found: " + id);
    }
}
