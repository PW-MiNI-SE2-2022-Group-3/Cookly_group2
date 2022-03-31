package com.example.Cookly.business.ingredient;

import com.example.Cookly.business.ingredient.model.Ingredient;

import java.util.Set;

public interface IngredientServiceInterface {
    void addIngredient(Ingredient ingredient);
    boolean deleteIngredient(Long ingredientId);
    long numberOfIngredients();
    Set<Ingredient> getIngredients(Integer page, Integer limit);
    
}
