import axios from "axios";

let modalController: ((isOpen: boolean) => void) | null = null;

export const setModalController = (controller: (isOpen: boolean) => void) => {
  modalController = controller;
};

export const api = axios.create({
  baseURL: "https://gorest.co.in/public/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("goRestToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      modalController?.(true);
    }
    return Promise.reject(error);
  },
);

export const setAuthToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
