package com.tyagi.backend.repositories;



import java.util.List;

import com.tyagi.backend.models.Post;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PostRepository extends JpaRepository<Post, Integer>{
    @Query("SELECT u FROM Post u WHERE u.user.id = :user_id")
    List<Post> findByUserId(int user_id);
}
