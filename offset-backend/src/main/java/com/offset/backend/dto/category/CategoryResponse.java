package com.offset.backend.dto.category;

import lombok.*;

@Data
@Builder
public class CategoryResponse {
    private Long id;
    private String name;
    private String slug;
}