package com.tyagi.backend.services;

import java.util.Optional;

import com.tyagi.backend.models.CustomUserDetails;
import com.tyagi.backend.models.User;
import com.tyagi.backend.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService{
    @Autowired
    private UserRepository userRepository;

    @Override
    public CustomUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUsername(username);
        user.orElseThrow(()-> new UsernameNotFoundException("Not found " + username));
        CustomUserDetails userDetails = new CustomUserDetails(user.get());
        return userDetails;
    }

}
