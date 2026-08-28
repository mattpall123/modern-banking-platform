package com.marigold.marigoldapi.ai.fraud;

public class InvalidFraudAlertTransitionException extends RuntimeException {
    public InvalidFraudAlertTransitionException(Long id, FraudAlertStatus currentStatus) {
        super("Fraud alert " + id + " is already " + currentStatus + " and cannot be reviewed again");
    }
}
