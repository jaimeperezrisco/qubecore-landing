package com.qubecore.dto;

import java.util.Map;

public record ApiErrorResponse(String error, Map<String, String> fieldErrors) {
    public ApiErrorResponse(String error) {
        this(error, Map.of());
    }
}
