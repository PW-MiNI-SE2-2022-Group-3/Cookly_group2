package com.example.cookly.business.security;

import com.example.cookly.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpHeaders;


import java.util.Objects;


@Service
public class SecurityService implements SecurityServiceInterface{

    private static final String SECURITY_HEADER = "security_header";
    private final UserRepository userRepository;

    @Autowired
    public SecurityService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean isAuthenticated(HttpHeaders headers) {
        if (Objects.isNull(headers) || headers.containsKey(SECURITY_HEADER) == false) {
            //error handling
            return false;
        }

        return userRepository.findByToken(headers.getFirst(SECURITY_HEADER)).isPresent();
    }
}
