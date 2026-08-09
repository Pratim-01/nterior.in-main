"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
} from "lucide-react";
export default function ContactPage() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    company_name: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [highlightForm, setHighlightForm] = useState(false);
  const handleBookDemo = () => {
    setFormData((prev) => ({
      ...prev,
      message:
        "Hello Nterior Team,\n\nI would like to book a personalized demo session of your CRM platform to better understand its features and how it can help streamline my interior business operations. Please contact me to schedule a convenient date and time.\n\nThank you.",
    }));

    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setHighlightForm(true);

    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 500);

    setTimeout(() => {
      setHighlightForm(false);
    }, 2500);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Something went wrong.");
        return;
      }
      setSuccess(data.message);
      setFormData({
        full_name: "",
        email: "",
        company_name: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      setError("Unable to send message.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="bg-gradient-to-br from-[rgb(255,248,220)] via-white to-[rgb(255,244,210)] min-h-screen overflow-hidden">
      {/* HERO */}
      <section className="relative py-24">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[rgba(207,0,6,0.08)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[32rem] h-[32rem] bg-[rgba(255,193,0,0.15)] rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <span className="inline-flex px-5 py-2 rounded-full bg-[rgba(207,0,6,0.08)] text-[rgb(207,0,6)] font-semibold border border-[rgba(207,0,6,0.15)]">
            Contact Nterior
          </span>
          <h1 className="mt-8 text-5xl md:text-7xl font-extrabold text-[rgb(207,0,6)]">
            Let's Build Something
            <span className="block text-[rgb(255,170,0)]">
              Amazing Together
            </span>
          </h1>
          <p className="mt-8 max-w-3xl mx-auto text-xl text-[rgb(120,90,0)] leading-relaxed">
            Have questions about Nterior CRM? Need a custom
            solution for your interior business? Our team is ready
            to help you scale your operations efficiently.
          </p>
        </div>
      </section>
      {/* CONTACT SECTION */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10">
          {/* FORM */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`bg-white/80 backdrop-blur-xl rounded-[36px] border shadow-xl p-8 transition-all duration-500 ${highlightForm
              ? "border-yellow-400 ring-4 ring-yellow-300 shadow-[0_0_40px_rgba(255,193,7,0.6)]"
              : "border-[rgba(255,193,0,0.25)]"
              }`}
          >
            <h2 className="text-3xl font-bold text-[rgb(207,0,6)] mb-8">
              Send Us A Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                ref={nameInputRef}
                type="text"
                placeholder="Full Name"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    full_name: e.target.value,
                  })
                }
                className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-none focus:border-[rgb(207,0,6)]"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-none focus:border-[rgb(207,0,6)]"
              />
              <input
                type="text"
                placeholder="Company Name"
                value={formData.company_name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    company_name: e.target.value,
                  })
                }
                className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-none focus:border-[rgb(207,0,6)]"
              />
              <input
                type="tel"
                placeholder="Phone Number(Whatsapp Prefered)"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
                className="w-full p-4 rounded-2xl border border-slate-200 focus:outline-none focus:border-[rgb(207,0,6)]"
              />
              <textarea
                rows={6}
                placeholder="Tell us about your requirement..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    message: e.target.value,
                  })
                }
                className="w-full p-4 rounded-2xl border border-slate-200 resize-none focus:outline-none focus:border-[rgb(207,0,6)]"
              />
              {success && (
                <div className="rounded-xl bg-green-100 border border-green-300 p-3 text-green-700">
                  {success}
                </div>
              )}
              {error && (
                <div className="rounded-xl bg-red-100 border border-red-300 p-3 text-red-700">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[rgb(207,0,6)] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-[1.02] transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
          {/* CONTACT INFO */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-[36px] border border-[rgba(255,193,0,0.25)] shadow-xl p-8">
              <h2 className="text-3xl font-bold text-[rgb(207,0,6)] mb-8">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="text-[rgb(207,0,6)] mt-1" />

                  <div>
                    <h3 className="font-bold">Email</h3>

                    <p className="text-slate-600">
                      support@nterior.in
                      <br />
                      nteriorx@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="text-[rgb(207,0,6)] mt-1" />
                  <div>
                    <h3 className="font-bold">Phone</h3>
                    <p className="text-slate-600">
                      +91 98304 77791
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="text-[rgb(207,0,6)] mt-1" />
                  <div>
                    <h3 className="font-bold">Office</h3>
                    <p className="text-slate-600">
                      Kolkata, West Bengal, India
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="text-[rgb(207,0,6)] mt-1" />
                  <div>
                    <h3 className="font-bold">Working Hours</h3>
                    <p className="text-slate-600">
                      Monday - Sunday
                    </p>
                    <p className="text-slate-600">
                      10:00 AM - 7:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* QUICK HELP */}
            <div className="bg-gradient-to-r from-[rgb(207,0,6)] to-[rgb(255,140,0)] rounded-[36px] p-8 text-white shadow-xl">
              <h3 className="text-3xl font-bold mb-4">
                Need A Demo?
              </h3>
              <p className="text-white/90 leading-relaxed mb-6">
                Schedule a personalized demonstration and see how
                Nterior CRM can help streamline your interior
                business operations.
              </p>
              <button
                onClick={handleBookDemo}
                className="bg-white text-[rgb(207,0,6)] px-8 py-3 rounded-2xl font-bold hover:scale-105 transition"
              >
                Book Free Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}