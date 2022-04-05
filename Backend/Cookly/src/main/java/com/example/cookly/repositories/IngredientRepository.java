package com.example.cookly.repositories;

import com.example.cookly.models.dto.IngredientDTO;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IngredientRepository extends PagingAndSortingRepository<IngredientDTO, Long> {
}
