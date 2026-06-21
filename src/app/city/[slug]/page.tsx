import type { Metadata } from "next";
import Link from "next/link";
import CityPage from "@/components/CityPage";
import { getAllCitySlugs, getCityBySlug } from "@/data/cities";
import { getCityPageMetadata } from "@/lib/city-landing";

export async function generateStaticParams() {
  return getAllCitySlugs().map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getCityBySlug(slug);
  if (!data) return { title: "城市课程 | AHA Heartsaver急救员认证培训" };
  return getCityPageMetadata(data, slug);
}

export default async function CityRoutePage({ params }: Props) {
  const { slug } = await params;
  const data = getCityBySlug(slug);

  if (!data) {
    return (
      <div className="min-h-screen bg-white py-24 px-4 text-center">
        <h1 className="text-2xl font-semibold text-neutral-900">未找到该城市</h1>
        <Link href="/cities" className="mt-4 inline-block text-neutral-600 hover:underline">
          返回全国开课城市
        </Link>
      </div>
    );
  }

  return <CityPage city={data} slug={slug} />;
}
