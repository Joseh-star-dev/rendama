// lib/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL, // relative → works with same domain
  withCredentials: true, // very important for httpOnly cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: response interceptor for 401 → auto logout
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // window.location.href = "/login";
      console.warn("Unauthorized – redirecting?");
    }
    return Promise.reject(error);
  },
);

export default api;
