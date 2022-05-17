package com.example.cookly.controllers;

import com.example.cookly.business.recipe.RecipeService;
import com.example.cookly.exceptions.models.RecipeEmptyException;
import com.example.cookly.mapper.IngredientMapper;
import com.example.cookly.mapper.RecipeMapper;
import com.example.cookly.models.rest.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/recipes")
public class Recipecontroller {

    private final RecipeService recipeService;

    @Autowired
    public Recipecontroller(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteIngredient(@RequestHeader HttpHeaders headers, @PathVariable(value = "id") Long id) {
        if(recipeService.deleteRecipe(id))
            return ResponseEntity.ok(id.toString());
        return ResponseEntity.badRequest().body("No ingredient matching this id was found");
    }

    @PostMapping("/all")
    public ResponseEntity<RecipeAllRest> getAllRecipes(@RequestHeader HttpHeaders headers,
                                                           @RequestParam(value = "page") int page,
                                                           @RequestParam(value = "limit") int limit,
                                                           @RequestBody(required = false) FilterRest filters) {

        final String nameFilter = Objects.nonNull(filters) ? filters.getName() : null;
        final Set<String> tagFilter = Objects.nonNull(filters) ? filters.getTags() : null;
        final Set<RecipeRest> recipes = recipeService
                .getAllRecipes(page, limit, nameFilter, tagFilter).stream()
                .map(RecipeMapper::mapToRecipeRest)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toSet());

        final long count = recipeService.getRecipesCount();
        return ResponseEntity.ok(new RecipeAllRest(count, recipes));
    }

    @PostMapping
    public ResponseEntity<Object> addRecipe(@RequestHeader HttpHeaders headers, @RequestBody @Valid RecipeRest recipe) {

        recipeService.addRecipe(RecipeMapper.mapToRecipe(recipe).orElseThrow());
        return  ResponseEntity.ok().build();
    }

    @PutMapping
    public ResponseEntity<Object> updateRecipe(@RequestHeader HttpHeaders headers, @RequestBody RecipeRest recipe) {

        recipeService.updateRecipe(RecipeMapper.mapToRecipe(recipe).orElseThrow(RecipeEmptyException::new));
        return  ResponseEntity.ok().build();
    }
}
