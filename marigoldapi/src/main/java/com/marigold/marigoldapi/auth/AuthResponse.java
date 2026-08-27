package com.marigold.marigoldapi.auth;

public record AuthResponse(String token, String email, String role) {
}
