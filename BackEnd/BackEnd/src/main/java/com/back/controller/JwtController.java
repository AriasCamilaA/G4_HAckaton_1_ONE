package com.back.controller;

import com.back.security.service.impl.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class JwtController {

    private final JwtService jwtService;

    @GetMapping("/token-info")
    @PreAuthorize("permitAll()")
    public ResponseEntity<Map<String, ?>> getTokenInfo(@RequestHeader("Authorization") String authorizationHeader) {

        try {

            String token = authorizationHeader.split(" ")[1];
            Map<String, Object> tokenInfo = jwtService.decodeToken(token);
            return ResponseEntity.ok(tokenInfo);
        } catch (Exception e) {

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid token");
            errorResponse.put("message", "The provided token is invalid or expired.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }
}
