package com.offset.backend.service;

import com.offset.backend.dto.auth.*;
import com.offset.backend.entity.*;
import com.offset.backend.exception.*;
import com.offset.backend.repository.UserRepository;
import com.offset.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public JwtResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());

        return JwtResponse.builder()
                .token(token)
                .username(user.getUsername())
                .displayName(user.getDisplayName())
                .role(user.getRole().name())
                .build();
    }

    // Only reachable by an authenticated ADMIN (enforced in SecurityConfig + controller)
    public void registerContributor(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("Username already taken");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .displayName(request.getDisplayName())
                .role(Role.CONTRIBUTOR)
                .enabled(true)
                .build();

        userRepository.save(user);
    }
}