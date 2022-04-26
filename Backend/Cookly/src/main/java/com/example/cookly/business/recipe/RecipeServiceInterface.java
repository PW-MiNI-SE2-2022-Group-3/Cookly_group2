package com.example.cookly.business.recipe;

import com.example.cookly.business.recipe.model.Recipe;
import org.springframework.lang.Nullable;

import java.util.Set;

public interface RecipeServiceInterface {

    boolean deleteRecipe(Long recipeId);
    Set<Recipe> getAllRecipes(Integer page, Integer limit, @Nullable String name, @Nullable Set<String> tags);
    void addRecipe(Recipe recipe);
    long getRecipesCount();
    void updateRecipe(Recipe recipe);

}
