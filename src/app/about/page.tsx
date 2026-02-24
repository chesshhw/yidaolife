import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "关于我们｜全国AHA HeartSaver急救员认证中心",
  description:
    "了解都会急救：全国AHA HeartSaver急救员认证中心，专注 CPR、AED 与急救技能培训；以实操为核心，小班教学，支持企业团体与个人公开课。",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "关于我们｜全国AHA HeartSaver急救员认证中心",
    description:
      "全国AHA HeartSaver急救员认证中心｜以实操为核心的小班急救培训｜企业团体与公开课。",
    url: "https://yidaolife.com/about",
    images: [{ url: "/images/hero.webp", width: 1200, height: 630, alt: "关于都会急救" }],
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="relative w-full aspect-[4/3] sm:aspect-[21/9] min-h-[50vh]">
        <Image
          src="https://picsum.photos/1600/700?random=about"
          alt="占位：关于我们主图"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/25 flex flex-col justify-end p-6 sm:p-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white tracking-tight">
            About
          </h1>
          <p className="mt-2 text-sm sm:text-base text-white/90 max-w-lg">
            占位副标题，后续替换。
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-[var(--muted)] text-sm sm:text-base leading-relaxed">
            占位文案：都会急救致力于在城市与户外场景中普及急救知识与技能。此处为占位内容，后续替换为真实品牌故事与团队介绍。
          </p>
          <div className="mt-12 sm:mt-16 relative aspect-[16/10] overflow-hidden bg-neutral-200 dark:bg-neutral-800">
            <Image
              src="https://picsum.photos/1200/750?random=about2"
              alt="占位图"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              unoptimized
            />
          </div>
          <p className="mt-8 text-[var(--muted)] text-sm leading-relaxed">
            更多占位段落，后续替换。
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24" />
    </>
  );
}
