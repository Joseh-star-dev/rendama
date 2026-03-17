"use client";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

export default function Pricing() {
  const tiers = [
    {
      name: "Starter",
      price: "1,500",
      description: "Perfect for individual landlords starting out.",
      features: [
        "Up to 10 Rental Units",
        "M-Pesa Payment Tracking",
        "SMS Tenant Reminders",
        "Basic PDF Receipts",
        "Email Support",
      ],
      cta: "Start with Starter",
      popular: false,
    },
    {
      name: "Professional",
      price: "4,500",
      description: "Advanced automation for growing property managers.",
      features: [
        "Up to 50 Rental Units",
        "Automated M-Pesa Reconciliation",
        "KRA Tax Report Generation",
        "Tenant Self-Service Portal",
        "Priority WhatsApp Support",
        "Custom Branding on Receipts",
      ],
      cta: "Go Professional",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Full-scale solution for large real estate firms.",
      features: [
        "Unlimited Rental Units",
        "Multi-Property Management",
        "Advanced Financial Analytics",
        "API Access for Integrations",
        "Dedicated Account Manager",
        "On-site Training & Setup",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section
      id="pricing"
      className="py-24 px-6 bg-gray-200 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-4">
            Simple, Local Pricing
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Choose the plan that fits your portfolio. All plans include M-Pesa
            integration and localized support for Kenyan landlords.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className={`relative p-8 rounded-[2.5rem] border ${
                tier.popular
                  ? "border-2 bg-gray-800 border-blue-700 shadow-2xl shadow-indigo-500/10"
                  : "bg-gray-700 border-zinc-800"
              } transition-all`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-500 text-white text-xs font-bold rounded-full uppercase tracking-widest">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-zinc-400 text-lg font-medium">KES</span>
                  <span className="text-4xl font-display font-bold text-white">
                    {tier.price}
                  </span>
                  {tier.price !== "Custom" && (
                    <span className="text-zinc-500 text-sm">/mo</span>
                  )}
                </div>
                <p className="text-zinc-500 text-sm mt-4 leading-relaxed">
                  {tier.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-sm text-zinc-300"
                  >
                    <CheckCircle2
                      className="text-emerald-500 shrink-0 mt-0.5"
                      size={16}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-2xl font-bold transition-all ${
                  tier.popular
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20"
                    : "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
                }`}
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
