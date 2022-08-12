package com.example.boardbe;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.lenient;

@ExtendWith(MockitoExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class BoardControllerTest {

    @LocalServerPort
    int port;

    @Autowired
    BoardController controller;

    @Mock
    BoardService service;

    @BeforeEach
    void setup() {
        controller.setService(service);
    }

    @Test
    void createThread() {
        final TestRestTemplate rest = new TestRestTemplate();
        final UUID token = UUID.randomUUID();
        final String title = "some title";
        final String date = "some date";

        String url = "http://localhost:" + port + "/board/createThread?token=" + token + "&title=" + title + "&date=" + date;
        lenient().doNothing().when(service).checkAuthorized(any());
        final ResponseEntity<Void> response = rest.getForEntity(url, Void.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }
//
//    @Test
//    void editThread() {
//    }
//
//    @Test
//    void deleteThread() {
//    }
//
//    @Test
//    void getAllThreads() {
//    }
//
//    @Test
//    void addComment() {
//    }
//
//    @Test
//    void deleteComment() {
//    }
//
//    @Test
//    void editComment() {
//    }
//
//    @Test
//    void commentList() {
//    }
}