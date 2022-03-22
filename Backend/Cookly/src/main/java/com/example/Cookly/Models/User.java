package com.example.Cookly.Models;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(nullable = false) private String username;
    @Column(nullable = false) private String password;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

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

    public Set<Recipe> getRecipesLikedByUser() {
        return RecipesLikedByUser;
    }

    public void setRecipesLikedByUser(Set<Recipe> recipesLikedByUser) {
        RecipesLikedByUser = recipesLikedByUser;
    }

    @ManyToMany
    @JoinTable(
            name = "likedRecipes",
            joinColumns = @JoinColumn(name = "id"),//user id
            inverseJoinColumns = @JoinColumn(name = "id"))//recipe id
    Set<Recipe> RecipesLikedByUser;


}
