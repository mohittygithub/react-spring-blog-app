package com.tyagi.backend.controllers;


import com.tyagi.backend.models.AuthenticationRequest;
import com.tyagi.backend.models.AuthenticationResponse;
import com.tyagi.backend.models.PostgresResponse;
import com.tyagi.backend.models.User;
import com.tyagi.backend.repositories.UserRepository;
import com.tyagi.backend.services.CustomUserDetailsService;
import com.tyagi.backend.services.PostgresService;
import com.tyagi.backend.utils.JwtUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class UserController {

    @Autowired
    CustomUserDetailsService customUserDetailsService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PostgresService postgresService;

    // Rest API to authenticate the user and return jwt token in response
    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest request) throws Exception{
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken
            (request.getUsername(), request.getPassword()));
        }catch(BadCredentialsException ex){
            System.out.println(ex.getMessage());
            throw new Exception("Incorrect uername or password.", ex);
        }
        final UserDetails userDetails = customUserDetailsService.loadUserByUsername(request.getUsername());
        final String jwt = jwtUtils.generateToken(userDetails);
        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }

    // getting all users from postgres
    @GetMapping("/")
    public PostgresResponse getAllUsers(){
        return postgresService.getAllUsers();
    }

    // getting a user by id from postgres
    @GetMapping("/{id}")
    public PostgresResponse findUserById(@PathVariable Integer id){
        return postgresService.findUserById(id);
    }

    // saving a new user to postgres
    @PostMapping("/register")
    public PostgresResponse createUser(@RequestBody User user){
        if(user.getName() == null || user.getUsername() == null || user.getPassword() == null)
            return new PostgresResponse(404, "Incomplete data recieved", false, null);
        return postgresService.createUser(user);
    }

    // updating a user in postgres
    @PutMapping("/")
    public PostgresResponse updateUserById(@RequestBody User user){
        return postgresService.updateUserById(user);
    }

    // delete a user from postgres
    @DeleteMapping("/{id}")
    public PostgresResponse deleteUserById(@PathVariable Integer id){
       return postgresService.deleteUserById(id);
    }
}
