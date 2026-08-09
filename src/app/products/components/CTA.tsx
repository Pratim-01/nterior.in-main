"use client";
import Link from "next/link";
import { ArrowRight, PhoneCall, CalendarCheck } from "lucide-react";
export default function CTA() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[rgb(255,170,0)] via-orange-500 to-[rgb(207,0,6)]" />
      <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="rounded-[40px] border border-white/20 bg-white/10 p-12 backdrop-blur-xl lg:p-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex rounded-full bg-white/20 px-5 py-2 text-sm font-bold text-white">
                FREE CONSULTATION
              </span>
              <h2 className="mt-8 text-5xl font-black leading-tight text-white">
                Let's Design
                <br />
                Your Dream Home
              </h2>
              <p className="mt-8 text-lg leading-8 text-white/90">
                Whether you're renovating one room or your entire home,
                our designers are ready to help you with personalized
                solutions.
              </p>
              <div className="mt-10 flex flex-wrap gap-5">
                <Link
                  href="#"
                  className="inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 font-bold text-[rgb(207,0,6)] shadow-xl transition hover:scale-105"
                >
                  <CalendarCheck size={20} />
                  Book Consultation
                </Link>
                <Link
                  href="tel:+919999999999"
                  className="inline-flex items-center gap-3 rounded-2xl border border-white/30 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur transition hover:bg-white/20"
                >
                  <PhoneCall size={20} />
                  Call Now
                </Link>
              </div>
            </div>
            {/* Right */}
            <div className="grid grid-cols-2 gap-6">
              {[
                ["1500+", "Projects"],
                ["5000+", "Products"],
                ["4.9★", "Rating"],
                ["100%", "Satisfaction"],
              ].map(([number, title]) => (
                <div
                  key={title}
                  className="rounded-3xl bg-white/15 p-8 text-center backdrop-blur-lg"
                >
                  <h3 className="text-5xl font-black text-white">
                    {number}
                  </h3>
                  <p className="mt-3 text-white/80">
                    {title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}