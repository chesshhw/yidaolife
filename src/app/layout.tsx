import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const SITE_NAME = "都会急救";
const SITE_URL = "https://yidaolife.com";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "天津一道技术服务有限公司",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  brand: { "@type": "Brand", name: SITE_NAME },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "13512456138",
    email: "placeholder@yidaolife.com",
    contactType: "customer service",
    areaServed: "CN",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "都会急救｜AHA急救培训",
    template: "%s | 都会急救",
  },
  description:
    "都会急救（AHA授权培训中心）提供 Heartsaver 急救员认证课程：CPR、AED、急救技能，小班教学，全国多城市可约。",
  applicationName: "都会急救",
  keywords: ["AHA", "美国心脏协会", "急救培训", "CPR", "AED", "Heartsaver", "急救员认证"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "都会急救｜AHA急救培训",
    description:
      "AHA授权培训中心｜Heartsaver 急救员认证｜CPR + AED + 急救技能｜小班教学｜全国多城市可约。",
    images: [
      { url: "/images/hero.jpg", width: 1200, height: 630, alt: "都会急救 AHA 急救培训" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "都会急救｜AHA急救培训",
    description:
      "AHA授权培训中心｜Heartsaver 急救员认证｜CPR + AED + 急救技能｜全国多城市可约。",
    images: ["/images/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} antialiased font-sans min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1 pt-16 sm:pt-20">{children}</main>
        <Footer />
        <FloatingContact />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
