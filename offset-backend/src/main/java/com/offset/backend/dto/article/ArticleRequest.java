package com.offset.backend.dto.article;

import com.offset.backend.entity.ArticleStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ArticleRequest {
    @NotBlank
    private String title;
    @NotBlank
    private String summary;
    @NotBlank
    private String markdownContent;
    private String coverImageUrl;
    private Long categoryId;
    private ArticleStatus status; // DRAFT | PUBLISHED | ARCHIVED
}