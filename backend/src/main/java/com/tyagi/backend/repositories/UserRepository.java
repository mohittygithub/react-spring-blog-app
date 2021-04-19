package com.tyagi.backend.repositories;



import java.util.Optional;

import com.tyagi.backend.models.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer>{
    Optional<User> findByUsername(String username);
}
