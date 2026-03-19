// lib/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://rendama-ten.vercel.app/api", // relative → works with same domain
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
      // Optional: window.location.href = '/login';
      console.warn("Unauthorized – redirecting?");
    }
    return Promise.reject(error);
  },
);

export default api;
