package com.offset.backend.service;

import com.offset.backend.dto.article.*;
import com.offset.backend.entity.*;
import com.offset.backend.exception.*;
import com.offset.backend.mapper.ArticleMapper;
import com.offset.backend.repository.*;
import com.offset.backend.util.SlugUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.Instant;

@Service
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final ArticleMapper articleMapper;

    
    
    @Transactional(readOnly = true)
    public Page<ArticleSummaryResponse> getPublishedArticles(
            String categorySlug,
            String search,
            Pageable pageable) {

            return articleRepository
        .findByStatusOrderByPublishedAtDesc(
                ArticleStatus.PUBLISHED,
                pageable
        )
        .map(articleMapper::toSummary);

    //     return articleRepository
    //             .search(ArticleStatus.PUBLISHED, pageable)
    //             .map(articleMapper::toSummary);
    }

    //---------------

    // public Page<ArticleSummaryResponse> getPublishedArticles(String categorySlug, String search, Pageable pageable) {
    //     return articleRepository
    //             .search(ArticleStatus.PUBLISHED, categorySlug, search, pageable)
    //             .map(articleMapper::toSummary);
    // }


    @Transactional(readOnly = true)
    public ArticleResponse getBySlug(String slug) {
        Article article = articleRepository.findBySlugAndStatus(slug, ArticleStatus.PUBLISHED)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found: " + slug));
        return articleMapper.toResponse(article);
    }

    @Transactional(readOnly = true)
    public Page<ArticleSummaryResponse> getMyArticles(Authentication auth, Pageable pageable) {
        User user = currentUser(auth);
        return articleRepository.findByAuthorId(user.getId(), pageable).map(articleMapper::toSummary);
    }

    @Transactional(readOnly = true)
    public Page<ArticleSummaryResponse> getAllForAdmin(Pageable pageable) {
        return articleRepository.findAll(pageable).map(articleMapper::toSummary);
    }

    @Transactional
    public ArticleResponse createArticle(ArticleRequest request, Authentication auth) {
        User author = currentUser(auth);
        Category category = resolveCategory(request.getCategoryId());

        String slug = SlugUtil.uniqueSlug(request.getTitle(), articleRepository::existsBySlug);

        Article article = Article.builder()
                .title(request.getTitle())
                .slug(slug)
                .summary(request.getSummary())
                .markdownContent(request.getMarkdownContent())
                .coverImageUrl(request.getCoverImageUrl())
                .category(category)
                .author(author)
                .status(request.getStatus() == null ? ArticleStatus.DRAFT : request.getStatus())
                .build();

        if (article.getStatus() == ArticleStatus.PUBLISHED) {
            article.setPublishedAt(Instant.now());
        }

        return articleMapper.toResponse(articleRepository.save(article));
    }

    @Transactional
    public ArticleResponse updateArticle(Long id, ArticleRequest request, Authentication auth) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found: " + id));

        assertOwnerOrAdmin(article, auth);

        article.setTitle(request.getTitle());
        article.setSummary(request.getSummary());
        article.setMarkdownContent(request.getMarkdownContent());
        article.setCoverImageUrl(request.getCoverImageUrl());
        article.setCategory(resolveCategory(request.getCategoryId()));

        if (request.getStatus() != null && request.getStatus() != article.getStatus()) {
            article.setStatus(request.getStatus());
            if (request.getStatus() == ArticleStatus.PUBLISHED && article.getPublishedAt() == null) {
                article.setPublishedAt(Instant.now());
            }
        }

        return articleMapper.toResponse(articleRepository.save(article));
    }

    @Transactional
    public void deleteArticle(Long id, Authentication auth) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found: " + id));
        assertOwnerOrAdmin(article, auth);
        articleRepository.delete(article);
    }

    // --- helpers ---

    private void assertOwnerOrAdmin(Article article, Authentication auth) {
        User user = currentUser(auth);
        boolean isAdmin = user.getRole() == Role.ADMIN;
        boolean isOwner = article.getAuthor().getId().equals(user.getId());
        if (!isAdmin && !isOwner) {
            throw new AccessDeniedCustomException("You do not have permission to modify this article.");
        }
    }

    private User currentUser(Authentication auth) {
        String username = auth.getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + username));
    }

    private Category resolveCategory(Long categoryId) {
        if (categoryId == null) return null;
        return categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found: " + categoryId));
    }
}