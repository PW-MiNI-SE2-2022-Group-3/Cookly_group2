package com.example.Cookly.DTOModels;

import com.example.Cookly.DTOModels.connections.RecipeIngredientId;
import com.sun.istack.NotNull;

import javax.persistence.*;

@Entity
@Table(name = "ingredient_recipe")
public class RecipeIngredientDTO {

    @EmbeddedId
    private RecipeIngredientId recipeIngredientId;

    @NotNull
    @Column(name = "quantity")
    private String quantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("id")
    @JoinColumn(name = "recipe_id")
    private RecipeDTO recipe;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("id")
    @JoinColumn(name = "ingredient_id")
    private RecipeDTO ingredient;

    public RecipeIngredientId getRecipeIngredientId() {
        return recipeIngredientId;
    }

    public void setRecipeIngredientId(RecipeIngredientId recipeIngredientId) {
        this.recipeIngredientId = recipeIngredientId;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public RecipeDTO getRecipe() {
        return recipe;
    }

    public void setRecipe(RecipeDTO recipe) {
        this.recipe = recipe;
    }

    public RecipeDTO getIngredient() {
        return ingredient;
    }

    public void setIngredient(RecipeDTO ingredient) {
        this.ingredient = ingredient;
    }
}
