import api from "./api";

export const authService = {
  async login(username, password) {
    const { data } = await api.post("/auth/login", { username, password });
    localStorage.setItem("offset_token", data.token);
    localStorage.setItem(
      "offset_user",
      JSON.stringify({ username: data.username, displayName: data.displayName, role: data.role })
    );
    return data;
  },

  logout() {
    localStorage.removeItem("offset_token");
    localStorage.removeItem("offset_user");
  },

  getCurrentUser() {
    const raw = localStorage.getItem("offset_user");
    return raw ? JSON.parse(raw) : null;
  },

  isAuthenticated() {
    return Boolean(localStorage.getItem("offset_token"));
  },
};