"use client";
import Link from "next/link";
import {
    Mail,
    Phone,
    MapPin,
} from "lucide-react";
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaYoutube,
} from "react-icons/fa";
export default function Footer() {
    return (
        <footer className="bg-gray-950 text-gray-300">
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid gap-12 lg:grid-cols-5">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <h2 className="text-4xl font-black text-white">
                            NT<span className="text-[rgb(255,170,0)]">ERIOR</span>
                        </h2>
                        <p className="mt-6 leading-8 text-gray-400">
                            Premium interior design and furniture marketplace
                            delivering elegant spaces for modern homes.
                        </p>
                        <div className="mt-8 space-y-4">
                            <div className="flex items-center gap-3">
                                <Phone size={18} />
                                +91 99999 99999
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={18} />
                                info@nterior.com
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin size={18} />
                                Kolkata, India
                            </div>
                        </div>
                    </div>
                    {/* Links */}
                    <div>
                        <h3 className="text-xl font-bold text-white">
                            Shop
                        </h3>
                        <div className="mt-6 space-y-4">
                            {[
                                "Living Room",
                                "Bedroom",
                                "Kitchen",
                                "Lighting",
                                "Decor",
                            ].map((item) => (
                                <Link
                                    key={item}
                                    href="#"
                                    className="block hover:text-[rgb(255,170,0)]"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">
                            Company
                        </h3>
                        <div className="mt-6 space-y-4">
                            {[
                                "About",
                                "Projects",
                                "Careers",
                                "Contact",
                                "Blog",
                            ].map((item) => (
                                <Link
                                    key={item}
                                    href="#"
                                    className="block hover:text-[rgb(255,170,0)]"
                                >
                                    {item}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">
                            Follow Us
                        </h3>
                        <div className="mt-6 flex gap-4">
                            {[
                                FaFacebookF,
                                FaInstagram,
                                FaLinkedinIn,
                                FaYoutube,
                            ].map((Icon, i) => (
                                <button
                                    key={i}
                                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-800 hover:bg-[rgb(207,0,6)] transition"
                                >
                                    <Icon size={18} />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-gray-800 pt-8 flex flex-col gap-4 md:flex-row md:justify-between">
                    <p>
                        © {new Date().getFullYear()} Nterior. All Rights Reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="#">
                            Privacy Policy
                        </Link>
                        <Link href="#">
                            Terms
                        </Link>
                        <Link href="#">
                            Refund Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}