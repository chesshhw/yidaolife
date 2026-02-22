import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "联系咨询｜报名与企业内训",
  description:
    "联系都会急救咨询报名：公开课排期、企业团体内训与定制方案。支持微信咨询与快速确认。",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "联系咨询｜报名与企业内训",
    description:
      "公开课排期、企业内训与定制方案｜微信咨询，快速确认。",
    url: "https://yidaolife.com/contact",
    images: [{ url: "/images/wechat.png", width: 1200, height: 630, alt: "微信咨询" }],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
