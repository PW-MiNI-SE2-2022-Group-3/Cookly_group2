package com.example.cookly.business.ingredient;

import com.example.cookly.business.ingredient.model.Ingredient;
import com.example.cookly.business.recipe.model.Recipe;
import com.example.cookly.exceptions.models.DatabaseFindException;
import com.example.cookly.exceptions.models.DatabaseSaveException;
import com.example.cookly.exceptions.models.IngredientDuplicateException;
import com.example.cookly.mapper.IngredientMapper;
import com.example.cookly.models.dto.IngredientDTO;
import com.example.cookly.repositories.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.function.Predicate;
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
                      catch (final DataIntegrityViolationException e) {
                       throw new IngredientDuplicateException(ingredient.getName());
                      }
                      catch (final DataAccessException e) {
                          throw new DatabaseSaveException(ingredient.getName());
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
        catch (final EmptyResultDataAccessException e) {
            throw new DatabaseSaveException(ingredientId.toString());
        }
    }

    @Override
    public long numberOfIngredients() {
        try {
            return StreamSupport.stream(ingredientRepository.findAll().spliterator(), false).count();
        }
        catch (final DataAccessException e) {
            throw new DatabaseFindException("ingredient count");
        }
    }

    @Override
    public Set<Ingredient> getIngredients(Integer page, Integer limit, @Nullable String name) {
        final Predicate<IngredientDTO> filterByName = ingredient -> (Objects.isNull(name)) || (ingredient.getName().contains(name));

        try {
            return StreamSupport.stream(ingredientRepository.findAll().spliterator(), false)
                    .filter(filterByName)
                    .map(IngredientMapper::mapToIngredient)
                    .filter(Optional::isPresent)
                    .map(Optional::get)
                    .skip((long) limit * page)
                    .limit(limit).collect(Collectors.toSet());
        }
        catch (final DataAccessException e) {
            throw new DatabaseFindException("full ingredient list");
        }
    }

    @Override
    public boolean editIngredient(Ingredient ingredient, Long id) {
        Optional<IngredientDTO> old_ingredient;
        try {
             old_ingredient = ingredientRepository.findById(id);
        }catch (final DataAccessException e)
        {
            throw new DatabaseFindException("ingredient to edit");
        }
        try {
            final Optional<IngredientDTO> new_ingredient = IngredientMapper.mapToIngredientDTO(ingredient);

            if (old_ingredient.isPresent()) {
                old_ingredient.get().setName(new_ingredient.get().getName());
                ingredientRepository.save(old_ingredient.orElse(null));
                return true;
            }
            return false;

        }
        catch (final DataAccessException | NoSuchElementException e) {
            throw new DatabaseSaveException(id.toString());
        }

    }
    @Override
    public boolean isIngredientMissing(final long id) {return ingredientRepository.findById(id).isEmpty();}
}
