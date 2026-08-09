"use client";
import {
  Home,
  PenTool,
  Building2,
  Sofa,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
const services = [
  {
    icon: Home,
    title: "Home Interior",
    text: "Complete interior solutions for apartments and villas.",
  },
  {
    icon: PenTool,
    title: "3D Design",
    text: "Professional visualization before execution.",
  },
  {
    icon: Building2,
    title: "Commercial",
    text: "Office, showroom and retail interior design.",
  },
  {
    icon: Sofa,
    title: "Furniture",
    text: "Premium custom-made furniture for every space.",
  },
];
const steps = [
  "Book Free Consultation",
  "Meet Interior Designer",
  "Receive 3D Designs",
  "Material Selection",
  "Execution",
  "Handover",
];
export default function InteriorServices() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <div>
            <span className="inline-flex rounded-full bg-orange-100 px-5 py-2 text-sm font-bold text-[rgb(207,0,6)]">
              COMPLETE INTERIOR SOLUTION
            </span>
            <h2 className="mt-6 text-5xl font-black text-gray-900 leading-tight">
              From Design
              <br />
              to
              <span className="bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] bg-clip-text text-transparent">
                {" "}Installation
              </span>
            </h2>
            <p className="mt-8 text-lg text-gray-600 leading-8">
              Nterior provides complete end-to-end interior solutions,
              ensuring your dream home becomes reality with one trusted
              partner.
            </p>
            <div className="mt-12 space-y-5">
              {steps.map((step) => (
                <div
                  key={step}
                  className="flex items-center gap-4"
                >
                  <CheckCircle2
                    className="text-green-600"
                    size={24}
                  />
                  <span className="text-lg font-medium text-gray-700">
                    {step}
                  </span>
                </div>
              ))}
            </div>
            <button className="mt-12 rounded-2xl bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] px-8 py-4 text-white font-bold shadow-xl hover:scale-105 transition flex items-center gap-2">
              Book Free Consultation
              <ArrowRight size={18} />
            </button>
          </div>
          {/* Right */}
          <div className="grid grid-cols-2 gap-8">
            {services.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group rounded-[34px] border border-gray-100 bg-gradient-to-br from-white to-orange-50 p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition"
                >
                  <div className="h-20 w-20 rounded-3xl bg-gradient-to-r from-[rgb(255,170,0)] to-[rgb(207,0,6)] flex items-center justify-center">
                    <Icon
                      size={34}
                      className="text-white"
                    />
                  </div>
                  <h3 className="mt-8 text-2xl font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-gray-600 leading-7">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}