package com.offset.backend.exception;

public class AccessDeniedCustomException extends RuntimeException {
    public AccessDeniedCustomException(String message) { super(message); }
}