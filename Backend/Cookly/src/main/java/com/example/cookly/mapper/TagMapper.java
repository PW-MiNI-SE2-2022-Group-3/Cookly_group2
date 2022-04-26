package com.example.cookly.mapper;


import com.example.cookly.business.recipe.model.RecipeTag;
import com.example.cookly.models.dto.TagDTO;

import java.util.Objects;
import java.util.Optional;

public class TagMapper {
    public static Optional<TagDTO> mapToTagDTO(final RecipeTag recipeTag) {
        if (Objects.nonNull(recipeTag)) {
            final TagDTO tagDTO = new TagDTO();
            tagDTO.setTagId(recipeTag.getId());
            tagDTO.setName(recipeTag.getName());
            return Optional.of(tagDTO);
        }
        return Optional.empty();
    }
}
