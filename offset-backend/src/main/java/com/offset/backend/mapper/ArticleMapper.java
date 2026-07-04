package com.offset.backend.mapper;

import com.offset.backend.dto.article.*;
import com.offset.backend.entity.Article;
import org.springframework.stereotype.Component;

@Component
public class ArticleMapper {

    public ArticleResponse toResponse(Article a) {
        return ArticleResponse.builder()
                .id(a.getId())
                .title(a.getTitle())
                .slug(a.getSlug())
                .summary(a.getSummary())
                .markdownContent(a.getMarkdownContent())
                .coverImageUrl(a.getCoverImageUrl())
                .categoryName(a.getCategory() != null ? a.getCategory().getName() : null)
                .categorySlug(a.getCategory() != null ? a.getCategory().getSlug() : null)
                .authorName(a.getAuthor().getDisplayName())
                .status(a.getStatus())
                .createdAt(a.getCreatedAt())
                .updatedAt(a.getUpdatedAt())
                .publishedAt(a.getPublishedAt())
                .build();
    }

    public ArticleSummaryResponse toSummary(Article a) {
        return ArticleSummaryResponse.builder()
                .id(a.getId())
                .title(a.getTitle())
                .slug(a.getSlug())
                .summary(a.getSummary())
                .coverImageUrl(a.getCoverImageUrl())
                .categoryName(a.getCategory() != null ? a.getCategory().getName() : null)
                .authorName(a.getAuthor().getDisplayName())
                .status(a.getStatus())
                .publishedAt(a.getPublishedAt())
                .build();
    }
}