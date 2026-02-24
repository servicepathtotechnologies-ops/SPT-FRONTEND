/**
 * Full data for the production services showcase page.
 * Each service: hero image (Unsplash), icon, copy, how it works, benefits, use cases, technologies.
 */
export interface ServiceShowcaseItem {
  id: string;
  name: string;
  description: string;
  image: string;
  icon: string; // lucide-react icon name
  howItWorks: [string, string, string, string];
  benefits: string[];
  useCases: string[];
  technologies: string[];
}

export const servicesShowcaseData: ServiceShowcaseItem[] = [
  {
    id: "ai-chatbots",
    name: "AI Chatbots",
    description:
      "Deploy intelligent chatbots for support, sales, and engagement trained on your data. They handle natural language, integrate with your channels, and scale 24/7.",
    image: "/images/services/ai-chatbots-hello.png",
    icon: "MessageSquare",
    howItWorks: [
      "Audit your use case and data sources",
      "Design prompts or fine-tune models on your knowledge base",
      "Integrate with web, Slack, WhatsApp, or your app",
      "Monitor, iterate, and expand to new flows",
    ],
    benefits: [
      "24/7 availability",
      "Instant, consistent responses",
      "Scalable without adding headcount",
      "Trained on your brand and data",
      "Multi-channel deployment",
    ],
    useCases: [
      "Customer support",
      "Lead qualification",
      "FAQ automation",
      "Internal knowledge base",
      "Order status & returns",
    ],
    technologies: ["OpenAI", "LangChain", "Pinecone", "RAG", "Custom embeddings"],
  },
  {
    id: "ai-automation",
    name: "AI Automation",
    description:
      "End-to-end workflow automation using AI to eliminate repetitive tasks and connect systems. From document processing to approval flows, we build pipelines that learn and improve.",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&q=80",
    icon: "Zap",
    howItWorks: [
      "Map automatable workflows and pain points",
      "Design AI agents and orchestration pipelines",
      "Integrate with your stack (APIs, CRMs, databases)",
      "Deploy, monitor, and optimize over time",
    ],
    benefits: [
      "Faster throughput",
      "Fewer manual errors",
      "Lower operational cost",
      "Full audit trails",
      "Scales with volume",
    ],
    useCases: [
      "Document classification",
      "Data entry automation",
      "Approval workflows",
      "Report generation",
      "Email triage",
    ],
    technologies: ["n8n", "LangChain", "OpenAI", "Custom APIs", "Webhooks"],
  },
  {
    id: "ai-web-app-dev",
    name: "AI Web & App Development",
    description:
      "Build AI-powered web and mobile applications with custom LLM integrations. From personalized dashboards to smart search and recommendations, we ship production-ready apps.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
    icon: "Code2",
    howItWorks: [
      "Requirements and UX discovery",
      "Architecture and AI feature design",
      "Agile development with embedded AI components",
      "Launch, monitor, and iterate",
    ],
    benefits: [
      "Differentiated product experience",
      "Better UX via personalization",
      "Data-driven features",
      "Future-proof stack",
    ],
    useCases: [
      "Personalized dashboards",
      "Smart search",
      "Recommendation engines",
      "AI-powered forms",
      "Content generation in-app",
    ],
    technologies: ["Next.js", "React", "OpenAI API", "Vercel", "Supabase"],
  },
  {
    id: "ai-image-generation",
    name: "AI Image Generation",
    description:
      "Create custom visual content at scale with fine-tuned image generation models. We integrate generation into your workflow with brand consistency and quality guardrails.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80",
    icon: "Image",
    howItWorks: [
      "Define style guides and brand constraints",
      "Select or fine-tune models for your use case",
      "Integrate via API or internal UI",
      "Apply safety, quality, and consistency checks",
    ],
    benefits: [
      "Faster content creation",
      "Brand consistency at scale",
      "Cost-effective volume",
      "A/B testing visuals",
      "Localization-friendly",
    ],
    useCases: [
      "Ad creatives",
      "Product images",
      "Social content",
      "Illustrations",
      "Concept art",
    ],
    technologies: ["DALL·E", "Stable Diffusion", "Midjourney API", "Fine-tuning", "Safety filters"],
  },
  {
    id: "ai-video-generation",
    name: "AI Video Generation",
    description:
      "Produce marketing videos, product demos, and explainers using generative video AI. From script to final cut, we reduce production time and cost while keeping quality high.",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&q=80",
    icon: "Video",
    howItWorks: [
      "Script and storyboard with your messaging",
      "Build AI generation or editing pipeline",
      "Review, refine, and approve outputs",
      "Deliver in your required formats",
    ],
    benefits: [
      "Faster production cycles",
      "Lower cost per video",
      "Consistent tone and style",
      "Easy localization",
      "Scalable output",
    ],
    useCases: [
      "Product demos",
      "Social ads",
      "Training videos",
      "Personalized video",
      "Explainer clips",
    ],
    technologies: ["Runway", "Synthesia", "Pika", "Custom pipelines", "Editing APIs"],
  },
  {
    id: "ai-voice-speech",
    name: "AI Voice & Speech",
    description:
      "Add voice interfaces, transcription, text-to-speech, and voice cloning to your products. We build for clarity, low latency, and a brand voice that’s distinctly yours.",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=1200&q=80",
    icon: "Mic",
    howItWorks: [
      "Define use case and language requirements",
      "Select or clone voice and configure TTS/STT",
      "Integrate via API, IVR, or in-app",
      "Test, tune for latency and clarity",
    ],
    benefits: [
      "Hands-free user experience",
      "Accessibility compliance",
      "Multilingual support",
      "Consistent brand voice",
      "Real-time and batch",
    ],
    useCases: [
      "IVR and call centers",
      "Voice assistants",
      "Audiobooks",
      "Real-time transcription",
      "Accessibility features",
    ],
    technologies: ["ElevenLabs", "Whisper", "Google TTS", "Voice cloning", "Streaming"],
  },
  {
    id: "ai-data-analytics",
    name: "AI Data Analytics",
    description:
      "Extract insights from structured and unstructured data using AI-powered analytics pipelines. Predictive models, anomaly detection, and natural language queries over your data.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    icon: "BarChart3",
    howItWorks: [
      "Assess data quality and pipelines",
      "Feature engineering and model selection",
      "Build dashboards and NL query interface",
      "Ongoing retraining and monitoring",
    ],
    benefits: [
      "Predictive insights",
      "Anomaly detection",
      "Ask questions in plain English",
      "Automated reporting",
      "Structured and unstructured data",
    ],
    useCases: [
      "Forecasting",
      "Fraud detection",
      "Churn prediction",
      "Operational analytics",
      "Sentiment and trends",
    ],
    technologies: ["Python", "Pandas", "TensorFlow", "BigQuery", "LangChain"],
  },
  {
    id: "ai-marketing",
    name: "AI Marketing",
    description:
      "Personalize campaigns, generate ad copy, and automate content workflows with AI. Improve ROI with better targeting, creative optimization, and messaging that resonates.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    icon: "Megaphone",
    howItWorks: [
      "Audience and channel analysis",
      "Train or configure models on your data",
      "Integrate with campaigns and tools",
      "Run optimization loops and measure lift",
    ],
    benefits: [
      "Higher conversion",
      "Better targeting",
      "Personalized messaging",
      "Efficient spend",
      "Consistent brand voice",
    ],
    useCases: [
      "Ad optimization",
      "Email personalization",
      "Landing page variants",
      "SEO content",
      "Social copy",
    ],
    technologies: ["GPT-4", "Meta Ads API", "Personalization engines", "A/B testing", "Analytics"],
  },
  {
    id: "ai-customer-support",
    name: "AI Customer Support",
    description:
      "Deploy autonomous support agents that resolve tickets without human intervention. Combine intelligent triage, chatbots, and agent assist to boost resolution and CSAT.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&q=80",
    icon: "Headphones",
    howItWorks: [
      "Map support processes and pain points",
      "Deploy triage and routing AI",
      "Roll out bots and agent-assist tools",
      "Track metrics and tune deflection and resolution",
    ],
    benefits: [
      "Faster resolution",
      "Higher CSAT",
      "Agent productivity",
      "Proactive support",
      "24/7 coverage",
    ],
    useCases: [
      "Ticket routing",
      "Self-service deflection",
      "Agent suggestions",
      "Sentiment analysis",
      "Knowledge surfacing",
    ],
    technologies: ["Zendesk", "Intercom", "Custom NLP", "RAG", "Sentiment models"],
  },
  {
    id: "custom-ai-solutions",
    name: "Custom AI Solutions",
    description:
      "Fully bespoke AI systems designed and built for your unique business requirements. When off-the-shelf isn’t enough, we deliver RAG pipelines, proprietary models, and domain-specific systems.",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80",
    icon: "Sparkles",
    howItWorks: [
      "Discovery and feasibility assessment",
      "Architecture design and POC",
      "Development and integration",
      "Deployment and long-term support",
    ],
    benefits: [
      "Competitive advantage",
      "Full ownership",
      "Domain-specific accuracy",
      "Scalable design",
      "Tailored to your data",
    ],
    useCases: [
      "Custom RAG",
      "Proprietary models",
      "Domain-specific NLP",
      "Decision systems",
      "Multi-agent workflows",
    ],
    technologies: ["PyTorch", "LangChain", "Vector DBs", "Custom models", "MLOps"],
  },
];
