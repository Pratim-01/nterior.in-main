import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { executeQuery } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      phone,
      email,
      user_name,
      address,
      city,
      password,
    } = body;

    if (!phone || !email || !user_name || !password) {
      return NextResponse.json(
        { success: false, message: "Please fill all required fields." },
        { status: 400 }
      );
    }

    if (String(password).length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    // The email must have gone through the OTP step in this flow.
    const [verifiedRows] = await executeQuery(
      `SELECT id FROM email_verifications WHERE email = ? AND verified = 1 ORDER BY id DESC LIMIT 1`,
      [email]
    );
    if (!verifiedRows || verifiedRows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Please verify your email before continuing." },
        { status: 400 }
      );
    }

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

    // Generate a sequential customer id, e.g. CU0001, CU0002 ...
    const [lastUsers] = await executeQuery(
      `SELECT user_id FROM users_ecommerce WHERE user_id LIKE 'CU%' ORDER BY id DESC LIMIT 1`
    );
    let nextNumber = 1;
    if (lastUsers.length > 0) {
      const lastId = lastUsers[0].user_id as string;
      const parsed = parseInt(lastId.replace("CU", ""), 10);
      if (!Number.isNaN(parsed)) nextNumber = parsed + 1;
    }
    const user_id = `CU${String(nextNumber).padStart(4, "0")}`;

    const hashedPassword = await bcrypt.hash(password, 10);

    await executeQuery(
      `INSERT INTO users_ecommerce
        (user_id, user_name, email, phone, whatsapp, address, city, join_as, role, password, email_verified, account_status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        user_name,
        email,
        phone,
        phone,
        address || null,
        city || null,
        "Customer",
        "customer",
        hashedPassword,
        1,
        "Active",
      ]
    );

    // OTP no longer needed once the account exists.
    await executeQuery(`DELETE FROM email_verifications WHERE email = ?`, [email]);

    return NextResponse.json({ success: true, message: "Account created successfully." });
  } catch (error) {
    console.error("customer/register error:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
