package com.example.boardbe.thread;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ThreadRepository extends CrudRepository<Thread, Long> {

    Optional<Thread> findThreadById(Long id);

    Optional<Thread> findThreadByCommentsId(Long id);

    Iterable<Thread> findAll();
}
