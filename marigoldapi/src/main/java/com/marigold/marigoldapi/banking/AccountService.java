package com.marigold.marigoldapi.banking;

import com.marigold.marigoldapi.banking.exception.AccessDeniedOnAccountException;
import com.marigold.marigoldapi.banking.exception.AccountNotFoundException;
import com.marigold.marigoldapi.domain.model.Account;
import com.marigold.marigoldapi.domain.model.AccountType;
import com.marigold.marigoldapi.domain.model.Customer;
import com.marigold.marigoldapi.domain.model.User;
import com.marigold.marigoldapi.domain.repository.AccountRepository;
import com.marigold.marigoldapi.security.Role;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.List;

@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final SecureRandom random = new SecureRandom();

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public Account createAccount(Customer customer, AccountType type) {
        Account account = Account.builder()
                .accountNumber(generateAccountNumber())
                .customer(customer)
                .type(type)
                .build();
        return accountRepository.save(account);
    }

    public List<Account> getAccountsForCustomer(Long customerId) {
        return accountRepository.findByCustomerId(customerId);
    }

    public Account getAccountOrThrow(Long accountId) {
        return accountRepository.findById(accountId)
                .orElseThrow(() -> new AccountNotFoundException(accountId));
    }

    public void assertAccessible(Account account, User currentUser) {
        if (currentUser.getRole() == Role.ANALYST) {
            return;
        }
        Customer owner = account.getCustomer();
        if (owner == null || currentUser.getCustomer() == null
                || !owner.getId().equals(currentUser.getCustomer().getId())) {
            throw new AccessDeniedOnAccountException(account.getId());
        }
    }

    private String generateAccountNumber() {
        String candidate;
        do {
            candidate = "MB" + (1_000_000_000L + random.nextLong(9_000_000_000L));
        } while (accountRepository.findByAccountNumber(candidate).isPresent());
        return candidate;
    }
}
