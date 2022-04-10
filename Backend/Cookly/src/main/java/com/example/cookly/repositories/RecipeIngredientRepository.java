package com.example.cookly.repositories;

import com.example.cookly.models.dto.RecipeIngredientDTO;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeIngredientRepository  extends PagingAndSortingRepository<RecipeIngredientDTO, Long> {
    @Modifying
    @Query(value = "insert into recipe_ingredient (recipe_id, ingredient_id, quantity) values (:recipeId, ingredientId, :quantity", nativeQuery = true )
    void addIngredientForRecipe(@Param("recipeId") long recipeId,
                                @Param("ingredientId") long ingredientId,
                                @Param("quantity") String quantity);

    @Modifying
    @Query(value = " delete from recipe_ingredient where recipe_id = :recipeId", nativeQuery = true)
    void deleteAllByRecipeId(@Param("recipeId") Long recipeId);
}
