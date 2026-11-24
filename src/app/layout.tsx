import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { profile, site } from "@/data/portfolio";
import { Providers } from "@/components/layout/Providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${profile.name}` },
  description: site.description,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name }],
  keywords: [
    "Hema N",
    "Software Engineer",
    "MCA Graduate",
    "Entry-level Software Engineer",
    "Chennai",
    "Python",
    "AWS",
    "Cisco Packet Tracer",
    "Web Development",
    "Portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: `${profile.name} — Portfolio`,
    title: site.title,
    description: site.description,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F8F5" },
    { media: "(prefers-color-scheme: dark)", color: "#101014" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  email: `mailto:${profile.email}`,
  url: site.url,
  address: { "@type": "PostalAddress", addressLocality: "Chennai", addressCountry: "IN" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Karpagam Academy of Higher Education" },
    { "@type": "CollegeOrUniversity", name: "GTN Arts College" },
  ],
  knowsAbout: ["Python", "C", "HTML", "CSS", "JavaScript", "AWS", "MySQL", "Linux", "Computer Networking", "Git"],
  sameAs: [profile.linkedin, profile.github].filter(Boolean),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${sans.variable} ${mono.variable} antialiased`}>
      <body className="min-h-dvh">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
        <Providers>
          <a
            href="#main"
            className="sr-only rounded-full bg-fg px-4 py-2 text-sm text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[90]"
          >
            Skip to content
          </a>
          <ScrollProgress />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
