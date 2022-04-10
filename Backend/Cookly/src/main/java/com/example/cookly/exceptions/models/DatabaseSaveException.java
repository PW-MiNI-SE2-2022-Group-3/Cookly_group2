package com.example.cookly.exceptions.models;

public class DatabaseSaveException extends RuntimeException {

    private static final long serialVersionUID = -3721184178215877919L;

    public DatabaseSaveException(final long id) {
        super(String.format("Database could not save object with id: %d", id));
    }
}
