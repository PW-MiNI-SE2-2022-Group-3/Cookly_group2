package com.example.cookly.exceptions.models;

public class DatabaseFindException extends RuntimeException{

    private static final long serialVersionUID = 251448869026285624L;

    public DatabaseFindException(final String missing_type) {
        super(String.format("Database could not find object: %s", missing_type));
    }
}
