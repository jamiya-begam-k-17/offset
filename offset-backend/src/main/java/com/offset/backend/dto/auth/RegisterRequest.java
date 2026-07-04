package com.offset.backend.dto.auth;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank
    private String username;
    @Email @NotBlank
    private String email;
    @NotBlank @Size(min = 8)
    private String password;
    @NotBlank
    private String displayName;
    // role is intentionally NOT accepted from the client;
    // only an ADMIN-invoked endpoint can create CONTRIBUTOR accounts.
}