package com.back.controller;

import com.back.config.SwaggerConfig;
import com.back.security.service.IKeyCloudService;
import com.back.security.util.model.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

@Tag(name = "KeyCloud", description = SwaggerConfig.description + " users")
@RestController
@RequestMapping("/api/keycloud")
@RequiredArgsConstructor
@PreAuthorize("hasRole('${swagger.role.admin}')")
@Slf4j
public class KeyCloudController {

    private final IKeyCloudService keyCloudService;

    @PreAuthorize("permitAll()")
    @GetMapping("/users")
    @Operation(
            summary = "Get all users",
            description = "Get all users from the keycloak server"
    )
    public ResponseEntity<?> findAllUsers() {
        return ResponseEntity.ok(keyCloudService.findAllUsers());
    }

    @PreAuthorize("permitAll()")
    @GetMapping("/user/{username}")
    @Operation(
            summary = "Get user by username",
            description = "Get a user by username from the keycloak server"
    )
    public ResponseEntity<UserRepresentation> searchUserByUsername(@PathVariable String username) {
        try {
            UserRepresentation user = keyCloudService.searchUserByUsername(username);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PreAuthorize("permitAll()")
    @PostMapping("/create")
    @Operation(
            summary = "Create user",
            description = "Create a user in the keycloak server"
    )
    public ResponseEntity<?> createUser(@RequestBody User user) throws URISyntaxException {
        String response = keyCloudService.createUser(user);
        return ResponseEntity.created(new URI("/keycloak/user/create")).body(response);
    }

    //    @PreAuthorize("hasRole('${swagger.role.admin}')")
    @PreAuthorize("permitAll()")
    @DeleteMapping("delete/{username}")
    @Operation(
            summary = "Delete user",
            description = "Delete a user from the keycloak server"
    )
    public ResponseEntity<?> deleteUser(@PathVariable String username) {
        try {
            keyCloudService.deleteUser(username);
            return ResponseEntity.ok("User deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting user: " + e.getMessage());
        }
    }

    //    @PreAuthorize("hasRole('${swagger.role.admin}')")
    @PreAuthorize("permitAll()")
    @PutMapping("update/user")
    @Operation(
            summary = "Update user",
            description = "Update a user in the keycloak server"
    )
    public ResponseEntity<?> updateUser(@RequestBody User user) {
        try {
            keyCloudService.updateUser(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating user: " + e.getMessage());
        }
        return ResponseEntity.ok("User updated successfully");

    }

    @PreAuthorize("false")
//    @PutMapping("/user/{username}/role")
    public ResponseEntity<?> changeRole(@PathVariable String username, @RequestParam String role) {
        try {
            keyCloudService.changeRole(username, role);
            return ResponseEntity.ok("Role assigned successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error assigning role: " + e.getMessage());
        }
    }

    @PreAuthorize("false")
//    @PutMapping("update/{idUser}/{password}")
    public ResponseEntity<?> changePassword(@PathVariable String idUser, @PathVariable String password) {
        try {
            keyCloudService.changePassword(idUser, password);
            return ResponseEntity.ok("Password changed successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error changing password: " + e.getMessage());
        }
    }

}
