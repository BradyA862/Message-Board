package com.example.userbe;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserAccountRepository extends CrudRepository<UserAccount, Long> {
    Optional<UserAccount> findUserAccountById(Long id);

    Optional<UserAccount> findUserAccountByUsername(String username);

    Optional<UserAccount> findByUsernameAndPassword(String username, String password);

    Iterable<UserAccount> findAll();
}
