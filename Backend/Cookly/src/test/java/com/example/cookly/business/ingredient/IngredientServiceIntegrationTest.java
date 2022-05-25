package com.example.cookly.business.ingredient;

import com.example.cookly.business.ingredient.model.Ingredient;
import com.example.cookly.exceptions.models.IngredientDuplicateException;
import com.example.cookly.exceptions.models.IngredientNotFountException;
import com.example.cookly.models.dto.IngredientDTO;
import com.example.cookly.repositories.IngredientRepository;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.jdbc.Sql;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.*;

class IngredientServiceIntegrationTest
{

    @Autowired
    private IngredientService ingredientService;

    @Autowired
    private IngredientRepository ingredientRepository;



    @Test
    @DisplayName("Add ingredient duplicate")
    @Order(2)
    void addIngredientDuplicate()
    {
        final Ingredient ingredient = new Ingredient();
        ingredient.setIngredientId(1000);
        ingredient.setName("Name");

        assertThatThrownBy(() -> ingredientService.addIngredient(ingredient))
                .isExactlyInstanceOf(IngredientDuplicateException.class)
                .hasMessage("Ingredient with name: Name does exist in database");
    }

    @Test
    @DisplayName("Is ingredient present true")
    @Order(4)
    void isIngredientPresentTrue()
    {
        final boolean result = ingredientService.isIngredientMissing(1000L);
        assertThat(result).isFalse();
    }

    @Test
    @DisplayName("Is ingredient present false")
    @Order(5)
    void isIngredientPresentFalse()
    {
        final boolean result = ingredientService.isIngredientMissing(1000L);
        assertThat(result).isTrue();
    }

    @Test
    @DisplayName("Get all ingredients one page without filters")
    @Order(6)
    void getAllIngredientsOnePageWithoutFilters()
    {
        final int limit = 5;
        final int page = 0;

        final Set<Ingredient> retrievedList = ingredientService.getIngredients(page, limit, null);
        final Set<String> ingredientsNames = retrievedList.stream().map(Ingredient::getName).collect(Collectors.toSet());

        assertThat(retrievedList).hasSize(5);
        assertThat(ingredientsNames).contains("Name4");
    }

    @Test
    @DisplayName("Get all ingredients more pages without filters")
    @Order(7)
    void getAllIngredientsMorePagesWithoutFilters()
    {
        final int limit = 3;

            final Set<Ingredient> retrievedList1 = ingredientService.getIngredients(0, limit, null);
        final Set<Ingredient> retrievedList2 = ingredientService.getIngredients(1, limit, null);

        assertThat(retrievedList1).hasSize(3);
        assertThat(retrievedList2).hasSize(2);
        assertThat(retrievedList1.stream().anyMatch(el -> el.getName().equals("Name4"))).isFalse();
    }

    @Test
    @DisplayName("Get all ingredients with existing name")
    @Order(8)
    void getAllIngredientsWithSpecifiedName()
    {
        final int limit = 5;
        final int page = 0;

        final Set<Ingredient> retrievedList = ingredientService.getIngredients(page, limit, "Name1");

        assertThat(retrievedList.size()).isOne();
    }

    @Test
    @DisplayName("Get all ingredients with not existing name")
    @Order(9)
    void getAllNotExistingIngredientsWithSpecifiedName()
    {
        final int limit = 5;
        final int page = 0;

        final Set<Ingredient> retrievedList = ingredientService.getIngredients(page, limit, "Name10");

        assertThat(retrievedList).isEmpty();
    }

    @Test
    @DisplayName("Get all ingredients empty without filters")
    @Order(10)
    void getAllIngredientsEmptyWithoutFilters()
    {
        final int limit = 5;
        final int page = 0;

        final Set<Ingredient> retrievedList = ingredientService.getIngredients(page, limit, null);

        assertThat(retrievedList).isEmpty();
    }

    @Test
    @DisplayName("Count ingredients non empty")
    @Order(11)
    void countIngredientsNonEmpty()
    {
        final long retrievedList = ingredientService.numberOfIngredients();

        assertThat(retrievedList).isEqualTo(5);
    }

    @Test
    @DisplayName("Count ingredients empty")
    @Order(12)
    void countIngredientsEmpty()
    {
        final long retrievedList = ingredientService.numberOfIngredients();

        assertThat(retrievedList).isZero();
    }

    @Test
    @DisplayName("Delete one existing ingredient")
    @Order(13)
    void deleteOneProperIngredient()
    {
        assertThat(ingredientService.deleteIngredient((long) 1000)).isTrue();

        final List<IngredientDTO> ingredientList = (List<IngredientDTO>) ingredientRepository.findAll();
        assertThat(ingredientList).isEmpty();

    }

    @Test
    @DisplayName("Delete one not existing ingredient")
    @Order(14)
    void deleteOneNotExistingIngredient()
    {

        assertThatThrownBy(() -> ingredientService.deleteIngredient(1L))
                .isExactlyInstanceOf(IngredientNotFountException.class)
                .hasMessage("Ingredient with the id: 1 does not exist");
    }




    @Test
    @DisplayName("Update non existing ingredient")
    @Order(16)
    void updateNonExistingIngredient()
    {
        var ingredient = new Ingredient(1000L, "NEW_NAME", "QUANTITY");

        assertThatThrownBy(() -> ingredientService.editIngredient(ingredient, ingredient.getIngredientId()))
                .isExactlyInstanceOf(IngredientNotFountException.class)
                .hasMessage("Ingredient with the id: 1000 does not exist");
    }
}