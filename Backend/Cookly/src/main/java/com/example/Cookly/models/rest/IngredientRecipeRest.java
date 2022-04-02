package com.example.cookly.models.rest;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Objects;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class IngredientRecipeRest implements Serializable {

    private static final long serialVersionUID = 5628772565713454442L;

    @NotNull
    @JsonProperty(value = "ingredient", required = true)
    private IngredientRest ingredient;

    @NotNull
    @JsonProperty(value = "quantity", required = true)
    private String quantity;

    public IngredientRecipeRest() {
    }

    public IngredientRecipeRest(@NotNull IngredientRest ingredient, @NotNull String quantity) {
        this.ingredient = ingredient;
        this.quantity = quantity;
    }

    public IngredientRest getIngredient() {
        return ingredient;
    }

    public void setIngredient(IngredientRest ingredient) {
        this.ingredient = ingredient;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        IngredientRecipeRest that = (IngredientRecipeRest) o;
        return ingredient.equals(that.ingredient) &&
                quantity.equals(that.quantity);
    }

    @Override
    public int hashCode() {
        return Objects.hash(ingredient, quantity);
    }
}
