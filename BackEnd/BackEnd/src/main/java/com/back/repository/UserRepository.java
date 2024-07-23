package com.back.repository;

import com.back.model.entities.User;
import org.springframework.transaction.annotation.Transactional;

public interface UserRepository extends IGenericRepo<User, Long> {

    User findByIdKeycloak(String idKeycloak);

    @Transactional
    void deleteByIdKeycloak(String idKeycloak);

    User findByName(String name);
}
