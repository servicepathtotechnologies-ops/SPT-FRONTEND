import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL?.replace(/\/$/, "");

/**
 * DELETE demo by id: proxy to backend DELETE /api/demo/:id (JWT required).
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = req.headers.get("Authorization");
  if (!auth?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ error: "Missing demo id" }, { status: 400 });
  }

  if (!BACKEND_URL) {
    return NextResponse.json(
      { error: "Backend not configured. Set BACKEND_URL." },
      { status: 503 }
    );
  }

  try {
    const res = await fetch(`${BACKEND_URL}/api/demo/${id}`, {
      method: "DELETE",
      headers: { Authorization: auth },
    });
    const data = await res.json().catch(() => ({}));
    if (res.status === 204) {
      return new NextResponse(null, { status: 204 });
    }
    return NextResponse.json(
      { error: data.message || "Delete failed." },
      { status: res.status }
    );
  } catch (e) {
    console.error("Admin delete demo error:", e);
    return NextResponse.json({ error: "Delete failed." }, { status: 500 });
  }
}
