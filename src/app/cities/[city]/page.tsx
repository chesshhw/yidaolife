import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAllCitySlugs } from "@/data/cities";

const SITE_URL = "https://yidaolife.com";

export async function generateStaticParams() {
  return getAllCitySlugs().map((city) => ({ city }));
}

type Props = {
  params: Promise<{ city: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const canonical = `${SITE_URL}/city/${city}`;
  return {
    title: "城市详情页跳转 | AHA Heartsaver急救培训",
    description: "城市详情页已迁移，正在跳转到最新城市课程页面。",
    alternates: { canonical },
    openGraph: {
      title: "城市详情页跳转 | AHA Heartsaver急救培训",
      description: "城市详情页已迁移，正在跳转到最新城市课程页面。",
      url: canonical,
    },
    robots: { index: false, follow: true },
  };
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  redirect(`/city/${city}`);
}
