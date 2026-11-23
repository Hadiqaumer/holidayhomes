import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import WhatsAppFloat from "../components/WhatsAppFloat";
const head = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-head", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "TechTwist Global – Hospitality BPO & Guest Management",
  description: "End-to-end guest management, 24/7 guest assistance and hospitality-focused BPO for hotels, resorts and hotel groups in Pakistan and the UAE.",
  openGraph: { title: "TechTwist Global – Hospitality BPO & Guest Management", description: "Guest management and customer support for hotels, resorts and holiday homes.", type: "website" },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#0b4f5c" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${head.variable} ${body.variable}`}>
      <body>
        {children}
<WhatsAppFloat />
        {children}
        {/* if JavaScript is off, show content instead of leaving it hidden for the scroll animation */}
        <noscript><style>{`.rv{opacity:1!important;transform:none!important}.grow{transform:none!important}`}</style></noscript>
      </body>
    </html>
  );
}
