import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "全国急救培训城市 | AHA Heartsaver急救员认证培训",
  description:
    "提供全国多个城市 AHA Heartsaver 急救员认证培训课程，包括 CPR 心肺复苏、AED 使用等急救技能培训，支持企业急救培训服务。",
  alternates: { canonical: "/cities" },
  openGraph: {
    title: "全国急救培训城市 | AHA Heartsaver急救员认证培训",
    description:
      "提供全国多个城市 AHA Heartsaver 急救员认证培训课程，包括 CPR 心肺复苏、AED 使用等急救技能培训，支持企业急救培训服务。",
    url: "https://yidaolife.com/cities",
    images: [{ url: "/images/china-map.jpg", width: 1200, height: 630, alt: "全国AHA急救培训开课城市地图" }],
  },
  twitter: {
    title: "全国急救培训城市 | AHA Heartsaver急救员认证培训",
    description:
      "提供全国多个城市 AHA Heartsaver 急救员认证培训课程，包括 CPR 心肺复苏、AED 使用等急救技能培训，支持企业急救培训服务。",
    images: ["/images/china-map.jpg"],
  },
};

export default function CitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
