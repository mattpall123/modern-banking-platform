package com.marigold.marigoldapi.ai.fraud;

import com.marigold.marigoldapi.domain.model.FraudAlert;
import com.marigold.marigoldapi.domain.repository.FraudAlertRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
public class FraudAlertService {

    private final FraudAlertRepository repository;

    public FraudAlertService(FraudAlertRepository repository) {
        this.repository = repository;
    }

    public Page<FraudAlert> list(FraudAlertStatus status, Pageable pageable) {
        return repository.findAllByOptionalStatus(status, pageable);
    }

    @Transactional
    public FraudAlert review(Long id, FraudAlertStatus decision, String reviewerEmail) {
        FraudAlert alert = repository.findById(id).orElseThrow(() -> new FraudAlertNotFoundException(id));

        if (alert.getStatus() != FraudAlertStatus.PENDING) {
            throw new InvalidFraudAlertTransitionException(id, alert.getStatus());
        }

        alert.setStatus(decision);
        alert.setReviewedBy(reviewerEmail);
        alert.setReviewedAt(Instant.now());
        return repository.save(alert);
    }
}
