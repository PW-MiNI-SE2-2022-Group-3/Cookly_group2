package com.example.cookly.exceptions;

import org.springframework.http.HttpStatus;

public enum ExceptionTypeEnum {
    NOT_FOUND("Object was not found", HttpStatus.NOT_FOUND),
    DATABASE_INTERNAL("Internal database error occured", HttpStatus.INTERNAL_SERVER_ERROR),
    MAPPER("Invalid object passed to mapper", HttpStatus.FORBIDDEN),
    DATABASE_DUPLICATE("This object is already in the database", HttpStatus.FORBIDDEN);

    private String message;
    private HttpStatus status;

    ExceptionTypeEnum(String str, HttpStatus stat) {
        message = str;
        status = stat;
    }

    public String getMessage() {
        return message;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
