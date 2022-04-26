package com.example.cookly.business.security;

import org.springframework.http.HttpHeaders;

public interface SecurityServiceInterface {
    boolean isAuthenticated(HttpHeaders headers);
}
