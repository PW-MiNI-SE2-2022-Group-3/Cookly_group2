package com.example.cookly.models.rest;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Objects;
import java.util.Set;

public class RecipeAllRest implements Serializable {

    private static final long serialVersionUID = 2386684379664486812L;

    @NotNull
    @JsonProperty("recipe_count")
    private long recipeCount;

    @NotNull
    @JsonProperty("recipes")
    private Set<RecipeRest> recipes;

    public RecipeAllRest() {
    }

    public RecipeAllRest(@NotNull long recipeCount, @NotNull Set<RecipeRest> recipes) {
        this.recipeCount = recipeCount;
        this.recipes = recipes;
    }

    public long getRecipeCount() {
        return recipeCount;
    }

    public void setRecipeCount(long recipeCount) {
        this.recipeCount = recipeCount;
    }

    public Set<RecipeRest> getRecipes() {
        return recipes;
    }

    public void setRecipes(Set<RecipeRest> recipes) {
        this.recipes = recipes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RecipeAllRest that = (RecipeAllRest) o;
        return recipeCount == that.recipeCount;
    }

    @Override
    public int hashCode() {
        return Objects.hash(recipeCount);
    }
}
