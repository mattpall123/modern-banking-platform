package com.marigold.marigoldapi.ai.fraud;

import com.marigold.marigoldapi.security.CurrentUserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/fraud/alerts")
public class FraudAlertController {

    private final FraudAlertService fraudAlertService;
    private final CurrentUserService currentUserService;

    public FraudAlertController(FraudAlertService fraudAlertService, CurrentUserService currentUserService) {
        this.fraudAlertService = fraudAlertService;
        this.currentUserService = currentUserService;
    }

    @GetMapping
    public Page<FraudAlertResponse> list(@RequestParam(required = false) FraudAlertStatus status,
                                          Pageable pageable) {
        return fraudAlertService.list(status, pageable).map(FraudAlertResponse::from);
    }

    @PostMapping("/{id}/confirm")
    public FraudAlertResponse confirm(@PathVariable Long id) {
        return FraudAlertResponse.from(
                fraudAlertService.review(id, FraudAlertStatus.CONFIRMED, currentUserService.getCurrentEmail()));
    }

    @PostMapping("/{id}/dismiss")
    public FraudAlertResponse dismiss(@PathVariable Long id) {
        return FraudAlertResponse.from(
                fraudAlertService.review(id, FraudAlertStatus.DISMISSED, currentUserService.getCurrentEmail()));
    }
}
