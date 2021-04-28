package com.tyagi.backend.models;

public class AuthenticationResponse {
    private final String jwt;
    private String username;

    public AuthenticationResponse(String jwt, String username){
        this.jwt = jwt;
        this.username = username;
    }

    public String getJwt(){
        return jwt;
    }

    public String getUsername(){
        return username;
    }
    
}
