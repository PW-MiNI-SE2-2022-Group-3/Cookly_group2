package com.example.cookly.exceptions;

import com.example.cookly.exceptions.models.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    private ResponseEntity<Object> handleException(final ExceptionTypeEnum exceptionTypeEnum, final Exception exception, final WebRequest request) {
        exception.printStackTrace();
        return handleExceptionInternal(exception,
                exceptionTypeEnum.getMessage(),
                new HttpHeaders(),
                exceptionTypeEnum.getStatus(),
                request);
    }

    @ExceptionHandler(IngredientDuplicateException.class)
    protected ResponseEntity<Object> handleForbiddenException(final IngredientDuplicateException e, final WebRequest request) {
        final  ExceptionTypeEnum exceptionTypeEnum = ExceptionTypeEnum.DATABASE_DUPLICATE;
        return handleException(exceptionTypeEnum, e, request);
    }

    @ExceptionHandler(IngredientEmptyException.class)
    protected ResponseEntity<Object> handleForbiddenException(final IngredientEmptyException e, final WebRequest request) {
        final  ExceptionTypeEnum exceptionTypeEnum = ExceptionTypeEnum.MAPPER;
        return handleException(exceptionTypeEnum, e, request);
    }

    @ExceptionHandler(IngredientWithoutQuantityException.class)
    protected ResponseEntity<Object> handleForbiddenException(final IngredientWithoutQuantityException e, final WebRequest request) {
        final  ExceptionTypeEnum exceptionTypeEnum = ExceptionTypeEnum.MAPPER;
        return handleException(exceptionTypeEnum, e, request);
    }

    @ExceptionHandler(DatabaseFindException.class)
    protected ResponseEntity<Object> handleForbiddenException(final DatabaseFindException e, final WebRequest request) {
        final  ExceptionTypeEnum exceptionTypeEnum = ExceptionTypeEnum.DATABASE_INTERNAL;
        return handleException(exceptionTypeEnum, e, request);
    }

    @ExceptionHandler(DatabaseSaveException.class)
    protected ResponseEntity<Object> handleForbiddenException(final DatabaseSaveException e, final WebRequest request) {
        final  ExceptionTypeEnum exceptionTypeEnum = ExceptionTypeEnum.DATABASE_INTERNAL;
        return handleException(exceptionTypeEnum, e, request);
    }

    @ExceptionHandler(IngredientNotFountException.class)
    protected ResponseEntity<Object> handleForbiddenException(final IngredientNotFountException e, final WebRequest request) {
        final  ExceptionTypeEnum exceptionTypeEnum = ExceptionTypeEnum.NOT_FOUND;
        return handleException(exceptionTypeEnum, e, request);
    }
}
