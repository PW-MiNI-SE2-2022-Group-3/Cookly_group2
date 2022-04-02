package com.example.Cookly.models.restModels;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Objects;
import java.util.Set;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class IngredientsAllRest implements Serializable {

    private static final long serialVersionUID = 6161110348988050953L;
    @NotNull
    @JsonProperty(value = "no_of_ingredients", required = true)
    private long ingredient_count;

    @NotNull
    @JsonProperty(value = "ingredients", required = true)
    private Set<IngredientRest> ingredients;

    public IngredientsAllRest(final long count, final Set<IngredientRest> _ingredients) {
        ingredient_count = count;
        ingredients = _ingredients;
    }

    public long getIngredient_count() {
        return ingredient_count;
    }

    public void setIngredient_count(long ingredient_count) {
        this.ingredient_count = ingredient_count;
    }

    public Set<IngredientRest> getIngredients() {
        return ingredients;
    }

    public void setIngredients(Set<IngredientRest> ingredients) {
        this.ingredients = ingredients;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        IngredientsAllRest that = (IngredientsAllRest) o;
        return ingredient_count == that.ingredient_count &&
                Objects.equals(ingredients, that.ingredients);
    }

    @Override
    public int hashCode() {
        return Objects.hash(ingredient_count, ingredients);
    }
}
