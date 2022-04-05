package com.example.cookly.mapper;

import com.example.cookly.business.ingredient.model.Ingredient;
import com.example.cookly.business.recipe.model.Recipe;
import com.example.cookly.business.recipe.model.RecipeTag;
import com.example.cookly.models.dto.IngredientDTO;
import com.example.cookly.models.dto.RecipeDTO;
import com.example.cookly.models.dto.RecipeIngredientDTO;
import com.example.cookly.models.dto.TagDTO;
import com.example.cookly.models.rest.RecipeRest;

import java.util.*;
import java.util.stream.Collectors;

public class RecipeMapper {

    public static Optional<Recipe> mapToRecipe(final RecipeDTO recipeDTO) {
        if (Objects.nonNull(recipeDTO)) {
            final Recipe recipe = new Recipe();
            recipe.setInstructions(recipeDTO.getInstruction());
            recipe.setRecipeId(recipeDTO.getId());
            recipe.setName(recipeDTO.getName());

            Set<TagDTO> tags =recipeDTO.getTagSet();
            recipe.setTags(tags.stream().map(tag -> RecipeTag.fingById(tag.getTagId())).collect(Collectors.toSet()));

            Set<RecipeIngredientDTO> ingredients = recipeDTO.getIngredientSet();
            recipe.setIngredients(
                ingredients.stream()
                           .map(ingredient -> IngredientMapper.mapToIngredientDTO(ingredient.getIngredient(), ingredient.getQuantity()))
                           .filter(Optional::isPresent)
                           .map(Optional::get)
                           .collect(Collectors.toSet())
            );
            return Optional.of(recipe);
        }
        return Optional.empty();
    }

    public static  Optional<RecipeRest> mapToRecipe(final Recipe recipe) {

        if (Objects.nonNull(recipe)) {
            final RecipeRest recipeRest = new RecipeRest();

            recipeRest.setId(recipe.getRecipeId());
            recipeRest.setInstructions(recipe.getInstructions());
            recipeRest.setName(recipe.getName());

            final Set<RecipeTag> tags;
            if (Objects.isNull(recipe.getTags()))
                tags = Collections.emptySet();
            else
                tags = recipe.getTags();
            recipeRest.setTags(tags.stream().map(RecipeTag::getName).collect(Collectors.toSet()));

            final Set<Ingredient> ingredients;
            if (Objects.isNull(recipe.getIngredients()))
                ingredients = Collections.emptySet();
            else
                ingredients = recipe.getIngredients();

            recipeRest.setIngredients(ingredients.stream()
                .map(IngredientMapper::mapToIngredientRecipeRest)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toSet()));

            return Optional.of(recipeRest);
        }
        return Optional.empty();
    }
}
