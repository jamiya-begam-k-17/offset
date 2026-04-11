import client from "./sanityClient";
import { queries } from "./queries";

export const api = {
  async getAllArticles() {
    try {
      const data = await client.fetch(queries.allArticles);
      return data;
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error;
    }
  },

  async getAllCategories() {
    try {
      const data = await client.fetch(queries.allCategories);
      return data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },

  async getArticleBySlug(slug) {
    try {
      const data = await client.fetch(queries.articleBySlug, { slug });
      return data;
    } catch (error) {
      console.error("Error fetching article:", error);
      throw error;
    }
  },
};