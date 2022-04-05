package com.example.cookly.repositories;

import com.example.cookly.models.dto.UserDTO;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface UserRepository extends PagingAndSortingRepository<UserDTO, Long> {

    Optional<UserDTO> findByUsername(String username);
    Optional<UserDTO> findByToken(String token);
}
