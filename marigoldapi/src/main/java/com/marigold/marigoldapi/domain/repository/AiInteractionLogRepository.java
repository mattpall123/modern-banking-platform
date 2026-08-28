package com.marigold.marigoldapi.domain.repository;

import com.marigold.marigoldapi.domain.model.AiInteractionLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AiInteractionLogRepository extends JpaRepository<AiInteractionLog, Long> {
    Page<AiInteractionLog> findAllByOrderByCreatedAtDesc(Pageable pageable);
    Page<AiInteractionLog> findByFlaggedTrueOrderByCreatedAtDesc(Pageable pageable);
}
