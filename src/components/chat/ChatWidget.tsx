"use client";

/**
 * Rule-based chatbot: predefined responses and button flows.
 * No AI, no API calls. Real-time feel with typing delay.
 */
import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import {
  CHAT_OPTIONS,
  BOT_PROMPT,
  UNKNOWN_RESPONSE,
  ABOUT_RESPONSE,
  CHAT_WITH_US_RESPONSE,
  isGreeting,
  type ChatOption,
  type ChatOptionId,
} from "@/lib/chatRules";

const TYPING_DELAY_MS = 900;

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export function ChatWidget() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [showContinueChat, setShowContinueChat] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasOpenedOnceRef = useRef(false);
  const messageIdRef = useRef(0);

  // Auto-scroll chat body to bottom when content changes (messages, options, typing)
  useEffect(() => {
    const el = chatBodyRef.current;
    if (!el) return;
    const scrollToBottom = () => {
      el.scrollTop = el.scrollHeight;
    };
    scrollToBottom();
    // Run again after layout/paint so new content is included
    const raf = requestAnimationFrame(() => scrollToBottom());
    const t = setTimeout(scrollToBottom, 100);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [messages, showOptions, showContinueChat, isTyping]);

  // Clear typing timeout when chat closes
  useEffect(() => {
    if (!open && typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
      setIsTyping(false);
    }
  }, [open]);

  // When reopening chat and there are messages but no options/continue visible, show "Continue chat"
  useEffect(() => {
    if (open && hasOpenedOnceRef.current && messages.length > 0 && !showOptions && !showContinueChat) {
      setShowContinueChat(true);
    }
  }, [open, messages.length, showOptions, showContinueChat]);

  /**
   * Initialize chatbot: on first open, show "How can I help you today?" + options.
   * Called when user opens the chat for the first time.
   */
  function initializeChatbot() {
    if (hasOpenedOnceRef.current) return;
    hasOpenedOnceRef.current = true;
    simulateTyping(() => {
      addBotMessage(BOT_PROMPT);
      showOptionsButtons();
    });
  }

  /** Add a user message to the chat */
  function addUserMessage(message: string) {
    if (!message.trim()) return;
    messageIdRef.current += 1;
    setMessages((m) => [
      ...m,
      { id: `u-${messageIdRef.current}`, role: "user", content: message.trim() },
    ]);
  }

  /** Add a bot message to the chat */
  function addBotMessage(message: string) {
    messageIdRef.current += 1;
    setMessages((m) => [
      ...m,
      { id: `b-${messageIdRef.current}`, role: "assistant", content: message },
    ]);
  }

  /** Show the five option buttons only (no "How can I help you today?" text) */
  function showOptionsButtons() {
    setShowContinueChat(false);
    setShowOptions(true);
  }

  /** After a bot response: show "Continue chat" so user can get back to options */
  function showContinueChatButton() {
    setShowOptions(false);
    setShowContinueChat(true);
  }

  /** Hide option buttons (e.g. after user clicks one) */
  function hideOptions() {
    setShowOptions(false);
  }

  /**
   * Simulate typing delay (800–1000ms) then run callback.
   * Used so bot messages feel real-time.
   */
  function simulateTyping(callback: () => void) {
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    setIsTyping(true);
    typingTimeoutRef.current = setTimeout(() => {
      typingTimeoutRef.current = null;
      callback();
      setIsTyping(false);
    }, TYPING_DELAY_MS);
  }

  /**
   * Handle when user clicks an option button.
   * Contact → redirect /contact
   * About → show about text + options again
   * Book appointment → redirect /book-demo
   * Our services → scroll to #services or redirect /services
   * Chat with us → show contact info + options again
   */
  function handleOptionClick(option: ChatOption) {
    hideOptions();
    addUserMessage(option.label);

    // After bot response: show "Continue chat" (options show only when user clicks it)
    const runAfterTyping = (response: string) => {
      simulateTyping(() => {
        addBotMessage(response);
        showContinueChatButton();
      });
    };

    switch (option.id as ChatOptionId) {
      case "contact-details":
        router.push("/contact");
        return;
      case "about-the-company":
        runAfterTyping(ABOUT_RESPONSE);
        return;
      case "book-appointment":
        router.push("/book-demo");
        return;
      case "our-services": {
        const el = typeof document !== "undefined" ? document.getElementById("services") : null;
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          setOpen(false);
        } else {
          router.push("/services");
        }
        return;
      }
      case "chat-with-us":
        runAfterTyping(CHAT_WITH_US_RESPONSE);
        return;
      default:
        runAfterTyping(UNKNOWN_RESPONSE);
    }
  }

  /** User clicked "Continue chat" → show only the five options (no extra text) */
  function handleContinueChat() {
    setShowContinueChat(false);
    setShowOptions(true);
  }

  /**
   * Handle user text input. "How can I help you today?" only on first open.
   * After any reply: show "Continue chat" so user can see options again.
   */
  function handleUserInput(message: string) {
    const text = message.trim();
    if (!text || isTyping) return;

    addUserMessage(text);
    setInput("");

    if (isGreeting(text)) {
      simulateTyping(() => showContinueChatButton());
    } else {
      simulateTyping(() => {
        addBotMessage(UNKNOWN_RESPONSE);
        showContinueChatButton();
      });
    }
  }

  const handleSend = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      handleUserInput(input);
    },
    [input, isTyping]
  );

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
            <div
              className="flex items-center justify-between p-4 border-b"
              style={{
                borderColor: "var(--color-border)",
                background: "var(--color-bg-accent-soft)",
              }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="flex items-center justify-center w-8 h-8 rounded-lg border"
                  style={{
                    background: "var(--bg-card)",
                    color: "var(--accent)",
                    borderColor: "var(--border)",
                  }}
                >
                  <MessageCircle className="w-4 h-4" strokeWidth={2.5} />
                </span>
                <span
                  className="font-semibold"
                  style={{ color: "var(--color-text-heading)" }}
                >
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
              ref={chatBodyRef}
              className="h-[360px] min-h-0 overflow-y-auto overflow-x-hidden p-4 space-y-4 flex flex-col"
              style={{
                background: "var(--bg-primary)",
                color: "var(--color-text-body)",
              }}
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={msg.role === "user" ? "flex justify-end" : "flex justify-start"}
                >
                  <div
                    className={
                      msg.role === "user"
                        ? "rounded-2xl rounded-br-md px-4 py-2 max-w-[85%] text-white"
                        : "rounded-2xl rounded-bl-md border px-4 py-2 max-w-[85%]"
                    }
                    style={
                      msg.role === "user"
                        ? { background: "var(--gradient-brand)" }
                        : {
                            borderColor: "var(--color-border)",
                            background: "var(--color-bg-alt)",
                            color: "var(--color-text-body)",
                          }
                    }
                  >
                    <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div
                    className="rounded-2xl rounded-bl-md border px-4 py-2.5"
                    style={{
                      borderColor: "var(--color-border)",
                      background: "var(--color-bg-alt)",
                    }}
                  >
                    <span
                      className="text-sm animate-pulse"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      Typing...
                    </span>
                  </div>
                </motion.div>
              )}

              {showContinueChat && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex justify-start"
                >
                  <button
                    type="button"
                    onClick={handleContinueChat}
                    className="rounded-full border px-4 py-2.5 text-sm font-medium transition-colors hover:border-[var(--color-primary)] hover:bg-[var(--color-bg-accent-soft)] hover:text-[var(--color-primary)]"
                    style={{
                      background: "var(--bg-card)",
                      color: "var(--color-text-body)",
                      borderColor: "var(--border)",
                    }}
                  >
                    Continue chat
                  </button>
                </motion.div>
              )}

              {showOptions && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-wrap gap-2"
                >
                  {CHAT_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleOptionClick(opt)}
                      className="rounded-full border px-3 py-2 text-sm transition-colors hover:border-[var(--color-primary)] hover:bg-[var(--color-bg-accent-soft)] hover:text-[var(--color-primary)]"
                      style={{
                        background: "var(--bg-card)",
                        color: "var(--color-text-body)",
                        borderColor: "var(--border)",
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            <form
              className="p-4 border-t flex gap-2"
              style={{
                borderColor: "var(--color-border)",
                background: "var(--bg-card)",
              }}
              onSubmit={handleSend}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-xl border bg-[var(--color-bg-alt)] px-4 py-2.5 text-sm text-[var(--color-text-heading)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                style={{ borderColor: "var(--color-border-strong)" }}
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={isTyping}
                className="flex items-center justify-center w-11 h-11 rounded-xl border hover:opacity-90 disabled:opacity-50 transition-opacity"
                style={{
                  background: "var(--accent-subtle)",
                  color: "var(--accent)",
                  borderColor: "var(--border)",
                }}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => {
          const nextOpen = !open;
          setOpen(nextOpen);
          if (nextOpen) initializeChatbot();
        }}
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
