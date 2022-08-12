package com.example.userbe;

import com.example.userbe.messages.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/user")
public class UserController {

    private UserService service;

    @Autowired
    public UserController(@NonNull UserService service) {
        this.service = service;
    }

    @GetMapping("/register")
    @CrossOrigin
    public void registerUser(@RequestParam String username, @RequestParam String password) {
        service.registerUser(username, password);
    }

    @GetMapping("/login")
    @CrossOrigin
    public UUID login(@RequestParam String username, @RequestParam String password) {
        return service.loginUser(username, password);
    }

    @GetMapping("/userList")
    @CrossOrigin
    public Iterable<UserAccount> listUsers() {
        return service.userList();
    }

    @GetMapping("/deleteUser")
    @CrossOrigin
    public void deleteUser(Long id) {
        service.deleteUser(id);
    }

    @GetMapping("/sendMessage")
    @CrossOrigin
    public UserAccount sendMessage(@RequestParam UUID token, @RequestParam Long sender, @RequestParam Long receiver,
                                   @RequestParam String date, @RequestParam String body) {
        return service.sendMessage(token, sender, receiver, date, body);
    }

    @GetMapping("/deleteMessage")
    @CrossOrigin
    public void deleteMessage(@RequestParam UUID token, @RequestParam Long receiver, @RequestParam Long id) {
        service.deleteMessage(token, receiver, id);
    }

    @GetMapping("/messageList")
    @CrossOrigin
    public Iterable<Message> messageList(@RequestParam Long id) {
        return service.messageList(id);
    }

    @GetMapping("/isAuthorized")
    @CrossOrigin
    public void isAuthorized(@RequestParam UUID token) {
        service.isAuthorized(token);
    }

    public void setService(UserService service) {
        this.service = service;
    }
}
