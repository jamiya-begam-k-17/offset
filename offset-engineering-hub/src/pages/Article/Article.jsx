import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { articleService } from "../../services/articleService";
import MarkdownRenderer from "../../components/MarkdownRenderer/MarkdownRenderer";
import styles from "./Article.module.scss";

const apiHost = import.meta.env.VITE_API_BASE_URL?.replace(/\/api\/?$/, "") || "http://localhost:8080";

function resolveImageUrl(url) {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/")) return `${apiHost}${url}`;
  return `${apiHost}/${url}`;
}

function Article() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const data = await articleService.getBySlug(slug);
        setArticle(data);
      } catch (err) {
        setError("Article not found");
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchArticle();
  }, [slug]);

  if (loading) return <p>Loading article...</p>;
  if (error) return <p>{error}</p>;
  if (!article) return null;

  return (
    <article className={styles.article}>
      <h1 className={styles.title}>{article.title}</h1>
      {article.coverImageUrl && (
        <div className={styles.imageWrapper}>
          <img
            src={resolveImageUrl(article.coverImageUrl)}
            alt={article.title}
            className={styles.image}
          />
        </div>
      )}
      <div className={styles.content}>
        <MarkdownRenderer content={article.markdownContent} resolveImageUrl={resolveImageUrl} />
      </div>
    </article>
  );
}

export default Article;

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { PortableText } from "@portabletext/react";
// import imageUrlBuilder from "@sanity/image-url";
// import { api } from "../../services/api";
// import client from "../../services/sanityClient";
// import styles from "./Article.module.scss";

// const builder = imageUrlBuilder(client);

// function Article() {
//   const { slug } = useParams();
//   const [article, setArticle] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchArticle() {
//       try {
//         const data = await api.getArticleBySlug(slug);
//         if (data) {
//           setArticle(data);
//         } else {
//           setError("Article not found");
//         }
//       } catch (err) {
//         setError("Failed to load article");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     if (slug) {
//       fetchArticle();
//     }
//   }, [slug]);

//   if (loading) return <p>Loading article...</p>;
//   if (error) return <p>{error}</p>;
//   if (!article) return <p>Article not found</p>;

//   return (
//     <article className={styles.article}>
//       {/* Title */}
//       <h1 className={styles.title}>{article.title}</h1>

//       {/* Cover Image */}
//       {article.coverImage && (
//         <div className={styles.imageWrapper}>
//           <img src={builder.image(article.coverImage).url()} alt={article.title} className={styles.image} />
//         </div>
//       )}

//       {/* Content */}
//       <div className={styles.content}>
//         <PortableText value={article.content} />
//       </div>
//     </article>
//   );
// }

// export default Article;