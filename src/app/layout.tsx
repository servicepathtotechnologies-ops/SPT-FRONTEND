import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Analytics } from "@/components/analytics/Analytics";
import { JsonLd } from "@/components/seo/JsonLd";
import { SmoothScroll } from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Service Path Technologies | Enterprise Technology Solutions",
  icons: {
    icon: "/sptlogo.png?v=2",   // Favicon (browser tab) – SPT logo
    apple: "/sptlogo.png?v=2",
  },
  description:
    "Enterprise technology solutions that streamline operations, unlock insights, and drive measurable business outcomes.",
  openGraph: {
    title: "Service Path Technologies | Enterprise Technology Solutions",
    description:
      "Enterprise technology solutions that streamline operations and drive measurable business outcomes.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Service Path Technologies | Enterprise Technology Solutions",
    description: "Enterprise technology solutions that streamline operations and drive measurable outcomes.",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sptsolutions.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sptsolutions.com";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/sptlogo.png?v=2" type="image/png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem("spt-theme");var p=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";var theme=(t==="light"||t==="dark")?t:p;document.documentElement.classList.add(theme);})();`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <JsonLd siteUrl={siteUrl} />
          <SmoothScroll>
            <Navbar />
            <main className="flex-1">{children}</main>
          </SmoothScroll>
          <ChatWidget />
          <Analytics />
          <CustomCursor />
        </ThemeProvider>
      </body>
    </html>
  );
}
