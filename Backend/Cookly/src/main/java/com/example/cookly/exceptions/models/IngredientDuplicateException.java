package com.example.cookly.exceptions.models;

public class IngredientDuplicateException extends RuntimeException {

    private static final long serialVersionUID = 275228098204280259L;

    public IngredientDuplicateException(final String name) {
        super(String.format("Object %s is already in the database", name));
    }
}
