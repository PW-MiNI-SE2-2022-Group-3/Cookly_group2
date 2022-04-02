package com.example.Cookly.models.DTOModels;

import com.example.Cookly.models.DTOModels.connections.RecipeIngredientId;
import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.Objects;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RecipeIngredientDTO that = (RecipeIngredientDTO) o;
        return recipeIngredientId.equals(that.recipeIngredientId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(recipeIngredientId);
    }
}
