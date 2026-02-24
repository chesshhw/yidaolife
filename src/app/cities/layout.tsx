import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "全国AHA HeartSaver急救员认证开课城市",
  description:
    "全国AHA HeartSaver急救员认证中心开课城市：北京、天津、上海、广州等。全国统一AHA体系、同步排期、企业团训、官方电子证书。按区域查看并预约。",
  alternates: { canonical: "/cities" },
  openGraph: {
    title: "全国AHA HeartSaver急救员认证开课城市",
    description:
      "全国统一认证、多城可约。按区域查看京津冀、长三角、珠三角等开课城市，支持企业团训与个人报名。",
    url: "https://yidaolife.com/cities",
    images: [{ url: "/images/china-map.jpg", width: 1200, height: 630, alt: "全国AHA急救培训开课城市地图" }],
  },
};

export default function CitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
