"use client";
import { BellRing, Receipt, ShieldCheck, ZoomOutIcon } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

export default function Features() {
  const features = [
    {
      icon: <BellRing className="text-indigo-400" />,
      title: "Smart Reminders",
      description:
        "Automated SMS and Email reminders sent to tenants before rent is due.",
    },
    {
      icon: <Receipt className="text-emerald-400" />,
      title: "Instant Receipts",
      description:
        "Professional PDF receipts generated and sent automatically upon payment confirmation.",
    },
    {
      icon: <ShieldCheck className="text-blue-400" />,
      title: "Secure Tracking",
      description:
        "Bank-grade security for all your financial data and tenant information.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-gray-200">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-5">Features </h1>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-gray-300 border border-gray-400 hover:border-zinc-700 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-6">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-gray-700 leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
