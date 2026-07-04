package com.offset.backend.dto.auth;

import lombok.*;

@Data
@Builder
public class JwtResponse {
    private String token;
    private String username;
    private String displayName;
    private String role;
}