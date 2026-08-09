"use client";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    CheckCircle,
} from "lucide-react";
export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showForgotModal, setShowForgotModal] = useState(false);
    const [forgotLoading, setForgotLoading] = useState(false);
    const [forgotError, setForgotError] = useState("");
    const [forgotSuccess, setForgotSuccess] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);
    const [forgotData, setForgotData] = useState({
        email: "",
        otp: "",
        password: "",
        confirmPassword: "",
    });
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
    });
    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const result = await signIn("credentials", {
            email: formData.email,
            password: formData.password,
            redirect: false,
        });
        setLoading(false);
        if (result?.error) {
            setError("Invalid Email or Password");
            return;
        }
        router.push("/dashboard");
        router.refresh();
    };
    const sendOtp = async () => {
        if (!forgotData.email) {
            setForgotError("Please enter your email address.");
            return;
        }
        setForgotLoading(true);
        setForgotError("");
        setForgotSuccess("");
        try {
            const response = await fetch("/api/forgot-password/send-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: forgotData.email,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                setForgotError(data.message || "Failed to send OTP.");
                return;
            }
            setOtpSent(true);
            setForgotSuccess("OTP has been sent to your email.");
        } catch (error) {
            setForgotError("Something went wrong. Please try again.");
        } finally {
            setForgotLoading(false);
        }
    };
    const verifyOtp = async () => {
        if (!forgotData.otp) {
            setForgotError("Please enter the OTP.");
            return;
        }
        setForgotLoading(true);
        setForgotError("");
        setForgotSuccess("");
        try {
            const response = await fetch("/api/forgot-password/verify-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: forgotData.email,
                    otp: forgotData.otp,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                setForgotError(data.message || "Invalid OTP.");
                return;
            }
            setOtpVerified(true);
            setForgotSuccess("OTP verified successfully.");
        } catch (error) {
            setForgotError("Something went wrong. Please try again.");
        } finally {
            setForgotLoading(false);
        }
    };
    const resetPassword = async () => {
        setForgotError("");
        setForgotSuccess("");
        if (!forgotData.password || !forgotData.confirmPassword) {
            setForgotError("Please enter your new password.");
            return;
        }
        if (forgotData.password.length < 6) {
            setForgotError("Password must be at least 6 characters long.");
            return;
        }
        if (forgotData.password !== forgotData.confirmPassword) {
            setForgotError("Passwords do not match.");
            return;
        }
        setForgotLoading(true);
        try {
            const response = await fetch("/api/forgot-password/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: forgotData.email,
                    password: forgotData.password,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                setForgotError(data.message || "Unable to reset password.");
                return;
            }
            setForgotSuccess("Password has been reset successfully.");
            // Close modal after 2 seconds
            setTimeout(() => {
                setShowForgotModal(false);
                setOtpSent(false);
                setOtpVerified(false);
                setForgotData({
                    email: "",
                    otp: "",
                    password: "",
                    confirmPassword: "",
                });
                setForgotError("");
                setForgotSuccess("");
            }, 2000);
        } catch (error) {
            setForgotError("Something went wrong. Please try again.");
        } finally {
            setForgotLoading(false);
        }
    };
    return (
        <main className="min-h-screen bg-gradient-to-br from-[rgb(255,248,220)] via-white to-[rgb(255,244,210)] flex items-center py-20 px-6">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                {/* LOGIN */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="bg-white/80 backdrop-blur-xl rounded-[36px] shadow-xl border border-[rgba(255,193,0,0.25)] p-8">
                        <div className="mb-8">
                            <h1 className="text-4xl font-extrabold text-[rgb(207,0,6)]">
                                Welcome Back
                            </h1>
                            <p className="mt-2 text-slate-600">
                                Sign in to continue to your dashboard.
                            </p>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >
                            {/* EMAIL */}
                            <div className="relative">
                                <Mail
                                    className="absolute left-4 top-4 text-gray-400"
                                    size={20}
                                />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    required
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        })
                                    }
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-[rgb(207,0,6)]"
                                />
                            </div>
                            {/* PASSWORD */}
                            <div className="relative">
                                <Lock
                                    className="absolute left-4 top-4 text-gray-400"
                                    size={20}
                                />
                                <input
                                    type={
                                        showPassword ? "text" : "password"
                                    }
                                    placeholder="Password"
                                    required
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            password: e.target.value,
                                        })
                                    }
                                    className="w-full pl-12 pr-12 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-[rgb(207,0,6)]"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-4 top-4"
                                >
                                    {showPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>
                            </div>
                            {error && (
                                <div className="rounded-xl bg-red-100 border border-red-300 p-3 text-red-700">
                                    {error}
                                </div>
                            )}
                            {/* REMEMBER */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={formData.remember}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                remember:
                                                    e.target.checked,
                                            })
                                        }
                                    />
                                    Remember Me
                                </label>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForgotModal(true);
                                        setForgotError("");
                                        setForgotSuccess("");
                                        setOtpSent(false);
                                        setOtpVerified(false);
                                        setForgotData({
                                            email: "",
                                            otp: "",
                                            password: "",
                                            confirmPassword: "",
                                        });
                                    }}
                                    className="text-sm text-[rgb(207,0,6)] hover:underline"
                                >
                                    Forgot Password?
                                </button>
                            </div>
                            <button
                                disabled={loading}
                                className="w-full py-4 rounded-2xl bg-[rgb(207,0,6)] hover:bg-red-700 transition text-white font-bold disabled:opacity-60"
                            >
                                {loading
                                    ? "Signing In..."
                                    : "Login"}
                            </button>
                            <p className="text-center text-sm text-slate-600">
                                Don't have an account?{" "}
                                <Link
                                    href="/register"
                                    className="text-[rgb(207,0,6)] font-semibold hover:underline"
                                >
                                    Register
                                </Link>
                            </p>
                        </form>
                    </div>
                </motion.div>
                {/* RIGHT */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="hidden lg:block"
                >
                    <div className="rounded-[36px] bg-gradient-to-br from-[rgb(207,0,6)] to-[rgb(255,170,0)] p-12 shadow-2xl text-white">
                        <h2 className="text-5xl font-extrabold leading-tight">
                            Manage Your Interior Business Smarter
                        </h2>
                        <p className="mt-6 text-lg text-white/90 leading-relaxed">
                            Everything you need to manage leads,
                            clients, quotations, projects,
                            attendance and payments in one
                            powerful CRM.
                        </p>
                        <div className="mt-10 space-y-5">
                            {[
                                "Lead Management",
                                "Project Tracking",
                                "Client Management",
                                "Site Visits",
                                "Attendance System",
                                "Invoices",
                                "Payment Tracking",
                                "Powerful Analytics",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-4"
                                >
                                    <CheckCircle className="text-yellow-200" />
                                    <span className="text-lg">
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
            {/* Forgot Password Modal */}
            {showForgotModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 relative"
                    >
                        {/* Close */}
                        <button
                            type="button"
                            onClick={() => {
                                setShowForgotModal(false);
                                setOtpSent(false);
                                setOtpVerified(false);
                                setForgotError("");
                                setForgotSuccess("");
                            }}
                            className="absolute right-5 top-5 text-gray-500 hover:text-red-600 text-2xl"
                        >
                            ×
                        </button>
                        <h2 className="text-3xl font-bold text-[rgb(207,0,6)] mb-2">
                            Forgot Password
                        </h2>
                        <p className="text-gray-500 mb-6">
                            Verify your email to reset your password.
                        </p>
                        {/* EMAIL */}
                        <div className="relative mb-4">
                            <Mail
                                className="absolute left-4 top-4 text-gray-400"
                                size={20}
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={forgotData.email}
                                disabled={otpSent}
                                onChange={(e) =>
                                    setForgotData({
                                        ...forgotData,
                                        email: e.target.value,
                                    })
                                }
                                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-[rgb(207,0,6)] disabled:bg-gray-100"
                            />
                        </div>
                        {/* SEND OTP */}
                        {!otpSent && (
                            <button
                                type="button"
                                onClick={sendOtp}
                                disabled={forgotLoading}
                                className="w-full py-4 rounded-2xl bg-[rgb(207,0,6)] text-white font-bold hover:bg-red-700 transition"
                            >
                                {forgotLoading ? "Sending OTP..." : "Send OTP"}
                            </button>
                        )}
                        {/* OTP */}
                        {otpSent && !otpVerified && (
                            <>
                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    value={forgotData.otp}
                                    onChange={(e) =>
                                        setForgotData({
                                            ...forgotData,
                                            otp: e.target.value,
                                        })
                                    }
                                    className="w-full mt-5 px-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-[rgb(207,0,6)]"
                                />
                                <button
                                    type="button"
                                    onClick={verifyOtp}
                                    disabled={forgotLoading}
                                    className="w-full mt-4 py-4 rounded-2xl bg-green-600 text-white font-bold hover:bg-green-700 transition"
                                >
                                    {forgotLoading ? "Verifying..." : "Verify OTP"}
                                </button>
                            </>
                        )}
                        {/* PASSWORD */}
                        {otpVerified && (
                            <>
                                <div className="relative mt-5">
                                    <Lock
                                        className="absolute left-4 top-4 text-gray-400"
                                        size={20}
                                    />
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        placeholder="New Password"
                                        value={forgotData.password}
                                        onChange={(e) =>
                                            setForgotData({
                                                ...forgotData,
                                                password: e.target.value,
                                            })
                                        }
                                        className="w-full pl-12 pr-12 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-[rgb(207,0,6)]"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowNewPassword(!showNewPassword)
                                        }
                                        className="absolute right-4 top-4"
                                    >
                                        {showNewPassword ? (
                                            <EyeOff size={20} />
                                        ) : (
                                            <Eye size={20} />
                                        )}
                                    </button>
                                </div>
                                <div className="relative mt-4">
                                    <Lock
                                        className="absolute left-4 top-4 text-gray-400"
                                        size={20}
                                    />
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={forgotData.confirmPassword}
                                        onChange={(e) =>
                                            setForgotData({
                                                ...forgotData,
                                                confirmPassword: e.target.value,
                                            })
                                        }
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-[rgb(207,0,6)]"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={resetPassword}
                                    disabled={forgotLoading}
                                    className="w-full mt-5 py-4 rounded-2xl bg-[rgb(207,0,6)] text-white font-bold hover:bg-red-700 transition"
                                >
                                    {forgotLoading
                                        ? "Updating Password..."
                                        : "Reset Password"}
                                </button>
                            </>
                        )}
                        {/* SUCCESS */}
                        {forgotSuccess && (
                            <div className="mt-5 rounded-xl bg-green-100 border border-green-300 p-3 text-green-700">
                                {forgotSuccess}
                            </div>
                        )}
                        {/* ERROR */}
                        {forgotError && (
                            <div className="mt-5 rounded-xl bg-red-100 border border-red-300 p-3 text-red-700">
                                {forgotError}
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </main>
    );
}