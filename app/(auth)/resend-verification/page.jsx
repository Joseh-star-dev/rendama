"use client";
import ButtonLoading from "@/components/ButtonLoading";
import { useAuth } from "@/lib/AuthContext";
import { Mail } from "lucide-react";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function resendVerification() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { resendVerification, error, message, isAuthenticated } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      return alert("please enter your email address");
    }
    try {
      setLoading(true);
      await resendVerification(email);
      if (message) {
        return alert(message);
      }
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
      <div className="bg-gray-50 p-8 border border-gray-200 rounded-2xl">
        <form onSubmit={handleSubmit}>
          <h2 className="mb-10 text-gray-950 font-bold text-center">
            Enter your email to resend verification link
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
              {loading ? <ButtonLoading /> : "Request Link"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
