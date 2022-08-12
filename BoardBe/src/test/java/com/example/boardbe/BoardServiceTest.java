package com.example.boardbe;

import com.example.boardbe.comment.Comment;
import com.example.boardbe.comment.CommentRepository;
import com.example.boardbe.thread.Thread;
import com.example.boardbe.thread.ThreadRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BoardServiceTest {

    @InjectMocks
    @Spy
    BoardService service;

    @Mock
    RestTemplate rest;

    @Mock
    ThreadRepository threadRepository;

    @Mock
    CommentRepository commentRepository;

    @Test
    void it_Should_Throw_Unauth_When_No_Token() {
        final UUID token = UUID.randomUUID();
        String url = "http://localhost:8080/user/isAuthorized?token=" + token;
        when(rest.getForEntity(url, Void.class))
                .thenReturn(new ResponseEntity<>(HttpStatus.UNAUTHORIZED));
        final ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> service.checkAuthorized(token));
        assertEquals(HttpStatus.UNAUTHORIZED, exception.getStatus());
    }

    @Test
    void it_Should_Throw_Int_Con_When_Error() {
        final UUID token = UUID.randomUUID();
        String url = "http://localhost:8080/user/isAuthorized?token=" + token;
        when(rest.getForEntity(url, Void.class))
                .thenReturn(new ResponseEntity<>(HttpStatus.CONFLICT));
        final ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> service.checkAuthorized(token));
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, exception.getStatus());
    }

    @Test
    void it_Should_Not_Throw_When_Token() {
        final UUID token = UUID.randomUUID();
        String url = "http://localhost:8080/user/isAuthorized?token=" + token;
        when(rest.getForEntity(url, Void.class))
                .thenReturn(new ResponseEntity<>(HttpStatus.OK));
        assertDoesNotThrow(() -> service.checkAuthorized(token));
    }

    @Test
    void it_Should_Save_New_Thread() {
        final UUID token = UUID.randomUUID();
        final String title = "some title";
        final String date = "some date";
        final String username = "some username";
        final Long userId = 0L;
        lenient().doNothing().when(service).checkAuthorized(any());
        ArgumentCaptor<Thread> captor = ArgumentCaptor.forClass(Thread.class);
        when(threadRepository.save(captor.capture())).thenReturn(new Thread(title, date, username, userId));
        assertDoesNotThrow(() -> service.createThread(title, date, username, userId));
        assertEquals(new Thread(title, date, username, userId), captor.getValue());
    }

    @Test
    void it_Should_Save_Thread_with_Edits() {
        final UUID token = UUID.randomUUID();
        final Long id = 1321311L;
        final String title = "edited title";
        final String date = "edited date";
        final String username = "some username";
        final Long userId = 0L;
        Thread expectedThread = new Thread(title, date, username, userId);
        doNothing().when(service).checkAuthorized(any());
        when(threadRepository.findThreadById(id)).thenReturn(Optional.of(new Thread("some title", "some date", "some username", 0L)));
        ArgumentCaptor<Thread> captor = ArgumentCaptor.forClass(Thread.class);
        when(threadRepository.save(captor.capture())).thenReturn(new Thread(title, date, username, userId));
        assertDoesNotThrow(() -> service.editThread(token, id, title, date));
        assertEquals(expectedThread, captor.getValue());
    }

    @Test
    void Edit_Thread_Should_Throw_When_Id_Not_Found() {
        final UUID token = UUID.randomUUID();
        final Long id = 1321311L;
        final String title = "edited title";
        final String date = "edited date";
        doNothing().when(service).checkAuthorized(any());
        when(threadRepository.findThreadById(id)).thenReturn(Optional.empty());
        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> service.editThread(token, id, title, date));
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    void it_Should_Not_Throw_When_Delete_Thread() {
        final UUID token = UUID.randomUUID();
        final Long id = 0L;
        doNothing().when(service).checkAuthorized(any());
        when(threadRepository.findThreadById(id)).thenReturn(Optional.of(new Thread("some title", "some date", "some username", 0L)));
        assertDoesNotThrow(() -> service.deleteThread(token, id));
    }

    @Test
    void Delete_Thread_Should_Throw_When_Id_Not_Found() {
        final UUID token = UUID.randomUUID();
        final Long id = 0L;
        doNothing().when(service).checkAuthorized(any());
        when(threadRepository.findThreadById(id)).thenReturn(Optional.empty());
        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> service.deleteThread(token, id));
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    void it_Should_Return_All_Threads() {
        final ArrayList<Thread> threads = new ArrayList<>();
        threads.add(new Thread());
        threads.add(new Thread());
        threads.add(new Thread());
        threads.add(new Thread());
        when(threadRepository.findAll()).thenReturn(threads);
        assertEquals(threads, service.getAllThreads());
    }

