package com.marigold.marigoldapi.domain.repository;

import com.marigold.marigoldapi.domain.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}
