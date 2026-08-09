import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};
export async function POST(req: NextRequest) {
  let connection;
  try {
    const body = await req.json();
    const {
      company_name,
      owner_name,
      email,
      phone,
      city,
      employees,
      join_as,
      company_id,
      password,
    } = body;
    // Validation
    if (
      !company_name ||
      !owner_name ||
      !email ||
      !phone ||
      !join_as ||
      !password
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required fields.",
        },
        { status: 400 }
      );
    }
    if (
      join_as === "Client" &&
      (!company_id || company_id.trim() === "")
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Company ID is required.",
        },
        { status: 400 }
      );
    }
    connection = await mysql.createConnection(dbConfig);
    // Check if email already exists
    const [existing]: any = await connection.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );
    if (existing.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already registered.",
        },
        { status: 400 }
      );
    }
    // ===========================
    // CHECK EMAIL VERIFICATION
    // ===========================
    const [verifiedRows]: any = await connection.execute(
      `
      SELECT *
      FROM email_verifications
      WHERE email = ?
      AND verified = 1
      ORDER BY id DESC
      LIMIT 1
      `,
      [email]
    );
    if (verifiedRows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Please verify your email before registering.",
        },
        { status: 400 }
      );
    }
// ===========================
// ROLE
// ===========================
const role =
  join_as === "Interior Company"
    ? "superadmin"
    : "client";
// ===========================
// GENERATE USER ID
// ===========================
const prefix = role === "superadmin" ? "O" : "C";
const [lastUsers]: any = await connection.execute(
  `
  SELECT user_id
  FROM users
  WHERE user_id LIKE ?
  ORDER BY id DESC
  LIMIT 1
  `,
  [`${prefix}%`]
);
let nextNumber = 1;
if (lastUsers.length > 0) {
  const lastId = lastUsers[0].user_id; // O001
  nextNumber = parseInt(lastId.substring(1)) + 1;
}
const user_id = `${prefix}${String(nextNumber).padStart(3, "0")}`;
    // ===========================
    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);
    await connection.execute(
      `
      INSERT INTO users
(
    user_id,
    company_name,
    owner_name,
    email,
    phone,
    city,
    employees,
    join_as,
    role,
    company_id,
    password,
    email_verified,
    account_status
)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
[
    user_id,
    company_name,
    owner_name,
    email,
    phone,
    city,
    employees || null,
    join_as,
    role,
    join_as === "Client" ? company_id : null,
    hashedPassword,
    1,
    "Active",
]
    );
    // Delete OTP after successful registration
    await connection.execute(
      `
      DELETE FROM email_verifications
      WHERE email = ?
      `,
      [email]
    );
    return NextResponse.json({
      success: true,
      message: "Account created successfully.",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  } finally {
    if (connection) await connection.end();
  }
}