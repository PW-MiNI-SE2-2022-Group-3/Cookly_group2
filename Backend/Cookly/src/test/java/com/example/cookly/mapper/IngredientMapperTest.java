package com.example.cookly.mapper;

import com.example.cookly.business.ingredient.model.Ingredient;
import com.example.cookly.models.dto.IngredientDTO;
import com.example.cookly.models.dto.RecipeIngredientDTO;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.util.Assert;

import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class IngredientMapperTest {

    @Test
    void mapToIngredient() {
        IngredientDTO dto = new IngredientDTO();
        dto.setIngredientId(0);
        dto.setName("pasta");

        Optional<Ingredient> opt = IngredientMapper.mapToIngredient(dto);
        Ingredient test = opt.get();
        Assertions.assertTrue(test.getIngredientId() == dto.getIngredientId());
        Assertions.assertTrue(test.getName().equals(dto.getName()));
    }
}