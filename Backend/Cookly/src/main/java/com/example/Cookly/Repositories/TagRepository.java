package com.example.Cookly.Repositories;


import com.example.Cookly.DTOModels.TagDTO;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends PagingAndSortingRepository<TagDTO, Long> {
}