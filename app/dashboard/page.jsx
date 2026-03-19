"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loading from "@/components/Loading";
import { useAuth } from "@/lib/AuthContext";
import { userLinks } from "@/components/Navbar"; // assuming this exports an array like:
import { useProperty } from "@/context/PropetyContext";
import { BuildingIcon, House, HouseIcon } from "lucide-react";
import { useTenant } from "@/context/TenantContext";
import { useUnit } from "@/context/UnitsContext";
// [{ name: "Properties", href: "/dashboard/properties", icon: <BuildingIcon />, count?: number }, ...]

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const { properties } = useProperty();
  const { tenants } = useTenant();
  const { units } = useUnit();
  const router = useRouter();

  // Safe client-side redirect
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login?from=/dashboard");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  // Render nothing while redirect is happening
  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50/40 py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Welcome back, {user.username || user.email?.split("@")[0] || "User"}
          </h1>
          <p className="mt-2 text-gray-600">
            Manage your properties and listings from here
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <Link
            href="/dashboard/properties"
            className="hover:border-indigo-500 border border-white flex justify-center items-center flex-col gap-2 p-2 md:p-4 bg-gray-100 shadow rounded-md"
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold">Total property</span>
              <BuildingIcon size={20} className="text-blue-600" />
            </div>
            <p className="font-extrabold text-3xl text-indigo-600">
              {properties.length ?? 0}
            </p>
          </Link>

          <Link
            href="/dashboard/units"
            className="hover:border-indigo-500 border border-white flex justify-center items-center flex-col gap-2 p-2 md:p-4 bg-gray-100 shadow rounded-md"
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold">Total Units</span>
              <HouseIcon size={20} className="text-blue-600" />
            </div>
            <p className="font-extrabold text-3xl text-indigo-600">
              {units.length ?? 0}
            </p>
          </Link>

          <Link
            href="/dashboard/tenants"
            className="hover:border-indigo-500 border border-white flex justify-center items-center flex-col gap-2 p-2 md:p-4 bg-gray-100 shadow rounded-md"
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold">Total Tenants</span>
              <BuildingIcon size={20} className="text-blue-600" />
            </div>
            <p className="font-extrabold text-3xl text-indigo-600">
              {tenants.length ?? 0}
            </p>
          </Link>

          <Link
            href="/dashboard/payments"
            className="hover:border-indigo-500 border border-white flex justify-center items-center flex-col gap-2 p-2 md:p-4 bg-gray-100 shadow rounded-md"
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold">Total Paid</span>
              <BuildingIcon size={20} className="text-blue-600" />
            </div>
            <p className="font-extrabold text-3xl text-indigo-600">{0}</p>
          </Link>
        </div>

        {/* Optional: quick stats or call-to-action row */}
        {userLinks.length === 0 && (
          <div className="mt-12 text-center text-gray-500">
            <p className="text-lg mb-4">No dashboard sections available yet</p>
            <Link
              href="/dashboard/properties"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Go to My Properties
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
