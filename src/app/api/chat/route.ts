import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

function getGemini() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;
  return new GoogleGenerativeAI(key);
}

const SYSTEM_PROMPT = `You are the SPT Solutions AI assistant. Your tone is friendly, professional, and helpful—like a knowledgeable team member.

You answer questions about:
- SPT Solutions: a premium AI services company helping businesses deploy and scale intelligent solutions (chatbots, automation, custom AI development).
- Contact: email servicepathtotechnologies@gmail.com; Hyderabad, Telangana, India 500097; contact form and book-a-demo on the website.
- Services: AI Chatbots, AI Automation, AI Web & App Development, AI Image Generation, AI Video Generation, AI Voice & Speech, AI Data Analytics, AI Marketing, AI Customer Support, Custom AI Solutions.
- Pricing: custom quotes; suggest contacting us or booking a demo at /book-demo for a tailored plan.

Guidelines:
- Keep replies concise (2–4 short paragraphs max). Use clear, natural language.
- For contact/booking: give email and suggest the Contact or Book a demo page.
- For services: briefly describe what they ask about, then suggest the relevant service page or contact.
- If unsure or off-topic: politely steer back to how SPT Solutions can help and suggest emailing servicepathtotechnologies@gmail.com or using the contact form.
- Do not make up facts, pricing, or policies. When in doubt, direct them to contact us.`;

export async function POST(req: NextRequest) {
  try {
    const { messages, sessionId } = await req.json();
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages required" }, { status: 400 });
    }
    const genAI = getGemini();
    if (!genAI) {
      return NextResponse.json(
        { message: "Our AI assistant is being updated. Please email servicepathtotechnologies@gmail.com in the meantime." },
        { status: 200 }
      );
    }
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });
    const history = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));
    const lastMessage = messages[messages.length - 1];
    const lastContent = lastMessage?.content ?? "";
    if (lastMessage?.role !== "user") {
      return NextResponse.json({ error: "Last message must be from user" }, { status: 400 });
    }
    let response;
    if (history.length > 0) {
      const chat = model.startChat({ history });
      const result = await chat.sendMessage(lastContent);
      response = result.response;
    } else {
      const result = await model.generateContent(lastContent);
      response = result.response;
    }
    const text = response.text?.() ?? "I couldn't generate a response. Please try again.";
    return NextResponse.json({
      message: text,
      sessionId: sessionId || crypto.randomUUID(),
    });
  } catch (e) {
    console.error("Chat API error:", e);
    return NextResponse.json(
      { message: "Something went wrong. Please try again or email servicepathtotechnologies@gmail.com." },
      { status: 200 }
    );
  }
}
