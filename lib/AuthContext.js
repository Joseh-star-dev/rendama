// lib/AuthContext.js
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import api from "./api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const router = useRouter();

  // Fetch current user on mount (and after login/register)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("/api/auth/me", { withCredentials: true });
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await axios.post(
        "/api/auth/login",
        { email, password },
        {
          withCredentials: true,
        },
      );
      setMessage(res.data.message);
      // After successful login, fetch user
      const userRes = await axios.get("/api/auth/me", {
        withCredentials: true,
      });
      setUser(userRes.data.user);
      return router.push("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
      const errMsg = err.response?.data?.error;
      if (errMsg == "Please verify your email first") {
        router.push(`/verify-email?${email}`);
      }
      return false;
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setError("");
      }, 2000);
    }
  };

  const register = async (form) => {
    setError(null);
    setIsLoading(true);
    try {
      await axios.post("/api/auth/register", form);
      return true; // → redirect to "check your email" message
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
      return false;
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setError(null);
      }, 1800);
    }
  };

  const resendVerification = async (email) => {
    try {
      const res = await axios.post("/api/auth/resend-verification", { email });
      setMessage(res.data.message);
      return true;
    } catch (err) {
      setError(err.response?.data?.error || "Failed to resend");
      return false;
    }
  };

  const forgotPassword = async (email) => {
    setError(null);
    try {
      const res = await axios.post("/api/auth/forgot-password", { email });
      setMessage(res.data.message);
      return true;
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
      return false;
    }
  };

  const resetPassword = async (token, password, confirmPassword) => {
    setError(null);
    try {
      await axios.post("/api/auth/reset-password", {
        token,
        password,
        confirmPassword,
      });
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.error || "Password reset failed");
      // setError(res.data.error);
    }
  };

  const logout = async () => {
    try {
      const res = await api.post("/auth/logout");
      alert(res.data.message);
      await api.post("/auth/me");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        error,
        message,
        login,
        register,
        resendVerification,
        forgotPassword,
        resetPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
