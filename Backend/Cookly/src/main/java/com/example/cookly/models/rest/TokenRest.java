package com.example.cookly.models.rest;


import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;
import java.util.Objects;

public class TokenRest {

    @NotNull
    @JsonProperty(value = "token", required = true)
    private String token;

    public TokenRest(@NotNull String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TokenRest tokenRest = (TokenRest) o;
        return Objects.equals(token, tokenRest.token);
    }

    @Override
    public int hashCode() {
        return Objects.hash(token);
    }
}
