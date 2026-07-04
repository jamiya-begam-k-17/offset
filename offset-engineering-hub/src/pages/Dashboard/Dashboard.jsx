import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { articleService } from "../../services/articleService";
import { categoryService } from "../../services/categoryService";
import api from "../../services/api";
import styles from "./Dashboard.module.scss";

function Dashboard() {
  const navigate = useNavigate();
  const [currentUser] = useState(() => authService.getCurrentUser());
  const [articles, setArticles] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ username: "", email: "", password: "", displayName: "" });
  const [message, setMessage] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryMessage, setCategoryMessage] = useState("");
  const [activePanel, setActivePanel] = useState("all");
  const [showContributorForm, setShowContributorForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const categoryReq = categoryService.getAll().catch(() => []);

        if (currentUser.role === "ADMIN") {
          const [articleRes, userRes, categoriesRes] = await Promise.all([
            articleService.getAdminArticles(0, 8).catch(() => ({ content: [] })),
            api.get("/users").catch(() => ({ data: [] })),
            categoryReq,
          ]);
          if (!isMounted) return;
          setArticles(articleRes.content || []);
          setContributors((userRes.data || []).filter((user) => user.role === "CONTRIBUTOR"));
          setCategories(categoriesRes || []);
        } else {
          const [articleRes, categoriesRes] = await Promise.all([
            articleService.getMine(0, 8).catch(() => ({ content: [] })),
            categoryReq,
          ]);
          if (!isMounted) return;
          setArticles(articleRes.content || []);
          setContributors([]);
          setCategories(categoriesRes || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [currentUser?.role]);

  const isAdmin = currentUser?.role === "ADMIN";
  const canCreateCategory = ["ADMIN", "CONTRIBUTOR"].includes(currentUser?.role);
  const stats = useMemo(() => ({
    totalArticles: articles.length,
    contributors: contributors.length,
    categories: categories.length,
  }), [articles.length, contributors.length, categories.length]);

  async function handleCreateContributor(e) {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      setForm({ username: "", email: "", password: "", displayName: "" });
      setMessage("Contributor created successfully.");
      const userRes = await api.get("/users");
      setContributors((userRes.data || []).filter((user) => user.role === "CONTRIBUTOR"));
    } catch (error) {
      setMessage(error?.response?.data?.message || "Could not create contributor.");
    }
  }

  async function handleCreateCategory(e) {
    e.preventDefault();
    try {
      await categoryService.create(categoryName);
      setCategoryName("");
      setCategoryMessage("Category created successfully.");
      const categoriesRes = await categoryService.getAll();
      setCategories(categoriesRes);
    } catch (error) {
      setCategoryMessage(error?.response?.data?.message || "Could not create category.");
    }
  }

  async function handleDelete(id) {
    try {
      await articleService.remove(id);
      setArticles((prev) => prev.filter((article) => article.id !== id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  }

  if (!currentUser) {
    return null;
  }

  return (
    <div className={styles.dashboardPage}>
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Welcome back</p>
          <h1>{currentUser.displayName || currentUser.username}</h1>
          <p className={styles.subtitle}>
            {isAdmin
              ? "Manage contributors, review content, and keep the publishing pipeline moving."
              : "Write your next story, publish it, and keep track of everything you’ve shared."}
          </p>
        </div>
        <div className={styles.heroActions}>
          <button className={styles.primaryButton} onClick={() => navigate("/dashboard/new")}>Create article</button>
          <button className={styles.secondaryButton} onClick={() => authService.logout() && navigate("/login")}>Log out</button>
        </div>
      </section>

      <section className={styles.statsGrid}>
        <article className={styles.statCard}>
          <span>{isAdmin ? "Published articles" : "My articles"}</span>
          <strong>{stats.totalArticles}</strong>
        </article>
        {isAdmin && (
          <article className={styles.statCard}>
            <span>Contributors</span>
            <strong>{stats.contributors}</strong>
          </article>
        )}
        {canCreateCategory && (
          <article className={styles.statCard}>
            <span>Categories</span>
            <strong>{stats.categories}</strong>
          </article>
        )}
      </section>

      <section className={styles.panelToggles}>
        <button
          className={activePanel === "all" ? styles.activeToggle : ""}
          onClick={() => setActivePanel("all")}
        >
          Show all
        </button>
        <button
          className={activePanel === "articles" ? styles.activeToggle : ""}
          onClick={() => setActivePanel("articles")}
        >
          Manage articles
        </button>
        {isAdmin && (
          <button
            className={activePanel === "contributors" ? styles.activeToggle : ""}
            onClick={() => setActivePanel("contributors")}
          >
            Manage contributors
          </button>
        )}
        {canCreateCategory && (
          <button
            className={activePanel === "categories" ? styles.activeToggle : ""}
            onClick={() => setActivePanel("categories")}
          >
            Manage categories
          </button>
        )}
      </section>

      {isAdmin && (
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2>Contributor tools</h2>
            <button className={styles.toggleButton} onClick={() => setShowContributorForm((prev) => !prev)}>
              {showContributorForm ? "Hide add contributor" : "Add contributor"}
            </button>
          </div>
          {showContributorForm && (
            <form className={styles.formGrid} onSubmit={handleCreateContributor}>
              <input required placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
              <input required placeholder="Display name" value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} />
              <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input required type="password" minLength="8" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              <button type="submit">Create contributor</button>
            </form>
          )}
          {message && <p className={styles.message}>{message}</p>}
        </section>
      )}

      {canCreateCategory && (
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2>Category tools</h2>
            <button className={styles.toggleButton} onClick={() => setShowCategoryForm((prev) => !prev)}>
              {showCategoryForm ? "Hide add category" : "Add category"}
            </button>
          </div>
          {showCategoryForm && (
            <form className={styles.categoryGrid} onSubmit={handleCreateCategory}>
              <input required placeholder="Category name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
              <button type="submit">Create category</button>
            </form>
          )}
          {categoryMessage && <p className={styles.message}>{categoryMessage}</p>}
          <div className={styles.categoryList}>
            {categories.map((category) => (
              <span key={category.id} className={styles.categoryTag}>{category.name}</span>
            ))}
          </div>
        </section>
      )}

      {(activePanel === "all" || activePanel === "articles") && (
        <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2>{isAdmin ? "All articles" : "My articles"}</h2>
          <Link to="/dashboard/new">+ New article</Link>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : articles.length === 0 ? (
          <p className={styles.emptyState}>No articles yet.</p>
        ) : (
          <div className={styles.articleList}>
            {articles.map((article) => (
              <div key={article.id} className={styles.articleCard}>
                <div>
                  <p className={styles.articleMeta}>{article.categoryName || "General"}</p>
                  <h3>{article.title}</h3>
                  <p>{article.summary}</p>
                </div>
                <div className={styles.articleActions}>
                  <span className={styles.badge}>{article.status}</span>
                  <Link to={`/dashboard/edit/${article.id}`}>Edit</Link>
                  <button className={styles.deleteButton} onClick={() => handleDelete(article.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      )}

      {(activePanel === "all" || activePanel === "contributors") && isAdmin && (
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2>Contributors</h2>
          </div>
          <div className={styles.articleList}>
            {contributors.map((contributor) => (
              <div key={contributor.id} className={styles.articleCard}>
                <div>
                  <h3>{contributor.displayName}</h3>
                  <p>{contributor.email}</p>
                </div>
                <span className={styles.badge}>{contributor.username}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Dashboard;