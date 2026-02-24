/**
 * Predefined chat Q&A – shown as quick options and answered instantly (no API).
 */
export interface ChatPreset {
  id: string;
  label: string;
  answer: string;
  /** Optional link shown at the end of the answer (e.g. /contact, /book-demo) */
  link?: { href: string; text: string };
}

export const CHAT_PRESETS: ChatPreset[] = [
  {
    id: "contact",
    label: "Contact details",
    answer:
      "You can reach us by email at servicepathtotechnologies@gmail.com or visit our Contact page to send a message. We're based in Hyderabad, Telangana, India (500097), and typically respond within 24 hours.",
    link: { href: "/contact", text: "Go to Contact page" },
  },
  {
    id: "about",
    label: "About the company",
    answer:
      "SPT Solutions is a premium AI services company. We help businesses deploy and scale intelligent solutions—from chatbots and automation to custom AI development. Our team combines AI research, product design, and industry experience to deliver results that matter.",
    link: { href: "/about", text: "Learn more about us" },
  },
  {
    id: "book",
    label: "Book an appointment",
    answer:
      "You can book a demo or meeting with our team through our booking page. Pick a time that works for you; we'll send a confirmation and calendar invite. Great for seeing how AI can transform your business.",
    link: { href: "/book-demo", text: "Book a demo" },
  },
  {
    id: "services",
    label: "Our services",
    answer:
      "We offer: AI Chatbots, AI Automation, AI Web & App Development, AI Image Generation, AI Video Generation, AI Voice & Speech, AI Data Analytics, AI Marketing, AI Customer Support, and Custom AI Solutions. Each service is tailored to your needs.",
    link: { href: "/services", text: "View all services" },
  },
  {
    id: "pricing",
    label: "Pricing / Get a quote",
    answer:
      "We provide custom quotes based on your project scope and requirements. For a tailored estimate, get in touch via our Contact page or book a demo so we can discuss your goals and recommend the right plan.",
    link: { href: "/contact", text: "Get a quote" },
  },
];

/** ID for the "Chat with us" option – encourages free-form AI chat. */
export const CHAT_WITH_US_ID = "chat-with-us";

export const CHAT_WITH_US_ANSWER =
  "You can ask me anything below! Type your question about our services, pricing, projects, or how we can help—I'll respond as your AI assistant.";
