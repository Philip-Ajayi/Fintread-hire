import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Allow external domains
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Handle preflight requests (CORS)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// Create transporter (inline, no lib/mailer import)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,
  port: Number(process.env.SMTP_PORT!),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
});

export async function POST(req: Request) {
  try {
    const { email, fullName } = await req.json();

    if (!email || !fullName) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400,
          headers: corsHeaders
        }
      );
    }

    await transporter.sendMail({
      from: `"Singles Connect" <${process.env.MAIL_FROM_ADDRESS}>`,
      to: email,
      subject: "Welcome to Single's Connect 2026 🎉",
      text: `Hi ${fullName},

Thank you for registering for Single's Connect 2026 💙

We’re excited to have you with us and we look forward to welcoming you on May 16, 2026.

Warm regards,
Singles Connect Team`,
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Hi ${fullName},</h2>

          <p>Thank you for registering for <strong>Single's Connect 2026</strong> 💙</p>

          <p>
            We’re excited to have you with us and we look forward to welcoming you
            on <strong>May 16, 2026</strong>.
          </p>

          <br />

          <p>Warm regards,<br/>Singles Connect Team</p>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true },
      { headers: corsHeaders }
    );

  } catch (err) {
    console.error("Email error:", err);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500,
        headers: corsHeaders
      }
    );
  }
}