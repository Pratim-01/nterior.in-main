"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Building2,
    User,
    Mail,
    Phone,
    MapPin,
    Users,
    Lock,
    Eye,
    EyeOff,
    CheckCircle,
} from "lucide-react";
export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        company_name: "",
        owner_name: "",
        email: "",
        phone: "",
        city: "",
        employees: "",
        join_as: "",
        company_id: "",
        password: "",
        confirm_password: "",
    });
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const [sendingOtp, setSendingOtp] = useState(false);
    const [verifyingOtp, setVerifyingOtp] = useState(false);
    const [otpMessage, setOtpMessage] = useState("");
    const sendOTP = async () => {
        if (!formData.email) {
            alert("Please enter your email first.");
            return;
        }
        setSendingOtp(true);
        try {
            const res = await fetch("/api/register/send-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                alert(data.message);
                return;
            }
            setOtpSent(true);
            setOtpMessage(
                "A 4-digit verification code has been sent to your email. Please check your Inbox. If you don't see it within a minute, kindly check your Spam/Junk folder."
            );
            alert("Verification code sent successfully.");
        } catch {
            setOtpMessage("");
            alert("Failed to send verification code.");
        }
        setSendingOtp(false);
    };
    const verifyOTP = async () => {
        if (!otp) {
            alert("Enter verification code.");
            return;
        }
        setVerifyingOtp(true);
        try {
            const res = await fetch("/api/register/verify-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    otp: otp,
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                alert(data.message);
                return;
            }
            alert("Email Verified Successfully.");
            setEmailVerified(true);
            setOtpMessage("");
        } catch {
            alert("Verification Failed.");
        }
        setVerifyingOtp(false);
    };
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirm_password) {
            alert("Passwords do not match.");
            return;
        }
        if (!formData.join_as) {
            alert("Please select Join As.");
            return;
        }
        if (!emailVerified) {
            alert("Please verify your email first.");
            return;
        }
        if (
            formData.join_as === "Client" &&
            !formData.company_id.trim()
        ) {
            alert("Company ID is required.");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    email_verified: emailVerified,
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                alert(data.message || "Registration failed.");
                return;
            }
            alert("Account Created Successfully.");
            setFormData({
                company_name: "",
                owner_name: "",
                email: "",
                phone: "",
                city: "",
                employees: "",
                join_as: "",
                company_id: "",
                password: "",
                confirm_password: "",
            });
        } catch (err) {
            alert("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <main className="min-h-screen bg-gradient-to-br from-[rgb(255,248,220)] via-white to-[rgb(255,244,210)] flex items-center py-20 px-6">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Section */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="bg-white/80 backdrop-blur-xl rounded-[36px] shadow-xl border border-[rgba(255,193,0,0.25)] p-8">
                        <div className="mb-8">
                            <h1 className="text-4xl font-extrabold text-[rgb(207,0,6)]">
                                Create Your Account
                            </h1>
                            <p className="mt-2 text-slate-600">
                                Start your 2 Months Free Trial today.
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Company */}
                            <div>
                                <label className="block mb-2 text-sm font-semibold text-slate-700">
                                    Company Name <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Building2 className="absolute left-4 top-4 text-gray-400" size={20} />
                                    <input
                                        name="company_name"
                                        placeholder="Enter your company name"
                                        value={formData.company_name}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-[rgb(207,0,6)]"
                                    />
                                </div>
                            </div>
                            {/* Owner */}
                            <div>
                                <label className="block mb-2 text-sm font-semibold text-slate-700">
                                    Owner Name <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-4 text-gray-400" size={20} />
                                    <input
                                        name="owner_name"
                                        placeholder="Enter owner's full name"
                                        value={formData.owner_name}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-[rgb(207,0,6)]"
                                    />
                                </div>
                            </div>
                            {/* Email */}
                            <div>
                                <label className="block mb-2 text-sm font-semibold text-slate-700">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <div className="flex gap-3">
                                    <div className="relative flex-1">
                                        <Mail
                                            className="absolute left-4 top-4 text-gray-400"
                                            size={20}
                                        />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="example@company.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            disabled={emailVerified}
                                            required
                                            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-[rgb(207,0,6)] disabled:bg-gray-100"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        disabled={sendingOtp || emailVerified}
                                        onClick={sendOTP}
                                        className="px-5 rounded-2xl bg-[rgb(207,0,6)] text-white font-semibold hover:bg-red-700 disabled:bg-gray-400"
                                    >
                                        {emailVerified
                                            ? "Verified"
                                            : sendingOtp
                                                ? "Sending..."
                                                : "Send OTP"}
                                    </button>
                                </div>
                            </div>
                            {otpSent && !emailVerified && (
                                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                                    <p className="text-sm font-semibold text-amber-900">
                                        📧 Verification code sent successfully!
                                    </p>
                                    <p className="mt-2 text-sm text-amber-700 leading-relaxed">
                                        {otpMessage}
                                    </p>
                                </div>
                            )}
                            {otpSent && !emailVerified && (
                                <div>
                                    <label className="block mb-2 text-sm font-semibold text-slate-700">
                                        Verification Code
                                    </label>
                                    <div className="flex gap-3">
                                        <input
                                            type="text"
                                            placeholder="Enter 4 digit code"
                                            value={otp}
                                            maxLength={4}
                                            onChange={(e) => setOtp(e.target.value)}
                                            className="flex-1 px-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-[rgb(207,0,6)]"
                                        />
                                        <button
                                            type="button"
                                            onClick={verifyOTP}
                                            disabled={verifyingOtp}
                                            className="px-5 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-semibold"
                                        >
                                            {verifyingOtp ? "Verifying..." : "Verify"}
                                        </button>
                                    </div>
                                </div>
                            )}
                            {/* Phone */}
                            <div>
                                <label className="block mb-2 text-sm font-semibold text-slate-700">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-4 text-gray-400" size={20} />
                                    <input
                                        name="phone"
                                        placeholder="+91 XXXXX XXXXX"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-[rgb(207,0,6)]"
                                    />
                                </div>
                            </div>
                            {/* City + Employees */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-2 text-sm font-semibold text-slate-700">
                                        City
                                    </label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-4 text-gray-400" size={20} />
                                        <input
                                            name="city"
                                            placeholder="Enter city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-[rgb(207,0,6)]"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-semibold text-slate-700">
                                        Number of Employees
                                    </label>
                                    <div className="relative">
                                        <Users className="absolute left-4 top-4 text-gray-400" size={20} />
                                        <input
                                            type="number"
                                            name="employees"
                                            placeholder="e.g. 25"
                                            value={formData.employees}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-[rgb(207,0,6)]"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Join As */}
                            <div>
                                <label className="block mb-2 text-sm font-semibold text-slate-700">
                                    Join As <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="join_as"
                                    value={formData.join_as}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-[rgb(207,0,6)] bg-white"
                                >
                                    <option value="">Select User Type</option>
                                    <option value="Interior Company">Interior Company</option>
                                    <option value="Client">Client</option>
                                </select>
                            </div>
                            {/* Company ID (Only for Client) */}
                            {formData.join_as === "Client" && (
                                <div>
                                    <label className="block mb-2 text-sm font-semibold text-slate-700">
                                        Company ID <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="company_id"
                                        placeholder="Enter Company ID"
                                        value={formData.company_id}
                                        onChange={handleChange}
                                        required={formData.join_as === "Client"}
                                        className="w-full px-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-[rgb(207,0,6)]"
                                    />
                                </div>
                            )}
                            {/* Password */}
                            <div>
                                <label className="block mb-2 text-sm font-semibold text-slate-700">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-4 text-gray-400" size={20} />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Create a strong password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-12 pr-12 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-[rgb(207,0,6)]"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-4"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                            {/* Confirm Password */}
                            <div>
                                <label className="block mb-2 text-sm font-semibold text-slate-700">
                                    Confirm Password <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-4 text-gray-400" size={20} />
                                    <input
                                        type={showConfirm ? "text" : "password"}
                                        name="confirm_password"
                                        placeholder="Re-enter your password"
                                        value={formData.confirm_password}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-12 pr-12 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-[rgb(207,0,6)]"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute right-4 top-4"
                                    >
                                        {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                            <button
                                disabled={loading || !emailVerified}
                                className="w-full py-4 rounded-2xl bg-[rgb(207,0,6)] hover:bg-red-700 text-white font-bold transition"
                            >
                                {loading ? "Creating Account..." : "Create Free Account"}
                            </button>
                            <p className="text-center text-sm text-slate-600">
                                Already have an account?{" "}
                                <Link
                                    href="/login"
                                    className="text-[rgb(207,0,6)] font-semibold hover:underline"
                                >
                                    Login
                                </Link>
                            </p>
                        </form>
                    </div>
                </motion.div>
                {/* Right Section */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="hidden lg:block"
                >
                    <div className="rounded-[36px] bg-gradient-to-br from-[rgb(207,0,6)] to-[rgb(255,170,0)] text-white p-12 shadow-2xl">
                        <h2 className="text-5xl font-extrabold leading-tight">
                            Grow Your Interior Business Faster
                        </h2>
                        <p className="mt-6 text-lg text-white/90 leading-relaxed">
                            Nterior helps Interior Designers and Companies manage every
                            project, client and payment from one beautiful dashboard.
                        </p>
                        <div className="mt-10 space-y-5">
                            {[
                                "Project Management",
                                "Client Management",
                                "Quotations & Invoices",
                                "Attendance System",
                                "Payment Tracking",
                                "Sales Dashboard",
                                "2 Months Free Trial",
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-4">
                                    <CheckCircle className="text-yellow-200" />
                                    <span className="text-lg">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}