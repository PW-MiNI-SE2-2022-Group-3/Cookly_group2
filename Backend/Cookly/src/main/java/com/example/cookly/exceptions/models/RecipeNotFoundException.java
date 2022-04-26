package com.example.cookly.exceptions.models;

public class RecipeNotFoundException extends RuntimeException{

    private static final long serialVersionUID = -6063057150379788613L;

    public RecipeNotFoundException(final long id) {
        super(String.format("Recipe %d was not found", id));
    }
}
