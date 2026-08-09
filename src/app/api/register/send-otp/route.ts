import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import mysql from "mysql2/promise";
export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  const now = new Date();

  const kolkataTime = new Date(
    now.toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    })
  );
  await connection.execute(
    `
  INSERT INTO email_verifications
  (email, otp, created_at)
  VALUES (?, ?, ?)
  `,
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
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Nterior Email Verification",
    html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Nterior Email Verification</title>
</head>
<body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fb;padding:40px 0;">
<tr>
<td align="center">
<table width="620" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;">
<!-- Header -->
<tr>
<td style="background:linear-gradient(135deg,#cf0006,#ffb000);padding:35px;text-align:center;">
<h1 style="margin:0;color:#ffffff;font-size:34px;font-weight:700;">
Nterior
</h1>
<p style="margin-top:8px;color:#fff;font-size:16px;">
The Complete CRM for Interior Companies
</p>
</td>
</tr>
<!-- Body -->
<tr>
<td style="padding:40px;">
<h2 style="margin-top:0;color:#111827;">
Verify Your Email Address
</h2>
<p style="font-size:16px;color:#4b5563;line-height:1.8;">
Hello,
</p>
<p style="font-size:16px;color:#4b5563;line-height:1.8;">
Thank you for registering with <strong>Nterior</strong>.
To protect your account and verify your email address, please enter the verification code below.
</p>
<div style="
margin:35px auto;
background:#fff7ed;
border:2px dashed #cf0006;
border-radius:12px;
padding:25px;
text-align:center;
">
<p style="margin:0;color:#6b7280;font-size:14px;">
Your Verification Code
</p>
<h1 style="
margin:15px 0 0;
font-size:44px;
letter-spacing:12px;
color:#cf0006;
font-weight:bold;
">
${otp}
</h1>
</div>
<p style="font-size:15px;color:#374151;line-height:1.8;">
This verification code is valid for <strong>10 minutes</strong>.
For your security, never share this code with anyone.
</p>
<hr style="margin:35px 0;border:none;border-top:1px solid #e5e7eb;">
<h3 style="color:#111827;">
Why am I receiving this email?
</h3>
<p style="font-size:15px;color:#4b5563;line-height:1.8;">
Someone (hopefully you) recently requested to create a new Nterior account using this email address.
If this was you, simply enter the verification code above to continue your registration.
</p>
<p style="font-size:15px;color:#4b5563;line-height:1.8;">
If you did not request this verification, you can safely ignore this email.
No account will be created without successful verification.
</p>
</td>
</tr>
<!-- Footer -->
<tr>
<td style="background:#f9fafb;padding:30px;text-align:center;border-top:1px solid #e5e7eb;">
<p style="margin:0;font-size:14px;color:#6b7280;">
Need help? Contact our support team.
</p>
<p style="margin-top:10px;font-size:14px;">
📧 support@nterior.in
</p>
<p style="margin-top:20px;font-size:13px;color:#9ca3af;">
© ${new Date().getFullYear()} Nterior(John Management Pvt. Ltd.) All Rights Reserved.<br>
The Complete CRM Platform for Interior Companies.
</p>
<p style="margin-top:12px;font-size:12px;color:#9ca3af;">
This is an automated email. Please do not reply to this message.
</p>
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>
`,
  });
  return NextResponse.json({
    success: true,
    message: "OTP sent successfully",
  });
}