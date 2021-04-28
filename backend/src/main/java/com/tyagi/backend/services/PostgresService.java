package com.tyagi.backend.services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.tyagi.backend.models.Post;
import com.tyagi.backend.models.PostgresResponse;
import com.tyagi.backend.models.User;
import com.tyagi.backend.repositories.PostRepository;
import com.tyagi.backend.repositories.UserRepository;
import com.tyagi.backend.utils.BackendUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PostgresService {

    @Autowired
    UserRepository userRepository;

     @Autowired
    PostRepository postRepository;

    @Autowired
    BCryptPasswordEncoder encoder;

    @Autowired
    BackendUtils backendUtils;
    

    /* user related methods */
    public PostgresResponse getAllUsers(){
        try{
            List<? extends Object> allUsers =  userRepository.findAll();
            return new PostgresResponse(0, 201, allUsers.size() + " records found", true, allUsers);
        }catch(Exception ex){
            System.out.println(ex.getMessage()); 
            ex.printStackTrace();
        }
        return new PostgresResponse();
    }

    public PostgresResponse findUserByUsername(String username){
        try{
            User user = userRepository.findByUsername(username).orElse(null);
            user.setPassword("");
            List<Object> objectList = new ArrayList<>();
            objectList.add(user);
            return new PostgresResponse(user.getId(), 200, 1 + " record found", true, objectList);
        }catch(Exception ex){
            System.out.println(ex.getMessage());
            ex.printStackTrace();
        }
        return new PostgresResponse();
    }

    public PostgresResponse createUser(User user){
        try{
            Optional<User> users = userRepository.findByUsername(user.getUsername());
            if(!users.isEmpty() && users.get() != null){
                return new PostgresResponse(0, 404, "Email already registered", false, null);
            }else{
                String encodedPassword = encoder.encode(user.getPassword());
                user.setPassword(encodedPassword);
                user.setActive(true);
                user.setRoles("ROLES_USER");
                User newUser = userRepository.save(user);
                return new PostgresResponse(newUser.getId(), 201, "Account created successfully.", true,  null);
            }
        }catch(Exception ex){
            System.out.println(ex.getMessage());
            ex.printStackTrace();
        }
        return new PostgresResponse();
    }

    public PostgresResponse updateUserById(User user){
        try{
            User oldUser = userRepository.findById(user.getId()).orElse(null);
            if(oldUser != null)
                userRepository.save(oldUser);

            List<Object> objectList = new ArrayList<>();
            objectList.add(oldUser);
            return new PostgresResponse(oldUser.getId(), 201, "Record updated successfully", true, objectList);
        }catch(Exception ex){
            System.out.println(ex.getMessage());
            ex.printStackTrace();
        }
        return new PostgresResponse();
    }

    public PostgresResponse deleteUserById(Integer id){
         try{
            userRepository.deleteById(id);
            return new PostgresResponse(id, 201, "record with id: " + id + " has been deleted", true, null);
        }catch(Exception ex){
            System.out.println(ex.getMessage());
            ex.printStackTrace();
        }
        return new PostgresResponse();
    }

    /* post related methods */
    public PostgresResponse getAllPosts(){
        try{
            List<? extends Object> posts = postRepository.findAll();
            return new PostgresResponse(0, 201, posts.size() + " records found", true, posts);
        }catch(Exception ex){
            System.out.println(ex.getMessage());
            ex.printStackTrace();
        }
        return new PostgresResponse();
    }

    /* posts by username */
    public PostgresResponse getPostsByUsername(String request) throws JsonParseException, JsonMappingException, IOException{
        ObjectNode nodes = backendUtils.getRequestNodes(request);
        String username = nodes.get("username").asText();
        int userId = 0;

        try{
            Optional<User> users = userRepository.findByUsername(username);
            if(!users.isEmpty() && users.get() != null){
                userId = users.get().getId();
            }
            
            List<?extends Object> myPosts = postRepository.findByUserId(userId);
            return new PostgresResponse(userId, 201, myPosts.size() + " records found", true, myPosts);
            //return null;
        }catch(Exception ex){
            System.err.println("Error => " + ex.getMessage());
            ex.printStackTrace();
        }
        return new PostgresResponse();

    }

    public PostgresResponse createPost(Post post, String username){
        // System.out.println("username => " + username);
        try{
            Optional<User> users = userRepository.findByUsername(username);
            User user = users.get();
            post.setUser(user);
            Post savedPost = postRepository.save(post);
            return new PostgresResponse(savedPost.getId(), 201, "Post created successfully", true, null);
        }catch(Exception ex){
            System.out.println("error => " + ex.getMessage());
            ex.printStackTrace();
        }
        return new PostgresResponse();
    }
}
