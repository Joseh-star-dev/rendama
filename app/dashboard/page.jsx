"use client";
import React, { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loading from "@/components/Loading";
import { useAuth } from "@/lib/AuthContext";
import { userLinks } from "@/components/Navbar"; // assuming this exports an array like:
import { useProperty } from "@/context/PropertyContext";
import {
  BuildingIcon,
  HomeIcon,
  House,
  HouseIcon,
  Users2Icon,
} from "lucide-react";
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
        <Loading content={"Loading user..."} />
      </div>
    );
  }

  const starts = [
    { name: "Overview", href: "/dashboard", icon: <HomeIcon />, total: "" },
    {
      name: "Properties",
      href: "/dashboard/properties",
      icon: <BuildingIcon />,
      total: properties.length ?? 0,
    },
    {
      name: "Units",
      href: "/dashboard/units",
      icon: <HomeIcon />,
      total: units.length ?? 0,
    },
    {
      name: "Tenants",
      href: "/dashboard/tenants",
      icon: <Users2Icon />,
      total: tenants.length ?? 0,
    },
  ];
  // Render nothing while redirect is happening
  if (!user) {
    return null;
  }

  return (
    <Suspense fallback={<Loading />}>
      <main className="min-h-screen bg-gray-50/40 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Welcome back,{" "}
              {user.username || user.email?.split("@")[0] || "User"}
            </h1>
            <p className="mt-2 text-gray-600">
              Manage your properties and listings from here
            </p>
          </div>
          {starts && (
            <div className="grid grid-cols-3 gap-3 md:grid-cols-4">
              {starts.map((start) => (
                <Link
                  key={start.name}
                  href={start.href}
                  className="text-xs md:text-lg p-4 border border-gray-200 rounded-md flex flex-col items-center transition hover:border-blue-200"
                >
                  <span className="text-blue-600 font-extrabold mb-3">
                    {start.icon}
                  </span>
                  <span>{start.name}</span>
                  <p className="text-gray-900 font-bold flex gap-4 items-center">
                    Total:{" "}
                    <span className="font-extrabold text-xl">
                      {start.total}
                    </span>
                  </p>
                </Link>
              ))}
            </div>
          )}
          {/* Optional: quick stats or call-to-action row */}
          {userLinks.length === 0 && (
            <div className="mt-12 text-center text-gray-500">
              <p className="text-lg mb-4">
                No dashboard sections available yet
              </p>
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
    </Suspense>
  );
}
