import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";

const SITE_URL = "https://www.yidaolife.com";

function buildBreadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "课程体系", item: `${SITE_URL}/programs` },
    ],
  };
}

export const metadata: Metadata = {
  title: "AHA课程体系｜Heartsaver急救员认证",
  description:
    "查看都会急救的 AHA 课程体系：Heartsaver 急救员认证（CPR/AED/急救技能）、企业团体培训与定制课程。官方授权，实操为主。",
  alternates: { canonical: "/programs" },
  openGraph: {
    title: "AHA课程体系｜Heartsaver急救员认证",
    description:
      "Heartsaver 急救员认证（CPR/AED/急救技能）+ 企业团体培训｜官方授权｜小班实操。",
    url: "https://www.yidaolife.com/programs",
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
    subtitle: "CPR · AED · 基础急救｜通过实际操作练习关键技能",
    highlights: ["证书有效期 2 年", "线下实操 + 考核", "全国多城市开课"],
    badge: "AHA 授权",
    image: "/images/g1.jpg",
    ctaPrimary: "查看排期",
    ctaSecondary: "了解详情",
    hrefPrimary: "/cities",
    hrefSecondary: "/contact",
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
    id: 4,
    title: "天津野外急救培训（WMA WMW）",
    subtitle: "户外急救进阶课程｜适合徒步、登山、越野跑人群；新一期排期请咨询确认",
    highlights: ["小班教学", "判断 + 决策为核心", "适合户外运动人群进阶"],
    badge: "野外急救",
    image: "/images/g5.jpg",
    ctaPrimary: "查看详情",
    ctaSecondary: "了解课程",
    hrefPrimary: "/tianjin-wma-wilderness-first-aid-training",
    hrefSecondary: "/tianjin-wma-wilderness-first-aid-training",
  },
  {
    id: 3,
    title: "企业团体急救培训（可定制）",
    subtitle: "企业内训与团体培训｜可沟通上门授课、培训时长及对应课程的考核与证书要求",
    highlights: ["方案定制与交付", "支持全国协调", "可开发票"],
    badge: "企业定制",
    image: "/images/g3.jpg?v=eb9351e83ceb",
    ctaPrimary: "预约方案",
    ctaSecondary: "了解详情",
    hrefPrimary: "/enterprise-training",
    hrefSecondary: "/enterprise-training",
  },
];

export default function ProgramsPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <section className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="site-container py-12 sm:py-16">
          <Breadcrumbs items={[{ label: "首页", href: "/" }, { label: "课程体系" }]} />
          <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.85fr] lg:items-end lg:gap-16">
            <div><p className="eyebrow">从个人学习，到团队培训</p><h1 className="mt-4 text-3xl font-semibold leading-[1.35] tracking-tight sm:text-5xl">选择适合你的<br />急救课程</h1></div>
            <p className="section-intro">了解 AHA Heartsaver 急救员课程、导师课程、野外急救及企业团体培训。根据学习目标和使用场景，找到适合自己的训练方式。</p>
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="site-container grid gap-8 md:grid-cols-2">
          {courses.map((c) => (
            <article key={c.id} id={c.id === 1 ? "heartsaver" : undefined} className="surface-card flex min-w-0 scroll-mt-28 flex-col overflow-hidden">
              <div className="relative aspect-[16/9] bg-[var(--surface)]">
                {c.id === 4 ? <div className="flex h-full flex-col justify-center bg-[#e6eee8] px-7 sm:px-10"><p className="eyebrow">野外急救 · 评估与决策</p><p className="mt-4 text-4xl font-semibold tracking-tight text-[var(--brand)] sm:text-5xl">WMA WMW</p><p className="mt-4 text-sm text-[var(--muted)]">面向户外活动场景的急救学习</p></div> : <Image src={c.image} alt={c.id === 3 ? "配备模拟人的 Heartsaver 培训课堂" : c.id === 1 ? "都会急救课程学员合影" : "导师指导学员进行分组实操练习"} fill sizes="(max-width: 767px) 100vw, 560px" className="object-cover" />}
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <p className="eyebrow">{c.badge}</p>
                <h2 className="mt-3 text-xl font-semibold leading-8 sm:text-2xl">{c.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{c.subtitle}</p>
                <ul className="mb-7 mt-5 flex flex-wrap gap-2">
                  {c.highlights.map((h) => <li key={h} className="rounded-md bg-[var(--surface)] px-3 py-2 text-xs leading-5 text-[var(--muted)]">{h}</li>)}
                </ul>
                <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[var(--border)] pt-6">
                  <Link href={c.hrefPrimary} className="button-primary">{c.ctaPrimary} <span aria-hidden>↗</span></Link>
                  {c.hrefSecondary !== c.hrefPrimary && <Link href={c.hrefSecondary} className="text-link">{c.id === 1 ? "咨询课程详情" : c.ctaSecondary}</Link>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section-space border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="site-container grid items-center gap-8 md:grid-cols-2 lg:gap-16">
          <div><p className="eyebrow">课程与机构信息</p><h2 className="section-title mt-3">了解课程，再作选择</h2><p className="section-intro mt-5">都会急救由天津一道技术服务有限公司运营。报名前，欢迎了解课程内容、导师指导方式、实操安排与考核要求。</p><Link href="/about" className="text-link mt-5">了解都会急救 <span aria-hidden>↗</span></Link></div>
          <a href="/images/license.png" target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-[var(--border)] bg-white p-4" aria-label="查看课程授权资料原图"><Image src="/images/license.png" alt="网站提供的课程授权资料，点击查看原图" width={760} height={540} sizes="(max-width: 767px) 100vw, 540px" className="h-auto w-full" /><span className="mt-3 block text-center text-xs text-[var(--muted)]">课程授权资料 · 点击查看原图</span></a>
        </div>
      </section>
      <section className="site-container py-14 sm:py-16">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div><h2 className="text-2xl font-semibold">需要帮助选择课程？</h2><p className="section-intro mt-3">告诉我们你的城市、学习目的或团队情况。</p></div>
          <div className="flex flex-wrap gap-3"><Link href="/contact" className="button-primary">咨询课程</Link><Link href="/blog" className="button-secondary">阅读急救知识</Link></div>
        </div>
      </section>
    </>
  );
}
