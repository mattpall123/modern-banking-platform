package com.marigold.marigoldapi.ai.insights;

import com.marigold.marigoldapi.ai.RateLimiter;
import com.marigold.marigoldapi.banking.AccountService;
import com.marigold.marigoldapi.domain.model.Account;
import com.marigold.marigoldapi.domain.model.User;
import com.marigold.marigoldapi.security.CurrentUserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai/insights")
public class InsightsController {

    private final InsightsService insightsService;
    private final AccountService accountService;
    private final CurrentUserService currentUserService;
    private final RateLimiter rateLimiter;

    public InsightsController(InsightsService insightsService,
                               AccountService accountService,
                               CurrentUserService currentUserService,
                               RateLimiter rateLimiter) {
        this.insightsService = insightsService;
        this.accountService = accountService;
        this.currentUserService = currentUserService;
        this.rateLimiter = rateLimiter;
    }

    @GetMapping("/monthly-recap")
    public MonthlyRecapResponse monthlyRecap(@RequestParam Long accountId) {
        rateLimiter.checkAndRecord(currentUserService.getCurrentEmail());
        User user = currentUserService.getCurrentUser();
        Account account = accountService.getAccountOrThrow(accountId);
        accountService.assertAccessible(account, user);
        return insightsService.getMonthlyRecap(accountId);
    }
}
