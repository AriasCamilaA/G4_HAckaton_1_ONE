package com.back.security.jwt;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {

    private String refresh_token;
    private String expires_in;
    private String access_token;
    private String token_type;
    private String scope;
    private String session_state;
}
