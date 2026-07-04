package com.offset.backend.seeder;

import com.offset.backend.entity.Role;
import com.offset.backend.entity.User;
import com.offset.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        // Skip if an admin already exists
        if (userRepository.existsByRole(Role.ADMIN)) {
            return;
        }

        User admin = User.builder()
                .username("admin")
                .email("admin@offset.dev")
                .displayName("Admin")
                .password(passwordEncoder.encode("ChangeMe123"))
                .role(Role.ADMIN)
                .enabled(true)
                .build();

        userRepository.save(admin);

        System.out.println("✅ Default admin account created.");
    }
}
