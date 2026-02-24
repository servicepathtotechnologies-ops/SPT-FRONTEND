import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL?.replace(/\/$/, "");

/**
 * Admin login: proxy to Express backend (email + password → JWT) when BACKEND_URL is set.
 * Otherwise legacy single-password mode for local dev without backend.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (BACKEND_URL) {
      const res = await fetch(`${BACKEND_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email?.trim() || "", password: password ?? "" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        return NextResponse.json(
          { error: data.message || data.error || "Login failed." },
          { status: res.status }
        );
      }
      return NextResponse.json({ token: data.token, admin: data.admin });
    }

    // Legacy: single password (no backend)
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "spt-admin-demo";
    if (password && password === ADMIN_PASSWORD) {
      const token = Buffer.from(`admin:${Date.now()}`).toString("base64");
      return NextResponse.json({ token });
    }
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  } catch (e) {
    console.error("Admin login error:", e);
    return NextResponse.json({ error: "Login failed." }, { status: 500 });
  }
}
