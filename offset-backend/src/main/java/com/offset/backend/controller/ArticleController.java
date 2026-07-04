package com.offset.backend.controller;

import com.offset.backend.dto.article.*;
import com.offset.backend.service.ArticleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    @GetMapping
    public ResponseEntity<Page<ArticleSummaryResponse>> list(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(articleService.getPublishedArticles(category, search, pageable));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ArticleResponse> getBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(articleService.getBySlug(slug));
    }

    @GetMapping("/mine")
    @PreAuthorize("hasAnyRole('CONTRIBUTOR','ADMIN')")
    public ResponseEntity<Page<ArticleSummaryResponse>> myArticles(
            Authentication auth,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(articleService.getMyArticles(auth, PageRequest.of(page, size)));
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Page<ArticleSummaryResponse>> adminArticles(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(articleService.getAllForAdmin(PageRequest.of(page, size)));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('CONTRIBUTOR','ADMIN')")
    public ResponseEntity<ArticleResponse> create(@Valid @RequestBody ArticleRequest request,
                                                    Authentication auth) {
        return ResponseEntity.status(201).body(articleService.createArticle(request, auth));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('CONTRIBUTOR','ADMIN')")
    public ResponseEntity<ArticleResponse> update(@PathVariable Long id,
                                                    @Valid @RequestBody ArticleRequest request,
                                                    Authentication auth) {
        return ResponseEntity.ok(articleService.updateArticle(id, request, auth));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('CONTRIBUTOR','ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id, Authentication auth) {
        articleService.deleteArticle(id, auth);
        return ResponseEntity.noContent().build();
    }
}