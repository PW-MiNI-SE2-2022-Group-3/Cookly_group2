package com.example.cookly.exceptions.models;

public class RecipeEmptyException  extends  RuntimeException{

    private static final long serialVersionUID = 6662249962885156870L;

    public  RecipeEmptyException() {
        super("This recipe has some empty fields");
    }
}
