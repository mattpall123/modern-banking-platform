package com.marigold.marigoldapi.banking;

import com.marigold.marigoldapi.banking.exception.InsufficientFundsException;
import com.marigold.marigoldapi.banking.exception.InvalidTransferException;
import com.marigold.marigoldapi.domain.model.*;
import com.marigold.marigoldapi.domain.repository.AccountRepository;
import com.marigold.marigoldapi.domain.repository.CategoryRepository;
import com.marigold.marigoldapi.domain.repository.LedgerEntryRepository;
import com.marigold.marigoldapi.domain.repository.TransactionRepository;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;

@Service
public class TransferService {

    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;
    private final LedgerEntryRepository ledgerEntryRepository;
    private final CategoryRepository categoryRepository;
    private final AccountService accountService;
    private final ApplicationEventPublisher eventPublisher;

    public TransferService(AccountRepository accountRepository,
                            TransactionRepository transactionRepository,
                            LedgerEntryRepository ledgerEntryRepository,
                            CategoryRepository categoryRepository,
                            AccountService accountService,
                            ApplicationEventPublisher eventPublisher) {
        this.accountRepository = accountRepository;
        this.transactionRepository = transactionRepository;
        this.ledgerEntryRepository = ledgerEntryRepository;
        this.categoryRepository = categoryRepository;
        this.accountService = accountService;
        this.eventPublisher = eventPublisher;
    }

    @Transactional
    public Transaction transfer(Long fromAccountId, Long toAccountId, BigDecimal amount,
                                 String description, String categoryName, Instant occurredAt) {
        return transfer(fromAccountId, toAccountId, amount, description, categoryName, occurredAt, true);
    }

    @Transactional
    public Transaction transfer(Long fromAccountId, Long toAccountId, BigDecimal amount,
                                 String description, String categoryName, Instant occurredAt,
                                 boolean triggerFraudScoring) {
        if (fromAccountId.equals(toAccountId)) {
            throw new InvalidTransferException("Cannot transfer to the same account");
        }
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new InvalidTransferException("Amount must be positive");
        }

        Account from = accountService.getAccountOrThrow(fromAccountId);
        Account to = accountService.getAccountOrThrow(toAccountId);

        if (from.getType() != AccountType.SYSTEM && from.getBalanceCache().compareTo(amount) < 0) {
            throw new InsufficientFundsException(fromAccountId);
        }

        Category category = categoryName == null ? null
                : categoryRepository.findByName(categoryName).orElse(null);

        Transaction transaction = transactionRepository.save(Transaction.builder()
                .description(description)
                .category(category)
                .occurredAt(occurredAt)
                .build());

        ledgerEntryRepository.save(LedgerEntry.builder()
                .transaction(transaction)
                .account(from)
                .amount(amount.negate())
                .build());
        ledgerEntryRepository.save(LedgerEntry.builder()
                .transaction(transaction)
                .account(to)
                .amount(amount)
                .build());

        from.setBalanceCache(from.getBalanceCache().subtract(amount));
        to.setBalanceCache(to.getBalanceCache().add(amount));
        accountRepository.save(from);
        accountRepository.save(to);

        if (triggerFraudScoring && from.getType() != AccountType.SYSTEM && to.getType() == AccountType.SYSTEM) {
            eventPublisher.publishEvent(new TransactionCreatedEvent(
                    transaction.getId(), from.getId(), to.getId(), amount));
        }

        return transaction;
    }
}
