import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL?.replace(/\/$/, "");

/**
 * GET demos: proxy to backend GET /api/demo (JWT required) when BACKEND_URL is set.
 */
export async function GET(req: NextRequest) {
  const auth = req.headers.get("Authorization");
  if (!auth?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!BACKEND_URL) {
    return NextResponse.json([], { status: 200 });
  }

  try {
    const res = await fetch(`${BACKEND_URL}/api/demo`, {
      headers: { Authorization: auth },
    });
    const data = await res.json().catch(() => ({}));
    if (res.status === 401) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (!res.ok) {
      return NextResponse.json(
        { error: data.message || "Failed to fetch demos" },
        { status: res.status }
      );
    }
    // Map backend shape: full_name → name, demo_date → demoDate, created_at → createdAt
    const list = Array.isArray(data.data) ? data.data : [];
    const mapped = list.map(
      (d: {
        id: string;
        full_name: string;
        email: string;
        company: string | null;
        demo_date: string;
        service: string | null;
        notes: string | null;
        created_at: string;
      }) => ({
        id: d.id,
        name: d.full_name,
        email: d.email,
        company: d.company ?? null,
        demoDate: d.demo_date,
        service: d.service ?? null,
        notes: d.notes ?? null,
        createdAt: d.created_at,
      })
    );
    return NextResponse.json(mapped);
  } catch (e) {
    console.error("Admin demos proxy error:", e);
    return NextResponse.json([], { status: 200 });
  }
}
