package com.example.Cookly.Controllers;

import com.example.Cookly.Models.Ingredient;
import com.example.Cookly.Repositories.IngredientRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ingredients")
public class IngredientController {

    @Autowired
    private IngredientRepository ingredientRepository;

    @GetMapping
    public List<Ingredient> list() {
        return ingredientRepository.findAll();
    }

    @PostMapping
    public Ingredient create(@RequestBody final Ingredient session) {
        System.out.println("pies");
        System.out.println(session.getId());
        System.out.println("pies");

        return ingredientRepository.saveAndFlush(session);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void delete(@PathVariable Long id) {
        ingredientRepository.deleteById(id);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    public Ingredient udpate(@PathVariable Long id, @RequestBody Ingredient ingredient) {

        Ingredient existing_ingredient = ingredientRepository.getById(id);
        BeanUtils.copyProperties(ingredient, existing_ingredient, "id");
        return ingredientRepository.saveAndFlush(existing_ingredient);
    }
}

