import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import Card from "../../components/Card/Card";
import styles from "./Articles.module.scss";

function Articles() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const [articlesData, categoriesData] = await Promise.all([
          api.getAllArticles(),
          api.getAllCategories()
        ]);
        setArticles(articlesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredArticles = useMemo(() => {
    if (selectedCategories.length === 0) {
      return articles;
    }
    return articles.filter(article =>
      selectedCategories.includes(article.category)
    );
  }, [articles, selectedCategories]);

  const handleCategoryToggle = (categoryName) => {
    setSelectedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(cat => cat !== categoryName)
        : [...prev, categoryName]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
  };

  if (loading) return <p>Loading articles...</p>;

  return (
    <div className={styles.articles}>
      <div className={styles.header}>
        <h2>Articles</h2>
        {selectedCategories.length > 0 && (
          <button className={styles.clearButton} onClick={clearFilters}>
            Clear Filters ({selectedCategories.length})
          </button>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.results}>
          <p className={styles.resultCount}>
            Showing {filteredArticles.length} of {articles.length} articles
          </p>
        </div>

        <div className={styles.grid}>
          {filteredArticles.map((article) => (
            <Card
              key={article._id}
              title={article.title}
              description={article.category}
              category={article.category}
              onClick={() => navigate(`/article/${article.slug}`)}
            />
          ))}
        </div>
      </div>

      <div className={styles.filters}>
        <h3>Filter by Category</h3>
        <div className={styles.categoryGrid}>
          {categories.map((category) => (
            <label key={category._id} className={styles.categoryOption}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.name)}
                onChange={() => handleCategoryToggle(category.name)}
              />
              <span className={styles.categoryName}>{category.name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Articles;