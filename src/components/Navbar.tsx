"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User, LayoutDashboard, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const isProduct = pathname === "/products";
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const user = session?.user;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setIsClient(true);
  }, []);
  // Navbar hide/show on scroll
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY.current || currentScrollY < 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, []);
  // Close dropdown when clicking outside
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);
  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: "/" });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };
  const getDashboardPath = (role: string | undefined) => {
    if (!role) return "/";
    const routes: Record<string, string> = {
      admin: "/admin",
      superadmin: "/superadmin",
      client: "/client",
      designer: "/designer",
    };
    return routes[role] || "/dashboard";
  };
  if (!isClient) return null;
  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full bg-white/95 shadow-sm backdrop-blur-md transition-transform duration-300 ease-out ${isVisible ? "translate-y-0" : "-translate-y-full"
          }`}
      >{/* ================= DESKTOP ================= */}
        {/* ================= DESKTOP ================= */}
        <div className="relative hidden h-16 w-full items-center px-4 lg:flex">

          {/* ================= LEFT SECTION ================= */}
          <div className="flex items-center gap-8">

            {/* LOGO */}
            <Link href="/" className="group flex items-center">
              <div className="relative mr-1 -top-2 flex items-center justify-center">
                <span className="absolute inline-flex h-4 w-4 animate-ping rounded-full bg-[rgb(255,193,0)] opacity-80"></span>

                <span className="relative inline-flex h-4 w-4 rounded-full bg-[rgb(255,193,0)] shadow-[0_0_15px_rgba(255,193,0,.8)] transition group-hover:scale-110"></span>
              </div>

              <span
                className="text-2xl font-bold tracking-tight text-[rgb(207,0,6)]"
                style={{ fontFamily: "Candal, sans-serif" }}
              >
                nterior
              </span>
            </Link>

            {/* TOGGLE */}
            <div className="hidden lg:flex rounded-full bg-gray-100 p-1 shadow-sm">
              <Link
                href="/products"
                className={`rounded-full px-7 py-2.5 text-sm font-bold transition ${isProduct
                    ? "bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] text-white shadow-lg"
                    : "text-gray-600"
                  }`}
              >
                E-Commerce
              </Link>

              <Link
                href="/crm"
                className={`rounded-full px-7 py-2.5 text-sm font-bold transition ${!isProduct
                    ? "bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] text-white shadow-lg"
                    : "text-gray-600"
                  }`}
              >
                CRM
              </Link>
            </div>

          </div>


          {/* ================= CENTER NAVIGATION ================= */}
          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:flex h-14 items-center rounded-full border border-gray-100 bg-gray-50/70 px-2 shadow-sm">

            {[
              { name: "Features", href: "/#features" },
              { name: "Pricing", href: "/pricing" },
              { name: "About", href: "/about" },
              { name: "Contact", href: "/contact-us" },
            ].map((item) => {

              const isActive =
                pathname === item.href ||
                (item.href.includes("#") && pathname === "/");

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group relative flex h-11 items-center rounded-full px-6 text-sm font-bold transition-all duration-300 ${isActive
                      ? "bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] text-white shadow-lg"
                      : "text-gray-700 hover:bg-orange-50 hover:text-[rgb(207,0,6)]"
                    }`}
                >
                  <span>{item.name}</span>

                  {!isActive && (
                    <span className="absolute bottom-2 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-[rgb(207,0,6)] transition-all duration-300 group-hover:w-10"></span>
                  )}
                </Link>
              );
            })}

          </div>


          {/* ================= RIGHT SECTION ================= */}
          <div className="ml-auto flex items-center gap-3">

            {isAuthenticated && user ? (

              <div className="relative" ref={dropdownRef}>

                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-slate-100 transition-colors hover:bg-slate-200"
                >
                  <User size={20} className="text-slate-600" />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-3 w-48 overflow-hidden rounded-2xl border border-slate-100 bg-white py-2 text-sm shadow-xl"
                    >

                      <Link
                        href={getDashboardPath(user?.role as string)}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-slate-700 transition-colors hover:bg-slate-50"
                      >
                        <LayoutDashboard size={16} />
                        Dashboard
                      </Link>

                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          handleLogout();
                        }}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-red-600 transition-colors hover:bg-red-50"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>

                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

            ) : (

              <div className="flex items-center gap-2">

                <Link
                  href="/login"
                  className="hidden px-4 py-2 text-sm font-bold text-slate-600 transition hover:text-[rgb(207,0,6)] sm:block"
                >
                  Log in
                </Link>

                <Link
                  href="/register"
                  className="rounded-xl bg-[rgb(207,0,6)] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-900/10 transition-all hover:bg-[rgb(180,0,5)] active:scale-95"
                >
                  Start Free Trial
                </Link>

              </div>

            )}

          </div>

        </div>
        {/* ================= MOBILE ================= */}
        <div className="lg:hidden">
          <div className="flex h-16 items-center justify-between px-4">

            {/* Logo */}
            <Link href="/" className="group flex items-center">
              <div className="relative mr-1 -top-2 flex h-3 w-3 items-center justify-center">
                <span className="absolute inline-flex h-4 w-4 animate-ping rounded-full bg-yellow-400 opacity-80"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-yellow-400"></span>
              </div>

              <span
                className="text-xl font-bold text-[rgb(207,0,6)]"
                style={{ fontFamily: "Candal, sans-serif" }}
              >
                nterior
              </span>
            </Link>

            {/* Toggle */}
            <div className="flex items-center rounded-full bg-gray-100 p-1 shadow-sm">
              <Link
                href="/products"
                className={`rounded-full px-5 py-2 text-xs font-bold transition-all duration-300 ${isProduct
                  ? "bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                E-Commerce
              </Link>

              <Link
                href="/crm"
                className={`rounded-full px-5 py-2 text-xs font-bold transition-all duration-300 ${!isProduct
                  ? "bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                CRM
              </Link>
            </div>

            {/* Menu */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 hover:bg-gray-100"
            >
              <Menu size={24} />
            </button>

          </div>
        </div>
      </nav>
      {/* SIDEBAR */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              className="fixed left-0 top-0 flex h-screen w-[85%] flex-col gap-6 overflow-y-auto border-r border-white/20 bg-white/15 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-3xl sm:w-80"
            >
              {/* TOP */}
              <div className="mb-8 flex items-center justify-between">
                <Link href="/" className="group flex items-center">
                  <div className="relative mr-2 -top-1 flex items-center justify-center">
                    <span className="absolute inline-flex h-5 w-5 animate-ping rounded-full bg-[rgb(255,193,0)] opacity-70"></span>
                    <span className="relative inline-flex h-5 w-5 rounded-full bg-[rgb(255,193,0)] shadow-[0_0_25px_rgba(255,193,0,0.95)]"></span>
                  </div>
                  <span
                    className="text-3xl font-bold tracking-tight text-[rgb(207,0,6)] drop-shadow-lg"
                    style={{ fontFamily: "Candal, sans-serif" }}
                  >
                    nterior
                  </span>
                </Link>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-full bg-white/10 p-2 text-white backdrop-blur-md transition-all duration-300 hover:bg-[rgb(255,193,0)]/30 hover:text-[rgb(255,193,0)] hover:border-[rgb(255,193,0)]/40"
                >
                  <X size={24} />
                </button>
              </div>

              {/* MENU */}
              <ul className="flex flex-col gap-1">
                {["Features", "Pricing", "About", "Contact Us"].map(
                  (name) => {
                    const mobilePathMap: Record<string, string> = {
                      Features: "/#features",
                      Pricing: "/pricing",
                      About: "/about",
                      "Contact Us": "/contact-us",
                    };
                    const linkPath = mobilePathMap[name];
                    return (
                      <li key={name}>
                        <Link
                          href={linkPath}
                          onClick={() => setSidebarOpen(false)}
                          className="block rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-lg font-semibold text-white backdrop-blur-md transition-all duration-300 hover:translate-x-2 hover:bg-[rgb(255,193,0)]/25 hover:text-[rgb(255,193,0)] hover:border-[rgb(255,193,0)]/40 hover:shadow-[0_0_25px_rgba(255,193,0,0.35)]"
                        >
                          {name}
                        </Link>
                      </li>
                    );
                  }
                )}
              </ul>
              {/* CTA */}
              <div className="mt-auto border-t border-slate-200/50 pt-6">
                <Link
                  href="/register"
                  onClick={() => setSidebarOpen(false)}
                  className="block w-full rounded-2xl bg-[rgb(207,0,6)] py-4 text-center font-bold text-white shadow-[0_10px_30px_rgba(207,0,6,0.45)] transition-all duration-300 hover:scale-[1.03] hover:bg-[rgb(180,0,5)]"
                >
                  Start Free Trial
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}