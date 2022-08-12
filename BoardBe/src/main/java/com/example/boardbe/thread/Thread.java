package com.example.boardbe.thread;

import com.example.boardbe.comment.Comment;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static javax.persistence.CascadeType.ALL;

@Entity
public class Thread {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @JsonProperty
    Long id;

    @JsonProperty
    String title;

    @JsonProperty
    String date;

    @JsonProperty
    String username;

    @JsonProperty
    Long userId;

    @JsonProperty
    @OneToMany(cascade = ALL)
    List<Comment> comments;

    public Thread() {

    }

    public Thread(Long id) {
        this.id = id;
        this.comments = new ArrayList<>();
    }

    public Thread(String title, String date, List<Comment> comments, String username, Long userId) {
        this.title = title;
        this.date = date;
        this.comments = comments;
        this.username = username;
        this.userId = userId;
    }

    public Thread(String title, String date, String username, Long userId) {
        this.title = title;
        this.date = date;
        this.username = username;
        this.userId = userId;
    }

    public void addComment(Comment comment) {
        comments.add(comment);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Thread thread = (Thread) o;
        return Objects.equals(id, thread.id)
                && Objects.equals(title, thread.title)
                && Objects.equals(date, thread.date)
                && Objects.equals(comments, thread.comments)
                && Objects.equals(username, thread.username)
                && Objects.equals(userId, thread.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, date, comments, username);
    }

    @Override
    public String toString() {
        return "Thread{" +
                "Id=" + id +
                ", title='" + title + '\'' +
                ", date='" + date + '\'' +
                ", comments=" + comments + '\'' +
                ", username=" + username + '\'' +
                ", userId=" + userId +
                '}';
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public List<Comment> getComments() {
        return  comments;
    }
}
