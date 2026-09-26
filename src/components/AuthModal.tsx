"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Mail,
    Lock,
    Eye,
    EyeOff,
    Phone,
    User,
    MapPin,
    Building2,
    ShieldCheck,
} from "lucide-react";

type View = "login" | "register";
type RegisterStep = 1 | 2 | 3;

export default function AuthModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [view, setView] = useState<View>("login");
    const [registerStep, setRegisterStep] = useState<RegisterStep>(1);

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // LOGIN
    const [loginData, setLoginData] = useState({ email: "", password: "" });

    // REGISTER
    const [regData, setRegData] = useState({
        phone: "",
        email: "",
        otp: "",
        user_name: "",
        address: "",
        city: "",
        password: "",
        confirm_password: "",
    });

    function resetAndClose() {
        setView("login");
        setRegisterStep(1);
        setError("");
        setLoading(false);
        setShowPassword(false);
        setLoginData({ email: "", password: "" });
        setRegData({
            phone: "",
            email: "",
            otp: "",
            user_name: "",
            address: "",
            city: "",
            password: "",
            confirm_password: "",
        });
        onClose();
    }

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);
        const result = await signIn("customer", {
            email: loginData.email,
            password: loginData.password,
            redirect: false,
        });
        setLoading(false);
        if (result?.error) {
            setError("Invalid email or password.");
            return;
        }
        resetAndClose();
    }

    async function handleSendOtp() {
        setError("");
        if (!regData.phone || !regData.email) {
            setError("Please enter your mobile number and email.");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/customer/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: regData.email, phone: regData.phone }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Failed to send verification code.");
                return;
            }
            setRegisterStep(2);
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    async function handleVerifyOtp() {
        setError("");
        if (!regData.otp) {
            setError("Please enter the verification code.");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/customer/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: regData.email, otp: regData.otp }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Invalid verification code.");
                return;
            }
            setRegisterStep(3);
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    async function handleCreateAccount(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        if (!regData.user_name || !regData.password) {
            setError("Please fill all required fields.");
            return;
        }
        if (regData.password !== regData.confirm_password) {
            setError("Passwords do not match.");
            return;
        }
        if (regData.password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/customer/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phone: regData.phone,
                    email: regData.email,
                    user_name: regData.user_name,
                    address: regData.address,
                    city: regData.city,
                    password: regData.password,
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Registration failed.");
                return;
            }
            // Auto-login right after account creation.
            const result = await signIn("customer", {
                email: regData.email,
                password: regData.password,
                redirect: false,
            });
            if (result?.error) {
                // Account was created but auto-login failed — send them to
                // the login view instead of leaving them stuck.
                setView("login");
                setRegisterStep(1);
                setLoginData({ email: regData.email, password: "" });
                setError("Account created. Please sign in.");
                return;
            }
            resetAndClose();
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
            onClick={resetAndClose}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-md rounded-[28px] bg-white p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
                <button
                    type="button"
                    onClick={resetAndClose}
                    aria-label="Close"
                    className="absolute right-5 top-5 text-gray-400 hover:text-[rgb(207,0,6)]"
                >
                    <X size={22} />
                </button>

                <AnimatePresence mode="wait">
                    {view === "login" ? (
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            <h2 className="text-2xl font-extrabold text-[rgb(207,0,6)]">
                                Login
                            </h2>
                            <p className="mt-1 mb-6 text-sm text-slate-500">
                                Sign in to continue shopping.
                            </p>

                            <form onSubmit={handleLogin} className="space-y-4">
                                <div className="relative">
                                    <Mail className="absolute left-4 top-4 text-gray-400" size={18} />
                                    <input
                                        type="email"
                                        required
                                        placeholder="Email Address"
                                        value={loginData.email}
                                        onChange={(e) =>
                                            setLoginData({ ...loginData, email: e.target.value })
                                        }
                                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[rgb(207,0,6)]"
                                    />
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-4 text-gray-400" size={18} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        placeholder="Password"
                                        value={loginData.password}
                                        onChange={(e) =>
                                            setLoginData({ ...loginData, password: e.target.value })
                                        }
                                        className="w-full pl-11 pr-11 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[rgb(207,0,6)]"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-3.5 text-gray-400"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>

                                {error && (
                                    <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                                        {error}
                                    </div>
                                )}

                                <button
                                    disabled={loading}
                                    className="w-full py-3.5 rounded-2xl bg-[rgb(207,0,6)] hover:bg-red-700 transition text-white font-bold disabled:opacity-60"
                                >
                                    {loading ? "Signing In..." : "Login"}
                                </button>

                                <p className="text-center text-sm text-slate-600">
                                    Don&apos;t have an account?{" "}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setError("");
                                            setView("register");
                                        }}
                                        className="text-[rgb(207,0,6)] font-semibold hover:underline"
                                    >
                                        Register
                                    </button>
                                </p>

                                <p className="text-center text-xs text-slate-400 pt-2 border-t border-gray-100">
                                    <Link
                                        href="/login"
                                        onClick={resetAndClose}
                                        className="hover:text-[rgb(207,0,6)] hover:underline"
                                    >
                                        Want to be a seller?
                                    </Link>
                                </p>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="register"
                            initial={{ opacity: 0, x: 12 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                        >
                            <h2 className="text-2xl font-extrabold text-[rgb(207,0,6)]">
                                Create Account
                            </h2>
                            <p className="mt-1 mb-6 text-sm text-slate-500">
                                {registerStep === 1 &&
                                    "Enter your mobile number and email to get started."}
                                {registerStep === 2 &&
                                    "Enter the verification code sent to your email."}
                                {registerStep === 3 &&
                                    "Just a few more details to finish."}
                            </p>

                            {/* STEP 1 — phone + email */}
                            {registerStep === 1 && (
                                <div className="space-y-4">
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-4 text-gray-400" size={18} />
                                        <input
                                            type="tel"
                                            placeholder="Mobile Number"
                                            value={regData.phone}
                                            onChange={(e) =>
                                                setRegData({ ...regData, phone: e.target.value })
                                            }
                                            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[rgb(207,0,6)]"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-4 text-gray-400" size={18} />
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            value={regData.email}
                                            onChange={(e) =>
                                                setRegData({ ...regData, email: e.target.value })
                                            }
                                            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[rgb(207,0,6)]"
                                        />
                                    </div>

                                    {error && (
                                        <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        type="button"
                                        onClick={handleSendOtp}
                                        disabled={loading}
                                        className="w-full py-3.5 rounded-2xl bg-[rgb(207,0,6)] hover:bg-red-700 transition text-white font-bold disabled:opacity-60"
                                    >
                                        {loading ? "Sending Code..." : "Send Verification Code"}
                                    </button>
                                </div>
                            )}

                            {/* STEP 2 — OTP */}
                            {registerStep === 2 && (
                                <div className="space-y-4">
                                    <div className="relative">
                                        <ShieldCheck className="absolute left-4 top-4 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Enter Verification Code"
                                            value={regData.otp}
                                            onChange={(e) =>
                                                setRegData({ ...regData, otp: e.target.value })
                                            }
                                            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[rgb(207,0,6)]"
                                        />
                                    </div>

                                    {error && (
                                        <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        type="button"
                                        onClick={handleVerifyOtp}
                                        disabled={loading}
                                        className="w-full py-3.5 rounded-2xl bg-green-600 hover:bg-green-700 transition text-white font-bold disabled:opacity-60"
                                    >
                                        {loading ? "Verifying..." : "Verify Code"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setError("");
                                            setRegisterStep(1);
                                        }}
                                        className="w-full text-sm text-slate-500 hover:text-[rgb(207,0,6)]"
                                    >
                                        Back
                                    </button>
                                </div>
                            )}

                            {/* STEP 3 — details + password */}
                            {registerStep === 3 && (
                                <form onSubmit={handleCreateAccount} className="space-y-4">
                                    <div className="relative">
                                        <User className="absolute left-4 top-4 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            required
                                            placeholder="Full Name"
                                            value={regData.user_name}
                                            onChange={(e) =>
                                                setRegData({ ...regData, user_name: e.target.value })
                                            }
                                            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[rgb(207,0,6)]"
                                        />
                                    </div>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-4 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Address"
                                            value={regData.address}
                                            onChange={(e) =>
                                                setRegData({ ...regData, address: e.target.value })
                                            }
                                            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[rgb(207,0,6)]"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Building2 className="absolute left-4 top-4 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            placeholder="City"
                                            value={regData.city}
                                            onChange={(e) =>
                                                setRegData({ ...regData, city: e.target.value })
                                            }
                                            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[rgb(207,0,6)]"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-4 text-gray-400" size={18} />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            placeholder="Password"
                                            value={regData.password}
                                            onChange={(e) =>
                                                setRegData({ ...regData, password: e.target.value })
                                            }
                                            className="w-full pl-11 pr-11 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[rgb(207,0,6)]"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-3.5 text-gray-400"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-4 text-gray-400" size={18} />
                                        <input
                                            type="password"
                                            required
                                            placeholder="Confirm Password"
                                            value={regData.confirm_password}
                                            onChange={(e) =>
                                                setRegData({
                                                    ...regData,
                                                    confirm_password: e.target.value,
                                                })
                                            }
                                            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:outline-none focus:border-[rgb(207,0,6)]"
                                        />
                                    </div>

                                    {error && (
                                        <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        disabled={loading}
                                        className="w-full py-3.5 rounded-2xl bg-[rgb(207,0,6)] hover:bg-red-700 transition text-white font-bold disabled:opacity-60"
                                    >
                                        {loading ? "Creating Account..." : "Create Account"}
                                    </button>
                                </form>
                            )}

                            <p className="mt-5 text-center text-sm text-slate-600">
                                Already have an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setError("");
                                        setView("login");
                                        setRegisterStep(1);
                                    }}
                                    className="text-[rgb(207,0,6)] font-semibold hover:underline"
                                >
                                    Login
                                </button>
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
