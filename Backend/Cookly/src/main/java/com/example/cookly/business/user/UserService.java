package com.example.cookly.business.user;

import com.example.cookly.business.ingredient.model.Ingredient;
import com.example.cookly.business.user.model.User;
import com.example.cookly.exceptions.models.DatabaseFindException;
import com.example.cookly.exceptions.models.DatabaseSaveException;
import com.example.cookly.exceptions.models.IngredientDuplicateException;
import com.example.cookly.mapper.IngredientMapper;
import com.example.cookly.mapper.UserMapper;
import com.example.cookly.models.dto.IngredientDTO;
import com.example.cookly.models.dto.UserDTO;
import com.example.cookly.repositories.UserRepository;
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
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public void addUser(User user) {
        final Optional<UserDTO> userDTOOptional = UserMapper.mapToUserDTO(user);

        userDTOOptional.ifPresent(
                userDTO -> {
                    try {
                        userRepository.save(userDTO);
                    }
                    catch (final DataIntegrityViolationException e) {
                        throw new IngredientDuplicateException(user.getUsername());
                    }
                    catch (final DataAccessException e) {
                        throw new DatabaseSaveException(user.getUsername());
                    }
                }

        );
    }

    public boolean deleteUser(Long ingredientId) {
        try {
            userRepository.deleteById(ingredientId);
            return true;
        }
        catch (final EmptyResultDataAccessException e) {
            throw new DatabaseSaveException(ingredientId.toString());
        }
    }


    public long numberOfIngredients() {
        try {
            return StreamSupport.stream(userRepository.findAll().spliterator(), false).count();
        }
        catch (final DataAccessException e) {
            throw new DatabaseFindException("user count");
        }
    }


    public Set<User> getUser(Integer page, Integer limit, @Nullable String name) {
        final Predicate<UserDTO> filterByName = ingredient -> (Objects.isNull(name)) || (ingredient.getUsername().contains(name));

        try {
            return StreamSupport.stream(userRepository.findAll().spliterator(), false)
                    .filter(filterByName)
                    .map(UserMapper::mapToUser)
                    .filter(Optional::isPresent)
                    .map(Optional::get)
                    .skip((long) limit * page)
                    .limit(limit).collect(Collectors.toSet());
        }
        catch (final DataAccessException e) {
            throw new DatabaseFindException("full ingredient list");
        }
    }

    public boolean editIngredient(User user, Long id) {
        Optional<UserDTO> old_user;
        try {
            old_user = userRepository.findById(id);
        }catch (final DataAccessException e)
        {
            throw new DatabaseFindException("User to edit");
        }
        try {
            final Optional<UserDTO> new_ingredient = UserMapper.mapToUserDTO(user);

            if (old_user.isPresent()) {
                old_user.get().setUsername(new_ingredient.get().getUsername());
                old_user.get().setPassword(new_ingredient.get().getPassword());
                userRepository.save(old_user.orElse(null));
                return true;
            }
            return false;

        }
        catch (final DataAccessException | NoSuchElementException e) {
            throw new DatabaseSaveException(id.toString());
        }

    }
}
