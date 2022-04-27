package com.example.cookly.models.dto;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "ingredients")
public class IngredientDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long ingredientId;

    @NotNull
    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "ingredient")
    private Set<RecipeIngredientDTO> recipeSet;

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

    public Set<RecipeIngredientDTO> getRecipeSet() {
        return recipeSet;
    }

    public void setRecipeSet(Set<RecipeIngredientDTO> recipeSet) {
        this.recipeSet = recipeSet;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        IngredientDTO that = (IngredientDTO) o;
        return name.equals(that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}
