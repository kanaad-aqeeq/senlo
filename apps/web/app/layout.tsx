import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Senlo - Email Builder",
  description:
    "Open-source self-hosted email builder platform for creating and managing email templates and campaigns",
  keywords: [
    "email builder",
    "email templates",
    "email marketing",
    "open source",
    "self-hosted",
  ],
  authors: [{ name: "Senlo Team" }],
  creator: "Senlo",
  publisher: "Senlo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Senlo - Email Builder",
    description:
      "Open-source self-hosted email builder platform for creating and managing email templates and campaigns",
    siteName: "Senlo",
    images: [
      {
        url: "/logo-editor.png",
        width: 1200,
        height: 630,
        alt: "Senlo Email Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Senlo - Email Builder",
    description:
      "Open-source self-hosted email builder platform for creating and managing email templates and campaigns",
    images: ["/logo-editor.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
