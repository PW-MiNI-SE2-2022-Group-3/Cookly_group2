package com.example.cookly.models.rest;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Objects;
import java.util.Set;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class RecipeRest implements Serializable {

    private static final long serialVersionUID = 6493888107212854767L;

    @NotNull
    @JsonProperty("id")
    private Long id;

    @NotNull
    @JsonProperty(value = "name", required = true)
    private String name;

    @NotNull
    @JsonProperty(value = "instructions", required = true)
    private String instructions;

    @NotNull
    @JsonProperty(value = "ingredients", required = true)
    private Set<IngredientRecipeRest> ingredients;

    @NotNull
    @JsonProperty(value = "tags", required = true)
    private Set<String> tags;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public Set<IngredientRecipeRest> getIngredients() {
        return ingredients;
    }

    public void setIngredients(Set<IngredientRecipeRest> ingredients) {
        this.ingredients = ingredients;
    }

    public Set<String> getTags() {
        return tags;
    }

    public void setTags(Set<String> tags) {
        this.tags = tags;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RecipeRest that = (RecipeRest) o;
        return name.equals(that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}
