package com.example.cookly.security;

import com.example.cookly.models.dto.UserDTO;
import com.example.cookly.models.rest.LoginRest;
import com.example.cookly.models.rest.TokenRest;
import com.example.cookly.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {

    private final UserRepository userRepository;

    @Autowired
    public LoginService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<String> loginToSystem(final LoginRest credentials) {

        Optional<UserDTO> userDTOOptional = userRepository.findByUsername(credentials.getUsername());
        System.out.println("Michal bug hunt: "+ userDTOOptional.get().getUsername());
        if (userDTOOptional.isEmpty()) return Optional.empty();
        if (!userDTOOptional.get().getPassword().equals(credentials.getPassword())) return Optional.empty();

        return userDTOOptional.map(UserDTO::getToken);
    }


    public TokenRest registerUser(LoginRest loginForm) {
        return new TokenRest("you are registered");
    }
}
