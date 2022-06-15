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
import java.util.*;
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

    @GetMapping("/user")
    public ResponseEntity<RecipeAllRest> getRecipeToUser(@RequestHeader HttpHeaders headers,
                                                                 @RequestParam(value = "page") Integer page,
                                                                 @RequestParam(value = "limit") Integer limit) {
        final Set<RecipeRest> recipes = recipeService
                .getAllRecipes(0,10000,null, null).stream()
                .map(RecipeMapper::mapToRecipeRest)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toSet());
        Set<RecipeRest> selected = new HashSet<RecipeRest>();
        if (recipes.isEmpty() == false) {
                selected.add(getRandomElement(recipes));
        }
        return ResponseEntity.ok(new RecipeAllRest(1, selected));
    }

    private static <E>
    E getRandomElement(Set<? extends E> set)
    {

        Random random = new Random();

        // Generate a random number using nextInt
        // method of the Random class.
        int randomNumber = random.nextInt(set.size());

        Iterator<? extends E> iterator = set.iterator();

        int currentIndex = 0;
        E randomElement = null;

        // iterate the HashSet
        while (iterator.hasNext()) {

            randomElement = iterator.next();

            // if current index is equal to random number
            if (currentIndex == randomNumber)
                return randomElement;

            // increase the current index
            currentIndex++;
        }

        return randomElement;
    }
}
