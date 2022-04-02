package com.example.Cookly.restModels;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Objects;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class IngredientRest implements Serializable {

    static final long serialVersionUID = 4L; 
            
    @NotNull
    @JsonProperty(value = "id")
    private Long id;

    @NotNull
    @JsonProperty(value = "name", required = true)
    private String name;

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

    @Override
    public boolean equals(Object object) {
        if (this == object)
            return true;
        if (object == null || getClass() != object.getClass())
            return false;
        IngredientRest ingredient = (IngredientRest) object;
        return name.equals(ingredient.name);
    }
    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}
