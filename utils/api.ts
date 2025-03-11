import axios from "axios";
import { getAuthToken } from "./auth";

export const api = axios.create({
  baseURL: "https://gorest.co.in/public/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchUserId = async () => {
  const response = await api.get("/users");
  const users = response.data.data;
  if (users.length > 0) {
    const userId = users[0].id;
    localStorage.setItem("userId", userId);
    return userId;
  }

  throw new Error("No users found in GoRest API");
};

export const setAuthToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
