package com.example.Cookly.Repositories;

import com.example.Cookly.DTOModels.RecipeDTO;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends PagingAndSortingRepository<RecipeDTO, Long> {
}
