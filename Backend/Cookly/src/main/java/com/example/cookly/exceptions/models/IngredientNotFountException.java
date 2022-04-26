package com.example.cookly.exceptions.models;



public class IngredientNotFountException extends RuntimeException {

    private static final long serialVersionUID = 4152695579644161470L;

    public IngredientNotFountException(final long id) {
        super(String.format("Ingredient with id %d does not exist", id));
    }
}
