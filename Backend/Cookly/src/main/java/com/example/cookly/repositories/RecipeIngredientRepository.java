package com.example.cookly.repositories;

import com.example.cookly.models.dto.RecipeIngredientDTO;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface RecipeIngredientRepository  extends PagingAndSortingRepository<RecipeIngredientDTO, Long> {


  @Query(value = "insert into ingredient_recipe (recipe_id, ingredient_id, quantity) values (:recipeId, :ingredientId, :quantity)", nativeQuery = true )
  void addIngredientForRecipe(@Param("recipeId") long recipeId,
                                @Param("ingredientId") long ingredientId,
                                @Param("quantity") String quantity);

    @Modifying
    @Query(value = " delete from ingredient_recipe where recipe_id = :recipeId", nativeQuery = true)
    void deleteAllByRecipeId(@Param("recipeId") Long recipeId);
}
