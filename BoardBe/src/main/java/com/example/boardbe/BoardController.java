package com.example.boardbe;

import com.example.boardbe.comment.Comment;
import com.example.boardbe.thread.Thread;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/board")
public class BoardController {

    private BoardService service;

    @Autowired
    public BoardController(@NonNull BoardService service){this.service = service;}

    @GetMapping("/createThread") //fe
    @CrossOrigin
    public void createThread(@RequestParam String title, @RequestParam String date, @RequestParam String username, @RequestParam Long userId) {
        service.createThread(title, date, username, userId);
    }

    @GetMapping("/editThread") //fe
    @CrossOrigin
    public void editThread(@RequestParam UUID token, @RequestParam Long id, @RequestParam String title, @RequestParam String date) {
        service.editThread(token, id, title, date);
    }

    @GetMapping("/deleteThread") //fe
    @CrossOrigin
    public void deleteThread(@RequestParam UUID token, @RequestParam Long id) {
        service.deleteThread(token, id);
    }

    @GetMapping("/threadList") //fe
    @CrossOrigin
    public Iterable<Thread> getAllThreads() {
        return service.getAllThreads();
    }

    @GetMapping("/addComment") //fe
    @CrossOrigin
    public Thread addComment(@RequestParam UUID token, @RequestParam Long id, @RequestParam String username, @RequestParam String date, @RequestParam String body, @RequestParam Long userId) {
        return service.addComment(token, id, username, date, body, userId);
    }

    @GetMapping("/deleteComment") //fe
    @CrossOrigin
    public void deleteComment(@RequestParam UUID token, @RequestParam Long id) {
        service.deleteComment(token, id);
    }

    @GetMapping("/editComment")
    @CrossOrigin
    public void editComment(@RequestParam UUID token, @RequestParam Long id, @RequestParam String body) {
        service.editComment(token, id, body);
    }

    @GetMapping("/commentList") //fe
    @CrossOrigin
    public Iterable<Comment> commentList(@RequestParam Long id) {
        return service.getAllCommentsForThread(id);
    }

    public void setService(BoardService service) {
        this.service = service;
    }
}

