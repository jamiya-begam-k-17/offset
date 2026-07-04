import api from "./api";

export const imageService = {
  async upload(file) {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await api.post("/images/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data.url; // relative URL served by the backend, e.g. /uploads/images/xxx.png
  },
};