package com.example.Cookly.DTOModels;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "tags")
public class TagDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long tagId;

    @NotNull
    @Column(name = "name")
    private String name;

    @ManyToMany(mappedBy = "tagSet")
    private Set<RecipeDTO> recipeSet;

    public long getTagId() {
        return tagId;
    }

    public void setTagId(long tagId) {
        this.tagId = tagId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<RecipeDTO> getRecipeSet() {
        return recipeSet;
    }

    public void setRecipeSet(Set<RecipeDTO> recipeSet) {
        this.recipeSet = recipeSet;
    }
}
