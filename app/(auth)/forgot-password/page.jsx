"use client";
import ButtonLoading from "@/components/ButtonLoading";
import { useAuth } from "@/lib/AuthContext";
import { Mail } from "lucide-react";
import React, { useState } from "react";

export default function ForgotPassword() {
  const { error, forgotPassword, message } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await forgotPassword(email);
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1200);
    }
  };

  return (
    <div className="max-w-md mx-auto py-20 px-4">
      {error && <p className="text-red-600 py-3 text-center">{error}</p>}
      {message && <p className="text-green-600 py-3 text-center">{message}</p>}
      <div className="bg-gray-50 p-8 border border-gray-200 rounded-2xl">
        <form onSubmit={handleSubmit}>
          <h2 className="mb-10 text-gray-950 font-bold text-center text-sm">
            Enter your email to request password reset link
          </h2>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-12"
              />
            </div>
            <button className="primary-btn p-2.5 mt-5" type="submit">
              {loading ? <ButtonLoading /> : "Reset password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
