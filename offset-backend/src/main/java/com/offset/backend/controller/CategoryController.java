package com.offset.backend.controller;

import com.offset.backend.dto.category.CategoryRequest;
import com.offset.backend.dto.category.CategoryResponse;
import com.offset.backend.service.CategoryService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

import jakarta.validation.Valid;
import com.offset.backend.dto.category.CategoryRequest;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<CategoryResponse>> list() {
        return ResponseEntity.ok(categoryService.getAll());
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','CONTRIBUTOR')")
    public ResponseEntity<CategoryResponse> create(
            @Valid @RequestBody CategoryRequest request) {

        return ResponseEntity
                .status(201)
                .body(categoryService.create(request.getName()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        categoryService.delete(id);
        return ResponseEntity.noContent().build();
    }
}