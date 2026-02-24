import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "全国AHA HeartSaver急救员认证开课城市",
  description:
    "全国AHA急救培训城市：北京、天津、上海、广州、深圳、重庆等。查看每城详细培训地址与报名入口。全国统一AHA体系、纸质证书、企业团训。",
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
