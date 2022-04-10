package com.example.cookly.exceptions.models;

public class IngredientWithoutQuantityException extends RuntimeException{

    private static final long serialVersionUID = -8638356001889050777L;

    public IngredientWithoutQuantityException(final String name) {
        super(String.format("Object %s does not have specified quantity", name));
    }
}
