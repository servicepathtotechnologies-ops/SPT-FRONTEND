import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL?.replace(/\/$/, ""); // e.g. http://localhost:5000

/**
 * Contact form: proxy to Express backend when BACKEND_URL is set.
 * Form sends: name, email, company, service, message.
 * Backend expects: full_name, email, phone, company, message.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, service, message } = body;

    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required." },
        { status: 400 }
      );
    }

    // Proxy to Express backend (PostgreSQL + Nodemailer)
    if (BACKEND_URL) {
      const backendBody = {
        full_name: name?.trim() || "",
        email: email.trim(),
        phone: null,
        company: company?.trim() || null,
        message: service
          ? `Service: ${service}\n\n${(message || "").trim()}`
          : (message || "").trim(),
      };

      const res = await fetch(`${BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(backendBody),
      });

      const json = await res.json().catch(() => ({}));
      // Frontend expects { success, message } on success and { error } on failure
      if (!res.ok) {
        return NextResponse.json(
          { error: json.message || json.error || "Failed to submit. Please try again." },
          { status: res.status }
        );
      }
      return NextResponse.json({ success: true, message: json.message });
    }

    // Fallback when BACKEND_URL is not set (e.g. legacy Prisma/Resend path)
    const { prisma } = await import("@/lib/prisma");
    if (process.env.DATABASE_URL) {
      await prisma.lead.create({
        data: {
          email,
          name: name || null,
          company: company || null,
          message,
          service: service || null,
          source: "contact",
        },
      });
    }
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.RESEND_FROM || "onboarding@resend.dev",
        to: process.env.CONTACT_EMAIL || "servicepathtotechnologies@gmail.com",
        subject: `Contact form: ${name || email}`,
        text: `Name: ${name || "-"}\nEmail: ${email}\nCompany: ${company || "-"}\nService: ${service || "-"}\n\nMessage:\n${message}`,
      });
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json(
      { error: "Failed to submit. Please try again." },
      { status: 500 }
    );
  }
}
