import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import nodemailer from "nodemailer";
export async function POST(req: NextRequest) {
  const { email, otp } = await req.json();
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  const [rows]: any = await connection.execute(
    `
    SELECT *
    FROM email_verifications
    WHERE email = ?
    AND otp = ?
    ORDER BY id DESC
    LIMIT 1
    `,
    [email, otp]
  );
  if (rows.length === 0) {
    await connection.end();
    return NextResponse.json(
      {
        success: false,
        message: "Invalid OTP",
      },
      { status: 400 }
    );
  }
  await connection.execute(
    `
    UPDATE email_verifications
    SET verified = 1
    WHERE id = ?
    `,
    [rows[0].id]
  );
  // Send Verification Success Email
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
    subject: "✅ Your Email Has Been Successfully Verified",
    html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Email Verified</title>
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
✅ Email Verified
</h1>
<p style="margin-top:10px;color:white;font-size:17px;">
Welcome to Nterior
</p>
</td>
</tr>
<tr>
<td style="padding:40px;">
<h2 style="margin-top:0;color:#111827;">
Your Email Address Has Been Verified
</h2>
<p style="font-size:16px;color:#4b5563;line-height:1.8;">
Congratulations! Your email address has been successfully verified.
You can now complete your registration and start using <strong>Nterior</strong>.
</p>
<div style="
margin:30px 0;
padding:25px;
background:#ecfdf5;
border:1px solid #22c55e;
border-radius:12px;
text-align:center;
">
<h2 style="margin:0;color:#15803d;">
✔ Verification Successful
</h2>
<p style="margin-top:10px;color:#166534;">
Your email has been securely verified.
</p>
</div>
<h3 style="color:#111827;">What's Next?</h3>
<ul style="color:#4b5563;line-height:2;">
<li>Complete your account registration.</li>
<li>Log in to your dashboard.</li>
<li>Start managing your interior business efficiently.</li>
</ul>
<div style="
margin-top:35px;
padding:18px;
background:#FEF2F2;
border-left:5px solid #DC2626;
border-radius:8px;
">
<strong>Security Notice</strong>
<p style="margin-top:10px;color:#4b5563;line-height:1.7;">
If you did <strong>not</strong> verify this email address,
someone else may have accessed your verification code.
Please contact our support team immediately.
</p>
</div>
</td>
</tr>
<tr>
<td style="background:#f9fafb;padding:25px;text-align:center;border-top:1px solid #e5e7eb;">
<p style="margin:0;font-size:14px;color:#6b7280;">
Thank you for choosing <strong>Nterior</strong>.
</p>
<p style="margin-top:10px;font-size:14px;color:#6b7280;">
📧 support@nterior.in
</p>
<p style="margin-top:15px;font-size:12px;color:#9ca3af;">
© ${new Date().getFullYear()} Nterior. All Rights Reserved.
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
    message: "Email verified successfully",
  });
}