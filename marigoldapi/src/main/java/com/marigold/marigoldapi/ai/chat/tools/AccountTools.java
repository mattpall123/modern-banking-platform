package com.marigold.marigoldapi.ai.chat.tools;

import com.marigold.marigoldapi.banking.AccountService;
import com.marigold.marigoldapi.domain.model.User;
import com.marigold.marigoldapi.security.CurrentUserService;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AccountTools {

    private final AccountService accountService;
    private final CurrentUserService currentUserService;

    public AccountTools(AccountService accountService, CurrentUserService currentUserService) {
        this.accountService = accountService;
        this.currentUserService = currentUserService;
    }

    @Tool(description = "Get the current customer's own bank accounts, including account id, account number, type, and current balance")
    public List<AccountSummary> getMyAccounts() {
        User user = currentUserService.getCurrentUser();
        return accountService.getAccountsForCustomer(user.getCustomer().getId()).stream()
                .map(a -> new AccountSummary(a.getId(), a.getAccountNumber(), a.getType().name(), a.getBalanceCache()))
                .toList();
    }
}
