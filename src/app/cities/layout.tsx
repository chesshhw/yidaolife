import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "城市与排期｜全国多城市可约",
  description:
    "都会急救覆盖全国多城市培训与排期：北京、天津、上海、广州、深圳等。按区域查看与预约，支持企业内训与公开班。",
  alternates: { canonical: "/cities" },
  openGraph: {
    title: "城市与排期｜全国多城市可约",
    description:
      "按区域查看 AHA 急救培训城市与排期：京津冀、长三角、珠三角、西南、东北等。",
    url: "https://yidaolife.com/cities",
    images: [{ url: "/images/china-map.jpg", width: 1200, height: 630, alt: "服务城市地图" }],
  },
};

export default function CitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
