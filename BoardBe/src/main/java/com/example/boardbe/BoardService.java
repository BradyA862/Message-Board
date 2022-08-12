package com.example.boardbe;

import com.example.boardbe.comment.Comment;
import com.example.boardbe.comment.CommentRepository;
import com.example.boardbe.thread.Thread;
import com.example.boardbe.thread.ThreadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;
import java.util.UUID;

@Service
public class BoardService {

    private final ThreadRepository threadRepository;
    private final CommentRepository commentRepository;
    private final RestTemplate rest;

    @Autowired
    public BoardService(@NonNull ThreadRepository threadRepository, @NonNull CommentRepository commentRepository) {
        this.threadRepository = threadRepository;
        this.commentRepository = commentRepository;
        rest = new RestTemplate();
    }

    public BoardService(RestTemplate rest, ThreadRepository threadRepository, CommentRepository commentRepository) {
        this.threadRepository = threadRepository;
        this.commentRepository = commentRepository;
        this.rest = rest;
    }

    public void checkAuthorized(UUID token) {
        String url = "http://localhost:8080/user/isAuthorized?token=" + token;
        final ResponseEntity<Void> response = rest.getForEntity(url, Void.class);

        switch (response.getStatusCode()) {
            case OK:
                return;

            case UNAUTHORIZED:
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);

            default:
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public void createThread(String title, String date, String username, Long userId) {
//        checkAuthorized(token);
        threadRepository.save(new Thread(title, date, username, userId));
    }

    public void editThread(UUID token, Long id, String title, String date) {
        checkAuthorized(token);
        Optional<Thread> findThread = threadRepository.findThreadById(id);
        if (findThread.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        } else {
            Thread currentThread = findThread.get();
            currentThread.setTitle(title);
            currentThread.setDate(date);
            threadRepository.save(currentThread);
        }
    }

    public void deleteThread(UUID token, Long id) {
        checkAuthorized(token);
        Optional<Thread> thread = threadRepository.findThreadById(id);
        if (thread.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        } else {
            Thread currentThread = thread.get();
            threadRepository.delete(currentThread);
        }
    }

    public Iterable<Thread> getAllThreads() {
        return threadRepository.findAll();
    }

    public Thread addComment(UUID token, Long id, String username, String date, String body, Long userId) {
        checkAuthorized(token);
        Optional<Thread> threadOptional = threadRepository.findThreadById(id);
        if (threadOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        } else {
            Comment commentObj = new Comment(username, date, body, userId);
            Thread thread = threadOptional.get();
            thread.addComment(commentObj);
            threadRepository.save(thread);
            return thread;
        }

    }

    public void deleteComment(UUID token, Long id) {
        checkAuthorized(token);
        Optional<Comment> commentOptional = commentRepository.findCommentById(id);
        Optional<Thread> threadOptional = threadRepository.findThreadByCommentsId(id);
        if (commentOptional.isEmpty() || threadOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        } else {
            Thread thread = threadOptional.get();
            Comment comment = commentOptional.get();
            thread.getComments().remove(comment);
            threadRepository.save(thread);
            commentRepository.delete(comment);
        }
    }


    public void editComment(UUID token, Long id, String body) {
        checkAuthorized(token);
        Optional<Comment> commentOptional = commentRepository.findCommentById(id);
        if (commentOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        } else {
            Comment comment = commentOptional.get();
            comment.setBody(body);
            commentRepository.save(comment);
        }
    }

    public Iterable<Comment> getAllCommentsForThread(Long id) {
        Optional<Thread> threadOptional = threadRepository.findThreadById(id);
        if (threadOptional.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        } else {
            Thread thread = threadOptional.get();
            return thread.getComments();
        }


    }


}
