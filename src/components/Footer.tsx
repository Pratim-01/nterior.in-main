"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white text-black py-12 border-t border-[rgba(207,0,6,0.1)]">

      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* BRAND */}
        <div className="col-span-1 md:col-span-2">

          {/* LOGO */}
          <div className="flex items-center mb-5 group">

            <div className="relative mr-2 -top-1 flex items-center justify-center">
              <span className="absolute inline-flex h-5 w-5 animate-ping rounded-full bg-[rgb(255,193,0)] opacity-70"></span>

              <span className="relative inline-flex h-5 w-5 rounded-full bg-[rgb(255,193,0)] shadow-[0_0_25px_rgba(255,193,0,0.95)]"></span>
            </div>
            {/* TEXT */}
            <span
              className="text-3xl tracking-tight text-[rgb(207,0,6)]"
              style={{ fontFamily: "Candal, sans-serif" }}
            >
              nterior
            </span>
          </div>

          {/* DESCRIPTION */}
          <p className="max-w-md text-slate-700 leading-relaxed">
            The ultimate CRM for modern interior design and renovation
            companies. Manage your projects, clients, vendors, billing,
            and workflow seamlessly in one powerful platform.
          </p>
        </div>

        {/* PRODUCT */}
        <div>
          <h4 className="text-[rgb(207,0,6)] font-bold mb-5 text-lg">
            Product
          </h4>

          <ul className="space-y-3 text-sm text-slate-700">

            <li>
              <Link
                href="#features"
                className="hover:text-[rgb(207,0,6)] transition"
              >
                Features
              </Link>
            </li>

            <li>
              <Link
                href="/pricing"
                className="hover:text-[rgb(207,0,6)] transition"
              >
                Pricing
              </Link>
            </li>

            <li>
              <Link
                href="/register"
                className="hover:text-[rgb(207,0,6)] transition"
              >
                Start 2-Month Trial
              </Link>
            </li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h4 className="text-[rgb(207,0,6)] font-bold mb-5 text-lg">
            Company
          </h4>

          <ul className="space-y-3 text-sm text-slate-700">

            <li>
              <Link
                href="/about"
                className="hover:text-[rgb(207,0,6)] transition"
              >
                About Us
              </Link>
            </li>

            <li>
              <Link
                href="/contact-us"
                className="hover:text-[rgb(207,0,6)] transition"
              >
                Contact Support
              </Link>
            </li>

            <li>
              <Link
                href="/privacy"
                className="hover:text-[rgb(207,0,6)] transition"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-[rgba(207,0,6,0.1)] flex flex-col md:flex-row items-center justify-between gap-4">

        <p className="text-sm text-slate-500 text-center md:text-left">
          © {new Date().getFullYear()} Nterior CRM. All rights reserved.
        </p>

        <div className="flex items-center gap-5 text-sm text-slate-500">

          <Link
            href="/terms"
            className="hover:text-[rgb(207,0,6)] transition"
          >
            Terms
          </Link>

          <Link
            href="/privacy"
            className="hover:text-[rgb(207,0,6)] transition"
          >
            Privacy
          </Link>

          <Link
            href="/contact-us"
            className="hover:text-[rgb(207,0,6)] transition"
          >
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
}