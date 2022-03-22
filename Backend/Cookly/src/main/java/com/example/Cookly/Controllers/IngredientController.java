package com.example.Cookly.Controllers;

import com.example.Cookly.Models.Ingredient;
import com.example.Cookly.Repositories.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/sessions")
public class IngredientController {

    @Autowired
    private IngredientRepository ingredientRepository;

    @GetMapping
    public List<Ingredient> list() {
        return ingredientRepository.findAll();
    }
}

