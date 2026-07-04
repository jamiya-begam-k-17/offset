import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
});

// Attach JWT to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("offset_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global 401 handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("offset_token");
      localStorage.removeItem("offset_user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;


// import client from "./sanityClient";
// import { queries } from "./queries";

// export const api = {
//   async getAllArticles() {
//     try {
//       const data = await client.fetch(queries.allArticles);
//       return data;
//     } catch (error) {
//       console.error("Error fetching articles:", error);
//       throw error;
//     }
//   },

//   async getAllCategories() {
//     try {
//       const data = await client.fetch(queries.allCategories);
//       return data;
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//       throw error;
//     }
//   },

//   async getArticleBySlug(slug) {
//     try {
//       const data = await client.fetch(queries.articleBySlug, { slug });
//       return data;
//     } catch (error) {
//       console.error("Error fetching article:", error);
//       throw error;
//     }
//   },
// };