package com.example.Cookly.DTOModels;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "ingredients")
public class IngredientDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;

    @NotNull
    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "ingredient")
    private Set<RecipeIngredientDTO> recipeSet;

    public long getIngredientId() {
        return id;
    }

    public void setIngredientId(long ingredientId) {
        this.id = ingredientId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<RecipeIngredientDTO> getRecipeSet() {
        return recipeSet;
    }

    public void setRecipeSet(Set<RecipeIngredientDTO> recipeSet) {
        this.recipeSet = recipeSet;
    }
}
