"use client";
import ButtonLoading from "@/components/ButtonLoading";
import { useAuth } from "@/lib/AuthContext";
import { Mail } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import CheckYourEmail from "../verify-email/page";

export default function resendVerification() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { resendVerification, error, message, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      return alert("please enter your email address");
    }
    try {
      setLoading(true);
      await resendVerification(email);
      setTimeout(() => {
        router.push("/verify-email");
      }, 1500);
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
      <Toaster />
      {error && <p className="text-red-600 py-3 text-center">{error}</p>}

      <div className="bg-gray-100 p-8 border border-gray-200 py-30 rounded-2xl">
        {message && (
          <p className="my-5 text-green-600 py-3 text-center">{message}</p>
        )}
        <form onSubmit={handleSubmit}>
          <h2 className="mb-5 text-gray-600 font-bold text-center">
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
              {loading ? <ButtonLoading /> : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
