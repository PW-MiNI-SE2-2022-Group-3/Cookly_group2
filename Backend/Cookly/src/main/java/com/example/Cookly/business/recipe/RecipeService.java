package com.example.cookly.business.recipe;

import com.example.cookly.business.recipe.model.Recipe;
import com.example.cookly.repositories.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.StreamSupport;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;

    @Autowired
    public RecipeService(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }


    public long getRecipeCount() {
        try
        {
            return StreamSupport.stream(recipeRepository.findAll().spliterator(), false).count();
        }
        catch (final Exception e)
        {
            throw e;
        }
    }

    public boolean deleteRecipe(Long id) {
        try {
            recipeRepository.deleteById(id);
            return true;
        }
        catch (final Exception e) {
            return false;
        }
    }


}
