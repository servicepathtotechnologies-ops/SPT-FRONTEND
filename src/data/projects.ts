/*
  SETUP: Place the app demo video at:
  /public/videos/click-to-sell-demo.mp4
  
  Recommended video specs:
  - Format: MP4 (H.264)
  - Max size: under 30MB for fast loading
  - Aspect ratio: 9:16 (portrait/vertical — since it's a mobile app recording)
  - Resolution: 720x1280 minimum
*/

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  categoryLabel: string;
  liveUrl: string;
  accentColor: string;
  accentColorClass: string;
  accentTextClass: string;
  accentBorderClass: string;
  accentGradientClass: string;
  emoji: string;
  techStack: string[];
  features: string[];
  featured?: boolean;
  type?: 'web' | 'mobile';
  videoPath?: string;
  platform?: string;
  previewBg?: string;
}

export const projects: Project[] = [
  {
    id: 'video-tutor-ai',
    title: "VideoTutor AI",
    tagline: "Turn Any YouTube Video Into a Personal AI Tutor",
    description: "An AI SaaS platform where users paste any YouTube URL and instantly get smart summaries, AI-generated podcast-style audio, and an interactive AI tutor that answers questions based on the video content. Trusted by 2,000+ learners.",
    category: "AI & SaaS",
    categoryLabel: "AI-Powered Learning",
    liveUrl: "https://youtube-ai-sand.vercel.app/",
    techStack: ["Next.js", "OpenAI API", "Text-to-Speech AI", "Transcript Processing"],
    features: ["Instant summaries", "AI podcast generation", "Interactive Q&A tutor"],
    accentColor: "#7C3AED",
    accentColorClass: "bg-violet-600",
    accentTextClass: "text-violet-400",
    accentBorderClass: "border-violet-600",
    accentGradientClass: "bg-gradient-to-br from-violet-600 to-purple-800",
    emoji: "🎓",
    featured: true,
    type: 'web'
  },
  {
    id: 'crm-dashboard',
    title: "CRM Dashboard",
    tagline: "Full-Featured CRM with Pipeline & Lead Management",
    description: "A complete CRM system with an analytics dashboard, lead pipeline management (Kanban-style), agent management, CSV export, and role-based access. Built for sales teams to track, nurture, and convert leads efficiently.",
    category: "Business Tools",
    categoryLabel: "Sales CRM Platform",
    liveUrl: "https://crm-gray-six.vercel.app/dashboard",
    techStack: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS"],
    features: ["Pipeline view", "Lead tracking", "Agent roles", "CSV export", "Dashboard analytics"],
    accentColor: "#2563EB",
    accentColorClass: "bg-blue-600",
    accentTextClass: "text-blue-400",
    accentBorderClass: "border-blue-600",
    accentGradientClass: "bg-gradient-to-br from-blue-600 to-indigo-800",
    emoji: "📊",
    type: 'web'
  },
  {
    id: 'hotel-booking',
    title: "Hotel Room Booking Platform",
    tagline: "Seamless Hotel Room Booking Experience",
    description: "A modern hotel booking platform with room browsing, availability filtering, and a smooth booking flow. Designed for hospitality businesses to manage and accept reservations with a premium guest-facing UI.",
    category: "Hospitality",
    categoryLabel: "Hotel Booking System",
    liveUrl: "https://hotel-room-booking-liard.vercel.app/",
    techStack: ["Next.js", "Tailwind CSS", "Booking Logic", "Calendar UI"],
    features: ["Room catalog", "Availability filtering", "Booking flow", "Admin management"],
    accentColor: "#D97706",
    accentColorClass: "bg-amber-600",
    accentTextClass: "text-amber-400",
    accentBorderClass: "border-amber-600",
    accentGradientClass: "bg-gradient-to-br from-amber-600 to-orange-800",
    emoji: "🏨",
    type: 'web'
  },
  {
    id: 'primenest-realty',
    title: "PrimeNest Realty",
    tagline: "Premium Property Discovery Portal for Hyderabad",
    description: "A full-stack real estate platform for a Hyderabad-based agency. Features property listings with filters (type, location, budget), a lead capture CRM, agent login portal, dynamic location pages, and a WhatsApp enquiry integration.",
    category: "Real Estate",
    categoryLabel: "Real Estate Web App",
    liveUrl: "https://real-estate-one-beige.vercel.app/",
    techStack: ["Next.js", "Tailwind CSS", "CRM Integration", "WhatsApp API"],
    features: ["Property listings with filters", "Lead capture forms", "Agent CRM portal", "Location pages", "WhatsApp integration"],
    accentColor: "#059669",
    accentColorClass: "bg-emerald-600",
    accentTextClass: "text-emerald-400",
    accentBorderClass: "border-emerald-600",
    accentGradientClass: "bg-gradient-to-br from-emerald-600 to-teal-800",
    emoji: "🏠",
    type: 'web'
  },
  {
    id: 'ionora',
    title: 'IONORA',
    tagline: 'Premium Agency Portfolio Website',
    description: 'A visually stunning portfolio website for IONORA — a software solutions and digital marketing agency. Features smooth scroll animations, bold typography, immersive section transitions, and a dark premium aesthetic designed to leave a lasting impression on visitors.',
    category: 'Agency / Portfolio',
    categoryLabel: 'Portfolio Website',
    liveUrl: 'https://www.ionora.net/',
    accentColor: '#8B5CF6',
    accentColorClass: 'bg-violet-500',
    accentTextClass: 'text-violet-400',
    accentBorderClass: 'border-violet-500',
    accentGradientClass: 'bg-gradient-to-br from-violet-600 to-indigo-900',
    previewBg: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
    emoji: '✦',
    techStack: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Vercel'],
    features: [
      'Immersive scroll-driven animations and section transitions',
      'Bold typographic design with premium dark aesthetic',
      'Software solutions & digital marketing agency showcase',
    ],
    featured: false,
    type: 'web',
    platform: undefined,
    videoPath: undefined,
  },
  {
    id: 'click-to-sell',
    title: 'Click to Sell',
    tagline: 'OLX-Style Local Marketplace App',
    description: 'A full-featured Flutter mobile marketplace app where users buy and sell products nearby. Features location-based discovery, in-app chat, subscription monetization, wallet/rewards system, and real-time Firebase backend. Available on Android & iOS.',
    category: 'Mobile App',
    categoryLabel: 'Flutter Mobile App',
    liveUrl: '', // no web URL — it's a mobile app
    accentColor: '#F97316',
    accentColorClass: 'bg-orange-500',
    accentTextClass: 'text-orange-400',
    accentBorderClass: 'border-orange-500',
    accentGradientClass: 'bg-gradient-to-br from-orange-500 to-red-700',
    emoji: '📱',
    techStack: ['Flutter', 'Firebase', 'Firestore', 'Firebase Auth', 'Push Notifications', 'Cloud Storage'],
    features: [
      'Location-based product discovery with radius filters',
      'In-app real-time chat between buyers and sellers',
      'Subscription plans, wallet rewards & featured listings',
    ],
    featured: false,
    type: 'mobile',
    videoPath: '/videos/click-to-sell-demo.mp4',
    platform: 'Android & iOS',
    previewBg: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
  },
  {
    id: 'buildmart',
    title: 'BuildMart',
    tagline: 'Construction Materials Marketplace App',
    description: 'A location-based construction materials marketplace app that connects house owners, contractors, and builders with nearby material shops. Users can browse cement, bricks, steel, tiles, pipes and more — with pickup or delivery options and radius-based shop discovery.',
    category: 'Mobile App',
    categoryLabel: 'Flutter Mobile App',
    liveUrl: '',
    accentColor: '#EAB308',
    accentColorClass: 'bg-yellow-500',
    accentTextClass: 'text-yellow-400',
    accentBorderClass: 'border-yellow-500',
    accentGradientClass: 'bg-gradient-to-br from-yellow-500 to-orange-700',
    emoji: '🏗️',
    techStack: ['Flutter', 'Firebase', 'Firestore', 'Google Maps', 'Firebase Auth', 'Cloud Storage'],
    features: [
      'Radius-based nearby shop discovery (10km, 20km, 50km)',
      'Pickup or delivery selection per order',
      'Category-wise material browsing with search & filters',
    ],
    featured: false,
    type: 'mobile',
    videoPath: '/videos/buildmart-demo.mp4',
    platform: 'Android & iOS',
    previewBg: 'linear-gradient(135deg, #0f172a 0%, #1c1407 50%, #0f172a 100%)',
  }
];
