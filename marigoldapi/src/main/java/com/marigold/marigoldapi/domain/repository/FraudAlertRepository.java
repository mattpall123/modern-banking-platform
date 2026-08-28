package com.marigold.marigoldapi.domain.repository;

import com.marigold.marigoldapi.ai.fraud.FraudAlertStatus;
import com.marigold.marigoldapi.domain.model.FraudAlert;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FraudAlertRepository extends JpaRepository<FraudAlert, Long> {

    @Query("select f from FraudAlert f "
            + "join fetch f.transaction "
            + "join fetch f.account "
            + "where (:status is null or f.status = :status) "
            + "order by f.createdAt desc")
    Page<FraudAlert> findAllByOptionalStatus(FraudAlertStatus status, Pageable pageable);
}
