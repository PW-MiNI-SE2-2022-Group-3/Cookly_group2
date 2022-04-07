package com.example.cookly.business.ingredient;

import com.example.cookly.models.dto.IngredientDTO;
import com.example.cookly.repositories.IngredientRepository;
import com.example.cookly.business.ingredient.model.Ingredient;
import com.example.cookly.mapper.IngredientMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


@Service
public class IngredientService implements IngredientServiceInterface{


    private final IngredientRepository ingredientRepository;

    @Autowired
    public IngredientService(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    @Override
    public void addIngredient(Ingredient ingredient) {
        final Optional<IngredientDTO> ingredientDTOOptional = IngredientMapper.mapToIngredientDTO(ingredient);

          ingredientDTOOptional.ifPresent(
                  ingredientDTO -> {
                      try {
                          ingredientRepository.save(ingredientDTO);
                      }
                      catch (final Exception e) {
                       throw e;
                      }
                  }

          );
    }

    @Override
    public boolean deleteIngredient(Long ingredientId) {
        try {
            ingredientRepository.deleteById(ingredientId);
            return true;
        }
        catch (final Exception e) {
            return false;
        }
    }

    @Override
    public long numberOfIngredients() {
        try {
            return StreamSupport.stream(ingredientRepository.findAll().spliterator(), false).count();
        }
        catch (final Exception e) {
            throw e;
        }
    }

    @Override
    public Set<Ingredient> getIngredients(Integer page, Integer limit) {
        try {
            return StreamSupport.stream(ingredientRepository.findAll().spliterator(), false)
                    .map(IngredientMapper::mapToIngredient)
                    .filter(Optional::isPresent)
                    .map(Optional::get)
                    .skip((long) limit * page)
                    .limit(limit).collect(Collectors.toSet());
        }
        catch (final Exception e) {
            throw e;
        }
    }

    @Override
    public boolean editIngredient(Ingredient ingredient, Long id) {
        try {
            final Optional<IngredientDTO> new_ingredient = IngredientMapper.mapToIngredientDTO(ingredient);
            final Optional<IngredientDTO> old_ingredient = ingredientRepository.findById(id);
            if (old_ingredient.isPresent()) {
                old_ingredient.get().setName(new_ingredient.get().getName());
                ingredientRepository.save(old_ingredient.orElse(null));
                return true;
            }
            return false;

        }
        catch (final Exception e) {
            throw e;
        }

    }
}