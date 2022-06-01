package com.example.cookly.controllers;



import com.example.cookly.business.user.UserService;
import com.example.cookly.business.user.model.User;
import com.example.cookly.mapper.UserMapper;
import com.example.cookly.models.rest.LoginRest;
import com.example.cookly.models.rest.TokenRest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.Optional;

import static jdk.internal.net.http.common.Log.logHeaders;


@RestController
@RequestMapping("/register")
public class RegisterController {

    private final UserService userService;

    public RegisterController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping
    public ResponseEntity<Object> register(@RequestHeader HttpHeaders headers,
                                              @RequestBody @Valid LoginRest loginForm) {


        Optional<User> userOptional = UserMapper.mapToUser(loginForm);
        if (userOptional.isPresent())
        {
            userService.addUser(userOptional.get());
        }

            return ResponseEntity.ok().build();
    }
}