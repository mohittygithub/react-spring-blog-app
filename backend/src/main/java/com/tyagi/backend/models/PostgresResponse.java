package com.tyagi.backend.models;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostgresResponse {
    
    private int statusCode;
    private String message;
    private boolean success;
    private List<Object> results;
}
