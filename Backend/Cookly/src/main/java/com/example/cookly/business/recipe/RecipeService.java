package com.example.cookly.business.recipe;

import com.example.cookly.business.ingredient.IngredientService;
import com.example.cookly.business.recipe.model.Recipe;
import com.example.cookly.exceptions.models.DatabaseFindException;
import com.example.cookly.exceptions.models.DatabaseSaveException;
import com.example.cookly.exceptions.models.IngredientDuplicateException;
import com.example.cookly.exceptions.models.RecipeNotFoundException;
import com.example.cookly.mapper.RecipeMapper;
import com.example.cookly.models.dto.RecipeDTO;
import com.example.cookly.repositories.RecipeIngredientRepository;
import com.example.cookly.repositories.RecipeRepository;
import com.example.cookly.repositories.TagRepository;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static com.example.cookly.mapper.RecipeMapper.mapToRecipeDTO;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final RecipeIngredientRepository recipeIngredientRepository;
    private final TagRepository tagRepository;
    private final IngredientService ingredientService;

    public RecipeService(RecipeRepository recipeRepository, RecipeIngredientRepository recipeIngredientRepository, TagRepository tagRepository, IngredientService ingredientService) {
        this.recipeRepository = recipeRepository;
        this.recipeIngredientRepository = recipeIngredientRepository;
        this.tagRepository = tagRepository;
        this.ingredientService = ingredientService;
    }

    public long getRecipeCount() {
        try
        {
            return StreamSupport.stream(recipeRepository.findAll().spliterator(), false).count();
        }
        catch (final DataAccessException e) {
            throw new DatabaseFindException("Recipe count");
        }
    }

    public void addRecipe(final Recipe recipe) {
        final Optional<RecipeDTO>  recipeDTOOptional = mapToRecipeDTO(recipe);

        recipeDTOOptional.ifPresent(
                recipeDTO ->  {
                    try {
                        recipeRepository.save(recipeDTO);
                    } catch (final DataIntegrityViolationException e) {
                        throw new IngredientDuplicateException(recipe.getName());
                    } catch (final DataAccessException) {
                        throw new DatabaseSaveException(recipe.getRecipeId());
                    }
                }
        );
    }

    public Set<Recipe> getAllRecipes(final Integer page, final Integer limit) {
        try {
            return StreamSupport.stream(recipeRepository.findAll().spliterator(), false)
                    .map(RecipeMapper::mapToRecipe)
                    .filter(Optional::isPresent)
                    .map(Optional::get)
                    .skip((long) page * limit)
                    .limit(limit)
                    .collect(Collectors.toSet());
        }
        catch (final DataAccessException e) {
            throw new DatabaseFindException("All recipe list");
        }
    }

    public boolean deleteRecipe(Long id) {
        try {
            recipeRepository.deleteById(id);
            return true;
        }
        catch (final EmptyResultDataAccessException e) {
            throw new RecipeNotFoundException(id);
        }
    }


}
