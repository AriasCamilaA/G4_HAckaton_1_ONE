package com.back.controller;

import com.back.security.jwt.JwtRequest;
import com.back.security.jwt.JwtResponse;
import com.back.security.service.IKeyCloudService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Login", description = "Authorization of login, username and password")
@RestController
@RequestMapping("/api/keycloud")
@RequiredArgsConstructor
public class LoginController {

    private final IKeyCloudService iKeyCloudService;
    @Operation(
            summary = "Login User",
            description = "Authenticate a user and return the authentication token along with user details."
    )
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody JwtRequest request) throws Exception {
        try {
            String name = request.getUsername();
            String password = request.getPassword();
            JwtResponse jwtResponse = iKeyCloudService.login(name, password);
            return ResponseEntity.ok(jwtResponse);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

}
