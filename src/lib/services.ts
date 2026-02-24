/**
 * SPT Solutions – Service definitions for accordion, detail pages, and navigation
 */
export interface ServiceItem {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  howItWorks: string[];
  benefits: string[];
  useCases: string[];
  icon: string;
  image: string;
}

export const services: ServiceItem[] = [
  {
    slug: "ai-chatbots",
    name: "AI Chatbots",
    shortDescription:
      "Deploy intelligent chatbots that handle customer support, sales, and engagement 24/7 using natural language — trained on your own data.",
    description:
      "Deploy intelligent chatbots that handle support, sales, and engagement with natural language. Our AI chatbots are trained on your data and integrate with your existing tools.",
    howItWorks: [
      "We analyze your use case and data",
      "Custom model fine-tuning or prompt design",
      "Integration with your channels (web, Slack, etc.)",
      "Ongoing optimization and monitoring",
    ],
    benefits: ["24/7 availability", "Instant responses", "Scalable support", "Consistent quality"],
    useCases: ["Customer support", "Lead qualification", "FAQ automation", "Internal knowledge base"],
    icon: "MessageSquare",
    image: "/images/services/ai-chatbots-hello.png",
  },
  {
    slug: "ai-automation",
    name: "AI Automation",
    shortDescription:
      "Replace repetitive tasks with AI-driven pipelines that classify documents, automate approvals, and generate reports — freeing your team to focus.",
    description:
      "Replace repetitive tasks and manual decisions with AI automation. From document processing to approval workflows, we build systems that learn and improve.",
    howItWorks: [
      "Discovery of automatable workflows",
      "Design of AI agents and pipelines",
      "Integration with your stack",
      "Deployment and monitoring",
    ],
    benefits: ["Faster throughput", "Fewer errors", "Lower operational cost", "Audit trails"],
    useCases: ["Document classification", "Data entry automation", "Approval workflows", "Report generation"],
    icon: "Zap",
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=600&q=85",
  },
  {
    slug: "ai-web-app-dev",
    name: "AI Web & App Development",
    shortDescription:
      "Custom web and mobile applications with AI built in from day one — personalization, smart search, recommendations, and intelligent user experiences.",
    description:
      "We develop custom web and mobile applications that leverage AI for personalization, search, recommendations, and intelligent features.",
    howItWorks: [
      "Requirements and UX discovery",
      "Architecture and AI feature design",
      "Agile development with AI components",
      "Launch and iteration",
    ],
    benefits: ["Differentiated product", "Better UX", "Data-driven features", "Future-proof stack"],
    useCases: ["Personalized dashboards", "Smart search", "Recommendation engines", "AI-powered forms"],
    icon: "Code2",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=85",
  },
  {
    slug: "ai-image-generation",
    name: "AI Image Generation",
    shortDescription:
      "Generate marketing assets, product visuals, and creative content at scale using state-of-the-art image models integrated directly into your workflow.",
    description:
      "Create marketing assets, product visuals, and creative content using state-of-the-art image models. We integrate generation into your workflows.",
    howItWorks: [
      "Define style and brand guidelines",
      "Model selection and fine-tuning",
      "API or UI integration",
      "Quality and safety guardrails",
    ],
    benefits: ["Faster content creation", "Brand consistency", "Cost-effective at scale", "A/B testing visuals"],
    useCases: ["Ad creatives", "Product images", "Social content", "Illustrations"],
    icon: "Image",
    image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600&q=85",
  },
  {
    slug: "ai-video-generation",
    name: "AI Video Generation",
    shortDescription:
      "Script, generate, and edit video content with AI — from product demos to social ads — at a fraction of traditional production time and cost.",
    description:
      "From short clips to explainers and ads, we use AI to script, generate, and edit video—reducing production time and cost.",
    howItWorks: [
      "Script and storyboard",
      "AI generation or editing pipeline",
      "Review and refinement",
      "Delivery in your format",
    ],
    benefits: ["Faster production", "Lower cost per video", "Consistent tone", "Easy localization"],
    useCases: ["Product demos", "Social ads", "Training videos", "Personalized video"],
    icon: "Video",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=85",
  },
  {
    slug: "ai-voice-speech",
    name: "AI Voice & Speech",
    shortDescription:
      "Add voice interfaces, TTS, and speech analytics to your products — built for clarity, low latency, and a brand voice that's distinctly yours.",
    description:
      "Add voice to your products with text-to-speech, speech-to-text, and conversational voice agents. We build for clarity, low latency, and brand voice.",
    howItWorks: [
      "Use case and language requirements",
      "Voice selection or cloning",
      "Integration (API, IVR, app)",
      "Testing and tuning",
    ],
    benefits: ["Hands-free UX", "Accessibility", "Multilingual", "Consistent voice"],
    useCases: ["IVR and call centers", "Voice assistants", "Audiobooks", "Real-time transcription"],
    icon: "Mic",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&q=85",
  },
  {
    slug: "ai-data-analytics",
    name: "AI Data Analytics",
    shortDescription:
      "Go beyond dashboards with predictive models, anomaly detection, and natural language queries that turn raw data into confident business decisions.",
    description:
      "Go beyond dashboards with predictive models, anomaly detection, and natural language queries over your data.",
    howItWorks: [
      "Data assessment and pipeline",
      "Feature engineering and modeling",
      "Dashboards and NL interface",
      "Ongoing retraining",
    ],
    benefits: ["Predictive insights", "Anomaly detection", "Ask questions in plain English", "Automated reporting"],
    useCases: ["Forecasting", "Fraud detection", "Churn prediction", "Operational analytics"],
    icon: "BarChart3",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=85",
  },
  {
    slug: "ai-marketing",
    name: "AI Marketing",
    shortDescription:
      "Improve campaign ROI with AI-driven targeting, creative optimization, and content generation that personalizes your message across every channel.",
    description:
      "Improve ROI with AI-driven targeting, creative optimization, and content generation for your marketing channels.",
    howItWorks: [
      "Audience and channel analysis",
      "Model training on your data",
      "Campaign integration",
      "Optimization loops",
    ],
    benefits: ["Higher conversion", "Better targeting", "Personalized messaging", "Efficient spend"],
    useCases: ["Ad optimization", "Email personalization", "Landing page variants", "SEO content"],
    icon: "Megaphone",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&q=85",
  },
  {
    slug: "ai-customer-support",
    name: "AI Customer Support",
    shortDescription:
      "Combine intelligent triage, chatbots, and agent assist to resolve more support tickets faster — and dramatically improve customer satisfaction scores.",
    description:
      "Combine chatbots, triage, and agent assist to resolve more tickets faster and improve CSAT.",
    howItWorks: [
      "Support process mapping",
      "Triage and routing AI",
      "Bot and agent-assist deployment",
      "Metrics and tuning",
    ],
    benefits: ["Faster resolution", "Higher CSAT", "Agent productivity", "Proactive support"],
    useCases: ["Ticket routing", "Self-service deflection", "Agent suggestions", "Sentiment analysis"],
    icon: "Headphones",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=85",
  },
  {
    slug: "custom-ai-solutions",
    name: "Custom AI Solutions",
    shortDescription:
      "When off-the-shelf AI isn't enough — we design bespoke systems, RAG pipelines, and proprietary models tailored precisely to your domain and challenges.",
    description:
      "When off-the-shelf isn't enough, we design and build custom AI solutions—from RAG systems to proprietary models—tailored to your domain.",
    howItWorks: [
      "Discovery and feasibility",
      "Architecture and POC",
      "Development and integration",
      "Deployment and support",
    ],
    benefits: ["Competitive advantage", "Full ownership", "Domain-specific accuracy", "Scalable design"],
    useCases: ["Custom RAG", "Proprietary models", "Domain-specific NLP", "Decision systems"],
    icon: "Sparkles",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=85",
  },
];

/** Alias for backward compatibility */
export const SERVICES = services;

export const SERVICE_SLUGS = services.map((s) => s.slug);

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return services.find((s) => s.slug === slug);
}

/** Legacy slug redirect: ai-web-app-development → ai-web-app-dev */
export function getServiceBySlugWithFallback(slug: string): ServiceItem | undefined {
  if (slug === "ai-web-app-development") {
    return services.find((s) => s.slug === "ai-web-app-dev");
  }
  return getServiceBySlug(slug);
}
