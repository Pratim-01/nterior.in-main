import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
export async function POST(req: NextRequest) {
  let connection;
  try {
    const { email, otp } = await req.json();
    if (!email || !otp) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and OTP are required.",
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
    const [rows]: any = await connection.execute(
      `
      SELECT *
      FROM email_verifications
      WHERE email = ?
      ORDER BY id DESC
      LIMIT 1
      `,
      [email]
    );
    if (rows.length === 0) {
      await connection.end();
      return NextResponse.json(
        {
          success: false,
          message: "OTP not found.",
        },
        { status: 404 }
      );
    }
    const record = rows[0];
    if (record.verified === 1) {
      await connection.end();
      return NextResponse.json(
        {
          success: false,
          message: "OTP has already been used.",
        },
        { status: 400 }
      );
    }
    if (record.otp !== otp) {
      await connection.end();
      return NextResponse.json(
        {
          success: false,
          message: "Invalid OTP.",
        },
        { status: 400 }
      );
    }
    // Check 10-minute expiry
    const createdAt = new Date(record.created_at).getTime();
    const now = new Date().getTime();
    const diffMinutes = (now - createdAt) / (1000 * 60);
    if (diffMinutes > 10) {
      await connection.execute(
        `
        DELETE FROM email_verifications
        WHERE email = ?
        `,
        [email]
      );
      await connection.end();
      return NextResponse.json(
        {
          success: false,
          message: "OTP has expired. Please request a new OTP.",
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
      [record.id]
    );
    await connection.end();
    return NextResponse.json({
      success: true,
      message: "OTP verified successfully.",
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