package com.example.userbe;

import com.example.userbe.messages.Message;
import com.example.userbe.messages.MessageRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private final UserAccountRepository userRepository;

    private final MessageRepository messageRepository;

    private final HashMap<UUID, Long> tokenMap;

    @Autowired
    public UserService(@NonNull UserAccountRepository userRepository, @NonNull MessageRepository messageRepository) {
        this.userRepository = userRepository;
        this.messageRepository = messageRepository;
        tokenMap = new HashMap<>();
    }

    public UserService(UserAccountRepository userRepository, MessageRepository messageRepository, HashMap<UUID, Long> tokenMap) {
        this.userRepository = userRepository;
        this.messageRepository = messageRepository;
        this.tokenMap = tokenMap;
    }

    public void isAuthorized(UUID token) {
        if (tokenMap.containsKey(token))
            return;

        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
    }

    public UUID loginUser(String username, String password) {
        var result = userRepository.findByUsernameAndPassword(username, password);
        if (result.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
        final UUID token = UUID.randomUUID();
        tokenMap.put(token, result.get().id);
        return token;
    }

    public void registerUser(String username, String password) {
        if (userRepository.findUserAccountByUsername(username).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        userRepository.save(new UserAccount(username, password));
    }

    public Iterable<UserAccount> userList() {
        return userRepository.findAll();
    }

    public void deleteUser(Long id) {
        var result = userRepository.findUserAccountById(id);
        if (result.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        userRepository.delete(result.get());

    }

    public Iterable<Message> messageList(Long id) {
       Optional<UserAccount> userObj = userRepository.findUserAccountById(id);
       if (userObj.isEmpty()) {
           throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
       } else {
           UserAccount user = userObj.get();
           return user.getMessages();
       }
    }

    public UserAccount sendMessage(UUID token, Long sender, Long receiver, String date, String body) {
        isAuthorized(token);
        if (userRepository.findUserAccountById(receiver).isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        } else {
            Message messageObj = new Message(sender, receiver, date, body);
            Optional<UserAccount> userObj = userRepository.findUserAccountById(receiver);
            UserAccount userAccount = userObj.get();
            userAccount.addMessage(messageObj);
            userRepository.save(userAccount);
            return userAccount;
        }
    }

    public void deleteMessage(UUID token, Long receiver, Long id) {
        isAuthorized(token);
        Optional<UserAccount> userObj = userRepository.findUserAccountById(receiver);
        Optional<Message> messageObj = messageRepository.findMessageByid(id);
        if (messageObj.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        } else {
            UserAccount user = userObj.get();
            Message message = messageObj.get();
            user.getMessages().remove(message);
            userRepository.save(user);
            messageRepository.delete(message);
        }
    }

}
