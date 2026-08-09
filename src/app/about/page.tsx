"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Users,
    Building2,
    ShieldCheck,
    BarChart3,
    Briefcase,
    Sparkles,
    MonitorSmartphone,
    BadgeCheck,
    Clock3,
} from "lucide-react";

export default function AboutPage() {
    const stats = [
        {
            number: "500+",
            label: "Interior Businesses",
            icon: <Building2 className="w-7 h-7" />,
        },
        {
            number: "12K+",
            label: "Projects Managed",
            icon: <Briefcase className="w-7 h-7" />,
        },
        {
            number: "95%",
            label: "Client Satisfaction",
            icon: <BadgeCheck className="w-7 h-7" />,
        },
        {
            number: "24/7",
            label: "Platform Access",
            icon: <Clock3 className="w-7 h-7" />,
        },
    ];

    const features = [
        {
            title: "Subscription-Based CRM Ecosystem",
            text: "Nterior provides a scalable SaaS subscription model for interior businesses to manage leads, projects, teams, commissions, quotations, and operations from one platform.",
            image:
                "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
        },
        {
            title: "Lead & Referral Automation",
            text: "Track every lead from inquiry to booking while empowering referral partners with real-time commission tracking and performance analytics.",
            image:
                "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
        },
        {
            title: "Modern Design Collaboration",
            text: "Enable designers to upload 2D plans, 3D renders, walkthroughs, and client concepts in a centralized collaborative workspace.",
            image:
                "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
        },
    ];

    const values = [
        {
            icon: <Sparkles className="w-7 h-7" />,
            title: "Innovation",
            text: "We build modern technology solutions designed specifically for the interior industry.",
        },
        {
            icon: <ShieldCheck className="w-7 h-7" />,
            title: "Reliability",
            text: "Enterprise-grade architecture and secure systems ensure uninterrupted business operations.",
        },
        {
            icon: <Users className="w-7 h-7" />,
            title: "Collaboration",
            text: "From sales teams to supervisors, everyone works together through one connected platform.",
        },
        {
            icon: <BarChart3 className="w-7 h-7" />,
            title: "Scalability",
            text: "Whether you manage 10 projects or 10,000, Nterior grows with your business.",
        },
    ];

    return (
        <main className="bg-linear-to-br from-[rgb(255,248,220)] via-white to-[rgb(255,244,210)] overflow-hidden">
            {/* HERO SECTION */}
            <section className="relative min-h-screen flex items-center py-24 sm:py-32 overflow-hidden">
                {/* PREMIUM ABSTRACT INTERIOR BACKGROUND */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">

                    {/* MAIN GRADIENT LIGHT */}
                    <div className="absolute top-[-15%] left-[-10%] w-180 h-180 bg-[rgba(207,0,6,0.08)] rounded-full blur-3xl"></div>

                    <div className="absolute bottom-[-20%] right-[-10%] w-180 h-180 bg-[rgba(255,193,0,0.16)] rounded-full blur-3xl"></div>

                    {/* LARGE ROTATING ARCH */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 50,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute top-[10%] right-[12%] w-130 h-130 rounded-full border border-[rgba(255,193,0,0.12)]"
                        style={{
                            borderTopColor: "rgba(255,193,0,0.5)",
                            borderLeftColor: "transparent",
                            borderBottomColor: "rgba(207,0,6,0.15)",
                            borderRightColor: "transparent",
                        }}
                    />

                    {/* SECOND RING */}
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{
                            duration: 70,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute bottom-[5%] left-[5%] w-105 h-105 rounded-full border border-[rgba(207,0,6,0.10)]"
                        style={{
                            borderBottomColor: "rgba(207,0,6,0.4)",
                            borderTopColor: "transparent",
                            borderLeftColor: "rgba(255,193,0,0.18)",
                            borderRightColor: "transparent",
                        }}
                    />

                    {/* FLOATING DESIGN GRID */}
                    <motion.div
                        animate={{
                            y: [0, -15, 0],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-[18%] left-[10%] hidden xl:grid grid-cols-3 gap-4 -rotate-12"
                    >
                        {[...Array(9)].map((_, i) => (
                            <div
                                key={i}
                                className={`
          rounded-[22px] backdrop-blur-xl border border-white/30
          ${i % 3 === 0
                                        ? "bg-[rgba(207,0,6,0.10)] h-24 w-24"
                                        : i % 2 === 0
                                            ? "bg-[rgba(255,193,0,0.16)] h-20 w-20"
                                            : "bg-white/20 h-16 w-16"
                                    }
        `}
                            />
                        ))}
                    </motion.div>

                    {/* FLOATING INTERIOR LINES */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                x: [0, 30, 0],
                                opacity: [0.3, 0.7, 0.3],
                            }}
                            transition={{
                                duration: 5 + i,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute rounded-full"
                            style={{
                                width: `${180 + i * 40}px`,
                                height: "1px",
                                background:
                                    i % 2 === 0
                                        ? "linear-gradient(to right, transparent, rgba(207,0,6,0.25), transparent)"
                                        : "linear-gradient(to right, transparent, rgba(255,193,0,0.3), transparent)",
                                top: `${15 + i * 12}%`,
                                left: `${i * 8}%`,
                            }}
                        />
                    ))}

                    {/* MOVING LIGHT */}
                    <motion.div
                        animate={{
                            x: ["-20%", "120%"],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-0 left-0 w-52 h-full bg-white/10 blur-3xl rotate-12"
                    />

                    {/* SMALL FLOATING DOTS */}
                    {[...Array(18)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                y: [0, -20, 0],
                                scale: [1, 1.4, 1],
                                opacity: [0.2, 0.8, 0.2],
                            }}
                            transition={{
                                duration: 3 + i * 0.4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute rounded-full"
                            style={{
                                width: `${5 + (i % 4)}px`,
                                height: `${5 + (i % 4)}px`,
                                background:
                                    i % 2 === 0
                                        ? "rgb(207,0,6)"
                                        : "rgb(255,193,0)",
                                left: `${(i * 7) % 100}%`,
                                top: `${(i * 11) % 100}%`,
                                opacity: 0.25,
                            }}
                        />
                    ))}

                    {/* LARGE BLURRED GLASS SHAPES */}
                    <motion.div
                        animate={{
                            rotate: [0, 8, 0],
                            y: [0, -20, 0],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-[20%] right-[20%] w-56 h-56 rounded-[40px] bg-white/10 backdrop-blur-2xl border border-white/20"
                    />

                    <motion.div
                        animate={{
                            rotate: [0, -10, 0],
                            y: [0, 20, 0],
                        }}
                        transition={{
                            duration: 12,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute bottom-[12%] left-[18%] w-44 h-44 rounded-4xl bg-[rgba(255,193,0,0.10)] backdrop-blur-2xl border border-[rgba(255,193,0,0.20)]"
                    />
                </div>
                {/* BACKGROUND GLOWS */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-[rgba(207,0,6,0.08)] rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-lg h-lg bg-[rgba(255,193,0,0.15)] rounded-full blur-3xl"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
                    {/* LEFT */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[rgba(207,0,6,0.08)] border border-[rgba(207,0,6,0.15)] text-[rgb(207,0,6)] font-semibold text-sm mb-6">
                            <MonitorSmartphone className="w-4 h-4" />
                            Premium Interior CRM SaaS Platform
                        </div>

                        <h1 className="text-5xl sm:text-7xl font-extrabold text-[rgb(207,0,6)] leading-tight mb-8">
                            About <span className="text-[rgb(255,170,0)]">Nterior</span>
                        </h1>

                        <p className="text-lg sm:text-xl text-[rgb(120,90,0)] leading-relaxed mb-8 max-w-2xl">
                            Nterior is a next-generation subscription-based CRM software built
                            exclusively for modern interior design and construction businesses.
                            From lead generation to project execution, our intelligent platform
                            streamlines every workflow into one seamless ecosystem.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/register"
                                className="inline-flex items-center gap-3 rounded-2xl bg-[rgb(207,0,6)] px-8 py-4 font-bold text-white shadow-xl hover:scale-105 transition duration-300"
                            >
                                Start Free Trial
                                <ArrowRight className="w-5 h-5" />
                            </Link>

                            <Link
                                href="/explore-features"
                                className="inline-flex items-center gap-3 rounded-2xl border border-[rgba(207,0,6,0.15)] bg-white px-8 py-4 font-bold text-[rgb(207,0,6)] hover:bg-[rgb(255,248,220)] transition duration-300"
                            >
                                Explore Features
                            </Link>
                        </div>
                    </motion.div>

                    {/* RIGHT */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative h-140 flex items-center justify-center">

                            {/* GLOWING BACKGROUND */}
                            <motion.div
                                animate={{
                                    rotate: 360,
                                }}
                                transition={{
                                    duration: 25,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className="absolute w-[420px] h-[420px] rounded-full border border-[rgba(255,170,0,0.18)]"
                            />

                            <motion.div
                                animate={{
                                    rotate: -360,
                                }}
                                transition={{
                                    duration: 35,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className="absolute w-[520px] h-[520px] rounded-full border border-[rgba(207,0,6,0.12)]"
                            />

                            {/* MAIN CARD */}
                            <div className="relative w-full max-w-[620px] h-[500px] rounded-[40px] overflow-hidden shadow-[0_30px_80px_rgba(255,170,0,0.25)] border border-[rgba(255,193,0,0.2)] bg-black">

                                {/* SLIDING PANELS */}
                                <div className="absolute inset-0 grid grid-cols-3">

                                    {[
                                        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1400&auto=format&fit=crop",
                                        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1400&auto=format&fit=crop",
                                        "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1400&auto=format&fit=crop",
                                    ].map((img, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{
                                                y: i % 2 === 0 ? ["0%", "-12%", "0%"] : ["-10%", "0%", "-10%"],
                                            }}
                                            transition={{
                                                duration: 8 + i * 2,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                            className="relative overflow-hidden"
                                        >
                                            <Image
                                                src={img}
                                                alt={`Interior ${i}`}
                                                width={1200}
                                                height={1200}
                                                className="w-full h-full object-cover scale-110"
                                            />

                                            <div className="absolute inset-0 bg-black/25"></div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* DARK OVERLAY */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10"></div>

                                {/* FLOATING GLASS CARD */}
                                <motion.div
                                    animate={{
                                        y: [0, -10, 0],
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[28px] p-6 shadow-2xl"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>

                                    <h3 className="text-4xl font-extrabold text-white leading-tight mb-4">
                                        Transforming Interior Business Operations
                                    </h3>

                                    <p className="text-white/90 text-lg leading-relaxed">
                                        Empower your company with powerful dashboards,
                                        automated workflows, project tracking,
                                        quotation systems, and collaborative design tools.
                                    </p>
                                </motion.div>

                                {/* LIGHT EFFECT */}
                                <motion.div
                                    animate={{
                                        x: ["-100%", "200%"],
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                    className="absolute top-0 left-0 w-[40%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* STATS */}
            <section className="py-20 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white/80 backdrop-blur-xl rounded-[30px] p-8 border border-[rgba(255,193,0,0.25)] shadow-lg text-center hover:-translate-y-2 transition-all duration-500"
                            >
                                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[rgba(207,0,6,0.12)] to-[rgba(255,193,0,0.2)] flex items-center justify-center text-[rgb(207,0,6)] mb-5">
                                    {item.icon}
                                </div>

                                <h3 className="text-4xl font-extrabold text-[rgb(207,0,6)] mb-2">
                                    {item.number}
                                </h3>

                                <p className="text-[rgb(120,90,0)] font-medium">
                                    {item.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* STORY SECTIONS */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-28">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`grid lg:grid-cols-2 gap-14 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7 }}
                                viewport={{ once: true }}
                                className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}
                            >
                                <div className="relative rounded-[36px] overflow-hidden shadow-2xl border border-[rgba(255,193,0,0.25)] group">
                                    <Image
                                        src={feature.image}
                                        alt={feature.title}
                                        width={1200}
                                        height={800}
                                        className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7, delay: 0.1 }}
                                viewport={{ once: true }}
                            >
                                <span className="inline-flex px-4 py-2 rounded-full bg-[rgba(207,0,6,0.08)] text-[rgb(207,0,6)] font-semibold text-sm border border-[rgba(207,0,6,0.15)] mb-5">
                                    Why Businesses Choose Nterior
                                </span>

                                <h2 className="text-4xl sm:text-5xl font-extrabold text-[rgb(207,0,6)] leading-tight mb-6">
                                    {feature.title}
                                </h2>

                                <p className="text-lg text-[rgb(120,90,0)] leading-relaxed mb-8">
                                    {feature.text}
                                </p>

                                <div className="space-y-4">
                                    {[
                                        "Professional workflow automation",
                                        "Modern cloud-based architecture",
                                        "Real-time team collaboration",
                                        "Secure and scalable subscription model",
                                    ].map((point, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-4 bg-white/80 rounded-2xl p-4 border border-[rgba(255,193,0,0.15)] shadow-sm"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-[rgb(207,0,6)] text-white flex items-center justify-center font-bold">
                                                ✓
                                            </div>

                                            <p className="text-[rgb(120,90,0)] font-medium">
                                                {point}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CORE VALUES */}
            <section className="py-24 relative">
                <div className="absolute inset-0 bg-[rgba(255,193,0,0.06)]"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="inline-flex px-4 py-2 rounded-full bg-[rgba(207,0,6,0.08)] text-[rgb(207,0,6)] font-semibold text-sm border border-[rgba(207,0,6,0.15)] mb-5">
                            Our Core Values
                        </span>

                        <h2 className="text-4xl sm:text-5xl font-extrabold text-[rgb(207,0,6)] mb-6">
                            Built For The Future Of Interior Businesses
                        </h2>

                        <p className="text-lg text-[rgb(120,90,0)] leading-relaxed">
                            Nterior combines technology, automation, and collaboration to help
                            interior companies scale faster while maintaining operational excellence.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group bg-white/85 backdrop-blur-xl rounded-[32px] p-8 border border-[rgba(255,193,0,0.25)] shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[rgba(207,0,6,0.12)] to-[rgba(255,193,0,0.2)] flex items-center justify-center text-[rgb(207,0,6)] mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {value.icon}
                                </div>

                                <h3 className="text-2xl font-bold text-[rgb(207,0,6)] mb-4">
                                    {value.title}
                                </h3>

                                <p className="text-[rgb(120,90,0)] leading-relaxed">
                                    {value.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="max-w-6xl mx-auto rounded-[40px] bg-gradient-to-r from-[rgb(207,0,6)] to-[rgb(255,140,0)] p-10 sm:p-16 text-center shadow-2xl overflow-hidden relative"
                >
                    <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <h2 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight mb-6">
                            Ready To Transform Your Interior Business?
                        </h2>

                        <p className="text-white/90 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto mb-10">
                            Join Nterior and experience a modern subscription-based CRM ecosystem
                            designed to simplify operations, boost sales, improve collaboration,
                            and scale your company efficiently.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/register"
                                className="inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 font-bold text-[rgb(207,0,6)] shadow-xl hover:scale-105 transition duration-300"
                            >
                                Start Free Trial
                                <ArrowRight className="w-5 h-5" />
                            </Link>

                            <Link
                                href="/pricing"
                                className="inline-flex items-center gap-3 rounded-2xl border border-white/30 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-xl hover:bg-white/20 transition duration-300"
                            >
                                View Pricing
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
