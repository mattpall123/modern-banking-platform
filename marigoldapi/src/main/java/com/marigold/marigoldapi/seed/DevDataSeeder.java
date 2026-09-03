package com.marigold.marigoldapi.seed;

import com.marigold.marigoldapi.banking.AccountService;
import com.marigold.marigoldapi.banking.TransferService;
import com.marigold.marigoldapi.domain.model.*;
import com.marigold.marigoldapi.domain.repository.AccountRepository;
import com.marigold.marigoldapi.domain.repository.CategoryRepository;
import com.marigold.marigoldapi.domain.repository.CustomerRepository;
import com.marigold.marigoldapi.domain.repository.UserRepository;
import com.marigold.marigoldapi.security.Role;
import net.datafaker.Faker;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Component
@Profile("demo")
public class DevDataSeeder implements CommandLineRunner {

    private static final List<String> CATEGORY_NAMES = List.of(
            "GROCERIES", "RENT", "UTILITIES", "DINING", "ENTERTAINMENT",
            "TRANSPORTATION", "INCOME", "SHOPPING", "HEALTHCARE", "TRANSFER");

    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;
    private final AccountRepository accountRepository;
    private final CategoryRepository categoryRepository;
    private final PasswordEncoder passwordEncoder;
    private final AccountService accountService;
    private final TransferService transferService;

    public DevDataSeeder(CustomerRepository customerRepository,
                          UserRepository userRepository,
                          AccountRepository accountRepository,
                          CategoryRepository categoryRepository,
                          PasswordEncoder passwordEncoder,
                          AccountService accountService,
                          TransferService transferService) {
        this.customerRepository = customerRepository;
        this.userRepository = userRepository;
        this.accountRepository = accountRepository;
        this.categoryRepository = categoryRepository;
        this.passwordEncoder = passwordEncoder;
        this.accountService = accountService;
        this.transferService = transferService;
    }

    @Override
    public void run(String... args) {
        if (customerRepository.count() > 0) {
            return;
        }

        Map<String, Category> categories = seedCategories();
        Account externalClearing = seedSystemAccount();
        seedAnalysts();

        Faker faker = new Faker(new Random(42));

        seedCustomer("Alice Anderson", "alice@marigoldbank.test", faker, categories, externalClearing, true);

        for (int i = 0; i < 12; i++) {
            String name = faker.name().fullName();
            String email = name.toLowerCase().replaceAll("[^a-z]+", ".") + i + "@marigoldbank.test";
            seedCustomer(name, email, faker, categories, externalClearing, i == 4);
        }
    }

    private Map<String, Category> seedCategories() {
        Map<String, Category> categories = new HashMap<>();
        for (String name : CATEGORY_NAMES) {
            categories.put(name, categoryRepository.save(Category.builder().name(name).build()));
        }
        return categories;
    }

    private Account seedSystemAccount() {
        Account account = Account.builder()
                .accountNumber("MB0000000000")
                .type(AccountType.SYSTEM)
                .balanceCache(BigDecimal.ZERO)
                .build();
        return accountRepository.save(account);
    }

    private void seedAnalysts() {
        for (String email : List.of("priya.analyst@marigoldbank.test", "sam.analyst@marigoldbank.test")) {
            userRepository.save(User.builder()
                    .email(email)
                    .passwordHash(passwordEncoder.encode("analyst123"))
                    .role(Role.ANALYST)
                    .build());
        }
    }

    private void seedCustomer(String fullName, String email, Faker faker,
                               Map<String, Category> categories, Account externalClearing,
                               boolean injectAnomaly) {
        Customer customer = customerRepository.save(Customer.builder()
                .fullName(fullName)
                .email(email)
                .build());

        userRepository.save(User.builder()
                .email(email)
                .passwordHash(passwordEncoder.encode("password123"))
                .role(Role.CUSTOMER)
                .customer(customer)
                .build());

        Account checking = accountService.createAccount(customer, AccountType.CHECKING);
        accountService.createAccount(customer, AccountType.SAVINGS);

        BigDecimal monthlyIncome = BigDecimal.valueOf(3000 + faker.number().numberBetween(0, 1500));
        BigDecimal monthlyRent = BigDecimal.valueOf(1000 + faker.number().numberBetween(0, 800));

        LocalDate monthStart = LocalDate.now().minusMonths(6).withDayOfMonth(1);

        for (int month = 0; month < 6; month++) {
            LocalDate current = monthStart.plusMonths(month);

            transferService.transfer(externalClearing.getId(), checking.getId(), monthlyIncome,
                    "Payroll Deposit", "INCOME", atDay(current, 2));

            transferService.transfer(checking.getId(), externalClearing.getId(), monthlyRent,
                    "Monthly Rent", "RENT", atDay(current, 3), false);

            transferService.transfer(checking.getId(), externalClearing.getId(),
                    BigDecimal.valueOf(80 + faker.number().numberBetween(0, 150)),
                    "Utility Bill - " + faker.company().name(), "UTILITIES", atDay(current, 5), false);

            int discretionaryCount = 8 + faker.number().numberBetween(0, 6);
            for (int j = 0; j < discretionaryCount; j++) {
                seedDiscretionaryPurchase(faker, checking, externalClearing, current);
            }
        }

        if (injectAnomaly) {
            transferService.transfer(checking.getId(), externalClearing.getId(),
                    BigDecimal.valueOf(4200 + faker.number().numberBetween(0, 900)),
                    "High-value transfer - unfamiliar payee", "TRANSFER", Instant.now().minusSeconds(3600));
        }
    }

    private void seedDiscretionaryPurchase(Faker faker, Account checking, Account externalClearing, LocalDate month) {
        String[] categoryNames = {"GROCERIES", "DINING", "ENTERTAINMENT", "SHOPPING", "TRANSPORTATION"};
        String category = categoryNames[faker.number().numberBetween(0, categoryNames.length)];
        String description = switch (category) {
            case "GROCERIES" -> faker.company().name() + " Grocery";
            case "DINING" -> faker.company().name() + " Restaurant";
            case "ENTERTAINMENT" -> faker.company().name() + " Entertainment";
            case "SHOPPING" -> faker.company().name() + " Store";
            default -> faker.company().name() + " Transit";
        };
        BigDecimal amount = BigDecimal.valueOf(10 + faker.number().numberBetween(0, 140));
        int day = 1 + faker.number().numberBetween(0, month.lengthOfMonth() - 1);

        transferService.transfer(checking.getId(), externalClearing.getId(), amount,
                description, category, atDay(month, day), false);
    }

    private Instant atDay(LocalDate month, int day) {
        int clampedDay = Math.min(day, month.lengthOfMonth());
        return month.withDayOfMonth(clampedDay).atTime(12, 0).toInstant(ZoneOffset.UTC);
    }
}
