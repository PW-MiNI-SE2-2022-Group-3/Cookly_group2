package com.example.cookly.models.rest;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;
import java.util.Objects;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class LoginRest {

    @NotNull
    @JsonProperty(value = "username", required = true)
    private String username;

    @NotNull
    @JsonProperty(value = "password", required = true)
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LoginRest loginRest = (LoginRest) o;
        return username.equals(loginRest.username) &&
                password.equals(loginRest.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username, password);
    }

    @Override
    public String toString() {
        return "LoginRest{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
