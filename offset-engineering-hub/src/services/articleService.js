import api from "./api";

export const articleService = {
  async getAll(page = 0, size = 10) {
    const { data } = await api.get("/articles", {
      params: { page, size },
    });
    return data;
  },

  async getBySlug(slug) {
    const { data } = await api.get(`/articles/${slug}`);
    return data;
  },

  async getMine(page = 0, size = 10) {
    const { data } = await api.get("/articles/mine", {
      params: { page, size },
    });
    return data;
  },

  async getAdminArticles(page = 0, size = 10) {
    const { data } = await api.get("/articles/admin", {
      params: { page, size },
    });
    return data;
  },

  async create(article) {
    const { data } = await api.post("/articles", article);
    return data;
  },

  async update(id, article) {
    const { data } = await api.put(`/articles/${id}`, article);
    return data;
  },

  async remove(id) {
    await api.delete(`/articles/${id}`);
  },
};