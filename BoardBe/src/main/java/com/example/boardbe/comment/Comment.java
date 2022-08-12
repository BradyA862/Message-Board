package com.example.boardbe.comment;

import com.example.boardbe.thread.Thread;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @JsonProperty
    Long id;

    @JsonProperty
    String username;

    @JsonProperty
    Long userId;

    @JsonProperty
    String date;

    @JsonProperty
    String body;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "comment_id")
    Thread thread;

    public Comment(String username, String date, String body, Long userId) {
        this.username = username;
        this.date = date;
        this.body = body;
        this.userId = userId;
    }

    public Comment() {

    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Comment comment = (Comment) o;
        return Objects.equals(id, comment.id)
                && Objects.equals(username, comment.username)
                && Objects.equals(date, comment.date)
                && Objects.equals(body, comment.body)
                && Objects.equals(thread, comment.thread)
                && Objects.equals(userId, comment.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, date, body, thread, userId);
    }

    @Override
    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", userId='" + userId + '\'' +
                ", date='" + date + '\'' +
                ", body='" + body + '\'' +
                ", thread=" + thread +
                '}';
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }
}
