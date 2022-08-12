package com.example.userbe;

import com.example.userbe.messages.Message;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static javax.persistence.CascadeType.ALL;

@Entity
public class UserAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @JsonProperty
    Long id;

    @JsonProperty
    String username;

    @JsonProperty
    String password;

    @JsonProperty
    @OneToMany(cascade = ALL)
    List<Message> messages;

    public UserAccount(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public UserAccount(Long id) {
        this.id = id;
        this.messages = new ArrayList<>();
    }

    public UserAccount(String username, String password, List<Message> messages) {
        this.username = username;
        this.password = password;
        this.messages = messages;
    }

    public UserAccount() {

    }

    public void addMessage(Message message){messages.add(message);}

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserAccount that = (UserAccount) o;
        return Objects.equals(id, that.id) && Objects.equals(username, that.username) && Objects.equals(password, that.password) && Objects.equals(messages, that.messages);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, password, messages);
    }

    @Override
    public String toString() {
        return "UserAccount{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", messages=" + messages +
                '}';
    }

    public List<Message> getMessages(){return messages;}
}
