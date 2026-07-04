package com.offset.backend.controller;

import com.offset.backend.service.ImageStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.Map;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class ImageController {

    private final ImageStorageService imageStorageService;

    @PostMapping("/upload")
    @PreAuthorize("hasAnyRole('CONTRIBUTOR','ADMIN')")
    public ResponseEntity<Map<String, String>> upload(@RequestParam("file") MultipartFile file) {
        String url = imageStorageService.store(file);
        return ResponseEntity.ok(Map.of("url", url));
    }
}