import axios from "axios";
import { message } from "antd";

let showWelcomeDialog: (() => void) | null = null;

export const setShowDialog = (callback: () => void) => {
  showWelcomeDialog = callback;
};

export const api = axios.create({
  baseURL: "https://gorest.co.in/public/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("goRestToken");
  if (!token && showWelcomeDialog) {
    showWelcomeDialog();
    throw new Error("No token");
  }
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && showWelcomeDialog) {
      showWelcomeDialog();
    }
    return Promise.reject(error);
  },
);

export const setAuthToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
