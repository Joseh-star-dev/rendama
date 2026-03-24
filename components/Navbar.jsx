"use client";

import {
  Bell,
  Building,
  CreditCard,
  HelpCircle,
  Home,
  Info,
  LayoutDashboard,
  LogOut,
  Menu,
  User,
  UserCheck,
  UserCircle2,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import Brand from "./Brand";
import { useProperty } from "@/context/PropetyContext";
import Link from "next/link";
import Loading from "./Loading";

// ──────────────────────────────────────────────
export const guestLinks = [
  { name: "Home", href: "/", icon: <Home size={18} /> },
  { name: "About", href: "/about", icon: <Info size={18} /> },
  { name: "FAQ", href: "/faq", icon: <HelpCircle size={18} /> },
];

export const userLinks = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    name: "Properties",
    href: "/dashboard/properties",
    icon: <Building size={18} />,
  },
  { name: "Units", href: "/dashboard/units", icon: <Home size={18} /> },
  { name: "Tenants", href: "/dashboard/tenants", icon: <Users size={18} /> },
  {
    name: "Payments",
    href: "/dashboard/payments",
    icon: <CreditCard size={18} />,
  },
];

// ──────────────────────────────────────────────
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isLoading, logout } = useAuth();

  const isActive = (href) => pathname === href;
  const links = user ? userLinks : guestLinks;

  return (
    <Suspense fullback={links}>
      <header className="sticky top-0 z-50 w-full border-b backdrop-blur-xl border-gray-200 max-w-7xl mx-auto bg-gray-100">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="">
              <Brand />
            </div>
            <div className="md:hidden flex gap-5 items-center justify-center">
              {user ? (
                <Link
                  href="/dashboard"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-red-700 hover:bg-red-100 font-medium transition"
                >
                  <UserCheck />
                </Link>
              ) : (
                <a
                  href="/login"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-800 px-3 py-2 text-white hover:bg-red-100 font-medium transition"
                >
                  <User />
                </a>
              )}
              <button
                className="md:hidden rounded-lg p-2 text-gray-800  hover:bg-gray-100"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? "" : <Menu size={35} />}
              </button>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:gap-1 lg:gap-2">
              <>
                {links.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`
                      flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md
                      ${
                        isActive(link.href)
                          ? "text-blue-700 bg-blue-50"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                      }
                      transition-colors
                    `}
                  >
                    {link.icon}
                    {link.name}
                  </a>
                ))}
              </>
            </div>

            {/* Desktop Right Side */}
            <Suspense>
              <div className="hidden md:flex md:items-center md:gap-4">
                {user && (
                  <>
                    <button
                      type="button"
                      className="relative rounded-full p-2 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <Bell size={20} />
                      {/* <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" /> */}
                    </button>

                    <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold shadow-sm">
                        {user.email?.[0]?.toUpperCase() ?? "?"}
                      </div>
                      <div className="hidden lg:block">
                        <p className="text-sm font-medium text-gray-900 truncate max-w-[180px]">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {!user && !isLoading && (
                  <a
                    href="/login"
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
                  >
                    <User size={18} />
                    Sign in
                  </a>
                )}

                {user && (
                  <button
                    onClick={logout}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                )}
              </div>
            </Suspense>
          </div>
        </nav>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative top-0 inset-0 bg-black/50 z-50 md:hidden"
                onClick={() => setMenuOpen(false)}
              />

              <motion.div
                // initial={{ x: "-1" }}
                animate={{ x: -10, x: 0 }}
                // exit={{ x: "100%" }}
                transition={{
                  type: "spring",
                  damping: 30,
                  stiffness: 300,
                  duration: 1,
                }}
                className="absolute top-0 z-50 left-0 min-h-screen w-80 bg-white shadow-2xl md:hidden"
              >
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between border-b px-6 py-5">
                    <Brand />
                    <button
                      onClick={() => setMenuOpen(false)}
                      aria-label="Close menu"
                    >
                      <X size={28} className="text-gray-700" />
                    </button>
                  </div>

                  <div className="flex-1 px-6 py-8">
                    {/* User info */}
                    <div className="mb-10 flex items-center gap-4 rounded-xl p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white font-semibold shadow">
                        {user?.email?.[0]?.toUpperCase() ?? "G"}
                      </div>
                      <div>
                        {user ? (
                          <>
                            <p className="font-medium text-gray-900">
                              {user.email}
                            </p>
                            <p className="text-sm text-gray-500">Logged in</p>
                          </>
                        ) : (
                          <>
                            <p className="font-medium">Guest</p>
                            <a
                              href="/login"
                              className="text-sm text-blue-600 hover:underline"
                            >
                              Sign in or create account
                            </a>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Links */}
                    <nav className="space-y-2">
                      {links.map((link) => (
                        <a
                          key={link.name}
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className={`
                          flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium
                          ${
                            isActive(link.href)
                              ? "bg-blue-50 text-blue-700"
                              : "text-gray-700 hover:bg-gray-100"
                          }
                          transition-colors
                        `}
                        >
                          <span className="text-gray-500">{link.icon}</span>
                          {link.name}
                        </a>
                      ))}
                    </nav>
                  </div>

                  {/* Bottom actions */}
                  <div className="border-t p-6">
                    {user ? (
                      <button
                        onClick={() => {
                          logout();
                          setMenuOpen(false);
                        }}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-red-700 hover:bg-red-100 font-medium transition"
                      >
                        <LogOut size={18} />
                        Sign out
                      </button>
                    ) : (
                      <a
                        href="/login"
                        className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-white font-medium hover:bg-blue-700 transition"
                      >
                        Sign in / Get Started
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </Suspense>
  );
}
