package com.example.userbe.messages;

import com.example.userbe.UserAccount;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MessageRepository extends CrudRepository<Message, Long> {

    Optional<Message> findMessageByid(Long id);

    Iterable<Message> findAllByReceiver(Long id);
}
