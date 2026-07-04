package com.offset.backend.repository;

import com.offset.backend.entity.Article;
import com.offset.backend.entity.ArticleStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article, Long> {

    @EntityGraph(attributePaths = {"category", "author"})
    Optional<Article> findBySlugAndStatus(String slug, ArticleStatus status);

    Optional<Article> findBySlug(String slug);

    Page<Article> findByStatus(ArticleStatus status, Pageable pageable);

    @EntityGraph(attributePaths = {"category", "author"})
    Page<Article> findByAuthorId(Long authorId, Pageable pageable);

    @EntityGraph(attributePaths = {"category", "author"})
    Page<Article> findByStatusOrderByPublishedAtDesc(
            ArticleStatus status,
            Pageable pageable
    );

    // @Query("""
    //     SELECT a
    //     FROM Article a
    //     WHERE a.status = :status
    //     ORDER BY a.publishedAt DESC
    //     """)
    // Page<Article> search(
    //     @Param("status") ArticleStatus status,
    //     Pageable pageable
    // );

    //--------------

    // @Query("""
    //     SELECT a FROM Article a
    //     WHERE a.status = :status
    //     AND (:categorySlug IS NULL OR a.category.slug = :categorySlug)
    //     AND (:search IS NULL OR lower(a.title) LIKE lower(concat('%', :search, '%')))
    //     ORDER BY a.publishedAt DESC
    //     """)
    // Page<Article> search(
    //     @Param("status") ArticleStatus status,
    //     @Param("categorySlug") String categorySlug,
    //     @Param("search") String search,
    //     Pageable pageable
    // );

    boolean existsBySlug(String slug);
}