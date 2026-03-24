"use client";
import Link from "next/link";
import React from "react";
import CTA from "./CTA";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import RegisterForm from "@/app/(auth)/register/page";
import { redirect } from "next/navigation";

export default function Hero() {
  return (
    <section className="relative pt-10 pb-32 px-2 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-emerald-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-300 border border-indigo-500/20 text-gray-700 text-xs font-bold uppercase tracking-wider mb-8">
            <Zap size={14} /> The Future of Property Management
          </span>

          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 leading-[1.1]">
            Manage your rentals <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-blue-600">
              without the headache.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-800 max-w-2xl mb-10 leading-relaxed">
            Automate tenant reminders, generate instant receipts, and track
            payments in real-time. Rendama handles the busy work so you can
            focus on growing your portfolio.
          </p>

          <div className="flex flex-col sm:flex-row  gap-4">
            <button
              className="group px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-lg transition-all flex items-center gap-2 shadow-xl shadow-indigo-600/20"
              onClick={() => redirect("/register")}
            >
              Get Started Free
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 rounded-2xl font-bold text-lg transition-all">
              Watch Demo
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <RegisterForm />
        </motion.div>
      </div>
    </section>
  );
}
