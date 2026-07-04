package com.offset.backend.dto.article;

import com.offset.backend.entity.ArticleStatus;
import lombok.*;
import java.time.Instant;

@Data
@Builder
public class ArticleResponse {
    private Long id;
    private String title;
    private String slug;
    private String summary;
    private String markdownContent;
    private String coverImageUrl;
    private String categoryName;
    private String categorySlug;
    private String authorName;
    private ArticleStatus status;
    private Instant createdAt;
    private Instant updatedAt;
    private Instant publishedAt;
}