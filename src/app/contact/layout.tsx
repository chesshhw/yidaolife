import type { Metadata } from "next";

const SITE_URL = "https://yidaolife.com";

export const metadata: Metadata = {
  title: "联系我们｜企业急救培训与AHA导师咨询｜都会急救",
  description:
    "企业急救培训（CPR+AED）团体课程定制，支持2小时/半天/全天（含证书）方案与全国排期；AHA导师认证咨询与合作。电话/微信：13512456138。",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "联系我们｜企业急救培训与AHA导师咨询｜都会急救",
    description:
      "企业急救培训（CPR+AED）团体课程定制，支持2小时/半天/全天（含证书）方案与全国排期；AHA导师认证咨询与合作。电话/微信：13512456138。",
    type: "website",
    url: `${SITE_URL}/contact`,
    images: [{ url: `${SITE_URL}/images/hero.webp`, width: 1200, height: 630, alt: "企业急救培训与咨询" }],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
