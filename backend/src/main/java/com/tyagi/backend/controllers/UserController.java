package com.tyagi.backend.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.tyagi.backend.models.PostgresResponse;
import com.tyagi.backend.models.User;
import com.tyagi.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
    UserRepository userRepository;

    // getting all users from postgres
    @GetMapping("/")
    public PostgresResponse user(){
        try{
            List<User> allUsers =  userRepository.findAll();
            List<Object> objectList = new ArrayList<>();
            for(User userObject : allUsers){
                objectList.add(userObject);
            }
            PostgresResponse response = new PostgresResponse();
            response.setStatusCode(200);
            response.setMessage(allUsers.size() + " records found");
            response.setSuccess(true);                
            response.setResults(objectList);
            return response;
        }catch(Exception ex){
            System.out.println(ex.getMessage()); 
            ex.printStackTrace();
        }
        return new PostgresResponse();
    }

    // getting a user by id from postgres
    @GetMapping("/{id}")
    public PostgresResponse findUserById(@PathVariable Integer id){
        try{
            User user = userRepository.findById(id).orElse(null);
            User userToSend = new User();
            userToSend.setName(user.getName());
            userToSend.setEmail(user.getEmail());
            List<Object> objectList = new ArrayList<>();
            objectList.add(userToSend);
            return new PostgresResponse(200, 1 + " record found", true, objectList);
        }catch(Exception ex){
            System.out.println(ex.getMessage());
            ex.printStackTrace();
        }
        return new PostgresResponse();
    }

    // saving a new user to postgres
    @PostMapping("/")
    public PostgresResponse addUser(@RequestBody User user){
        if(user.getName() == null || user.getEmail() == null || user.getPassword() == null)
            return new PostgresResponse(404, "Incomplete data recieved", false, null);
        try{
            Optional<User> users = userRepository.findByEmail(user.getEmail());
            if(!users.isEmpty() && users.get() != null){
                return new PostgresResponse(404, "Email already registered", false, null);
            }else{
                //BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
                User newUser = userRepository.save(user);
                List<Object> objectList = new ArrayList<>();
                objectList.add(newUser);
                return new PostgresResponse(201, "Account created successfully.", true,  objectList);
            }
        }catch(Exception ex){
            System.out.println(ex.getMessage());
            ex.printStackTrace();
        }
        return new PostgresResponse();
    }

    // updating a user in postgres
    @PutMapping("/")
    public PostgresResponse updateUser(@RequestBody User user){
        try{
            User oldUser = userRepository.findById(user.getId()).orElse(null);
            oldUser.setName(user.getName());
            oldUser.setEmail(user.getEmail());
            userRepository.save(oldUser);
            User userToSend = new User();
            userToSend.setName(oldUser.getName());
            userToSend.setEmail(oldUser.getEmail());
            List<Object> objectList = new ArrayList<>();
            objectList.add(userToSend);
            return new PostgresResponse(201, "Record updated successfully", true, objectList);
        }catch(Exception ex){
            System.out.println(ex.getMessage());
            ex.printStackTrace();
        }
        return new PostgresResponse();
    }

    // delete a user from postgres
    @DeleteMapping("/{id}")
    public PostgresResponse deleteUser(@PathVariable Integer id){
        try{
            userRepository.deleteById(id);
            return new PostgresResponse(201, "record with id: " + id + " has been deleted", true, null);
        }catch(Exception ex){
            System.out.println(ex.getMessage());
            ex.printStackTrace();
        }
        return new PostgresResponse();
    }
}
