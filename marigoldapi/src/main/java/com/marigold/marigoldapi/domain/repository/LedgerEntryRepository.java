package com.marigold.marigoldapi.domain.repository;

import com.marigold.marigoldapi.domain.dto.CategorySpend;
import com.marigold.marigoldapi.domain.model.LedgerEntry;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.Instant;
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

    @Query("select coalesce(sum(le.amount), 0) from LedgerEntry le "
            + "where le.account.id = :accountId and le.amount > 0 and le.transaction.occurredAt >= :since")
    BigDecimal sumInflowSince(@Param("accountId") Long accountId, @Param("since") Instant since);

    @Query("select coalesce(sum(le.amount), 0) from LedgerEntry le "
            + "where le.account.id = :accountId and le.amount < 0 and le.transaction.occurredAt >= :since")
    BigDecimal sumOutflowSince(@Param("accountId") Long accountId, @Param("since") Instant since);

    @Query("select new com.marigold.marigoldapi.domain.dto.CategorySpend("
            + "coalesce(t.category.name, 'UNCATEGORIZED'), sum(le.amount)) "
            + "from LedgerEntry le join le.transaction t "
            + "where le.account.id = :accountId and le.amount < 0 and t.occurredAt >= :since "
            + "group by t.category.name "
            + "order by sum(le.amount) asc")
    List<CategorySpend> sumSpendingByCategorySince(@Param("accountId") Long accountId, @Param("since") Instant since);
}
