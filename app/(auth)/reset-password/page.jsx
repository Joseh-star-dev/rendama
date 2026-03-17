"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Key, ShieldCheck, Eye, EyeOff } from "lucide-react";
import ButtonLoading from "@/components/ButtonLoading";
import { useAuth } from "@/lib/AuthContext";
import { Suspense } from "react";

function ResetPasswordContent() {
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const { resetPassword, message, error, clearAuthMessages } = useAuth(); // assume clear method exists
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams?.get("token");

  // Early return if no token (prevents form render)
  if (!token) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Invalid or Missing Token
        </h2>
        <p className="text-gray-600 mb-6">
          The reset link is invalid or has expired. Please request a new one.
        </p>
        <button
          onClick={() => router.push("/auth/forgot-password")}
          className="primary-btn px-6 py-2.5"
        >
          Request New Link
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Optional: clear messages on input change
    if (message || error) clearAuthMessages?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!form.password) {
      // You could set local error state instead of relying only on context
      alert("Password is required"); // ← replace with UI error later
      return;
    }

    if (form.password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await resetPassword(token, form.password, form.confirmPassword);

      // Optional: success redirect after short delay or on message change
      setTimeout(() => {
        router.push("/login");
      }, 1800);
    } catch (err) {
      console.error("Reset error:", err);
      // error is already set in context → shown below
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto py-20 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md border border-gray-200 p-6 py-10 rounded-2xl space-y-6"
      >
        <h2 className="font-bold text-2xl text-center mb-2">
          Create New Password
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Your new password must be different from previous ones.
        </p>

        {error && (
          <p className="text-red-600 bg-red-50 p-3 rounded-lg text-center">
            {error}
          </p>
        )}
        {message && (
          <p className="text-green-600 bg-green-50 p-3 rounded-lg text-center">
            {message}
          </p>
        )}

        {/* Password Field */}
        <div className="space-y-2">
          <label className="input-label block">New Password</label>
          <div className="relative">
            <Key
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
              size={18}
            />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="input-field pl-12 pr-12"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Confirm Field */}
        <div className="space-y-2">
          <label className="input-label block">Confirm Password</label>
          <div className="relative">
            <ShieldCheck
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
              size={18}
            />
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={handleChange}
              className="input-field pl-12 pr-12"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="primary-btn w-full p-3 font-medium disabled:opacity-60"
        >
          {loading ? <ButtonLoading /> : "Reset Password"}
        </button>
      </form>
    </main>
  );
}

export default function ResetPassword() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
