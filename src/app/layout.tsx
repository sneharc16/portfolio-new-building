import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { about, identity } from "@/data/content";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const sora = Sora({ variable: "--font-sora", subsets: ["latin"], display: "swap" });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: identity.name,
  description: about[0],
  authors: [{ name: identity.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    title: identity.name,
    description: about[0],
    siteName: identity.name,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: identity.name, description: about[0] },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0B",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
