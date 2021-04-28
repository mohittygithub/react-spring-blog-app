package com.tyagi.backend.controllers;

import java.io.IOException;
import java.security.Principal;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.tyagi.backend.models.Post;
import com.tyagi.backend.models.PostgresResponse;
import com.tyagi.backend.services.PostgresService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/api/posts")
public class PostController {
    
   @Autowired
    PostgresService postgresService;

    // GET API to get all posts
    @GetMapping("")
    public PostgresResponse getAllPosts(){
        return postgresService.getAllPosts();
    }

    // GET API to get posts by username
    @PostMapping("/my")
    public PostgresResponse getPostsByUsername(@RequestBody String request) throws JsonParseException, JsonMappingException, IOException{
        return postgresService.getPostsByUsername(request);
    }

    // POST API to save a new post
    @PostMapping("")
    public PostgresResponse createPost(@RequestBody Post post, Principal principal){
        return postgresService.createPost(post, principal.getName());
    }
}
