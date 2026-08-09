import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
export async function POST(req: NextRequest) {
  let connection;
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required.",
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
    // Check latest verified OTP
    const [otpRows]: any = await connection.execute(
      `
      SELECT *
      FROM email_verifications
      WHERE email = ?
      ORDER BY id DESC
      LIMIT 1
      `,
      [email]
    );
    if (otpRows.length === 0) {
      await connection.end();
      return NextResponse.json(
        {
          success: false,
          message: "OTP verification required.",
        },
        { status: 400 }
      );
    }
    const otpRecord = otpRows[0];
    if (otpRecord.verified !== 1) {
      await connection.end();
      return NextResponse.json(
        {
          success: false,
          message: "Please verify your OTP first.",
        },
        { status: 400 }
      );
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Update password
    await connection.execute(
      `
      UPDATE users
      SET password = ?
      WHERE email = ?
      `,
      [hashedPassword, email]
    );
    // Delete OTP records
    await connection.execute(
      `
      DELETE FROM email_verifications
      WHERE email = ?
      `,
      [email]
    );
    // Send confirmation email
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
      subject: "Your Nterior Password Has Been Changed",
      html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Password Changed</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
<tr>
<td align="center">
<table width="620" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:14px;border:1px solid #e5e7eb;overflow:hidden;">
<tr>
<td style="background:linear-gradient(135deg,#16a34a,#22c55e);padding:35px;text-align:center;">
<h1 style="margin:0;color:white;font-size:34px;">
Password Updated
</h1>
<p style="margin-top:10px;color:white;">
Your account is now secure.
</p>
</td>
</tr>
<tr>
<td style="padding:40px;">
<h2 style="margin-top:0;color:#111827;">
Password Changed Successfully
</h2>
<p style="font-size:16px;color:#4b5563;line-height:1.8;">
Hello,
</p>
<p style="font-size:16px;color:#4b5563;line-height:1.8;">
Your Nterior account password has been successfully changed.
</p>
<div style="
margin:30px 0;
padding:20px;
background:#ecfdf5;
border:1px solid #22c55e;
border-radius:12px;
text-align:center;
">
<h2 style="margin:0;color:#15803d;">
✓ Password Updated Successfully
</h2>
</div>
<p style="font-size:16px;color:#4b5563;line-height:1.8;">
If you made this change, no further action is required.
</p>
<div style="
margin-top:35px;
padding:18px;
background:#FEF2F2;
border-left:5px solid #DC2626;
border-radius:8px;
">
<strong>Didn't change your password?</strong>
<p style="margin-top:10px;color:#4b5563;line-height:1.8;">
If you did not change your password, your account may be compromised.
Please contact our support team immediately.
</p>
</div>
</td>
</tr>
<tr>
<td style="background:#f9fafb;padding:25px;text-align:center;border-top:1px solid #e5e7eb;">
<p style="margin:0;font-size:14px;color:#6b7280;">
Thank you for using Nterior.
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
      message: "Password reset successfully.",
    });
  } catch (error) {
    console.error(error);
    if (connection) {
      await connection.end();
    }
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      { status: 500 }
    );
  }
}