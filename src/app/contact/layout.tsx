import type { Metadata } from "next";

const SITE_URL = "https://yidaolife.com";

export const metadata: Metadata = {
  title: "咨询与联系 | 急救课程报名与企业培训咨询",
  description:
    "提供急救课程报名咨询、培训城市查询和企业急救培训咨询服务。可通过微信或电话联系，了解课程安排、证书信息及企业培训方案。",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "咨询与联系 | 急救课程报名与企业培训咨询",
    description:
      "提供急救课程报名咨询、培训城市查询和企业急救培训咨询服务。可通过微信或电话联系，了解课程安排、证书信息及企业培训方案。",
    type: "website",
    url: `${SITE_URL}/contact`,
    images: [{ url: `${SITE_URL}/images/hero.webp`, width: 1200, height: 630, alt: "企业急救培训与咨询" }],
  },
  twitter: {
    title: "咨询与联系 | 急救课程报名与企业培训咨询",
    description:
      "提供急救课程报名咨询、培训城市查询和企业急救培训咨询服务。可通过微信或电话联系，了解课程安排、证书信息及企业培训方案。",
    images: [`${SITE_URL}/images/hero.webp`],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
