import { Building2, CheckCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function RentalSection() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <Building2 size={40} className="text-blue-600 mb-4" />
          <h2 className="text-3xl font-bold mb-4">Built for Property Owners</h2>

          <ul className="space-y-3 text-gray-600">
            <li className="flex gap-2">
              <CheckCircle className="text-green-500" /> Tenant & unit tracking
            </li>
            <li className="flex gap-2">
              <CheckCircle className="text-green-500" /> Rent payment records
            </li>
            <li className="flex gap-2">
              <CheckCircle className="text-green-500" /> Payment reminders
            </li>
            <li className="flex gap-2">
              <CheckCircle className="text-green-500" /> Income reports
            </li>
          </ul>

          <Link
            href="/register"
            className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Start Managing Rentals
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md p-10">
          <p className="text-gray-600">
            Whether you manage 5 units or 200 apartments, Rendama helps you stay
            organized and professional.
          </p>
        </div>
      </div>
    </section>
  );
}
