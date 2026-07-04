package com.offset.backend.dto.user;

import com.offset.backend.entity.Role;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Data
@Builder
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private String displayName;
    private Role role;
    private boolean enabled;
    private Instant createdAt;
}
