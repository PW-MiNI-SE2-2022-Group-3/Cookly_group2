package com.example.cookly.exceptions.models;

public class TagNotFoundException extends RuntimeException{

    private static final long serialVersionUID = -7116496180023401488L;

    public TagNotFoundException(final long id) {
        super(String.format("TAG %d was not found", id));
    }
}
