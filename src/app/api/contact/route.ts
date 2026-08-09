import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { getToken } from "next-auth/jwt";
import nodemailer from "nodemailer";
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
// Public API - Anyone can submit the contact form
export async function POST(req: NextRequest) {
    let connection;
    try {
        const body = await req.json();
        const {
            full_name,
            email,
            company_name,
            phone,
            message,
        } = body;
        if (!full_name || !email || !message) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Full Name, Email and Message are required.",
                },
                { status: 400 }
            );
        }
        connection = await mysql.createConnection(dbConfig);
        const created_at = new Date().toLocaleString("sv-SE", {
            timeZone: "Asia/Kolkata",
        }).replace(" ", " ");
        await connection.execute(
            `
            INSERT INTO contact_messages
            (
                full_name,
                email,
                company_name,
                phone,
                message,
                created_at
            )
            VALUES (?, ?, ?, ?, ?, ?)
            `,
            [
                full_name,
                email,
                company_name,
                phone,
                message,
                created_at,
            ]
        );
        // Send Email
        await transporter.sendMail({
            from: `"Nterior Website" <${process.env.EMAIL_USER}>`,
            to: "tonybhaumick1@gmail.com",
            replyTo: email,
            subject: `📩 New Lead Contact Enquiry(nterior.in) - ${full_name}`,
            html: `
                <div style="font-family:Arial,sans-serif;padding:20px;">
                    <h2 style="color:#CF0006;">New Contact Form Submission</h2>
                    <table border="1" cellpadding="10" cellspacing="0" style="border-collapse:collapse;width:100%;">
                        <tr>
                            <td><strong>Name</strong></td>
                            <td>${full_name}</td>
                        </tr>
                        <tr>
                            <td><strong>Email</strong></td>
                            <td>${email}</td>
                        </tr>
                        <tr>
                            <td><strong>Company</strong></td>
                            <td>${company_name || "-"}</td>
                        </tr>
                        <tr>
                            <td><strong>Phone</strong></td>
                            <td>${phone || "-"}</td>
                        </tr>
                        <tr>
                            <td><strong>Message</strong></td>
                            <td>${message}</td>
                        </tr>
                        <tr>
                            <td><strong>Submitted At</strong></td>
                            <td>${created_at}</td>
                        </tr>
                    </table>
                    <br>
                    <p>
                        This enquiry was submitted from the
                        <strong>Nterior Website</strong>.
                    </p>
                </div>
            `,
        });
        return NextResponse.json({
            success: true,
            message: "Message submitted successfully.",
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
// Protected API - Only logged-in users
export async function GET(req: NextRequest) {
    let connection;
    try {
        const token = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
        });
        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 }
            );
        }
        connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute(
            `
            SELECT *
            FROM contact_messages
            ORDER BY created_at DESC
            `
        );
        return NextResponse.json({
            success: true,
            data: rows,
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
// Protected API - Only logged-in users
export async function DELETE(req: NextRequest) {
    let connection;
    try {
        const token = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET,
        });
        if (!token) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 }
            );
        }
        const { id } = await req.json();
        connection = await mysql.createConnection(dbConfig);
        await connection.execute(
            `
            DELETE FROM contact_messages
            WHERE id = ?
            `,
            [id]
        );
        return NextResponse.json({
            success: true,
            message: "Message deleted successfully.",
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