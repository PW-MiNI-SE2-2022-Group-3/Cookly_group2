package com.example.cookly.controllers;

import com.example.cookly.business.user.UserService;
import com.example.cookly.mapper.IngredientMapper;
import com.example.cookly.mapper.UserMapper;
import com.example.cookly.models.rest.IngredientRest;
import com.example.cookly.models.rest.LoginRest;
import com.example.cookly.models.rest.UsersAllRest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
public class UserController{

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@RequestHeader HttpHeaders headers, @PathVariable(name = "id") Long id) {
        if(userService.deleteUser(id))
            return ResponseEntity.ok(id.toString());
        return ResponseEntity.badRequest().body("No user matching this id was found");
    }
    @GetMapping()
    public ResponseEntity<UsersAllRest> getUsersForAdmin(@RequestHeader HttpHeaders headers,
                                                              @RequestParam(value = "page") Integer page,
                                                              @RequestParam(value = "limit") Integer limit) {
        final Set<LoginRest> ingredients = userService
                .getUser(page,limit,null).stream()
                .map(UserMapper::mapToUserRest)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toSet());
        final long count = userService.numberOfIngredients();

        return ResponseEntity.ok(new UsersAllRest(count, ingredients));
    }

    @PutMapping
    public ResponseEntity<Object> updateIngredient(@RequestParam Long id, @RequestBody LoginRest user) {
        if (userService.editIngredient(UserMapper.mapToUser(user).orElseThrow(), id))
            return  ResponseEntity.ok().build();
        return ResponseEntity.badRequest().build();
    }
}