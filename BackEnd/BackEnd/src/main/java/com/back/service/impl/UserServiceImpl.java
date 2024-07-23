package com.back.service.impl;

import com.back.model.entities.User;
import com.back.repository.UserRepository;
import com.back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User updateUser(String idKeyCloak, User userDetails) {
        User userAux =  userRepository.findByIdKeycloak(idKeyCloak);
                userAux.setName(userDetails.getName());
                userAux.setRoles(userDetails.getRoles());
                userAux.setEmail(userDetails.getEmail());
        return userRepository.save(userAux);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User findByIdKeycloak(String idKeycloak) {
        return userRepository.findByIdKeycloak(idKeycloak);
    }

    @Override
    public void deleteByIdKeycloak(String idKeycloak) {
        userRepository.deleteByIdKeycloak(idKeycloak);
    }

    @Override
    public User findByName(String name) {
        return userRepository.findByName(name);
    }

}