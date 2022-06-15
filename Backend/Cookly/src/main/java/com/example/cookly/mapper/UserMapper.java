package com.example.cookly.mapper;

import com.example.cookly.business.user.model.User;
import com.example.cookly.models.dto.UserDTO;
import com.example.cookly.models.rest.LoginRest;

import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

public class UserMapper {

    public static Optional<UserDTO> mapToUserDTO(final User user) {
        if (Objects.nonNull(user)) {
            final UserDTO userDTO = new UserDTO();
            userDTO.setUsername(user.getUsername());
            userDTO.setPassword(user.getPassword());
            userDTO.setToken(user.getToken());
            userDTO.setIsAdmin(user.getIs_admin());
            return Optional.of(userDTO);
        }
        return Optional.empty();
    }

    public static  Optional<User> mapToUser(final LoginRest loginRest){
        if (Objects.nonNull(loginRest)){
        final User user = new User();
        user.setUsername(loginRest.getUsername());
        user.setPassword(loginRest.getPassword());
        user.setIs_admin(0);
        user.setToken(UUID.randomUUID().toString());
        return Optional.of(user);
        }
        return Optional.empty();
    }

    public static  Optional<User> mapToUser(final UserDTO loginRest){
        if (Objects.nonNull(loginRest)){
            final User user = new User();
            user.setUsername(loginRest.getUsername());
            user.setPassword(loginRest.getPassword());
            user.setIs_admin(0);
            user.setToken(UUID.randomUUID().toString());
            return Optional.of(user);
        }
        return Optional.empty();
    }

    public static  Optional<LoginRest> mapToUserRest(final User user){
        if (Objects.nonNull(user)){
            final LoginRest login = new LoginRest();
            login.setUsername(user.getUsername());
            login.setPassword(user.getPassword());
            return Optional.of(login);
        }
        return Optional.empty();
    }
}
