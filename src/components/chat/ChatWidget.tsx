"use client";

/**
 * Floating chat widget: light theme — white card, indigo header bar, clean bubbles.
 */
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import {
  CHAT_PRESETS,
  CHAT_WITH_US_ID,
  CHAT_WITH_US_ANSWER,
} from "@/lib/chatPresets";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  link?: { href: string; text: string };
};

const WELCOME_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Hi! I'm the Service Path Technologies assistant. Choose a topic below or type your question—I'm here to help.",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const showQuickOptions = messages.length === 1 && messages[0].role === "assistant";

  function handlePresetClick(presetId: string) {
    if (presetId === CHAT_WITH_US_ID) {
      setMessages((m) => [...m, { role: "assistant", content: CHAT_WITH_US_ANSWER }]);
      return;
    }
    const preset = CHAT_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setMessages((m) => [
      ...m,
      { role: "user", content: preset.label },
      {
        role: "assistant",
        content: preset.answer,
        link: preset.link,
      },
    ]);
  }

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setLoading(true);
    try {
      const apiMessages = messages.map(({ role, content }) => ({ role, content }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...apiMessages, { role: "user", content: text }],
          sessionId:
            typeof window !== "undefined"
              ? sessionStorage.getItem("chatSessionId")
              : null,
        }),
      });
      const data = await res.json();
      if (data.message) {
        setMessages((m) => [...m, { role: "assistant", content: data.message }]);
      }
      if (data.sessionId && typeof window !== "undefined") {
        sessionStorage.setItem("chatSessionId", data.sessionId);
      }
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't reach the server. Please try again or email us at servicepathtotechnologies@gmail.com.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] rounded-2xl border shadow-[var(--shadow-hover)] flex flex-col overflow-hidden"
            style={{ borderColor: "var(--border)", background: "var(--bg-card)" }}
          >
            <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)] bg-[var(--color-bg-accent-soft)]">
              <div className="flex items-center gap-2">
                <span
                  className="flex items-center justify-center w-8 h-8 rounded-lg border"
                  style={{ background: "var(--bg-card)", color: "var(--accent)", borderColor: "var(--border)" }}
                >
                  <MessageCircle className="w-4 h-4" strokeWidth={2.5} />
                </span>
                <span className="font-semibold" style={{ color: "var(--color-text-heading)" }}>
                  Service Path Assistant
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg transition-colors hover:opacity-80"
                style={{ color: "var(--color-text-muted)" }}
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div
              className="h-[360px] overflow-y-auto p-4 space-y-4 flex flex-col"
              style={{ background: "var(--bg-primary)", color: "var(--color-text-body)" }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={
                    msg.role === "user" ? "flex justify-end" : "flex justify-start"
                  }
                >
                  <div
                    className={
                      msg.role === "user"
                        ? "rounded-2xl rounded-br-md px-4 py-2 max-w-[85%] text-white"
                        : "rounded-2xl rounded-bl-md border border-[var(--color-border)] bg-[var(--color-bg-alt)] px-4 py-2 max-w-[85%]"
                    }
                    style={
                      msg.role === "user"
                        ? { background: "var(--gradient-brand)" }
                        : { color: "var(--color-text-body)" }
                    }
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                    {msg.role === "assistant" && msg.link && (
                      <Link
                        href={msg.link.href}
                        className="mt-2 inline-block text-sm font-medium text-[var(--color-primary)] hover:underline"
                      >
                        {msg.link.text} →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
              {showQuickOptions && (
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--color-text-muted)" }}>
                    Quick options
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {CHAT_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handlePresetClick(preset.id)}
                        className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-sm hover:border-[var(--color-primary)] hover:bg-[var(--color-bg-accent-soft)] hover:text-[var(--color-primary)] transition-colors"
                        style={{ background: "var(--bg-card)", color: "var(--color-text-body)" }}
                      >
                        {preset.label}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => handlePresetClick(CHAT_WITH_US_ID)}
                      className="rounded-full px-3 py-1.5 text-sm border transition-opacity hover:opacity-90"
                      style={{ background: "var(--accent-subtle)", color: "var(--accent)", borderColor: "var(--border)" }}
                    >
                      Chat with us
                    </button>
                  </div>
                </div>
              )}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md border border-[var(--color-border)] bg-[var(--color-bg-alt)] px-4 py-2">
                    <span className="animate-pulse" style={{ color: "var(--color-text-muted)" }}>
                      Thinking...
                    </span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
            <form
              className="p-4 border-t flex gap-2"
              style={{ borderColor: "var(--color-border)", background: "var(--bg-card)" }}
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our services..."
                className="flex-1 rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-bg-alt)] px-4 py-2.5 text-[var(--color-text-heading)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center w-11 h-11 rounded-xl border hover:opacity-90 disabled:opacity-50 transition-opacity"
                style={{ background: "var(--accent-subtle)", color: "var(--accent)", borderColor: "var(--border)" }}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center border hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
        style={{
          background: "var(--bg-card)",
          color: "var(--accent)",
          borderColor: "var(--border)",
          boxShadow: "var(--shadow-card)",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" strokeWidth={2.5} />
      </motion.button>
    </>
  );
}
