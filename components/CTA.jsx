import Link from "next/link";
import React from "react";

export default function CTA() {
  return (
    <section className="py-32 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto rounded-[3rem] bg-blue-700 p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-indigo-600/40">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.2),transparent)]" />
        <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 relative z-10">
          Ready to simplify your <br className="hidden md:block" /> property
          management?
        </h2>
        <p className="text-indigo-100 text-lg mb-10 max-w-xl mx-auto relative z-10">
          Join thousands of landlords who have automated their rental business
          with Rendama.
        </p>
        <button className="px-10 py-5 bg-white text-indigo-600 rounded-2xl font-bold text-xl hover:bg-indigo-50 transition-all relative z-10 shadow-xl">
          Start Your 14-Day Free Trial
        </button>
      </div>
    </section>
  );
}
