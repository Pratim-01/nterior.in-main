import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import nodemailer from "nodemailer";
export async function POST(req: NextRequest) {
  let connection;
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required.",
        },
        { status: 400 }
      );
    }
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    // Check user exists
    const [users]: any = await connection.execute(
      `
      SELECT id, account_status
      FROM users
      WHERE email = ?
      LIMIT 1
      `,
      [email]
    );
    if (users.length === 0) {
      await connection.end();
      return NextResponse.json(
        {
          success: false,
          message: "No account found with this email address.",
        },
        { status: 404 }
      );
    }
    // Blocked account
    if (users[0].account_status === "Blocked") {
      await connection.end();
      return NextResponse.json(
        {
          success: false,
          message:
            "Your account has been blocked. Please contact support.",
        },
        { status: 403 }
      );
    }
    // Generate 4-digit OTP
    const otp = Math.floor(
      1000 + Math.random() * 9000
    ).toString();
    // Remove previous OTPs
    await connection.execute(
      `
      DELETE
      FROM email_verifications
      WHERE email = ?
      `,
      [email]
    );
    // Save new OTP
    await connection.execute(
      `
      INSERT INTO email_verifications
      (
        email,
        otp,
        verified
      )
      VALUES
      (?, ?, 0)
      `,
      [email, otp]
    );
    // Mail transporter
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
      subject: "Reset Your Nterior Password",
      html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Password Reset</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
<tr>
<td align="center">
<table width="620" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:14px;border:1px solid #e5e7eb;overflow:hidden;">
<tr>
<td style="background:linear-gradient(135deg,#cf0006,#ffb000);padding:35px;text-align:center;">
<h1 style="margin:0;color:#ffffff;font-size:34px;">
Nterior
</h1>
<p style="margin-top:10px;color:white;font-size:17px;">
Password Reset Request
</p>
</td>
</tr>
<tr>
<td style="padding:40px;">
<h2 style="margin-top:0;color:#111827;">
Forgot Your Password?
</h2>
<p style="font-size:16px;color:#4b5563;line-height:1.8;">
We received a request to reset the password for your
<strong>Nterior</strong> account.
</p>
<p style="font-size:16px;color:#4b5563;line-height:1.8;">
Use the following One-Time Password (OTP) to continue:
</p>
<div
style="
margin:35px auto;
background:#fff7ed;
border:2px dashed #cf0006;
border-radius:12px;
padding:25px;
text-align:center;
">
<p style="margin:0;color:#6b7280;">
Password Reset OTP
</p>
<h1
style="
margin:15px 0 0;
font-size:46px;
letter-spacing:10px;
color:#cf0006;
font-weight:bold;
">
${otp}
</h1>
</div>
<p style="font-size:15px;color:#374151;line-height:1.8;">
This OTP is valid for
<strong>10 minutes</strong>.
</p>
<p style="font-size:15px;color:#374151;line-height:1.8;">
If you did not request a password reset,
please ignore this email.
Your password will remain unchanged.
</p>
<div
style="
margin-top:30px;
padding:18px;
background:#FEF2F2;
border-left:5px solid #DC2626;
border-radius:8px;
">
<strong>Security Tip</strong>
<p style="margin-top:10px;color:#4b5563;line-height:1.7;">
Never share this OTP with anyone.
Nterior employees will never ask for your OTP.
</p>
</div>
</td>
</tr>
<tr>
<td style="background:#f9fafb;padding:25px;text-align:center;border-top:1px solid #e5e7eb;">
<p style="margin:0;font-size:14px;color:#6b7280;">
Need help?
</p>
<p style="margin-top:10px;font-size:14px;color:#6b7280;">
📧 support@nterior.in
</p>
<p style="margin-top:15px;font-size:12px;color:#9ca3af;">
© ${new Date().getFullYear()} Nterior(John Management Pvt. Ltd.) All Rights Reserved.
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
    await connection.end();
    return NextResponse.json({
      success: true,
      message: "OTP sent successfully.",
    });
  } catch (error) {
    console.error(error);
    if (connection) {
      await connection.end();
    }
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}