package com.example.cookly.business.recipe.model;

import java.util.Arrays;

public enum RecipeTag {
    VEGETARIAN(1,"vegetarian"),
    GLUTEN_FREE(2, "gluten free"),
    LOW_CALORIE(3, "low lactose"),
    NO_LACTOSE(4, "no lactose");


    private final long id;
    private  final String name;

    RecipeTag(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public static  RecipeTag fingById(final long id) {
        return Arrays
                .stream(RecipeTag.values())
                .filter(tag -> tag.id == id)
                .findFirst()
                .orElse(null);
    }

    public static  RecipeTag fingByName(final String name) {
        return Arrays
                .stream(RecipeTag.values())
                .filter(tag -> tag.name == name)
                .findFirst()
                .orElse(null);
    }
}
