package com.marigold.marigoldapi.ai;

import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayDeque;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimiter {

    private static final int MAX_REQUESTS_PER_WINDOW = 20;
    private static final Duration WINDOW = Duration.ofHours(1);

    private final ConcurrentHashMap<String, ArrayDeque<Instant>> requestsByUser = new ConcurrentHashMap<>();

    public void checkAndRecord(String key) {
        Instant now = Instant.now();
        ArrayDeque<Instant> timestamps = requestsByUser.computeIfAbsent(key, k -> new ArrayDeque<>());

        synchronized (timestamps) {
            while (!timestamps.isEmpty() && timestamps.peekFirst().isBefore(now.minus(WINDOW))) {
                timestamps.pollFirst();
            }
            if (timestamps.size() >= MAX_REQUESTS_PER_WINDOW) {
                throw new RateLimitExceededException(
                        "Rate limit exceeded: max " + MAX_REQUESTS_PER_WINDOW + " AI requests per hour");
            }
            timestamps.addLast(now);
        }
    }
}
