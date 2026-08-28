package com.marigold.marigoldapi.ai.fraud;

import com.marigold.marigoldapi.banking.TransactionCreatedEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
public class FraudScoringListener {

    private static final Logger log = LoggerFactory.getLogger(FraudScoringListener.class);

    private final FraudDetectionService fraudDetectionService;

    public FraudScoringListener(FraudDetectionService fraudDetectionService) {
        this.fraudDetectionService = fraudDetectionService;
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void onTransactionCreated(TransactionCreatedEvent event) {
        try {
            fraudDetectionService.evaluate(event.transactionId(), event.fromAccountId(), event.amount());
        } catch (RuntimeException ex) {
            log.warn("Fraud scoring failed for transaction {}, the transfer itself already committed successfully",
                    event.transactionId(), ex);
        }
    }
}
