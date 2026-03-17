"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { redirect, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";

export default function VerifyNote() {
  const queryEmail = useSearchParams();
  const email = queryEmail.get("email");

  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return redirect("/login");
  }
  return (
    <div className="min-h-screen py-20 px-4 mx-auto max-w-md">
      <motion.div
        key="step3"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8 space-y-6 px-4 shadow-xl border border-gray-200 rounded-2xl"
      >
        <div className="w-20 h-20 bg-gray-100 border border-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="text-emerald-500" size={40} />
        </div>
        <div>
          <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
            Check your inbox!
          </h2>
          <p className="text-zinc-800 text-sm leading-relaxed">
            We've sent a verification link to{" "}
            <span className="text-gray-950 font-extrabold">{email}</span>.
            Please click the link to activate your account.
          </p>
        </div>
        <Link
          href="/resend-verification"
          className="text-blue-700 hover:text-blue-600 text-sm font-semibold transition-colors"
        >
          Didn't get the email? Resend
        </Link>
      </motion.div>
    </div>
  );
}
