package com.example.cookly.business.recipe;

import com.example.cookly.business.ingredient.IngredientService;
import com.example.cookly.business.recipe.model.Recipe;
import com.example.cookly.business.recipe.model.RecipeTag;
import com.example.cookly.exceptions.models.*;
import com.example.cookly.mapper.RecipeMapper;
import com.example.cookly.models.dto.RecipeDTO;
import com.example.cookly.repositories.RecipeIngredientRepository;
import com.example.cookly.repositories.RecipeRepository;
import com.example.cookly.repositories.TagRepository;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static com.example.cookly.mapper.RecipeMapper.mapToRecipeDTO;

@Service
public class RecipeService implements RecipeServiceInterface {

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

    @Override
    public void addRecipe(final Recipe recipe) {
        final Optional<RecipeDTO>  recipeDTOOptional = mapToRecipeDTO(recipe);

        recipeDTOOptional.ifPresent(
                recipeDTO ->  {
                    try {
                        recipeRepository.save(recipeDTO);
                    } catch (final DataIntegrityViolationException e) {
                        throw new IngredientDuplicateException(recipe.getName());
                    } catch (final DataAccessException e) {
                        throw new DatabaseSaveException(recipe.getRecipeId());
                    }
                }
        );
    }

    @Override
    public long getRecipesCount() {
        try
        {
            return StreamSupport.stream(recipeRepository.findAll().spliterator(), false).count();
        }
        catch (final DataAccessException e) {
            throw new DatabaseFindException("Recipe count");
        }
    }

    public Set<Recipe> getAllRecipes(final Integer page, final Integer limit, @Nullable String name, @Nullable Set<String> tags) {
        final Predicate<Recipe> filterByName = recipe -> (Objects.isNull(name)) || (recipe.getName().contains(name));
        final Predicate<Recipe> filterByTags = recipe ->
                (Objects.isNull(tags) ||
                        (tags.stream().allMatch(
                                tag -> recipe.getTags().stream()
                                        .map(RecipeTag::getName)
                                        .collect(Collectors.toSet()).contains(tag))
                        )
                );
        try {
            return StreamSupport.stream(recipeRepository.findAll().spliterator(), false)
                    .map(RecipeMapper::mapToRecipe)
                    .filter(Optional::isPresent)
                    .map(Optional::get)
                    .filter(filterByName)
                    .filter(filterByTags)
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

    @Transactional
    @Override
    public void updateRecipe(Recipe recipe) {
        final  RecipeDTO recipeToEdit = recipeRepository.findById(recipe.getRecipeId()).orElseThrow( () -> new RecipeNotFoundException(recipe.getRecipeId()));

        recipeToEdit.setName(recipe.getName());
        recipeToEdit.setInstruction(recipe.getInstructions());
        recipeToEdit.setTagSet(recipe.getTags().stream()
        .map( tag -> tagRepository.findById(tag.getId()).orElseThrow(() -> new TagNotFoundException(tag.getId())))
                        .collect(Collectors.toSet())
        );

        try {
            recipeRepository.save(recipeToEdit);
        } catch (final DataAccessException e) {
            throw new DatabaseSaveException(recipeToEdit.getId());
        }

        try {
            recipeIngredientRepository.deleteAllByRecipeId(recipeToEdit.getId());
            recipe.getIngredients().forEach(
                    ingredient -> {
                        if (ingredientService.isIngredientMissing(ingredient.getIngredientId())) {
                            throw new IngredientNotFountException(ingredient.getIngredientId());
                        }
                        recipeIngredientRepository.addIngredientForRecipe(recipe.getRecipeId(), ingredient.getIngredientId(), ingredient.getQuantity());
                    }
            );
        } catch (final DataAccessException e) {
            throw new DatabaseSaveException(recipe.getRecipeId());
        }
    }





}


