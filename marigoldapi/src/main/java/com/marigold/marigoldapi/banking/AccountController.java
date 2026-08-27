package com.marigold.marigoldapi.banking;

import com.marigold.marigoldapi.domain.dto.AccountResponse;
import com.marigold.marigoldapi.domain.dto.CreateAccountRequest;
import com.marigold.marigoldapi.domain.dto.TransactionResponse;
import com.marigold.marigoldapi.domain.model.Account;
import com.marigold.marigoldapi.domain.model.User;
import com.marigold.marigoldapi.security.CurrentUserService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private final AccountService accountService;
    private final TransactionService transactionService;
    private final CurrentUserService currentUserService;

    public AccountController(AccountService accountService,
                              TransactionService transactionService,
                              CurrentUserService currentUserService) {
        this.accountService = accountService;
        this.transactionService = transactionService;
        this.currentUserService = currentUserService;
    }

    @GetMapping
    public List<AccountResponse> listMyAccounts() {
        User user = currentUserService.getCurrentUser();
        return accountService.getAccountsForCustomer(user.getCustomer().getId()).stream()
                .map(AccountResponse::from)
                .toList();
    }

    @PostMapping
    public ResponseEntity<AccountResponse> createAccount(@Valid @RequestBody CreateAccountRequest request) {
        User user = currentUserService.getCurrentUser();
        Account account = accountService.createAccount(user.getCustomer(), request.type());
        return ResponseEntity.status(HttpStatus.CREATED).body(AccountResponse.from(account));
    }

    @GetMapping("/{id}")
    public AccountResponse getAccount(@PathVariable Long id) {
        User user = currentUserService.getCurrentUser();
        Account account = accountService.getAccountOrThrow(id);
        accountService.assertAccessible(account, user);
        return AccountResponse.from(account);
    }

    @GetMapping("/{id}/transactions")
    public Page<TransactionResponse> getTransactions(@PathVariable Long id, Pageable pageable) {
        User user = currentUserService.getCurrentUser();
        Account account = accountService.getAccountOrThrow(id);
        accountService.assertAccessible(account, user);
        return transactionService.getHistory(id, pageable);
    }
}
