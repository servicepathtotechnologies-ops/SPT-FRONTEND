import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const BACKEND_URL = process.env.BACKEND_URL?.replace(/\/$/, "");

/**
 * GET leads: proxy to backend GET /api/contact (JWT required) when BACKEND_URL is set.
 * Otherwise use Prisma (legacy).
 */
export async function GET(req: NextRequest) {
  const auth = req.headers.get("Authorization");
  if (!auth?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (BACKEND_URL) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/contact`, {
        headers: { Authorization: auth },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        return NextResponse.json(
          { error: data.message || "Unauthorized" },
          { status: res.status }
        );
      }
      // Map backend shape to dashboard shape: full_name → name, created_at → createdAt
      const list = Array.isArray(data.data) ? data.data : [];
      const mapped = list.map((c: { id: string; full_name: string; email: string; phone: string | null; company: string | null; message: string; created_at: string }) => ({
        id: c.id,
        email: c.email,
        name: c.full_name,
        company: c.company ?? null,
        message: c.message ?? null,
        phone: c.phone ?? null,
        createdAt: c.created_at,
      }));
      return NextResponse.json(mapped);
    } catch (e) {
      console.error("Admin leads proxy error:", e);
      return NextResponse.json([], { status: 200 });
    }
  }

  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
    const mapped = leads.map((l) => ({
      id: l.id,
      email: l.email,
      name: l.name ?? null,
      company: l.company ?? null,
      message: l.message ?? null,
      phone: null,
      createdAt: l.createdAt.toISOString(),
    }));
    return NextResponse.json(mapped);
  } catch (e) {
    console.error("Admin leads error:", e);
    return NextResponse.json([], { status: 200 });
  }
}
