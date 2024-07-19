package com.back.security.util;

import org.jboss.resteasy.client.jaxrs.internal.ResteasyClientBuilderImpl;
import org.keycloak.KeycloakPrincipal;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.AccessToken;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

@Component
public class KeyCloud {

    private Keycloak keycloakInstance;

    @Value("${keycloak.server-url}")
    private String serverUrl;

    @Value("${keycloak.realm-name}")
    private String realmName;

    @Value("${keycloak.realm-master}")
    private String realmMaster;

    @Value("${keycloak.admin-cli}")
    private String adminCli;

    @Value("${keycloak.user-console}")
    private String userConsole;

    @Value("${keycloak.password-console}")
    private String passwordConsole;

    @Value("${keycloak.client-secret}")
    private String clientSecret;

    @PostConstruct
    public void init() {
        keycloakInstance = KeycloakBuilder.builder()
                .serverUrl(serverUrl)
                .realm(realmMaster)
                .clientId(adminCli)
                .username(userConsole)
                .password(passwordConsole)
                .clientSecret(clientSecret)
                .resteasyClient(new ResteasyClientBuilderImpl()
                        .connectionPoolSize(10)
                        .build())
                .build();
    }

    public RealmResource getRealmResource() {
        try {
            return keycloakInstance.realm(realmName);
        } catch (Exception e) {
            throw new RuntimeException("Failed to get realm resource", e);
        }
    }

    public UsersResource getUserResource() {
        try {
            return getRealmResource().users();
        } catch (Exception e) {
            throw new RuntimeException("Failed to get user resource", e);
        }
    }

    @PreDestroy
    public void close() {
        if (keycloakInstance != null) {
            keycloakInstance.close();
        }
    }

//    public static String getLoggedInUsername() {
//        KeycloakPrincipal<?> principal = (KeycloakPrincipal<?>) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        AccessToken token = principal.getKeycloakSecurityContext().getToken();
//        return token.getPreferredUsername();
//    }

    public String getLoggedInUserId() {
        Jwt jwt = (Jwt) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return jwt.getClaim("sub"); // Suponiendo que el ID del usuario está en el claim "sub"
    }
}
