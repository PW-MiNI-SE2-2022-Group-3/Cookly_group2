package com.example.Cookly.mapper;

import com.example.Cookly.DTOModels.IngredientDTO;
import com.example.Cookly.business.ingredient.model.Ingredient;

import java.util.Objects;
import java.util.Optional;

public class IngredientMapper {

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
}
