import { NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

function sanitize(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const { email, fullName } = await req.json();

  if (!email || !fullName) {
    return NextResponse.json(
      { error: "Missing fields" },
      { status: 400, headers: corsHeaders }
    );
  }

  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400, headers: corsHeaders }
    );
  }

  if (!RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500, headers: corsHeaders }
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "contact@mivwordhouse.com",
        to: email,
        subject: "Welcome to Single's Connect 2026 🎉",
        text: `Hi ${fullName},

Thank you for registering for Single's Connect 2026 💙

We’re excited to have you with us and we look forward to welcoming you on May 16, 2026.

Warm regards,
Singles Connect Team`,
        html: `
          <div style="font-family: Arial, sans-serif;">
            <h2>Hi ${sanitize(fullName)},</h2>
            <p>Thank you for registering for <strong>Single's Connect 2026</strong> 💙</p>
            <p>We’re excited to have you with us and we look forward to welcoming you
            on <strong>May 16, 2026</strong>.</p>
            <br />
            <p>Warm regards,<br/>Singles Connect Team</p>
          </div>
        `,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend API error:", data);
      return NextResponse.json(
        { error: "Failed to send email", details: data },
        { status: 500, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { success: true },
      { headers: corsHeaders }
    );
  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
