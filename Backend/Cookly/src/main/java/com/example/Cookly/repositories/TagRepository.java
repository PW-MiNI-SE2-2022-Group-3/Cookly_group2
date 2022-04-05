package com.example.cookly.repositories;


import com.example.cookly.models.dto.TagDTO;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends PagingAndSortingRepository<TagDTO, Long> {
}