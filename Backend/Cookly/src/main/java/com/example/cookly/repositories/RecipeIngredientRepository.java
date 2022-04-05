package com.example.cookly.repositories;

import com.example.cookly.models.dto.RecipeIngredientDTO;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeIngredientRepository  extends PagingAndSortingRepository<RecipeIngredientDTO, Long> {
}
