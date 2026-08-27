package com.marigold.marigoldapi.banking;

import com.marigold.marigoldapi.domain.dto.TransactionResponse;
import com.marigold.marigoldapi.domain.model.LedgerEntry;
import com.marigold.marigoldapi.domain.repository.LedgerEntryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class TransactionService {

    private final LedgerEntryRepository ledgerEntryRepository;

    public TransactionService(LedgerEntryRepository ledgerEntryRepository) {
        this.ledgerEntryRepository = ledgerEntryRepository;
    }

    public Page<TransactionResponse> getHistory(Long accountId, Pageable pageable) {
        return ledgerEntryRepository.findByAccountIdOrderByCreatedAtDesc(accountId, pageable)
                .map(this::toResponse);
    }

    private TransactionResponse toResponse(LedgerEntry entry) {
        var transaction = entry.getTransaction();
        return new TransactionResponse(
                transaction.getId(),
                transaction.getDescription(),
                transaction.getCategory() == null ? null : transaction.getCategory().getName(),
                entry.getAmount(),
                transaction.getOccurredAt()
        );
    }
}
