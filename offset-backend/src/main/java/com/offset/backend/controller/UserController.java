package com.offset.backend.controller;

import com.offset.backend.dto.user.UserResponse;
import com.offset.backend.entity.User;
import com.offset.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class UserController {

    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<UserResponse>> list() {
        List<UserResponse> users = userRepository.findAll().stream()
                .map(user -> UserResponse.builder()
                        .id(user.getId())
                        .username(user.getUsername())
                        .email(user.getEmail())
                        .displayName(user.getDisplayName())
                        .role(user.getRole())
                        .enabled(user.isEnabled())
                        .createdAt(user.getCreatedAt())
                        .build())
                .toList();
        return ResponseEntity.ok(users);
    }

    @PatchMapping("/{id}/disable")
    public ResponseEntity<Void> disable(@PathVariable Long id) {
        userRepository.findById(id).ifPresent(u -> {
            u.setEnabled(false);
            userRepository.save(u);
        });
        return ResponseEntity.noContent().build();
    }
}