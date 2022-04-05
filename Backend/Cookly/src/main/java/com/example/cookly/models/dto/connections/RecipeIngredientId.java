package com.example.cookly.models.dto.connections;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class RecipeIngredientId implements Serializable {

    @Column(name = "recipe_id")
    private long recipeId;


    @Column(name = "ingredient_id")
    private long ingredientId;

    public long getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(long recipeId) {
        this.recipeId = recipeId;
    }

    public long getIngredientId() {
        return ingredientId;
    }

    public void setIngredientId(long ingredientId) {
        this.ingredientId = ingredientId;
    }

    @Override
    public boolean equals(Object object) {
        if (this == object)
            return true;
        if (object == null || getClass() != object.getClass())
            return false;
        RecipeIngredientId ingredient_recipe = (RecipeIngredientId) object;
        return recipeId == ingredient_recipe.recipeId && ingredientId == ingredient_recipe.ingredientId;
    }
    @Override
    public int hashCode() {
        return Objects.hash(recipeId, ingredientId);
    }

}
