"use client";
import {
  Construction,
  ArrowLeft,
  Home,
  Mail,
} from "lucide-react";
import { useRouter } from "next/navigation";
export default function ErrorPage() {
  const router = useRouter();
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[rgb(207,0,6)] via-[#8d0005] to-black flex items-center justify-center px-6">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[rgb(255,170,0)]/20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 h-[32rem] w-[32rem] rounded-full bg-[rgb(207,0,6)]/25 blur-3xl animate-pulse" />
      </div>
      {/* Card */}
      <div className="relative z-10 max-w-3xl w-full rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl p-8 md:p-14 text-center">
        {/* Logo Circle */}
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] shadow-xl">
          <Construction className="h-14 w-14 text-white" />
        </div>
        {/* Badge */}
        <div className="mt-8 inline-flex items-center rounded-full bg-[rgba(255,170,0,0.15)] border border-[rgba(255,170,0,0.35)] px-5 py-2 text-[rgb(255,170,0)] font-semibold">
          Nterior CRM
        </div>
        {/* Error Code */}
        <h2 className="mt-8 text-7xl font-extrabold text-white">
          404
        </h2>
        {/* Heading */}
        <h1 className="mt-4 text-4xl md:text-5xl font-bold text-white">
          Oops! Page Not Found
        </h1>
        {/* Description */}
        <p className="mt-6 text-lg text-white/80 leading-8 max-w-2xl mx-auto">
          The page you're looking for doesn't exist, may have been moved,
          or is currently under development.
        </p>
        <p className="mt-3 text-white/60">
          Continue exploring Nterior or return to the homepage.
        </p>
        {/* Features */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-bold text-white">
              Secure CRM
            </h3>
            <p className="mt-2 text-sm text-white/70">
              Manage clients, leads and projects efficiently.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-bold text-white">
              Smart Automation
            </h3>
            <p className="mt-2 text-sm text-white/70">
              Save time with automated workflows and reminders.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="font-bold text-white">
              Growing Platform
            </h3>
            <p className="mt-2 text-sm text-white/70">
              New features are continuously being added.
            </p>
          </div>
        </div>
        {/* Buttons */}
        <div className="mt-12 flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[rgb(207,0,6)] hover:scale-105 transition"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
          <button
            onClick={() => router.push("/")}
            className="flex items-center justify-center gap-2 rounded-xl bg-[rgb(255,170,0)] px-6 py-3 font-semibold text-black hover:scale-105 transition"
          >
            <Home size={18} />
            Home
          </button>
          <button
            onClick={() => router.push("/contact-us")}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/20 transition"
          >
            <Mail size={18} />
            Contact Us
          </button>
        </div>
        {/* Footer */}
        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-white/50">
          © {new Date().getFullYear()} <span className="font-semibold text-white">Nterior</span> •
          CRM for Interior Design & Construction Businesses
        </div>
      </div>
    </main>
  );
}