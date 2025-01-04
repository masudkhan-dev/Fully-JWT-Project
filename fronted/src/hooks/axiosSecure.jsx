import axios from "axios";

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_KEY,
  headers: { "X-Requested-With": "XMLHttpRequest" },
  withCredentials: true,
});
axiosSecure.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export const multipartConfig = {
  headers: {
    "content-type": "multipart/form-data",
  },
};
