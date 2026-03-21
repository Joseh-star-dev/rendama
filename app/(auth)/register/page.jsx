"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  Key,
  User,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "@/lib/AuthContext";
import { redirect } from "next/navigation";

export default function RegisterForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { register, error, isLoading } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const next = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!form.username) return toast.error("Please create a username");
      if (!form.email) return toast.error("Please enter your email");
      if (!form.email.includes("@"))
        return toast.error("Please enter a valid email");
    }
    setStep(step + 1);
  };

  const back = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.password !== form.confirmPassword) {
        return toast.error("Passwords do not match");
      }
      if (form.password.length < 6) {
        return toast.error("Password must be at least 6 characters");
      }

      // Simulate API call
      const success = await register(form);
      if (success) {
        toast.success(success.message);
        setTimeout(() => {
          setStep(3); // Success state
        }, 1500);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto py-20 px-2">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#18181b",
            color: "#fff",
            border: "1px solid #27272a",
            borderRadius: "12px",
          },
        }}
      />
      {error && <p className="text-center text-red-600 mb-5">{error}</p>}
      <div className="border border-gray-200 p-8 rounded-md shadow-2xl relative overflow-hidden">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1.5">
          <motion.div
            className="h-full bg-blue-600"
            initial={{ width: "0%" }}
            animate={{
              width: step === 1 ? "33%" : step === 2 ? "66%" : "100%",
            }}
          />
        </div>

        {step === 1 && (
          <motion.div>
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-950 mb-2">
                Get Started
              </h2>
              <p className="text-zinc-400 text-sm">
                Create your Rendama account to start managing properties.
              </p>
            </div>

            <div className="space-y-4">
              <div className="input-group">
                <label className="input-label">Username</label>
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                    size={18}
                  />
                  <input
                    type="text"
                    name="username"
                    placeholder="johndoe"
                    value={form.username}
                    onChange={handleChange}
                    className="input-field pl-12"
                  />
                </div>
              </div>

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
            </div>

            <button
              onClick={next}
              className="w-full mt-5 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 group shadow-lg shadow-indigo-600/20"
            >
              Continue
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <button
              onClick={back}
              className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-medium mb-2"
            >
              <ArrowLeft size={16} /> Back to details
            </button>

            <div>
              <h2 className="text-2xl font-display font-bold text-gray-950 mb-2">
                Security
              </h2>
              <p className="text-zinc-400 text-sm">
                Protect your account with a strong password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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

              <div className="input-group">
                <label className="input-label">Confirm Password</label>
                <div className="relative">
                  <ShieldCheck
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                    size={18}
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="input-field pl-12"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Create Account <CheckCircle2 size={18} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 space-y-6"
          >
            <div className="w-20 h-20 bg-gray-100 border border-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="text-emerald-500" size={40} />
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
                Check your inbox
              </h2>
              <p className="text-zinc-800 text-sm leading-relaxed">
                We've sent a verification link to{" "}
                <span className="text-gray-950 font-extrabold">
                  {form.email}
                </span>
                . Please click the link to activate your account.
              </p>
            </div>
            <button
              onClick={() => redirect("/resend-verification")}
              className="text-blue-700 hover:text-indigo-300 text-sm font-semibold transition-colors"
            >
              Didn't get the email? Resend
            </button>
          </motion.div>
        )}

        <p className="text-center mt-8 text-gray-900 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