//    @Test
//    void it_Should_Return_All_Comments_For_Thread() {
//        final Long id = 0L;
//        final ArrayList<Comment> comments = new ArrayList<>();
//        comments.add(new Comment());
//        comments.add(new Comment());
//        comments.add(new Comment());
//        comments.add(new Comment());
//        when(threadRepository.findThreadById(id)).thenReturn(Optional.of(new Thread()));
//        when()
//        assertEquals(comments, service.getAllCommentsForThread(id));
//    }

    @Test
    void Delete_Comment_Should_Not_Throw_When_Id_Present() {
        final Long id = 0L;
        final UUID token = UUID.randomUUID();
        final List<Comment> comments = new ArrayList<>();
        comments.add(new Comment());
        comments.add(new Comment());
        comments.add(new Comment());
        final Comment comment = new Comment("username", "date", "body", 1L);
        final Thread thread = new Thread("title", "date", comments, "username", 1L);
        doNothing().when(service).checkAuthorized(any());
        when(commentRepository.findCommentById(id)).thenReturn(Optional.of(comment));
        when(threadRepository.findThreadByCommentsId(id)).thenReturn(Optional.of(thread));
        thread.addComment(comment);
        assertDoesNotThrow(() -> service.deleteComment(token, id));

    }

    @Test
    void Delete_Comment_Should_Throw_When_Id_Not_Present() {
        final Long id = 0L;
        final UUID token = UUID.randomUUID();
        doNothing().when(service).checkAuthorized(any());
        when(commentRepository.findCommentById(id)).thenReturn(Optional.empty());
        when(threadRepository.findThreadByCommentsId(id)).thenReturn(Optional.empty());
        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> service.deleteComment(token, id));
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    void it_Should_Save_New_Comment() {
        final Long id = 0L;
        final UUID token = UUID.randomUUID();
        final String username = "username";
        final String date = "date";
        final String body = "body";
        final Long userId = 1L;
        final List<Comment> comments = new ArrayList<>();
        comments.add(new Comment());
        comments.add(new Comment());
        comments.add(new Comment());
        final Thread thread = new Thread("title", "date", comments, "username", 1L);
        doNothing().when(service).checkAuthorized(any());
        when(threadRepository.findThreadById(id)).thenReturn(Optional.of(thread));
        ArgumentCaptor<Thread> captor = ArgumentCaptor.forClass(Thread.class);
        when(threadRepository.save(captor.capture())).thenReturn(thread);
        assertDoesNotThrow(() -> service.addComment(token, id, username, date, body, userId));
        assertEquals(thread, captor.getValue());
    }

    @Test
    void Add_Comment_Should_Throw_When_Thread_Id_Not_Found() {
        final Long id = 0L;
        final UUID token = UUID.randomUUID();
        final String username = "username";
        final String date = "date";
        final String body = "body";
        final Long userId = 1L;
        doNothing().when(service).checkAuthorized(any());
        when(threadRepository.findThreadById(id)).thenReturn(Optional.empty());
        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> service.addComment(token, id, username, date, body, userId));
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    void Edit_Comment_Should_Throw_When_Id_Not_Present() {
        final Long id = 0L;
        final UUID token = UUID.randomUUID();
        final String body = "body";
        doNothing().when(service).checkAuthorized(any());
        when(commentRepository.findCommentById(id)).thenReturn(Optional.empty());
        ResponseStatusException exception = assertThrows(ResponseStatusException.class,
                () -> service.editComment(token, id, body));
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    void Edit_Comment_Should_Not_Throw_When_Id_Present() {
        final Long id = 0L;
        final UUID token = UUID.randomUUID();
        final String username = "username";
        final String date = "date";
        final String body = "body";
        final Long userId = 1L;
        Comment expectedComment = new Comment("user", "oldDate", "oldBody", 3L);
        doNothing().when(service).checkAuthorized(any());
        when(commentRepository.findCommentById(id)).thenReturn(Optional.of(expectedComment));
        ArgumentCaptor<Comment> captor = ArgumentCaptor.forClass(Comment.class);
        when(commentRepository.save(captor.capture())).thenReturn(new Comment(username, date, body, userId));
        assertDoesNotThrow(() -> service.editComment(token, id, body));
        assertEquals(expectedComment, captor.getValue());

    }
}