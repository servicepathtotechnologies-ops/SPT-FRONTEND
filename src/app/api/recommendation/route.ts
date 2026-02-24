import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";

function getGemini() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  return new GoogleGenerativeAI(key);
}

const SERVICES_LIST =
  "AI Chatbots, AI Automation, AI Web & App Development, AI Image Generation, AI Video Generation, AI Voice & Speech, AI Data Analytics, AI Marketing, AI Customer Support, Custom AI Solutions";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { industry, goals, scale, email } = body;
    if (!industry || !goals) {
      return NextResponse.json(
        { error: "Industry and goals required" },
        { status: 400 }
      );
    }

    let recommended: string[] = [];
    const genAI = getGemini();
    if (genAI) {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `You are an AI consultant for SPT Solutions. Given the user's industry, goals, and scale, recommend 1-3 services from this exact list (return only the exact names, comma-separated): ${SERVICES_LIST}. Be concise.

Industry: ${industry}. Goals: ${goals}. Scale: ${scale || "not specified"}.`;
      const result = await model.generateContent(prompt);
      const text = result.response.text?.() ?? "";
      recommended = text.split(",").map((s) => s.trim()).filter(Boolean);
    } else {
      recommended = ["Custom AI Solutions"];
    }

    if (email && process.env.DATABASE_URL) {
      await prisma.lead.create({
        data: {
          email,
          source: "recommendation",
          metadata: { industry, goals, scale, recommended },
        },
      });
    }

    return NextResponse.json({ recommended });
  } catch (e) {
    console.error("Recommendation API error:", e);
    return NextResponse.json(
      { error: "Failed to get recommendation" },
      { status: 500 }
    );
  }
}
