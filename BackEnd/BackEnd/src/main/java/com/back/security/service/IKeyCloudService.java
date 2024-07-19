package com.back.security.service;

import com.back.security.jwt.JwtResponse;
import com.back.security.util.model.User;
import org.keycloak.representations.idm.UserRepresentation;

import java.util.List;

public interface IKeyCloudService {

    List<UserRepresentation> findAllUsers();
    UserRepresentation searchUserByUsername(String username);
    String createUser(User user);
    JwtResponse login(String username, String password);
    void deleteUser(String username);
    void updateUser(User user);
    void changeRole(String username, String role);
    void changePassword(String idUser, String password);
    void changeEmail(String username, String email);
}
