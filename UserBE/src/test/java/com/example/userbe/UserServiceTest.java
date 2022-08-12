package com.example.userbe;

import com.example.userbe.messages.Message;
import com.example.userbe.messages.MessageRepository;
import org.apache.catalina.User;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

import static org.mockito.AdditionalMatchers.not;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @InjectMocks
    @Spy
    UserService service;

    @Mock
    UserAccountRepository userAccountRepository;

    @Mock
    MessageRepository messageRepository;

    @Mock
    HashMap<UUID, Long> tokenMap;

    @Test
    void it_Should_Return_Unauth_When_Is_Authorized_Without_Token(){
        final UUID token = UUID.randomUUID();
        when(tokenMap.containsKey(token)).thenReturn(false);
        assertThrows(ResponseStatusException.class, () -> service.isAuthorized(token));
    }

    @Test
    void it_Should_Return_When_Is_Authorized_With_Token(){
        final UUID token = UUID.randomUUID();
        when(tokenMap.containsKey(token)).thenReturn(true);
        assertDoesNotThrow(() -> service.isAuthorized(token));
    }

    @Test
    void it_Should_Return_Unauth_When_Username_Is_Wrong() {
        final String username = "username";
        final String password = "password";
        lenient().when(userAccountRepository.findByUsernameAndPassword(username, password))
                .thenReturn(Optional.empty());
        lenient().when(userAccountRepository.findByUsernameAndPassword(not(eq(username)), eq(password)))
                .thenReturn(Optional.of(new UserAccount()));
        assertThrows(ResponseStatusException.class, () -> service.loginUser(username, password));
    }

    @Test
    void it_Should_Return_Unauth_When_Password_Is_Wrong() {
        final String username = "username";
        final String password = "password";
        lenient().when(userAccountRepository.findByUsernameAndPassword(username, password))
                .thenReturn(Optional.empty());
        lenient().when(userAccountRepository.findByUsernameAndPassword(eq(username), not(eq(password))))
                .thenReturn(Optional.of(new UserAccount()));
        assertThrows(ResponseStatusException.class, () -> service.loginUser(username, password));
    }

    @Test
    void it_Should_Map_UUID_To_Id_When_Login_Success() {
        final String username = "username";
        final String password = "password";
        final Long id = (long) (Math.random() * 9999999);
        final UserAccount expected = new UserAccount();
        expected.id = id;
        expected.username = username;
        expected.password = password;
        when(userAccountRepository.findByUsernameAndPassword(username, password))
                .thenReturn(Optional.of(expected));
        ArgumentCaptor<UUID> captor = ArgumentCaptor.forClass(UUID.class);
        when(tokenMap.put(captor.capture(), eq(id))).thenReturn(0L);
        final UUID token = service.loginUser(username, password);
        assertEquals(token, captor.getValue());
    }

    @Test
    void it_Should_Save_New_User_When_Username_Is_Unique() {
        final String username = "username";
        final String password = "password";
        when(userAccountRepository.findUserAccountByUsername(username)).thenReturn(Optional.empty());
        ArgumentCaptor<UserAccount> captor = ArgumentCaptor.forClass(UserAccount.class);
        when(userAccountRepository.save(captor.capture())).thenReturn(new UserAccount(username, password));
        assertDoesNotThrow(() -> service.registerUser(username, password));
        assertEquals(new UserAccount(username, password), captor.getValue());
    }

    @Test
    void it_Should_Throw_When_Username_Is_Not_Unique() {
        final String username = "username";
        final String password = "password";
        when(userAccountRepository.findUserAccountByUsername(username))
                .thenReturn(Optional.of(new UserAccount(username, password)));
        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> service.registerUser(username, password));
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    void it_Should_Return_All_Users() {
        final ArrayList<UserAccount> users = new ArrayList<>();
        users.add(new UserAccount());
        users.add(new UserAccount());
        users.add(new UserAccount());
        users.add(new UserAccount());
        when(userAccountRepository.findAll()).thenReturn(users);
        assertEquals(users, service.userList());
    }

    @Test
    void it_Should_Return_All_Messages_For_Receiver() {
        final Long id = 5L;
        final ArrayList<Message> messages = new ArrayList<>();
        messages.add(new Message());
        messages.add(new Message());
        messages.add(new Message());
        messages.add(new Message());
        when(userAccountRepository.findUserAccountById(id)).thenReturn(Optional.of(
                new UserAccount("brady", "mypass", messages)));
        assertEquals(messages, service.messageList(id));
    }

    @Test
    void it_Should_Save_New_Message() {
        final UUID token = UUID.randomUUID();
        final Long sender = 1L;
        final Long receiver = 2L;
        final String date = "date";
        final String body = "body";
        final List<Message> messages = new ArrayList<>();
        messages.add(new Message());
        messages.add(new Message());
        messages.add(new Message());
        final UserAccount user = new UserAccount("brady", "mypass", messages);
        doNothing().when(service).isAuthorized(any());
        when(userAccountRepository.findUserAccountById(receiver)).thenReturn(Optional.of(user));
        ArgumentCaptor<UserAccount> captor = ArgumentCaptor.forClass(UserAccount.class);
        when(userAccountRepository.save(captor.capture())).thenReturn(user);
        assertDoesNotThrow(() -> service.sendMessage(token, sender, receiver, date, body));
        assertEquals(user, captor.getValue());
    }

    @Test
    void it_Should_Delete_Message_When_Id_Present() {
        final UUID token = UUID.randomUUID();
        final Long receiver = 0L;
        final Long id = 1L;
        final List<Message> messages = new ArrayList<>();
        messages.add(new Message());
        messages.add(new Message());
        messages.add(new Message());
        final Message message = new Message(9L, 0L, "date", "body");
        final UserAccount user = new UserAccount("brady", "mypass", messages);
        doNothing().when(service).isAuthorized(any());
        when(messageRepository.findMessageByid(id)).thenReturn(Optional.of(message));
        when(userAccountRepository.findUserAccountById(receiver)).thenReturn(Optional.of(user));
        user.addMessage(message);
        assertDoesNotThrow(() -> service.deleteMessage(token, receiver, id));
    }

    @Test
    void it_Should_Throw_On_Delete_Message_When_Id_Not_Present() {
        final UUID token = UUID.randomUUID();
        final Long receiver = 0L;
        final Long id = 1L;
        doNothing().when(service).isAuthorized(any());
        when(messageRepository.findMessageByid(id)).thenReturn(Optional.empty());
        when(userAccountRepository.findUserAccountById(receiver)).thenReturn(Optional.empty());
        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> service.deleteMessage(token, receiver, id));
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

}