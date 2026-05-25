import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { portfolioConfig } from "src/config/portfolio.config";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: `${portfolioConfig.personalInfo.fullName} | ${portfolioConfig.personalInfo.role}`,
  description: `${portfolioConfig.personalInfo.tagline}. ${portfolioConfig.personalInfo.shortBio}`,
  keywords: [
    "Portfolio",
    "Senior Software Engineer",
    "Event-Driven Architecture",
    "Apache Kafka",
    ".NET Core",
    "SQL Server",
    "Outbox Pattern",
    "Ajay Kapuria"
  ],
  authors: [{ name: portfolioConfig.personalInfo.fullName }],
  creator: portfolioConfig.personalInfo.fullName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourportfolio.com",
    title: `${portfolioConfig.personalInfo.fullName} | ${portfolioConfig.personalInfo.role}`,
    description: portfolioConfig.personalInfo.tagline,
    siteName: `${portfolioConfig.personalInfo.fullName} Developer Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${portfolioConfig.personalInfo.fullName} | ${portfolioConfig.personalInfo.role}`,
    description: portfolioConfig.personalInfo.tagline,
    creator: "@ajaykapuria",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // SEO JSON-LD Structured Data Entity
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": portfolioConfig.personalInfo.fullName,
    "jobTitle": portfolioConfig.personalInfo.role,
    "url": "https://yourportfolio.com",
    "sameAs": [
      portfolioConfig.socialLinks.github,
      portfolioConfig.socialLinks.linkedin,
      portfolioConfig.socialLinks.twitter
    ].filter(Boolean),
    "knowsAbout": [
      "C#",
      ".NET Core",
      "Apache Kafka",
      "Event-Driven Architecture",
      "Outbox Pattern",
      "SignalR",
      "SQL Server Optimization",
      "AWS Cloud Architecture"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": portfolioConfig.personalInfo.location
    },
    "email": portfolioConfig.personalInfo.email
  };

  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased dark`}
      style={{ colorScheme: "dark" }}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col relative">
        {children}
      </body>
    </html>
  );
}
