package com.example.cookly.controllers;

import com.example.cookly.models.rest.LoginRest;
import com.example.cookly.models.rest.TokenRest;
import com.example.cookly.security.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/login")
public class LoginController {
    private final LoginService loginService;

    @Autowired
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping
    public ResponseEntity<TokenRest> login(@RequestHeader HttpHeaders headers, @RequestBody @Valid LoginRest loginData) {
        final Optional<String> token = loginService.loginToSystem(loginData);
        return token.map(t -> ResponseEntity.ok(new TokenRest(t))).orElseGet(() -> ResponseEntity.status(HttpStatus.FORBIDDEN).build());
    }
}
