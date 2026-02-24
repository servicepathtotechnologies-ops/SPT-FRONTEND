# SPT Solutions – Complete Project Overview

## 1. Project Identity

**Name:** SPT Solutions (spt-solutions)  
**Type:** Enterprise-grade marketing website for premium AI services  
**Version:** 0.1.0  
**Purpose:** Marketing site with AI chat, lead capture, demo booking, recommendation engine, and admin dashboard for SPT Solutions—an AI services company.

---

## 2. Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | Next.js 16 (App Router) | SSR, API routes, file-based routing |
| UI | React 19 | Components, server components |
| Language | TypeScript 5 | Type safety, strict mode |
| Styling | Tailwind CSS v4 | Utility-first, CSS variables |
| Database | Prisma + PostgreSQL | Leads, appointments, conversations |
| AI | Google Gemini API | Chat widget and recommendation flow |
| Animations | Framer Motion, GSAP | Page transitions, scroll effects |
| 3D | Three.js, React Three Fiber, Drei | Hero particle background |
| Forms | React Hook Form + Zod | Validation, contact, booking |
| Email | Resend (optional) | Contact form notifications |

---

## 3. Project Structure

```
spt-solutions/
├── prisma/
│   └── schema.prisma      # DB models: Lead, Conversation, Appointment, AdminUser
├── public/                # Static assets, images
├── src/
│   ├── app/               # App Router
│   │   ├── layout.tsx     # Root layout, fonts, metadata, Navbar/Footer
│   │   ├── page.tsx       # Home: Hero, ServicesCarousel, ValueProposition, HomeCTA
│   │   ├── globals.css    # Tailwind, theme vars (navy/purple, light theme)
│   │   ├── robots.ts      # SEO
│   │   ├── sitemap.ts     # SEO
│   │   ├── about/         # About page
│   │   ├── admin/         # Admin dashboard (password-protected)
│   │   ├── book-demo/     # Booking form
│   │   ├── contact/       # Contact form
│   │   ├── recommendation/ # AI service recommendation wizard
│   │   ├── services/      # Services index + [slug] dynamic pages
│   │   ├── privacy/       # Privacy policy
│   │   └── terms/         # Terms of service
│   ├── components/
│   │   ├── analytics/     # Google Analytics
│   │   ├── animations/    # ScrollReveal, etc.
│   │   ├── chat/          # ChatWidget (floating AI chat)
│   │   ├── home/          # Hero, ServicesCarousel, ValueProposition, HomeCTA
│   │   ├── layout/        # Navbar, Footer
│   │   ├── providers/     # ThemeProvider
│   │   ├── seo/           # JsonLd structured data
│   │   └── ui/            # Button, etc.
│   └── lib/
│       ├── prisma.ts      # Prisma client singleton
│       ├── services.ts    # 10 service definitions (slug, name, description, etc.)
│       ├── chatPresets.ts # Chat presets
│       └── utils.ts       # Helpers (clsx, etc.)
└── package.json           # Dependencies, scripts
```

---

## 4. Database Schema (Prisma)

- **Lead:** id, email, name, company, message, service, source (contact|chat|recommendation), createdAt, metadata
- **Conversation:** id, sessionId, messages (JSON), email, createdAt, updatedAt
- **Appointment:** id, email, name, company, date, service, notes, confirmed, createdAt
- **AdminUser:** id, email, passwordHash, createdAt

---

## 5. API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| /api/chat | POST | AI chat via Gemini; messages + sessionId → response |
| /api/contact | POST | Store lead, optional Resend email |
| /api/booking | POST | Create Appointment record |
| /api/recommendation | POST | AI-driven service recommendation |
| /api/admin/leads | GET | Export leads (admin auth) |
| /api/admin/login | POST | Admin password verification |

---

## 6. Pages & Features

- **Home (/)**: Hero with 3D particle background, infinite services carousel, value proposition, CTA
- **Services (/services)**: Grid of all services
- **Service detail (/services/[slug])**: Hero, description, how it works, benefits, use cases, CTA
- **Contact (/contact)**: Multi-step-ready form → Lead + optional email
- **Book Demo (/book-demo)**: Date/time + service selection → Appointment
- **Recommendation (/recommendation)**: Multi-step wizard → AI suggests services
- **About (/about)**: Company info
- **Admin (/admin)**: Password login, view leads, export CSV
- **Privacy (/privacy)**, **Terms (/terms)**: Legal pages

---

## 7. Services Catalog

10 services defined in `lib/services.ts`:

1. AI Chatbots  
2. AI Automation  
3. AI Web & App Development  
4. AI Image Generation  
5. AI Video Generation  
6. AI Voice & Speech  
7. AI Data Analytics  
8. AI Marketing  
9. AI Customer Support  
10. Custom AI Solutions  

Each has: slug, name, shortDescription, description, howItWorks, benefits, useCases, icon.

---

## 8. Design System (globals.css)

- **Primary:** Navy (#0B1C2D, #08141F, #1A2F47)
- **Accent:** Purple (#6A5ACD)
- **Background:** White (#FFFFFF), alt (#F7F9FC)
- **Fonts:** Inter, Poppins, Geist Mono
- **Radii:** 0.5rem, 0.75rem
- Light theme by default; ThemeProvider available for future theming

---

## 9. Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| DATABASE_URL | For leads/booking/admin | PostgreSQL connection |
| GEMINI_API_KEY | For chat & recommendation | Google Gemini API |
| ADMIN_PASSWORD | For /admin | Simple password auth |
| RESEND_API_KEY | Optional | Contact form email |
| RESEND_FROM, CONTACT_EMAIL | Optional | Email sender / recipient |
| NEXT_PUBLIC_SITE_URL | Optional | Sitemap, OG URLs |
| NEXT_PUBLIC_GA_ID | Optional | Google Analytics |

---

## 10. Scripts (package.json)

- `npm run dev` — Next.js dev server
- `npm run build` — Production build
- `npm run start` — Production server
- `npm run lint` — ESLint
- `npm run db:push` — Push Prisma schema to DB
- `npm run db:studio` — Prisma Studio
- `postinstall` — Runs `prisma generate`

---

## 11. SEO & Analytics

- Meta tags, OpenGraph, Twitter cards in layout
- JsonLd structured data component
- sitemap.ts, robots.ts
- Analytics component for optional GA

---

## 12. Key Components

- **HeroDynamic / HeroScene**: Three.js particle background, responsive hero
- **ServicesCarousel**: Infinite scroll of service cards
- **ChatWidget**: Floating AI chat using Gemini
- **Navbar**: Sticky, services dropdown, mobile hamburger
- **ThemeProvider**: Context for future theme switching

---

## 13. Deployment (README)

- Vercel recommended
- Add env vars in Vercel
- Use Vercel Postgres or external PostgreSQL
- Run `prisma db push` or migrations
- Optional: Cloudflare in front for CDN

---

## 14. Summary

SPT Solutions is a modern Next.js 16 marketing site with React 19, TypeScript, Tailwind v4, Prisma/PostgreSQL, and Google Gemini for AI features. It offers a dark-futuristic (code-prism) design, 10 AI services, lead capture, demo booking, AI chat, service recommendations, and a simple admin dashboard. The project is ready for Vercel deployment with environment configuration.

---

*Generated as project overview for SPT Solutions. Last updated: February 2025.*
