package com.example.cookly.models.rest;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Objects;
import java.util.Set;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class UsersAllRest  implements Serializable {

    private static final long serialVersionUID = 6161110348988050953L;
    @NotNull
    @JsonProperty(value = "no_of_ingredients", required = true)
    private long users_count;

    @NotNull
    @JsonProperty(value = "ingredients", required = true)
    private Set<LoginRest> users;

    public UsersAllRest(long users_count, Set<LoginRest> users) {
        this.users_count = users_count;
        this.users = users;
    }

    public long getUsers_count() {
        return users_count;
    }

    public void setUsers_count(long users_count) {
        this.users_count = users_count;
    }

    public Set<LoginRest> getUsers() {
        return users;
    }

    public void setUsers(Set<LoginRest> users) {
        this.users = users;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UsersAllRest that = (UsersAllRest) o;
        return users_count == that.users_count && Objects.equals(users, that.users);
    }

    @Override
    public int hashCode() {
        return Objects.hash(users_count, users);
    }
}
