package com.example.cookly.mapper;

import com.example.cookly.business.ingredient.model.Ingredient;
import com.example.cookly.business.recipe.model.Recipe;
import com.example.cookly.business.recipe.model.RecipeTag;
import com.example.cookly.models.dto.IngredientDTO;
import com.example.cookly.models.dto.RecipeDTO;
import com.example.cookly.models.dto.RecipeIngredientDTO;
import com.example.cookly.models.dto.TagDTO;
import com.example.cookly.models.rest.IngredientRecipeRest;
import com.example.cookly.models.rest.RecipeRest;

import java.util.*;
import java.util.stream.Collectors;

import static com.example.cookly.mapper.IngredientMapper.mapToIngredientDTO;

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
                           .map(ingredient -> mapToIngredientDTO(ingredient.getIngredient(), ingredient.getQuantity()))
                           .filter(Optional::isPresent)
                           .map(Optional::get)
                           .collect(Collectors.toSet())
            );
            return Optional.of(recipe);
        }
        return Optional.empty();
    }

    public static  Optional<Recipe> mapToRecipe(final RecipeRest recipeRest) {

        if (Objects.nonNull(recipeRest)) {
            final Recipe recipe = new Recipe();

            recipe.setRecipeId(recipeRest.getId());
            recipe.setInstructions(recipeRest.getInstructions());
            recipe.setName(recipeRest.getName());

            final Set<String> tags;
            if (Objects.isNull(recipeRest.getTags()))
                tags = Collections.emptySet();
            else
                tags = recipeRest.getTags();
            recipe.setTags(tags.stream().map(RecipeTag::fingByName).collect(Collectors.toSet()));

            final Set<IngredientRecipeRest> ingredients;
            if (Objects.isNull(recipe.getIngredients()))
                ingredients = Collections.emptySet();
            else
                ingredients = recipeRest.getIngredients();

            recipe.setIngredients(ingredients.stream()
                .map(IngredientMapper::mapToIngredient)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toSet()));

            return Optional.of(recipe);
        }
        return Optional.empty();
    }

    public static Optional<RecipeDTO> mapToRecipeDTO(final Recipe recipe) {
        if(Objects.nonNull(recipe)) {
            final RecipeDTO recipeDTO = new RecipeDTO();
            recipeDTO.setId(recipe.getRecipeId());
            recipeDTO.setName(recipe.getName());
            recipeDTO.setInstruction(recipe.getInstructions());
            recipeDTO.setIngredientSet(
                    recipe.getIngredients().stream()
                    .map(ingredient -> {
                        RecipeIngredientDTO recipeIngredientDTO = new RecipeIngredientDTO();
                        recipeIngredientDTO.setRecipe(recipeDTO);
                        recipeIngredientDTO.setQuantity(ingredient.getQuantity());
                        recipeIngredientDTO.setIngredient(mapToIngredientDTO(ingredient).orElseThrow());
                        return recipeIngredientDTO;
                    }).collect(Collectors.toSet()));
            return Optional.of(recipeDTO);
        }
        return Optional.empty();
    }

    public static Optional<RecipeRest> mapToRecipeRest(final Recipe recipe) {
        if (Objects.nonNull(recipe)) {
            final RecipeRest recipeRest = new RecipeRest();
            final Set<Ingredient> ingredients = Objects.nonNull(recipe.getIngredients()) ? recipe.getIngredients() : Collections.emptySet();
            final Set<RecipeTag> tags = Objects.nonNull(recipe.getTags()) ? recipe.getTags() : Collections.emptySet();

            recipeRest.setId(recipe.getRecipeId());
            recipeRest.setName(recipe.getName());
            recipeRest.setInstructions(recipe.getInstructions());
            recipeRest.setTags(
                    tags
                    .stream()
                    .map(RecipeTag::getName)
                    .collect(Collectors.toSet())
            );
            recipeRest.setIngredients(
                    ingredients.stream()
                    .map(IngredientMapper::mapToIngredientRecipeRest)
                    .filter(Optional::isPresent)
                    .map(Optional::get)
                    .collect(Collectors.toSet())
            );
            return Optional.of(recipeRest);
        }
        return Optional.empty();
    }




}
