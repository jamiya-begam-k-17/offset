package com.offset.backend.service;

import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.util.ReflectionTestUtils;

import java.nio.file.Files;
import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.*;

class ImageStorageServiceTest {

    @Test
    void storeAcceptsSupportedImageExtensions() throws Exception {
        Path tempDir = Files.createTempDirectory("image-upload-test");
        ImageStorageService service = new ImageStorageService();
        ReflectionTestUtils.setField(service, "uploadDir", tempDir.toString());

        MockMultipartFile file = new MockMultipartFile(
                "file",
                "cover.png",
                "image/png",
                "hello".getBytes()
        );

        String url = service.store(file);

        assertTrue(url.startsWith("/uploads/images/"));
        assertTrue(Files.exists(tempDir.resolve(Path.of(url).getFileName())));
    }

    @Test
    void storeRejectsUnsupportedExtensions() throws Exception {
        ImageStorageService service = new ImageStorageService();
        ReflectionTestUtils.setField(service, "uploadDir", Files.createTempDirectory("image-upload-test").toString());

        MockMultipartFile file = new MockMultipartFile(
                "file",
                "archive.exe",
                "application/octet-stream",
                "bad".getBytes()
        );

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () -> service.store(file));
        assertTrue(ex.getMessage().contains("Only image files"));
    }
}
