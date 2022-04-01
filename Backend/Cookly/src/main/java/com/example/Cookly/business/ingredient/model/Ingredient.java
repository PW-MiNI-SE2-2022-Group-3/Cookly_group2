package com.example.Cookly.business.ingredient.model;

import java.util.Objects;

public class Ingredient {
    private long ingredientId;
    private String name;
    private String quantity;

    public long getIngredientId() {
        return ingredientId;
    }

    public void setIngredientId(long ingredientId) {
        this.ingredientId = ingredientId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    @Override
    public boolean equals(Object object) {
        if (this == object)
            return true;
        if (object == null || getClass() != object.getClass())
            return false;
        Ingredient ingredient = (Ingredient) object;
        return name.equals(ingredient.name);
    }
    @Override
    public int hashCode() {
        return Objects.hash(name);
    }

}
