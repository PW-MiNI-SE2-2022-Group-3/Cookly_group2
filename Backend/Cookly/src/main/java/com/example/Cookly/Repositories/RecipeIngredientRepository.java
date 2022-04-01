package com.example.Cookly.Repositories;

import com.example.Cookly.DTOModels.RecipeIngredientDTO;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeIngredientRepository  extends PagingAndSortingRepository<RecipeIngredientDTO, Long> {
}
