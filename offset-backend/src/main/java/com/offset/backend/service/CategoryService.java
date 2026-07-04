package com.offset.backend.service;

import com.offset.backend.dto.category.CategoryResponse;
import com.offset.backend.entity.Category;
import com.offset.backend.exception.ResourceNotFoundException;
import com.offset.backend.mapper.CategoryMapper;
import com.offset.backend.repository.CategoryRepository;
import com.offset.backend.util.SlugUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public List<CategoryResponse> getAll() {
        return categoryRepository.findAll().stream().map(categoryMapper::toResponse).toList();
    }

    public CategoryResponse create(String name) {
        Category category = Category.builder()
                .name(name)
                // .slug(SlugUtil.uniqueSlug(name, categoryRepository::findBySlug()::isPresent))
                .slug(SlugUtil.uniqueSlug(
                    name,
                    slug -> categoryRepository.findBySlug(slug).isPresent()
                ))
                .build();
        return categoryMapper.toResponse(categoryRepository.save(category));
    }

    public void delete(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Category not found: " + id);
        }
        categoryRepository.deleteById(id);
    }
}