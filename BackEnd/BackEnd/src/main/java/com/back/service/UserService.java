package com.back.service;

import com.back.model.entities.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface UserService {

    User createUser(User user);

    Optional<User> getUserById(Long id);

    List<User> getAllUsers();

    User updateUser(String idKeyCloak, User userDetails);

    void deleteUser(Long id);

    User findByIdKeycloak(String idKeycloak);

    void deleteByIdKeycloak(String idKeycloak);

    User findByName(String name);


}
