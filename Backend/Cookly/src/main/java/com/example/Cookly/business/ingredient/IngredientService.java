package com.example.Cookly.business.ingredient;

import com.example.Cookly.Repositories.IngredientRepository;
import com.example.Cookly.business.ingredient.model.Ingredient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;


@Service
public class IngredientService implements IngredientServiceInterface{


    private final IngredientRepository ingredientRepository;

    @Autowired
    public IngredientService(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    @Override
    public void addIngredient(Ingredient ingredient) {

    }

    @Override
    public boolean deleteIngredient(Long ingredientId) {
        return false;
    }

    @Override
    public long numberOfIngredients() {
        return 0;
    }

    @Override
    public Set<Ingredient> getIngredients(Integer page, Integer limit) {
        return null;
    }
}
