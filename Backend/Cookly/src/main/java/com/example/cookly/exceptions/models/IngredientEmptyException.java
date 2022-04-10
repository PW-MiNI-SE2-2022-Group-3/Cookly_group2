package com.example.cookly.exceptions.models;

public class IngredientEmptyException extends RuntimeException {

    private static final long serialVersionUID = 439334683412611221L;

    public IngredientEmptyException()
    {
        super(String.format("Object that was passed has empty fields"));
    }
}
