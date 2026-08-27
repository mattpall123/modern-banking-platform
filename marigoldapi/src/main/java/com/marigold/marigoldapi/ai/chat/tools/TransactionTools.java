package com.marigold.marigoldapi.ai.chat.tools;

import com.marigold.marigoldapi.banking.AccountService;
import com.marigold.marigoldapi.banking.TransactionService;
import com.marigold.marigoldapi.domain.dto.TransactionResponse;
import com.marigold.marigoldapi.domain.model.Account;
import com.marigold.marigoldapi.domain.model.User;
import com.marigold.marigoldapi.security.CurrentUserService;
import org.springframework.ai.tool.annotation.Tool;
import org.springframework.ai.tool.annotation.ToolParam;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class TransactionTools {

    private final TransactionService transactionService;
    private final AccountService accountService;
    private final CurrentUserService currentUserService;

    public TransactionTools(TransactionService transactionService,
                             AccountService accountService,
                             CurrentUserService currentUserService) {
        this.transactionService = transactionService;
        this.accountService = accountService;
        this.currentUserService = currentUserService;
    }

    @Tool(description = "Get recent transactions for one of the current customer's own accounts. "
            + "Only works for accounts owned by the current customer, use getMyAccounts to find valid account ids.")
    public List<TransactionResponse> getRecentTransactions(
            @ToolParam(description = "The account id to fetch transactions for") Long accountId,
            @ToolParam(description = "Max number of transactions to return, defaults to 10", required = false) Integer limit) {
        User user = currentUserService.getCurrentUser();
        Account account = accountService.getAccountOrThrow(accountId);
        accountService.assertAccessible(account, user);

        int size = limit == null ? 10 : limit;
        return transactionService.getHistory(accountId, PageRequest.of(0, size)).getContent();
    }
}
