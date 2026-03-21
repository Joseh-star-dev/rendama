"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function CheckYourEmail() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white shadow-xl border border-gray-200 rounded-2xl p-8 text-center space-y-6"
      >
        <div className="mx-auto w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center border-4 border-emerald-100">
          <CheckCircle2 className="text-emerald-500" size={40} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Check your inbox!
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We’ve sent a verification link to your email .
          </p>
          <p className="text-sm text-gray-500 mt-3">
            Click the link in the email to activate your account.
          </p>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600 mb-2">
            Didn't receive the email?
          </p>
          <Link
            href="/resend-verification"
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            Resend verification email
          </Link>
        </div>

        <div className="text-xs text-gray-500 pt-6">
          The link expires in 24 hours for security reasons.
        </div>
      </motion.div>
    </div>
  );
}
