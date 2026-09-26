import { NextRequest, NextResponse } from "next/server";
import { executeQuery } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, message: "Email and verification code are required." },
        { status: 400 }
      );
    }

    const [rows] = await executeQuery(
      `SELECT id FROM email_verifications WHERE email = ? AND otp = ? ORDER BY id DESC LIMIT 1`,
      [email, otp]
    );

    if (!rows || rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired verification code." },
        { status: 400 }
      );
    }

    await executeQuery(`UPDATE email_verifications SET verified = 1 WHERE id = ?`, [
      rows[0].id,
    ]);

    return NextResponse.json({ success: true, message: "Email verified successfully." });
  } catch (error) {
    console.error("customer/verify-otp error:", error);
    return NextResponse.json(
      { success: false, message: "Verification failed." },
      { status: 500 }
    );
  }
}
