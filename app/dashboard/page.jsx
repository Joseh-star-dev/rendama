"use client";
import React, { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Loading from "@/components/Loading";
import { useAuth } from "@/lib/AuthContext";
import { userLinks } from "@/components/Navbar"; // assuming this exports an array like:
import {
  BanknoteArrowDown,
  BanknoteX,
  BuildingIcon,
  CircleCheck,
  CoinsIcon,
  CreditCardIcon,
  HomeIcon,
  LayoutDashboard,
  Users2Icon,
} from "lucide-react";
import { useProperty } from "@/context/PropertyContext";
import { useTenant } from "@/context/TenantContext";
import { useUnit } from "@/context/UnitsContext";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const { units } = useUnit();
  const { tenants } = useTenant();
  const { properties } = useProperty();
  const router = useRouter();

  const expectedRent = units.reduce((sum, rent) => {
    return sum + rent.rent;
  }, 0);
  // starts
  const starts = [
    {
      name: "Overview",
      href: "/dashboard",
      icon: <LayoutDashboard />,
      total: undefined,
    },
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

    {
      name: "Expected Rent",
      href: "/dashboard/rent",
      icon: <CoinsIcon />,
      total: "ksh:" + " " + expectedRent,
    },

    {
      name: "collected Rent",
      href: "/dashboard/rent",
      icon: <CircleCheck />,
      total: 0,
    },

    {
      name: "Pending Rent",
      href: "/dashboard/rents",
      icon: <BanknoteX />,
      total: 0,
    },
  ];
  // Safe client-side redirect
  // useEffect(() => {
  //   if (!isLoading && !user) {
  //     router.push("/login");
  //   }
  // }, [isLoading, user, router]);

  // if (isLoading) {
  //   return (
  //     <div className="min-h-[70vh] flex items-center justify-center">
  //       <Loading content={"Loading user..."} />
  //     </div>
  //   );
  // }

  // Render nothing while redirect is happening
  if (!user) {
    return null;
  }

  return (
    <Suspense fallback={<Loading />}>
      <main className="min-h-screen bg-gray-50/40 py-4">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="mb-8 shadow p-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Welcome back,{" "}
              {user.username || user.email?.split("@")[0] || "User"}
            </h1>
            <p className="mt-2 text-gray-600">
              Manage your properties and listings from here
            </p>
          </div>
          {starts && (
            <div className="text-xs md grid grid-cols-3 gap-3 md:grid-cols-4 font-serif">
              {starts.map((start) => (
                <Link
                  key={start.name}
                  href={start.href}
                  className="relative md:text-sm px-2 py-6 bg-gray-100 shadow rounded-md flex flex-col items-center transition"
                >
                  <span className="text-blue-600 font-extrabold mb-1 mt-3">
                    {start.icon}
                  </span>
                  <span className="text-gray-600 md:text-sm">{start.name}</span>
                  <p className="absolute top-1 right-3 text-gray-900 font-sans font-bold flex gap-4 items-center text-xs">
                    {start.total}
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
