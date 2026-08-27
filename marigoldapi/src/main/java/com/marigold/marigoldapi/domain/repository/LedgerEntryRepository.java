package com.marigold.marigoldapi.domain.repository;

import com.marigold.marigoldapi.domain.model.LedgerEntry;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface LedgerEntryRepository extends JpaRepository<LedgerEntry, Long> {

    @Query(value = "select le from LedgerEntry le "
            + "join fetch le.transaction t "
            + "left join fetch t.category "
            + "where le.account.id = :accountId "
            + "order by le.createdAt desc",
            countQuery = "select count(le) from LedgerEntry le where le.account.id = :accountId")
    Page<LedgerEntry> findByAccountIdOrderByCreatedAtDesc(@Param("accountId") Long accountId, Pageable pageable);

    List<LedgerEntry> findByTransactionId(Long transactionId);

    @Query("select coalesce(sum(le.amount), 0) from LedgerEntry le where le.account.id = :accountId")
    BigDecimal sumAmountByAccountId(@Param("accountId") Long accountId);
}
