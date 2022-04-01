package com.example.Cookly.DTOModels.keys;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class RecipeIngredientId {

    @Column(name = "recipe_id")
    private long recipeId;

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

    @Column(name = "ingredient_id")
    private long ingredientId;
}
