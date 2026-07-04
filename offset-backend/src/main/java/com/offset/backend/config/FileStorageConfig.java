package com.offset.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class FileStorageConfig implements WebMvcConfigurer {

    @Value("${app.file.upload-dir}")
    private String uploadDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        Path uploadRoot = uploadPath.getParent();
        if (uploadRoot == null) {
            uploadRoot = uploadPath;
        }

        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + uploadRoot.toString() + "/");
    }
}