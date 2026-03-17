"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loading from "@/components/Loading";
import { useAuth } from "@/lib/AuthContext";
import { userLinks } from "@/components/Navbar"; // assuming this exports an array like:
import { useProperty } from "@/context/PropetyContext";
// [{ name: "Properties", href: "/dashboard/properties", icon: <BuildingIcon />, count?: number }, ...]

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const { properties } = useProperty();
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
          {userLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`
                group relative flex flex-col items-center justify-center
                p-6 md:p-8 bg-white rounded-xl shadow-sm border border-gray-200
                hover:shadow-md hover:border-blue-200 transition-all duration-300
                hover:-translate-y-1 active:scale-98
              `}
            >
              <div className="text-3xl md:text-4xl text-gray-600 group-hover:text-blue-600 mb-3 transition-colors">
                {link.icon}
              </div>

              <h3 className="font-medium text-gray-800 text-center">
                {link.name}
              </h3>

              {/* Dynamic count or placeholder */}
              {link.count !== undefined ? (
                <div className="mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  {link.count}
                </div>
              ) : (
                <div className="mt-2 h-6" /> // spacer when no count
              )}
            </Link>
          ))}
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
