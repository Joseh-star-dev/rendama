"use client";
import CTA from "@/components/CTA";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import Starts from "@/components/Starts";
import RentalSection from "@/components/RentalSection";
import { Feature } from "framer-motion";
import React from "react";
import { useAuth } from "@/lib/AuthContext";
import Loading from "@/components/Loading";
import { redirect } from "next/navigation";

export default function page() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    <Loading />;
  }

  if (user) {
    return redirect("/dashboard");
  }
  return (
    <main>
      <section>
        <Hero />
        <Features />
        <Starts />
        <Pricing />
        <CTA />
        {/* <RentalSection /> */}
      </section>
    </main>
  );
}
