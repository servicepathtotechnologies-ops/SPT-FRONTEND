import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL?.replace(/\/$/, "");

/**
 * Book a demo: proxy to Express backend (Supabase + email) when BACKEND_URL is set.
 * Backend stores in demos table and sends notification to servicepathtotechnologies@gmail.com.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, date, service, notes } = body;
    if (!email || !name || !date) {
      return NextResponse.json(
        { error: "Name, email, and date required" },
        { status: 400 }
      );
    }

    if (BACKEND_URL) {
      const backendBody = {
        full_name: (name || "").trim(),
        email: (email || "").trim(),
        company: company?.trim() || null,
        demo_date: new Date(date).toISOString(),
        service: service?.trim() || null,
        notes: notes?.trim() || null,
      };

      const res = await fetch(`${BACKEND_URL}/api/demo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(backendBody),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        return NextResponse.json(
          { error: json.message || json.errors?.[0]?.message || json.error || "Failed to book demo" },
          { status: res.status }
        );
      }
      return NextResponse.json({ success: true, id: "demo", message: json.message });
    }

    // Fallback when BACKEND_URL is not set (no-op or legacy path)
    return NextResponse.json({ success: true, id: "demo" });
  } catch (e) {
    console.error("Booking API error:", e);
    return NextResponse.json(
      { error: "Failed to book demo" },
      { status: 500 }
    );
  }
}
