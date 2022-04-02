package com.example.cookly.models.dto;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "recipes")
public class RecipeDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;

    @NotNull
    @Column(name = "name")
    private String name;

    @NotNull
    @Column(name = "instruction")
    private String instruction;

    @ManyToMany
    @JoinTable(
            name = "recipe_tag",
            joinColumns = @JoinColumn( name = "recipe_id"),
            inverseJoinColumns = @JoinColumn( name = "tag_id")
    )
    private Set<TagDTO> tagSet;

    @OneToMany(mappedBy = "recipe")
    private Set<RecipeIngredientDTO> ingredientSet;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getInstruction() {
        return instruction;
    }

    public void setInstruction(String instruction) {
        this.instruction = instruction;
    }

    public Set<TagDTO> getTagSet() {
        return tagSet;
    }

    public void setTagSet(Set<TagDTO> tagSet) {
        this.tagSet = tagSet;
    }

    public Set<RecipeIngredientDTO> getIngredientSet() {
        return ingredientSet;
    }

    public void setIngredientSet(Set<RecipeIngredientDTO> ingredientSet) {
        this.ingredientSet = ingredientSet;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RecipeDTO recipeDTO = (RecipeDTO) o;
        return name.equals(recipeDTO.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}
