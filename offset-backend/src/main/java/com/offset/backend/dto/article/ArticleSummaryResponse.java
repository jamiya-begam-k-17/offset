package com.offset.backend.dto.article;

import com.offset.backend.entity.ArticleStatus;
import lombok.*;
import java.time.Instant;

@Data
@Builder
public class ArticleSummaryResponse {
    private Long id;
    private String title;
    private String slug;
    private String summary;
    private String coverImageUrl;
    private String categoryName;
    private String authorName;
    private ArticleStatus status;
    private Instant publishedAt;
}