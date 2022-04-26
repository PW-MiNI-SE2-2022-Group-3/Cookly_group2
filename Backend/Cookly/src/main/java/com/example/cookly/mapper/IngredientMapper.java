package com.example.cookly.mapper;

import com.example.cookly.models.dto.IngredientDTO;
import com.example.cookly.business.ingredient.model.Ingredient;
import com.example.cookly.models.rest.IngredientRecipeRest;
import com.example.cookly.models.rest.IngredientRest;
import org.yaml.snakeyaml.constructor.ConstructorException;

import java.util.Objects;
import java.util.Optional;

public class IngredientMapper {

    private IngredientMapper() {}

    public static Optional<Ingredient> mapToIngredient(final IngredientDTO ingredientDTO) {
        if (Objects.nonNull(ingredientDTO)) {
            final Ingredient ingredient = new Ingredient();
            ingredient.setIngredientId(ingredientDTO.getIngredientId());
            ingredient.setName(ingredientDTO.getName());
            return Optional.of(ingredient);
        }
        return Optional.empty();
    }

    public static  Optional<IngredientDTO> mapToIngredientDTO(final Ingredient ingredient) {
        if (Objects.nonNull(ingredient)) {
            final IngredientDTO ingredientDTO = new IngredientDTO();
            ingredientDTO.setIngredientId(ingredient.getIngredientId());
            ingredientDTO.setName(ingredient.getName());
            return Optional.of(ingredientDTO);
        }
        return Optional.empty();
    }

    public static Optional<Ingredient> mapToIngredientDTO(final IngredientDTO ingredientDTO, final String quantity) {
        if (Objects.nonNull(ingredientDTO)) {
            final Ingredient ingredient = new Ingredient();
            ingredient.setIngredientId(ingredientDTO.getIngredientId());
            ingredient.setName(ingredientDTO.getName());
            ingredient.setQuantity(quantity);
            return Optional.of(ingredient);
        }
        return Optional.empty();
    }

    public static Optional<Ingredient> mapToIngredient(final IngredientRest ingredientRest) {
        if (Objects.nonNull(ingredientRest)) {
            final Ingredient ingredient = new Ingredient();
            ingredient.setName(ingredientRest.getName());
            return Optional.of(ingredient);
        }
        return Optional.empty();
    }

    public static Optional<IngredientRest> mapToIngredientRest(final Ingredient ingredient) {
        if (Objects.nonNull(ingredient)) {
            IngredientRest ingredientRest = new IngredientRest();
            ingredientRest.setId(ingredient.getIngredientId());
            ingredientRest.setName(ingredient.getName());
            return Optional.of(ingredientRest);
        }
        return Optional.empty();
    }



    public static Optional<IngredientRecipeRest> mapToIngredientRecipeRest(final Ingredient ingredient) {
        if (Objects.nonNull(ingredient)) {
            final IngredientRecipeRest ingredientRecipeRest = new IngredientRecipeRest();
            ingredientRecipeRest.setIngredient(mapToIngredientRest(ingredient).orElseGet(null));
            ingredientRecipeRest.setQuantity(ingredient.getQuantity());
            return  Optional.of(ingredientRecipeRest);
        }
        return Optional.empty();
    }

    public static Optional<Ingredient> mapToIngredient(final IngredientRecipeRest ingredientRecipeRest) {
        if (Objects.nonNull(ingredientRecipeRest)) {
            final Ingredient ingredient = new Ingredient();
            ingredient.setIngredientId(ingredientRecipeRest.getIngredient().getId());
            ingredient.setName(ingredientRecipeRest.getIngredient().getName());
            ingredient.setQuantity(ingredientRecipeRest.getQuantity());
            return Optional.of(ingredient);
        }
        return Optional.empty();
    }
}
