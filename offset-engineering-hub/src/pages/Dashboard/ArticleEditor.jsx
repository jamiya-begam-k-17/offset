import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { articleService } from "../../services/articleService";
import { categoryService } from "../../services/categoryService";
import { imageService } from "../../services/imageService";
import MarkdownRenderer from "../../components/MarkdownRenderer/MarkdownRenderer";
import styles from "./ArticleEditor.module.scss";

const apiHost = import.meta.env.VITE_API_BASE_URL?.replace(/\/api\/?$/, "") || "http://localhost:8080";

function resolveImageUrl(url) {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/")) return `${apiHost}${url}`;
  return `${apiHost}/${url}`;
}

function ArticleEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [markdownContent, setMarkdownContent] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("DRAFT");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    categoryService.getAll().then(setCategories);
  }, []);

  async function handleCoverUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!/^image\/(png|jpe?g|webp|gif|svg\+xml)$/i.test(file.type)) {
      alert("Please select a valid image file (.png, .jpg, .jpeg, .webp, .gif, .svg)." );
      e.target.value = "";
      return;
    }

    const url = await imageService.upload(file);
    setCoverImageUrl(url);
  }

  async function handleInlineImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!/^image\/(png|jpe?g|webp|gif|svg\+xml)$/i.test(file.type)) {
      alert("Please select a valid image file (.png, .jpg, .jpeg, .webp, .gif, .svg).");
      e.target.value = "";
      return;
    }

    const url = await imageService.upload(file);
    setMarkdownContent((prev) => `${prev}\n\n![alt text](${url})\n`);
  }

  async function handleSubmit(publish) {
    setSaving(true);
    const payload = {
      title,
      summary,
      markdownContent,
      coverImageUrl,
      categoryId: categoryId || null,
      status: publish ? "PUBLISHED" : "DRAFT",
    };
    try {
      if (isEditing) {
        await articleService.update(id, payload);
      } else {
        await articleService.create(payload);
      }
      navigate("/dashboard");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={styles.editor}>
      <input
        className={styles.titleInput}
        placeholder="Article title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className={styles.summaryInput}
        placeholder="Short summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />

      <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
        <option value="">Select category</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <label>
        Cover image
        <input type="file" accept="image/*" onChange={handleCoverUpload} />
      </label>
      {coverImageUrl && <img src={coverImageUrl} alt="cover" className={styles.coverPreview} />}

      <label>
        Insert image into article
        <input type="file" accept="image/*" onChange={handleInlineImageUpload} />
      </label>

      <div className={styles.editorGrid}>
        <textarea
          className={styles.markdownInput}
          placeholder="Write your article in Markdown..."
          value={markdownContent}
          onChange={(e) => setMarkdownContent(e.target.value)}
        />
        <div className={styles.preview}>
          <MarkdownRenderer content={markdownContent} resolveImageUrl={resolveImageUrl} />
        </div>
      </div>

      <div className={styles.actions}>
        <button disabled={saving} onClick={() => handleSubmit(false)}>Save Draft</button>
        <button disabled={saving} onClick={() => handleSubmit(true)}>Publish</button>
      </div>
    </div>
  );
}

export default ArticleEditor;