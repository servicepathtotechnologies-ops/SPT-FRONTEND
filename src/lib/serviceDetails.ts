/**
 * Extended, detailed content for each service page: overview, step details, benefit details, use-case details, section images.
 */
export interface ServiceDetails {
  overview: string;
  howItWorksDetails: string[];
  benefitDetails: string[];
  useCaseDetails: string[];
  sectionImage: string;
}

const details: Record<string, ServiceDetails> = {
  "ai-chatbots": {
    overview:
      "AI chatbots are transforming how businesses interact with customers around the clock. Our intelligent chatbot solutions combine large language models (LLMs) with your proprietary data—knowledge bases, FAQs, product catalogs, and past conversations—to deliver accurate, on-brand responses that resolve issues and capture leads without human intervention. We design for your channels: embed on your website, integrate with Slack or Microsoft Teams, or connect to your CRM and help-desk tools for a unified support experience.",
    howItWorksDetails: [
      "We review your use case, existing content (FAQs, docs, product info), and integration points. This discovery phase defines scope, success metrics, and guardrails so the chatbot stays on-brand and in scope.",
      "We choose the right model (e.g., fine-tuned or prompt-engineered) and design the conversation flow. Custom prompts and optional fine-tuning ensure the bot speaks in your voice and handles edge cases.",
      "We deploy the bot to your chosen channels—website widget, Slack, Teams, or API—and connect it to your CRM, ticketing system, or e-commerce backend so conversations and handoffs are seamless.",
      "We monitor performance, collect feedback, and iteratively improve responses, coverage, and escalation rules so the bot gets better over time.",
    ],
    benefitDetails: [
      "Chatbots respond instantly at any time, reducing wait times and improving satisfaction for global or after-hours users.",
      "Customers get immediate answers to common questions instead of waiting in queue or searching through help articles.",
      "One bot can handle thousands of concurrent conversations, scaling with demand without proportionally scaling headcount.",
      "Every user receives the same accurate, up-to-date information, eliminating inconsistent or outdated answers from human agents.",
    ],
    useCaseDetails: [
      "Handle tier-1 support questions, password resets, order status, and returns—freeing agents for complex or emotional cases.",
      "Qualify inbound leads by asking about budget, timeline, and use case, then route hot leads to sales and nurture others automatically.",
      "Answer frequently asked questions from your knowledge base with cited sources, reducing support volume and improving self-service.",
      "Let employees search policies, HR docs, and internal playbooks via natural language for faster onboarding and day-to-day operations.",
    ],
    sectionImage: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&q=85",
  },
  "ai-automation": {
    overview:
      "Repetitive, rules-based work is a perfect fit for AI automation. We build pipelines that classify documents, route approvals, extract data, and generate reports—so your team can focus on judgment, creativity, and customer relationships. Our solutions integrate with the tools you already use (email, SharePoint, ERP, CRM) and include audit trails and human-in-the-loop checks so you stay in control while cutting cost and cycle time.",
    howItWorksDetails: [
      "We map your current workflows, identify bottlenecks and high-volume repetitive tasks, and prioritize use cases by impact and feasibility.",
      "We design AI agents (e.g., classifiers, extractors) and orchestrate them into pipelines. Workflows can include approvals, exceptions, and fallbacks to humans.",
      "We connect the automation to your existing stack via APIs, connectors, or custom integrations so data flows in and out without manual re-entry.",
      "We deploy to your environment, set up monitoring and alerts, and tune accuracy and thresholds based on real usage.",
    ],
    benefitDetails: [
      "Documents and tasks are processed in minutes instead of days, shortening cycle times and improving throughput.",
      "AI reduces manual data entry and misclassification, leading to fewer rework loops and higher data quality.",
      "Automation reduces the need for headcount on repetitive tasks, lowering operational cost while maintaining or improving quality.",
      "Every automated decision and handoff is logged for compliance, audits, and continuous improvement.",
    ],
    useCaseDetails: [
      "Automatically tag and route invoices, contracts, and forms by type, department, or content so the right team handles each item.",
      "Extract key fields from forms, emails, and documents into your database or CRM so agents don’t re-type information.",
      "Route approval requests to the right people, apply policy rules, and escalate when needed—all with a clear audit trail.",
      "Generate status reports, summaries, and dashboards from raw data so managers get insights without manual compilation.",
    ],
    sectionImage: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=1200&q=85",
  },
  "ai-web-app-dev": {
    overview:
      "We build custom web and mobile applications with AI woven in from day one—personalization, smart search, recommendations, and intelligent forms. Whether you need a customer portal, internal tool, or consumer app, we use modern stacks (e.g., Next.js, React Native) and integrate proven AI APIs and custom models so your product stands out and stays maintainable.",
    howItWorksDetails: [
      "We align on goals, user stories, and UX. We identify where AI can add the most value: search, recommendations, content generation, or workflow assistance.",
      "We design the architecture (front end, APIs, AI services) and define how AI features will be trained, updated, and monitored.",
      "We develop in sprints, integrating AI components (embeddings, recommendations, NLU) and testing with real or synthetic data.",
      "We launch to production, set up analytics and feedback loops, and iterate based on usage and business metrics.",
    ],
    benefitDetails: [
      "AI-powered features differentiate your product from generic templates and create stickier, more valuable experiences.",
      "Personalized content, smart defaults, and intelligent search reduce friction and help users accomplish goals faster.",
      "Recommendations, predictions, and automation are driven by your data, improving over time as usage grows.",
      "We use scalable, maintainable stacks and clear separation between UI and AI so you can evolve without rewrites.",
    ],
    useCaseDetails: [
      "Dashboards that adapt to role, preferences, and behavior so each user sees the most relevant metrics and actions.",
      "Search that understands intent and synonyms and ranks results by relevance, not just keywords.",
      "Recommendation engines for products, content, or next-best actions based on behavior and similar users.",
      "Forms and workflows that auto-fill, validate, and suggest next steps using context and past data.",
    ],
    sectionImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=85",
  },
  "ai-image-generation": {
    overview:
      "Generate marketing creatives, product visuals, and branded content at scale using state-of-the-art image models. We integrate generation into your workflow with strict style and safety guardrails—so you get consistent, on-brand assets without the cost and delay of traditional photo shoots or design rounds. Ideal for ads, social content, product imagery, and internal visuals.",
    howItWorksDetails: [
      "We capture your brand guidelines, preferred styles, and content types. We define what the model can and cannot generate to protect brand and safety.",
      "We select or fine-tune a model to match your aesthetic and use cases. Style consistency is enforced via reference images and prompt templates.",
      "We expose generation via API, internal UI, or integration with your CMS or ad platform so your team can produce assets on demand.",
      "We set up quality checks, moderation, and approval workflows so only approved images go live.",
    ],
    benefitDetails: [
      "Produce dozens of variants in minutes instead of waiting on design or photography for each campaign.",
      "Trained on your brand assets, the model keeps colors, tone, and composition consistent across all generated images.",
      "At scale, generated assets cost less per unit than traditional production while remaining high quality.",
      "Easily A/B test ad creatives, hero images, and thumbnails to optimize conversion and engagement.",
    ],
    useCaseDetails: [
      "Generate ad creatives in multiple sizes and variants for paid social and display, aligned with brand and campaign briefs.",
      "Create product shots, lifestyle imagery, and variations for e-commerce and catalogs without new photo shoots.",
      "Produce social posts, stories, and banners with consistent branding and messaging for organic and paid channels.",
      "Create illustrations, icons, and diagrams for presentations, docs, and internal tools.",
    ],
    sectionImage: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=1200&q=85",
  },
  "ai-video-generation": {
    overview:
      "From product demos and social ads to training and personalized video, we use AI to script, generate, and edit video at a fraction of traditional production time and cost. Our pipelines combine AI-generated visuals, voiceover, and editing so you can scale video content without a full in-house production team. We focus on clarity, brand consistency, and the right level of automation for your use case.",
    howItWorksDetails: [
      "We define the goal, audience, and format (length, aspect ratio, style). We draft scripts and storyboards and align on tone and key messages.",
      "We build a pipeline that may include AI-generated clips, stock or existing footage, and AI voiceover or subtitles, with clear approval steps.",
      "We review outputs with you, refine prompts and templates, and tune for quality and brand fit.",
      "We deliver in your required formats and, if needed, integrate with your CMS or ad platform for distribution.",
    ],
    benefitDetails: [
      "Turn around video content in days instead of weeks, so campaigns and product launches aren’t delayed by production.",
      "AI-driven production reduces cost per video while maintaining professional quality for many use cases.",
      "Templates and brand guidelines keep tone and look consistent across all generated or edited videos.",
      "Generate multiple language or regional variants from one master script and asset set.",
    ],
    useCaseDetails: [
      "Create short product demos and feature highlights for website, sales, and events without full production crews.",
      "Produce social video ads in multiple formats and lengths, with consistent messaging and creative.",
      "Generate or assemble training and onboarding videos that can be updated quickly as processes change.",
      "Personalize video messages (e.g., names, segments) for marketing or customer success at scale.",
    ],
    sectionImage: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&q=85",
  },
  "ai-voice-speech": {
    overview:
      "Add voice interfaces to your products with text-to-speech (TTS), speech-to-text (STT), and conversational voice agents. We build for clarity, low latency, and a voice that fits your brand—whether you need IVR, in-app voice assistants, audiobooks, or real-time transcription. We select and tune models and integrate with your existing telephony, apps, and workflows.",
    howItWorksDetails: [
      "We define use cases (IVR, in-app assistant, transcription, etc.), languages, and requirements for latency, accuracy, and voice quality.",
      "We choose voices from a catalog or use voice cloning (where appropriate) so the experience matches your brand and audience.",
      "We integrate via APIs, telephony connectors, or SDKs into your app, contact center, or content pipeline.",
      "We test across accents and environments, tune for accuracy and latency, and set up monitoring and fallbacks.",
    ],
    benefitDetails: [
      "Users can complete tasks by speaking, improving accessibility and convenience in hands-free or eyes-busy contexts.",
      "Voice interfaces and transcription make your product usable for people who prefer or require auditory interaction.",
      "Support multiple languages and accents so global users get a native-feeling experience.",
      "One chosen voice (or a small set) keeps the experience consistent across touchpoints and channels.",
    ],
    useCaseDetails: [
      "Power IVR and call center flows with natural-language understanding and TTS so callers get answers without long menus.",
      "Add in-app or device voice assistants that answer questions, run commands, or guide users through workflows.",
      "Produce audiobooks, narration, or explainer content at scale with consistent, high-quality TTS.",
      "Transcribe meetings, calls, and videos in real time or batch for search, compliance, and accessibility.",
    ],
    sectionImage: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200&q=85",
  },
  "ai-data-analytics": {
    overview:
      "Move beyond static dashboards with predictive models, anomaly detection, and natural language queries over your data. We help you turn raw data into confident decisions—forecasting demand, detecting fraud, predicting churn, and answering ad-hoc questions in plain English. Our solutions connect to your warehouse or lake and deliver insights through dashboards, alerts, and conversational interfaces.",
    howItWorksDetails: [
      "We assess your data sources, quality, and pipelines. We define key metrics and the decisions that need to be data-driven.",
      "We build and tune models (forecasting, classification, anomaly detection) and engineer features from your domain data.",
      "We deliver insights via dashboards, NL query interfaces (e.g., “What drove churn last quarter?”), and automated reports.",
      "We retrain and refresh models as new data arrives and refine based on feedback and business outcomes.",
    ],
    benefitDetails: [
      "Forecast demand, revenue, and resource needs so you can plan and allocate with confidence.",
      "Detect unusual patterns in transactions, behavior, or systems before they become costly incidents.",
      "Let stakeholders ask questions in natural language and get answers backed by your data, without writing SQL.",
      "Schedule and distribute reports and alerts so the right people get the right insights at the right time.",
    ],
    useCaseDetails: [
      "Demand, revenue, and capacity forecasting for operations, finance, and planning.",
      "Real-time or batch fraud detection for transactions, accounts, and claims.",
      "Churn and lifetime value models to prioritize retention and personalize outreach.",
      "Operational KPIs, exception reporting, and root-cause analysis for daily operations.",
    ],
    sectionImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85",
  },
  "ai-marketing": {
    overview:
      "Improve campaign ROI with AI-driven targeting, creative optimization, and content generation. We help you personalize messaging, test creatives at scale, and optimize spend across channels—so your marketing reaches the right audience with the right message at the right time. Our solutions integrate with your ad platforms, email tools, and CMS to close the loop from insight to execution.",
    howItWorksDetails: [
      "We analyze your audiences, channels, and historical performance to identify high-impact opportunities and data gaps.",
      "We train or configure models for targeting, creative scoring, or content generation using your first-party and campaign data.",
      "We integrate with your ad manager, email platform, or CMS so recommendations and generated content flow into live campaigns.",
      "We set up experiments and optimization loops so you can continuously improve conversion and efficiency.",
    ],
    benefitDetails: [
      "Better targeting and creative relevance lead to higher conversion rates and lower cost per acquisition.",
      "AI identifies lookalike segments and optimal audiences so spend goes to the highest-potential users.",
      "Personalized copy, offers, and creative increase engagement and conversion across email, web, and ads.",
      "Automated bidding and creative testing help you get more results from the same or lower budget.",
    ],
    useCaseDetails: [
      "Optimize ad creative, placement, and audience allocation using predictive performance and experimentation.",
      "Personalize email subject lines, body copy, and product recommendations by segment and behavior.",
      "Generate and test landing page variants and messaging to improve conversion and form completion.",
      "Produce and optimize SEO-friendly content at scale while keeping brand voice and accuracy.",
    ],
    sectionImage: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1200&q=85",
  },
  "ai-customer-support": {
    overview:
      "Combine intelligent triage, chatbots, and agent-assist tools to resolve more support tickets faster and improve CSAT. We design systems that route and prioritize tickets, deflect common questions to self-service, and give agents real-time suggestions and knowledge so every interaction is efficient and consistent. The result is shorter resolution times, happier customers, and agents focused on complex and high-value conversations.",
    howItWorksDetails: [
      "We map your support process, ticket types, and escalation paths. We identify where triage, deflection, and assist will have the most impact.",
      "We build or tune models for routing, intent detection, and sentiment, and deploy chatbots for tier-1 deflection.",
      "We deploy agent-assist tools that surface relevant articles, past cases, and suggested responses inside your help-desk UI.",
      "We track resolution time, CSAT, deflection rate, and agent productivity and tune rules and models over time.",
    ],
    benefitDetails: [
      "Triage and routing get issues to the right team faster; automation and assist shorten handle time for common cases.",
      "Faster, more consistent resolutions and less wait time typically improve customer satisfaction scores.",
      "Agents spend less time searching for answers and more time solving complex or emotional issues.",
      "Deflection and proactive outreach (e.g., status updates, tips) prevent issues from escalating and improve perception.",
    ],
    useCaseDetails: [
      "Route tickets by intent, urgency, and skill so the right agent or team handles each case from the start.",
      "Deflect common questions to chatbots and self-service so only complex or sensitive issues reach agents.",
      "Surface suggested replies, knowledge articles, and similar past cases so agents respond quickly and consistently.",
      "Analyze sentiment and topic to prioritize at-risk customers and improve first-contact resolution.",
    ],
    sectionImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&q=85",
  },
  "custom-ai-solutions": {
    overview:
      "When off-the-shelf AI isn’t enough, we design and build custom systems tailored to your domain—from RAG (retrieval-augmented generation) and knowledge bases to proprietary models and decision engines. We focus on accuracy, scalability, and ownership so your AI becomes a durable competitive advantage. Ideal for complex domains, sensitive data, or use cases where generic models fall short.",
    howItWorksDetails: [
      "We run discovery and feasibility: we clarify the problem, data, and success criteria and recommend build vs. buy and architecture options.",
      "We design the architecture (data pipelines, models, APIs) and deliver a POC or MVP to validate approach and value.",
      "We develop the full solution, integrate with your systems, and put in place security, monitoring, and governance.",
      "We deploy to production and provide ongoing support, retraining, and optimization as your data and requirements evolve.",
    ],
    benefitDetails: [
      "Custom models and workflows are built for your domain and data, giving you differentiation that generic APIs can’t match.",
      "You own the IP, data, and model lifecycle so you’re not locked into a single vendor or black box.",
      "Domain-specific training and retrieval improve accuracy and reduce hallucinations in specialized contexts.",
      "We design for scale and maintainability so the system grows with your business and stays supportable.",
    ],
    useCaseDetails: [
      "Custom RAG systems that combine your documents, APIs, and databases for accurate, cited answers in your domain.",
      "Proprietary models fine-tuned or trained on your data for classification, generation, or decision support.",
      "Domain-specific NLP for legal, medical, or technical content where general-purpose models are insufficient.",
      "Decision systems that encode your rules and policies and integrate with operational tools for consistent outcomes.",
    ],
    sectionImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=85",
  },
};

export function getServiceDetails(slug: string): ServiceDetails | null {
  return details[slug] ?? null;
}
