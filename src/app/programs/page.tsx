import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AHA课程体系｜Heartsaver急救员认证",
  description:
    "查看都会急救的 AHA 课程体系：Heartsaver 急救员认证（CPR/AED/急救技能）、企业团体培训与定制课程。官方授权，实操为主。",
  alternates: { canonical: "/programs" },
  openGraph: {
    title: "AHA课程体系｜Heartsaver急救员认证",
    description:
      "Heartsaver 急救员认证（CPR/AED/急救技能）+ 企业团体培训｜官方授权｜小班实操。",
    url: "https://yidaolife.com/programs",
    images: [{ url: "/images/hero.webp", width: 1200, height: 630, alt: "AHA课程体系" }],
  },
};

type Course = {
  id: number;
  title: string;
  subtitle: string;
  highlights: string[];
  badge: string;
  image: string;
  ctaPrimary: string;
  ctaSecondary: string;
  hrefPrimary: string;
  hrefSecondary: string;
};

const courses: Course[] = [
  {
    id: 1,
    title: "AHA HeartSaver 国际急救员认证",
    subtitle: "CPR · AED · 急救技能｜一天掌握关键救命动作",
    highlights: ["证书有效期 2 年", "线下实操 + 考核", "全国 68 城可约"],
    badge: "AHA 授权",
    image: "/images/g1.jpg",
    ctaPrimary: "查看排期",
    ctaSecondary: "了解详情",
    hrefPrimary: "/cities",
    hrefSecondary: "/programs#heartsaver",
  },
  {
    id: 2,
    title: "AHA 急救导师晋升",
    subtitle: "面向讲师/管理者的教学能力与授权体系",
    highlights: ["标准化授课流程", "教学评估与带教", "可协助开课"],
    badge: "导师晋升",
    image: "/images/g2.jpg",
    ctaPrimary: "咨询晋升",
    ctaSecondary: "了解详情",
    hrefPrimary: "/instructor",
    hrefSecondary: "/instructor",
  },
  {
    id: 3,
    title: "企业团体急救培训（可定制）",
    subtitle: "企业内训/团建/安全生产合规｜上门授课｜2小时/半天/全天（含证书）",
    highlights: ["方案定制与交付", "支持全国协调", "可开发票"],
    badge: "企业定制",
    image: "/images/g3.jpg",
    ctaPrimary: "预约方案",
    ctaSecondary: "了解详情",
    hrefPrimary: "/program/enterprise-first-aid-training",
    hrefSecondary: "/program/enterprise-first-aid-training",
  },
];

export default function ProgramsPage() {
  return (
    <>
      {/* HERO：contain 不裁剪，深色底 + 遮罩 + 底部渐变 */}
      <section className="relative w-full h-[56vh] md:h-[64vh] bg-neutral-950 overflow-hidden">
        <Image
          src="/images/g5.jpg"
          alt="AHA 急救培训现场"
          fill
          priority
          className="object-contain object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent dark:from-neutral-950 to-transparent pointer-events-none" aria-hidden />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6 z-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
              AHA 国际急救课程体系
            </h1>
            <p className="mt-3 text-sm md:text-base text-white/80">
              官方授权 · 实操为核心 · 小班制教学
            </p>
          </div>
        </div>
      </section>

      {/* 官方授权展示区 */}
      <section className="bg-neutral-50 dark:bg-neutral-900/30 py-20 px-4 sm:px-6 lg:px-8 border-t border-neutral-200 dark:border-neutral-800 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-lg md:text-xl font-medium tracking-wide text-center mb-2 text-[var(--foreground)]">
            全国AHA HeartSaver急救员认证中心
          </h2>
          <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 text-center mb-10">
            AHA Authorized Training Center
          </p>
          <img
            src="/images/license.png"
            alt="AHA 授权证书"
            className="max-w-3xl mx-auto rounded-xl shadow-md w-full"
          />
        </div>
      </section>

      {/* 课程卡片列表 */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((c) => {
              const isEnterprise = c.id === 3;
              const cardClass =
                "rounded-3xl border border-neutral-200 bg-white dark:bg-neutral-900 dark:border-neutral-800 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden";
              const cardContent = (
                <>
                  {/* 头图 16:9 */}
                  <div className="relative w-full aspect-video overflow-hidden rounded-t-3xl bg-neutral-100 dark:bg-neutral-800 group">
                    <Image
                      src={c.image}
                      alt={c.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-black/70 text-white text-xs px-3 py-1 backdrop-blur">
                      {c.badge}
                    </span>
                  </div>

                  <div className="p-5 sm:p-6">
                    <h2 className="text-lg font-semibold text-neutral-900 dark:text-white truncate">
                      {c.title}
                    </h2>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mt-2">
                      {c.subtitle}
                    </p>
                    <ul className="text-sm text-neutral-700 dark:text-neutral-300 mt-4 space-y-2">
                      {c.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                    <div className="mt-6 flex items-center justify-between gap-3">
                      {isEnterprise ? (
                        <>
                          <span className="inline-flex items-center rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-4 py-2 text-sm font-medium">
                            {c.ctaPrimary}
                          </span>
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">
                            {c.ctaSecondary}
                          </span>
                        </>
                      ) : (
                        <>
                          <Link
                            href={c.hrefPrimary}
                            className="inline-flex items-center rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-4 py-2 text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
                          >
                            {c.ctaPrimary}
                          </Link>
                          <Link
                            href={c.hrefSecondary}
                            className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                          >
                            {c.ctaSecondary}
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </>
              );

              return isEnterprise ? (
                <Link
                  key={c.id}
                  href={c.hrefPrimary}
                  className={`block ${cardClass}`}
                  aria-label={`${c.title}，${c.subtitle}`}
                >
                  {cardContent}
                </Link>
              ) : (
                <article key={c.id} className={cardClass}>
                  {cardContent}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24" />
    </>
  );
}
