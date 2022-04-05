package com.example.cookly.controllers;

import com.example.cookly.business.recipe.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/recipe")
public class Recipecontroller {

    private final RecipeService recipeService;

    @Autowired
    public Recipecontroller(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @DeleteMapping
    public ResponseEntity<String> deleteIngredient(@RequestHeader HttpHeaders headers, @RequestParam(value = "id") Long id) {
        if(recipeService.deleteRecipe(id))
            return ResponseEntity.ok(id.toString());
        return ResponseEntity.badRequest().body("No ingredient matching this id was found");
    }
}
