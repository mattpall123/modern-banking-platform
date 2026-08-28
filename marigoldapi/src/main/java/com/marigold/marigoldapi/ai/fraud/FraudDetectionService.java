package com.marigold.marigoldapi.ai.fraud;

import com.marigold.marigoldapi.banking.AccountService;
import com.marigold.marigoldapi.domain.model.Account;
import com.marigold.marigoldapi.domain.model.FraudAlert;
import com.marigold.marigoldapi.domain.model.LedgerEntry;
import com.marigold.marigoldapi.domain.model.Transaction;
import com.marigold.marigoldapi.domain.repository.FraudAlertRepository;
import com.marigold.marigoldapi.domain.repository.LedgerEntryRepository;
import com.marigold.marigoldapi.domain.repository.TransactionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FraudDetectionService {

    private static final Logger log = LoggerFactory.getLogger(FraudDetectionService.class);

    private static final String SYSTEM_PROMPT = """
            You are a fraud-risk analyst assistant for Marigold Bank. Given a
            transaction and the account's recent transaction history, assess
            how likely the transaction is to be fraudulent or otherwise
            anomalous. Score risk from 0 (no concern) to 100 (highly
            suspicious). Only flag genuinely unusual activity relative to the
            account's own history, not typical spending. This is advisory
            only - a human analyst always makes the final call.

            recommendedAction must be exactly one of these short codes: NONE,
            MONITOR, REVIEW, FREEZE_RECOMMENDED. Put any detailed reasoning or
            suggested next steps in the narrative field instead, not in
            recommendedAction.
            """;

    private static final int ALERT_THRESHOLD = 60;

    private final ChatClient chatClient;
    private final TransactionRepository transactionRepository;
    private final AccountService accountService;
    private final LedgerEntryRepository ledgerEntryRepository;
    private final FraudAlertRepository fraudAlertRepository;

    public FraudDetectionService(ChatClient.Builder chatClientBuilder,
                                  TransactionRepository transactionRepository,
                                  AccountService accountService,
                                  LedgerEntryRepository ledgerEntryRepository,
                                  FraudAlertRepository fraudAlertRepository) {
        this.chatClient = chatClientBuilder.defaultSystem(SYSTEM_PROMPT).build();
        this.transactionRepository = transactionRepository;
        this.accountService = accountService;
        this.ledgerEntryRepository = ledgerEntryRepository;
        this.fraudAlertRepository = fraudAlertRepository;
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void evaluate(Long transactionId, Long accountId, BigDecimal amount) {
        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new IllegalStateException("Transaction not found: " + transactionId));
        Account account = accountService.getAccountOrThrow(accountId);

        List<LedgerEntry> recent = ledgerEntryRepository
                .findByAccountIdOrderByCreatedAtDesc(accountId, PageRequest.of(0, 20))
                .getContent();

        String history = recent.stream()
                .map(le -> le.getTransaction().getOccurredAt() + " | " + le.getTransaction().getDescription()
                        + " | " + le.getAmount())
                .collect(Collectors.joining("\n"));

        String prompt = """
                Evaluate this transaction for fraud risk:
                Account: %s (%s)
                Transaction: "%s", amount %s, at %s

                Recent transaction history for this account (most recent first, includes the transaction above):
                %s
                """.formatted(account.getAccountNumber(), account.getType(), transaction.getDescription(),
                amount, transaction.getOccurredAt(), history);

        FraudVerdict verdict = chatClient.prompt().user(prompt).call().entity(FraudVerdict.class);

        log.info("Fraud scoring result for transaction {}: riskScore={}, recommendedAction={}",
                transactionId, verdict.riskScore(), verdict.recommendedAction());

        if (verdict.riskScore() >= ALERT_THRESHOLD) {
            fraudAlertRepository.save(FraudAlert.builder()
                    .transaction(transaction)
                    .account(account)
                    .riskScore(verdict.riskScore())
                    .reasonCodes(String.join(",", verdict.reasonCodes()))
                    .narrative(verdict.narrative())
                    .recommendedAction(truncate(verdict.recommendedAction(), 50))
                    .build());
        }
    }

    private String truncate(String value, int maxLength) {
        return value != null && value.length() > maxLength ? value.substring(0, maxLength) : value;
    }
}
