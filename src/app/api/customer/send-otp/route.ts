import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { executeQuery } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email, phone } = await req.json();

    if (!email || !phone) {
      return NextResponse.json(
        { success: false, message: "Email and mobile number are required." },
        { status: 400 }
      );
    }

    // Email must not already belong to a customer account.
    const [existingEmail] = await executeQuery(
      `SELECT id FROM users_ecommerce WHERE email = ? LIMIT 1`,
      [email]
    );
    if (existingEmail.length > 0) {
      return NextResponse.json(
        { success: false, message: "This email is already registered." },
        { status: 400 }
      );
    }

    const [existingPhone] = await executeQuery(
      `SELECT id FROM users_ecommerce WHERE phone = ? LIMIT 1`,
      [phone]
    );
    if (existingPhone.length > 0) {
      return NextResponse.json(
        { success: false, message: "This mobile number is already registered." },
        { status: 400 }
      );
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const now = new Date();
    const kolkataTime = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );

    // Shared OTP table (also used by the CRM registration flow) —
    // scoped by email, so re-using it here is safe.
    await executeQuery(
      `INSERT INTO email_verifications (email, otp, created_at) VALUES (?, ?, ?)`,
      [email, otp, kolkataTime]
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Nterior" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Email - Nterior",
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Nterior Email Verification</title></head>
<body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fb;padding:40px 0;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;">
<tr>
<td style="background:linear-gradient(135deg,#cf0006,#ffb000);padding:32px;text-align:center;">
<h1 style="margin:0;color:#ffffff;font-size:30px;font-weight:700;">Nterior</h1>
<p style="margin-top:8px;color:#fff;font-size:15px;">Create Your Account</p>
</td>
</tr>
<tr>
<td style="padding:36px;">
<h2 style="margin-top:0;color:#111827;">Verify Your Email Address</h2>
<p style="font-size:15px;color:#4b5563;line-height:1.8;">
Use the verification code below to continue creating your Nterior account.
</p>
<div style="margin:30px auto;background:#fff7ed;border:2px dashed #cf0006;border-radius:12px;padding:22px;text-align:center;">
<p style="margin:0;color:#6b7280;font-size:13px;">Your Verification Code</p>
<h1 style="margin:12px 0 0;font-size:40px;letter-spacing:10px;color:#cf0006;font-weight:bold;">${otp}</h1>
</div>
<p style="font-size:14px;color:#374151;line-height:1.8;">
This code is valid for 10 minutes. Never share it with anyone.
</p>
</td>
</tr>
<tr>
<td style="background:#f9fafb;padding:24px;text-align:center;border-top:1px solid #e5e7eb;">
<p style="margin:0;font-size:13px;color:#9ca3af;">© ${new Date().getFullYear()} Nterior. All Rights Reserved.</p>
</td>
</tr>
</table>
</td></tr>
</table>
</body>
</html>
`,
    });

    return NextResponse.json({ success: true, message: "Verification code sent." });
  } catch (error) {
    console.error("customer/send-otp error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send verification code." },
      { status: 500 }
    );
  }
}
