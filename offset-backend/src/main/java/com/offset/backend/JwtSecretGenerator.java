package com.offset.backend;

import java.security.SecureRandom;

public class JwtSecretGenerator {
    public static void main(String[] args) {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[64]; // 512 bits
        random.nextBytes(bytes);

        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) {
            sb.append(String.format("%02x", b));
        }

        System.out.println(sb);
    }
}