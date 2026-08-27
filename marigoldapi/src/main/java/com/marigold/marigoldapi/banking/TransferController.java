package com.marigold.marigoldapi.banking;

import com.marigold.marigoldapi.domain.dto.TransactionResponse;
import com.marigold.marigoldapi.domain.dto.TransferRequest;
import com.marigold.marigoldapi.domain.model.Account;
import com.marigold.marigoldapi.domain.model.Transaction;
import com.marigold.marigoldapi.domain.model.User;
import com.marigold.marigoldapi.security.CurrentUserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;

@RestController
@RequestMapping("/api/transfers")
public class TransferController {

    private final TransferService transferService;
    private final AccountService accountService;
    private final CurrentUserService currentUserService;

    public TransferController(TransferService transferService,
                               AccountService accountService,
                               CurrentUserService currentUserService) {
        this.transferService = transferService;
        this.accountService = accountService;
        this.currentUserService = currentUserService;
    }

    @PostMapping
    public ResponseEntity<TransactionResponse> transfer(@Valid @RequestBody TransferRequest request) {
        User user = currentUserService.getCurrentUser();
        Account from = accountService.getAccountOrThrow(request.fromAccountId());
        accountService.assertAccessible(from, user);

        Transaction transaction = transferService.transfer(
                request.fromAccountId(),
                request.toAccountId(),
                request.amount(),
                request.description(),
                request.category(),
                Instant.now());

        return ResponseEntity.status(HttpStatus.CREATED).body(new TransactionResponse(
                transaction.getId(),
                transaction.getDescription(),
                transaction.getCategory() == null ? null : transaction.getCategory().getName(),
                request.amount().negate(),
                transaction.getOccurredAt()
        ));
    }
}
