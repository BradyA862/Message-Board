package com.example.boardbe.comment;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface CommentRepository extends CrudRepository<Comment, Long> {

    Optional<Comment> findCommentById(Long id);

    Iterable<Comment> findAllById(Long id);
}
