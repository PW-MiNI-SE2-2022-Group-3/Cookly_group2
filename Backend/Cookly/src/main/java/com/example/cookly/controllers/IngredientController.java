package com.example.cookly.controllers;

import com.example.cookly.business.ingredient.IngredientService;
import com.example.cookly.business.security.SecurityService;
import com.example.cookly.mapper.IngredientMapper;
import com.example.cookly.models.rest.FilterRest;
import com.example.cookly.models.rest.IngredientRest;
import com.example.cookly.models.rest.IngredientsAllRest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/ingredients")
public class IngredientController {

    private final IngredientService ingredientService;
    private final SecurityService securityService;
    @Autowired
    public IngredientController(IngredientService ingredientService, SecurityService securityService) {
        this.ingredientService = ingredientService;
        this.securityService = securityService;
    }

    @PostMapping
    public ResponseEntity<Object> addIngredient(@RequestHeader HttpHeaders headers, @RequestBody @Valid IngredientRest ingredient) {
        ingredientService.addIngredient(IngredientMapper.mapToIngredient(ingredient).orElseThrow());
        return  ResponseEntity.ok().build();
    }

    @PostMapping("/all")
    public ResponseEntity<IngredientsAllRest> getAllIngredients(@RequestHeader HttpHeaders headers,
                                                                @RequestParam(value = "page") int page,
                                                                @RequestParam(value = "limit") int limit,
                                                                @RequestBody(required = false) FilterRest filters) {

        final String nameFilter = Objects.nonNull(filters) ? filters.getName() : null;
        final Set<IngredientRest> ingredients = ingredientService
                .getIngredients(page, limit, nameFilter)
                .stream()
                .map(IngredientMapper::mapToIngredientRest)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toSet());

        final long count = ingredientService.numberOfIngredients();
        return ResponseEntity.ok(new IngredientsAllRest(count, ingredients));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteIngredient(@RequestHeader HttpHeaders headers, @PathVariable(name = "id") Long id) {
        if(ingredientService.deleteIngredient(id))
            return ResponseEntity.ok(id.toString());
        return ResponseEntity.badRequest().body("No ingredient matching this id was found");
    }

    @PutMapping
    public ResponseEntity<Object> updateIngredient(@RequestParam Long id, @RequestBody IngredientRest ingredient) {
        if (ingredientService.editIngredient(IngredientMapper.mapToIngredient(ingredient).orElseThrow(), id))
            return  ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/user")
    public ResponseEntity<IngredientsAllRest> getIngredientsForUser(@RequestHeader HttpHeaders headers,
                                                                    @RequestParam(value = "page") Integer page,
                                                                    @RequestParam(value = "limit") Integer limit) {
        final Set<IngredientRest> ingredients = ingredientService
                .getIngredients(page,limit,null).stream()
                .map(IngredientMapper::mapToIngredientRest)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toSet());
        final long ingredient_count = ingredientService.numberOfIngredients();

        return ResponseEntity.ok(new IngredientsAllRest(ingredient_count, ingredients));
    }

    @GetMapping("/next")
    public ResponseEntity<IngredientsAllRest> getIngredientsNext(@RequestHeader HttpHeaders headers,
                                                                    @RequestParam(value = "page") Integer page,
                                                                    @RequestParam(value = "limit") Integer limit) {
        final Set<IngredientRest> ingredients = ingredientService
                .getIngredients(0,10000,null).stream()
                .map(IngredientMapper::mapToIngredientRest)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toSet());
        Set<IngredientRest> selected = new HashSet<IngredientRest>();
        if (ingredients.isEmpty() == false) {
            for (int i = 0; i < 5; ++i)
                selected.add(getRandomElement(ingredients));
        }
        return ResponseEntity.ok(new IngredientsAllRest(5, selected));
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
