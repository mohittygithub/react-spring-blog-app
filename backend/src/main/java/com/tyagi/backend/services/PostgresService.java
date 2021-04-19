package com.tyagi.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import com.tyagi.backend.models.PostgresResponse;
import com.tyagi.backend.models.User;
import com.tyagi.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PostgresService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    BCryptPasswordEncoder encoder;
    
    public PostgresResponse getAllUsers(){
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

    public PostgresResponse findUserById(Integer id){
        try{
            User user = userRepository.findById(id).orElse(null);
            User userToSend = new User();
            userToSend.setName(user.getName());
            userToSend.setUsername(user.getUsername());
            List<Object> objectList = new ArrayList<>();
            objectList.add(userToSend);
            return new PostgresResponse(200, 1 + " record found", true, objectList);
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
                return new PostgresResponse(404, "Email already registered", false, null);
            }else{
                String encodedPassword = encoder.encode(user.getPassword());
                user.setPassword(encodedPassword);
                user.setActive(true);
                user.setRoles("ROLES_USER");
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

    public PostgresResponse updateUserById(User user){
        try{
            User oldUser = userRepository.findById(user.getId()).orElse(null);
            oldUser.setName(user.getName());
            userRepository.save(oldUser);

            List<Object> objectList = new ArrayList<>();
            objectList.add(oldUser);
            return new PostgresResponse(201, "Record updated successfully", true, objectList);
        }catch(Exception ex){
            System.out.println(ex.getMessage());
            ex.printStackTrace();
        }
        return new PostgresResponse();
    }

    public PostgresResponse deleteUserById(Integer id){
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
