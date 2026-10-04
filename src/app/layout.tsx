import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vinayduvvada.dev"),
  title: "Vinay Duvvada — Web Developer & UI/UX Designer",
  description:
    "Portfolio of Vinay Duvvada, a Computer Science & Design student passionate about web development, UI/UX design and interactive digital experiences.",
  keywords: [
    "Vinay Duvvada",
    "Creative Developer",
    "Web Developer",
    "UI/UX Designer",
    "Frontend Developer",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Three.js",
    "Figma",
    "Bhimavaram",
    "Portfolio",
  ],
  authors: [{ name: "Vinay Duvvada", url: "https://github.com/duvvadavinay-hub" }],
  creator: "Vinay Duvvada",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vinayduvvada.dev",
    title: "Vinay Duvvada — Web Developer & UI/UX Designer",
    description:
      "A world-class interactive portfolio at the intersection of design, code, motion, and digital experiences.",
    siteName: "Vinay Duvvada Portfolio",
    images: [
      {
        url: "/images/portfolio-showcase.jpg",
        width: 1200,
        height: 630,
        alt: "Vinay Duvvada — Web Developer & UI/UX Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vinay Duvvada — Web Developer & UI/UX Designer",
    description:
      "Computer Science & Design student passionate about web development, UI/UX design, and interactive experiences.",
    images: ["/images/portfolio-showcase.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Vinay Duvvada",
    jobTitle: "Web Developer & UI/UX Designer",
    description:
      "Computer Science & Design Student, Creative Frontend Developer, and UI/UX Designer in Progress.",
    url: "https://vinayduvvada.dev",
    sameAs: [
      "https://github.com/duvvadavinay-hub",
      "https://www.linkedin.com/in/vinay-duvvada-508850389",
    ],
    knowsAbout: [
      "Web Development",
      "UI/UX Design",
      "React",
      "Next.js",
      "TypeScript",
      "Figma",
      "Creative Motion Design",
      "Fullstack Web Apps",
    ],
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} dark scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#050508] text-[#f4f4f7] font-sans antialiased selection:bg-rose-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
