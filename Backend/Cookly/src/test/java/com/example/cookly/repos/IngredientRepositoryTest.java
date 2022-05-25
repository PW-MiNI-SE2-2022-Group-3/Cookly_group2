package com.example.cookly.repos;

import com.example.cookly.models.dto.IngredientDTO;

import com.example.cookly.repositories.IngredientRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;

import javax.validation.ConstraintViolationException;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class IngredientRepositoryTest
{

    @Autowired
    private IngredientRepository ingredientRepository;

    private IngredientDTO mockIngredient;

    @BeforeEach
    public void setUp()
    {
        mockIngredient = new IngredientDTO();
        mockIngredient.setIngredientId(0);
        mockIngredient.setName("Test Ingredient");
    }

    @Test
    @DisplayName("Save ingredient all data")
    @Order(1)
    void saveIngredientAllData()
    {
        final IngredientDTO ingredientDTO = ingredientRepository.save(mockIngredient);

        assertThat(ingredientDTO).usingRecursiveComparison().isEqualTo(mockIngredient);
        assertThat(ingredientDTO.getName()).isEqualTo("Test Ingredient");
    }

    @Test
    @DisplayName("Save ingredient duplicate")
    @Order(2)
    void saveIngredientDuplicate()
    {
        mockIngredient.setName("Name");

        assertThatThrownBy(() -> ingredientRepository.save(mockIngredient))
                .isExactlyInstanceOf(DataIntegrityViolationException.class);
    }

    @Test
    @DisplayName("Save ingredient with null name")
    @Order(3)
    void saveIngredientNullName()
    {
        mockIngredient.setName(null);

        assertThatThrownBy(() -> ingredientRepository.save(mockIngredient))
                .hasRootCauseInstanceOf(ConstraintViolationException.class);
    }

    @Test
    @DisplayName("Find ingredient by id when present")
    @Order(4)
    void findByIdPresent()
    {
        final Optional<IngredientDTO> retrievedIngredient = ingredientRepository.findById(1000L);

        assertThat(retrievedIngredient).isPresent();
        assertThat(retrievedIngredient.get().getName()).isEqualTo("Name");
    }

    @Test
    @DisplayName("Find ingredient by id when not present")
    @Order(5)
    void findByIdNotPresent()
    {
        final Optional<IngredientDTO> retrievedIngredient = ingredientRepository.findById(4000L);

        assertThat(retrievedIngredient).isEmpty();
    }

    @Test
    @DisplayName("Find all ingredients not empty")
    @Order(6)
    void findAllIngredients()
    {
        final List<IngredientDTO> databaseIngredients = (List<IngredientDTO>) ingredientRepository.findAll();

        assertThat(databaseIngredients).hasSize(2);
    }

    @Test
    @DisplayName("Find all ingredients empty")
    @Order(7)
    void findAllIngredientsEmpty()
    {
        final List<IngredientDTO> databaseIngredients = (List<IngredientDTO>) ingredientRepository.findAll();

        assertThat(databaseIngredients).isEmpty();
    }

    @Test
    @DisplayName("Delete existing ingredient by id")
    @Order(8)
    void deleteByIdExistingIngredient()
    {
        ingredientRepository.deleteById(1000L);

        assertThat(ingredientRepository.findAll()).isEmpty();
    }

    @Test
    @DisplayName("Delete non existing ingredient by id")
    @Order(9)
    void deleteByIdNonExistingIngredient()
    {
        assertThatThrownBy(() -> ingredientRepository.deleteById(1000L))
                .isExactlyInstanceOf(EmptyResultDataAccessException.class)
                .hasMessage("No class com.recipes.backend.repo.domain.IngredientDTO entity with id 1000 exists!");
    }
}