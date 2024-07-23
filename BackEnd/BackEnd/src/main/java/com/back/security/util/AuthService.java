package com.back.security.util;


import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AuthService {

    public static String getAuthenticatedUserId() {

        Jwt jwt = (Jwt) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
        return jwt.getSubject();  // Este es el Keycloak ID
    }

    public static String getAuthenticatedUsername() {
        Jwt jwt = (Jwt) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();
        return jwt.getClaim("preferred_username");  // Este es el username
    }
}