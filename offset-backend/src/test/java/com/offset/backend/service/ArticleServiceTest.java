package com.offset.backend.service;

import com.offset.backend.dto.article.ArticleSummaryResponse;
import com.offset.backend.entity.*;
import com.offset.backend.repository.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
class ArticleServiceTest {

    @Autowired
    private ArticleService articleService;

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Test
    void getPublishedArticlesReturnsPublishedPostsWithAuthorAndCategory() {
        User author = userRepository.save(User.builder()
                .username("tester")
                .email("tester@example.com")
                .password("encoded")
                .displayName("Test Author")
                .role(Role.CONTRIBUTOR)
                .enabled(true)
                .build());

        Category category = categoryRepository.save(Category.builder()
                .name("Tech")
                .slug("tech")
                .build());

        articleRepository.save(Article.builder()
                .title("Hello World")
                .slug("hello-world")
                .summary("Summary")
                .markdownContent("# Hello")
                .category(category)
                .author(author)
                .status(ArticleStatus.PUBLISHED)
                .build());

        Page<ArticleSummaryResponse> result = articleService.getPublishedArticles(null, null, PageRequest.of(0, 10));

        assertThat(result.getTotalElements()).isEqualTo(1);
        ArticleSummaryResponse first = result.getContent().get(0);
        assertThat(first.getTitle()).isEqualTo("Hello World");
        assertThat(first.getAuthorName()).isEqualTo("Test Author");
        assertThat(first.getCategoryName()).isEqualTo("Tech");
    }
}
