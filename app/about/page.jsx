import { Building2, Users, ShieldCheck, TrendingUp } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">About Rendama</h1>

        <p className="text-lg text-gray-600 text-center mb-12">
          Rendama is a modern rental and chama management system built to help
          landlords and investment groups simplify operations, increase
          transparency, and grow smarter.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <Building2 className="text-blue-600 mb-4" size={32} />
            <h3 className="text-xl font-semibold mb-3">
              Rental Management Made Simple
            </h3>
            <p className="text-gray-600">
              Track tenants, manage rent payments, send automated reminders, and
              monitor income — all in one dashboard. No more spreadsheets. No
              more confusion.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <Users className="text-blue-600 mb-4" size={32} />
            <h3 className="text-xl font-semibold mb-3">Chama Transparency</h3>
            <p className="text-gray-600">
              Record member contributions, manage payouts, track investments and
              keep everyone accountable. Total visibility for every member.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <ShieldCheck className="text-blue-600 mb-4" size={32} />
            <h3 className="text-xl font-semibold mb-3">Secure & Reliable</h3>
            <p className="text-gray-600">
              We use secure authentication and protected data storage to keep
              your financial information safe.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <TrendingUp className="text-blue-600 mb-4" size={32} />
            <h3 className="text-xl font-semibold mb-3">Built for Growth</h3>
            <p className="text-gray-600">
              Whether you manage 2 houses or 200 units, Rendama scales with you.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            To empower landlords and chama groups across Kenya and beyond with
            smart, affordable digital tools that increase efficiency, trust, and
            financial growth.
          </p>
        </div>
      </div>
    </div>
  );
}
