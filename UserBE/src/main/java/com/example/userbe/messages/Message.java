package com.example.userbe.messages;

import com.example.userbe.UserAccount;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @JsonProperty
    Long id;

    @JsonProperty
    Long sender;

    @JsonProperty
    Long receiver;

    @JsonProperty
    String date;

    @JsonProperty
    String body;

    @JsonBackReference
    @ManyToOne
    UserAccount user;

    public Message(Long sender, Long receiver, String date, String body) {
        this.sender = sender;
        this.receiver = receiver;
        this.date = date;
        this.body = body;
    }

    public Message() {

    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Message message = (Message) o;
        return Objects.equals(id, message.id) && Objects.equals(sender, message.sender) && Objects.equals(receiver, message.receiver) && Objects.equals(date, message.date) && Objects.equals(body, message.body) && Objects.equals(user, message.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, sender, receiver, date, body, user);
    }

    @Override
    public String toString() {
        return "Message{" +
                "id=" + id +
                ", sender='" + sender + '\'' +
                ", receiver='" + receiver + '\'' +
                ", date='" + date + '\'' +
                ", body='" + body + '\'' +
                ", user=" + user +
                '}';
    }
}
