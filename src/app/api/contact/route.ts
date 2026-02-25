import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL?.replace(/\/$/, ""); // e.g. https://your-app.onrender.com
const ADMIN_EMAIL = process.env.CONTACT_EMAIL || "servicepathtotechnologies@gmail.com";

/**
 * Send contact notification to admin via Resend (fire-and-forget).
 * Used when backend is proxied so admin gets email even if backend MAIL_* is not set.
 */
async function sendAdminNotificationFallback(data: {
  name?: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: process.env.RESEND_FROM || "onboarding@resend.dev",
      to: ADMIN_EMAIL,
      subject: `New contact: ${data.name || data.email}`,
      text: [
        `Name: ${data.name || "-"}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone || "-"}`,
        `Company: ${data.company || "-"}`,
        `Service: ${data.service || "-"}`,
        "",
        "Message:",
        data.message,
      ].join("\n"),
    });
  } catch {
    // Silent: backend may have already sent; avoid double-fail
  }
}

/**
 * Contact form: proxy to Express backend when BACKEND_URL is set.
 * Form sends: name, email, company, service, message.
 * Backend expects: full_name, email, phone, company, message.
 * Response returns immediately after backend saves to DB (email sent in background on backend).
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, service, message } = body;

    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required." },
        { status: 400 }
      );
    }

    // Proxy to Express backend (saves to DB and returns immediately; backend sends email in background)
    if (BACKEND_URL) {
      const backendBody = {
        full_name: name?.trim() || "",
        email: email.trim(),
        phone: (phone && String(phone).trim()) || null,
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
      if (!res.ok) {
        return NextResponse.json(
          { error: json.message || json.error || "Failed to submit. Please try again." },
          { status: res.status }
        );
      }
      // Optional: ensure admin gets email via Resend if backend mail isn't configured (fire-and-forget)
      sendAdminNotificationFallback({
        name: name?.trim(),
        email: email.trim(),
        phone: phone?.trim(),
        company: company?.trim(),
        service: service || undefined,
        message: (message || "").trim(),
      }).catch(() => {});
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
