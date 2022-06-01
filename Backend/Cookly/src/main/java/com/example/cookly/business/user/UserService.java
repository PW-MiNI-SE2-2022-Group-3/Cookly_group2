package com.example.cookly.business.user;

import com.example.cookly.business.ingredient.model.Ingredient;
import com.example.cookly.business.user.model.User;
import com.example.cookly.exceptions.models.DatabaseSaveException;
import com.example.cookly.exceptions.models.IngredientDuplicateException;
import com.example.cookly.mapper.IngredientMapper;
import com.example.cookly.mapper.UserMapper;
import com.example.cookly.models.dto.IngredientDTO;
import com.example.cookly.models.dto.UserDTO;
import com.example.cookly.repositories.UserRepository;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public void addUser(User user) {
        final Optional<UserDTO> userDTOOptional = UserMapper.mapToIngredientDTO(user);

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
}
