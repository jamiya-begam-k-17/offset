package com.offset.backend.mapper;

import com.offset.backend.dto.category.CategoryResponse;
import com.offset.backend.entity.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {
    public CategoryResponse toResponse(Category c) {
        return CategoryResponse.builder().id(c.getId()).name(c.getName()).slug(c.getSlug()).build();
    }
}