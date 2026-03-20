"use client";
import ButtonLoading from "@/components/ButtonLoading";
import Loading from "@/components/Loading";
import { useAuth } from "@/lib/AuthContext";
import { Key, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { user, isLoading, error, message, login } = useAuth();
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      if (message) {
        toast.success(message);
      }
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1200);
    }
  };
  return (
    <main className="py-30  px-4">
      <Toaster />
      <section className="mx-auto p-4 bg-white rounded-2xl shadow-md max-w-md overflow-hidden">
        <h1 className="text-2xl font-bold text-center mb-5">Login</h1>
        {error && <p className="text-red-600 py-3 text-center">{error}</p>}
        <form className="space-y-5" onSubmit={handleLogin}>
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                size={18}
              />
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
                className="input-field pl-12"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <div className="relative">
              <Key
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                size={18}
              />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="input-field pl-12"
              />
            </div>
          </div>

          <button
            className="primary-btn"
            type="submit"
            disabled={loading || !form.email || !form.password}
          >
            {loading ? <ButtonLoading /> : "Login"}
          </button>
          <p>
            <a href="/forgot-password">Forgot password?</a>
          </p>
        </form>
      </section>
      <p className=" text-center mt-3">
        No account?{" "}
        <a href="/register" className="font-extrabold">
          Register
        </a>
      </p>
    </main>
  );
}
