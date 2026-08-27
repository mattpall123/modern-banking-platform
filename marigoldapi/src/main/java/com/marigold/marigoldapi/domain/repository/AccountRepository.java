package com.marigold.marigoldapi.domain.repository;

import com.marigold.marigoldapi.domain.model.Account;
import com.marigold.marigoldapi.domain.model.AccountType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    List<Account> findByCustomerId(Long customerId);
    Optional<Account> findByAccountNumber(String accountNumber);
    Optional<Account> findFirstByType(AccountType type);
}
