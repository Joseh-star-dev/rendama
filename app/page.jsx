"use client";
import CTA from "@/components/CTA";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import React from "react";
import { useAuth } from "@/lib/AuthContext";

export default function page() {
  const { user, isLoading } = useAuth();

  return (
    <main>
      <section>
        <Hero />
        <Features />
        {/* <Starts /> */}
        <Pricing />
        <CTA />
        {/* <RentalSection /> */}
      </section>
    </main>
  );
}
