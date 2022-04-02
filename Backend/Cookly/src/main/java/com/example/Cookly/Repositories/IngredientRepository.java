package com.example.Cookly.Repositories;

import com.example.Cookly.models.DTOModels.IngredientDTO;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IngredientRepository extends PagingAndSortingRepository<IngredientDTO, Long> {
}
