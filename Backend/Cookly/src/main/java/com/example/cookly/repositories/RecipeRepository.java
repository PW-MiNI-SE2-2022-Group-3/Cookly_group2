package com.example.cookly.repositories;

import com.example.cookly.models.dto.RecipeDTO;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends PagingAndSortingRepository<RecipeDTO, Long> {
}
