import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEYY);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const email = formData.get("email") as string;
    const cv = formData.get("cv") as File;

    const yearsExperience = formData.get("yearsExperience");
    const remoteReady = formData.get("remoteReady");
    const readyToHire = formData.get("readyToHire");
    const currentJobStatus = formData.get("currentJobStatus");
    const languages = formData.get("languages");

    // Convert file to buffer
    const arrayBuffer = await cv.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { data, error } = await resend.emails.send({
      from: "Paymentagon <onboarding@resend.dev>",
      to: "coherentity@gmail.com",
      subject: "New Product Manager Application",
      html: `
        <h2>New Application</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Experience:</strong> ${yearsExperience} years</p>
        <p><strong>Remote Ready:</strong> ${remoteReady}</p>
        <p><strong>Ready to Start:</strong> ${readyToHire}</p>
        <p><strong>Languages:</strong> ${languages}</p>
        <p><strong>Current Job Status:</strong></p>
        <p>${currentJobStatus}</p>
      `,
      attachments: [
        {
          filename: cv.name,
          content: buffer,
        },
      ],
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
