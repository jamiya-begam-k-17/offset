import api from "./api";

export const categoryService = {
  async getAll() {
    const { data } = await api.get("/categories");
    return data;
  },
  async create(name) {
    const { data } = await api.post("/categories", { name });
    return data;
  },
  async remove(id) {
    await api.delete(`/categories/${id}`);
  },
};