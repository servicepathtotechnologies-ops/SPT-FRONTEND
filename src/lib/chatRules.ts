/**
 * Rule-based chatbot: predefined options and responses (no AI, no API).
 */

/** Shown after every bot response (except redirects) and as initial greeting */
export const BOT_PROMPT = "How can I help you today?";

export const UNKNOWN_RESPONSE =
  "Please select one of the available options below.";

export const ABOUT_RESPONSE =
  "Service Path Technologies is a technology-driven company focused on delivering innovative digital solutions, AI automation, CRM systems, and custom software development for businesses.";

export const CHAT_WITH_US_RESPONSE =
  "You can reach us directly:\n\n📱 WhatsApp: +91 86391 55832\n📧 Email: servicepathtotechnologies@gmail.com";

/** Normalized greeting triggers */
const GREETING_TRIGGERS = ["hi", "hii", "hello", "hey"];

export function isGreeting(message: string): boolean {
  const normalized = message.trim().toLowerCase();
  return GREETING_TRIGGERS.includes(normalized);
}

export type ChatOptionId =
  | "contact-details"
  | "about-the-company"
  | "book-appointment"
  | "our-services"
  | "chat-with-us";

export interface ChatOption {
  id: ChatOptionId;
  label: string;
}

export const CHAT_OPTIONS: ChatOption[] = [
  { id: "contact-details", label: "Contact details" },
  { id: "about-the-company", label: "About the company" },
  { id: "book-appointment", label: "Book an appointment" },
  { id: "our-services", label: "Our services" },
  { id: "chat-with-us", label: "Chat with us" },
];
