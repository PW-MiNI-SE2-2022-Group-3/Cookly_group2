package com.example.cookly.business.recipe;

import com.example.cookly.business.recipe.model.Recipe;

import java.util.Set;

public interface RecipeServiceInterface {

    boolean deleteRecipe(Long recipeId);
    Set<Recipe> getAllRecipes(Integer page, Integer limit);
    void addRecipe(Recipe recipe);
    long getRecipesCount();
    void updateRecipe(Recipe recipe);

}
