import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  getCityBySlug,
  getAllCitySlugs,
  getDisplayLocations,
} from "@/data/cities";
import { EnrollModal } from "@/components/EnrollModal";

const SITE_URL = "https://yidaolife.com";

const SECTION_CLASS = "mb-10";
const H2_CLASS = "text-lg font-semibold text-neutral-900 mb-3";
const P_CLASS = "text-neutral-700 leading-relaxed max-w-[75ch]";
const P_SHORT = "text-neutral-700 leading-relaxed max-w-[75ch] mb-3";

function getCityServiceCopy(city: string, slug: string): string {
  const openers = [
    `${city}目前已开展 AHA Heartsaver 急救员培训课程，服务对象覆盖个人学习者与企业团体，课程安排更贴近本地培训需求。`,
    `在${city}，AHA Heartsaver 急救员课程已形成稳定培训服务，既适合个人系统学习，也适合企业组织员工统一参训。`,
    `${city}的 AHA Heartsaver 急救培训服务持续推进，课程面向希望提升急救能力的个人和需要内训方案的企业团队。`,
  ];
  const trends = [
    `近年来不少单位开始把急救能力纳入安全管理，通过 CPR 心肺复苏与 AED 使用训练，可以在突发心脏骤停等场景中争取关键处置时间。`,
    `随着安全培训意识提升，越来越多机构选择把 CPR 和 AED 实操列入常规培训，以便在紧急事件发生时更快做出有效响应。`,
    `在公共安全意识不断提升的背景下，CPR 与 AED 已成为重点培训内容，有助于在突发情况下提升现场应对效率与协作能力。`,
  ];
  const endings = [
    `${city}课程通常采用小班教学，由认证导师现场示范与纠错，帮助学员把关键动作练到可执行、可应用。`,
    `${city}培训多为小班实操模式，认证导师会进行分步骤指导，让学员在练习中真正掌握规范急救操作。`,
    `${city}课堂以小班实操为主，认证导师会结合真实场景演练，确保学员形成可落地的急救处理能力。`,
  ];

  const hash = [...slug].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const opener = openers[hash % openers.length];
  const trend = trends[(hash + 1) % trends.length];
  const ending = endings[(hash + 2) % endings.length];

  const keywordLine = `不少学员会先通过${city}急救培训建立基础认知，再结合${city}CPR培训与${city}AED培训，完善面对突发情况时的处置步骤。`;
  return `${opener}${keywordLine}${trend}${ending}`;
}

export async function generateStaticParams() {
  return getAllCitySlugs().map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = getCityBySlug(slug);
  if (!data) return { title: "城市课程 | AHA Heartsaver急救员认证培训" };
  const title = `${data.name}急救培训 | AHA Heartsaver CPR AED培训`;
  const description = `提供${data.name} AHA Heartsaver 急救员认证培训课程，课程内容包括 CPR 心肺复苏、AED 使用、气道异物梗阻急救等技能培训。`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/city/${slug}` },
    openGraph: { title, description, url: `${SITE_URL}/city/${slug}` },
    twitter: { title, description },
  };
}

export default async function CityPage({ params }: Props) {
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

  const { name, locations, scheduleDates } = data;
  const displayLocations = getDisplayLocations(locations).slice(0, 3);
  const title = `${name}急救培训 | AHA Heartsaver急救员认证课程`;
  const cityServiceCopy = getCityServiceCopy(name, slug);
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "培训城市", item: `${SITE_URL}/cities` },
      { "@type": "ListItem", position: 3, name, item: `${SITE_URL}/city/${slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <div className="mb-4">
          <Breadcrumbs
            items={[
              { label: "首页", href: "/" },
              { label: "培训城市", href: "/cities" },
              { label: name },
            ]}
          />
        </div>
        <h1 className="text-xl sm:text-2xl font-semibold text-neutral-900">
          {title}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600">
          CPR 心肺复苏 · AED 使用 · 气道异物梗阻急救
        </p>

        <section className="mt-8 mb-10">
          <h2 className={H2_CLASS}>{name}急救培训</h2>
          <p className={P_CLASS}>
            {name}急救培训课程采用 AHA Heartsaver 急救员培训体系，课程内容包括 CPR 心肺复苏、AED 自动体外除颤仪使用以及气道异物梗阻急救等技能。
          </p>
          <p className="mt-3 text-neutral-700 leading-relaxed">培训课程适用于：</p>
          <ul className="mt-1 list-disc list-inside text-neutral-700 space-y-1">
            <li>个人急救技能学习</li>
            <li>企业员工安全培训</li>
            <li>学校及公共机构培训</li>
          </ul>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            完成培训与考核后可获得 AHA 官方急救员证书，证书有效期2年。
          </p>
        </section>

        <section className={SECTION_CLASS}>
          <h2 className={H2_CLASS}>{name}急救培训服务</h2>
          <p className={P_CLASS}>{cityServiceCopy}</p>
        </section>

        <section className={SECTION_CLASS}>
          <h2 className={H2_CLASS}>{name}急救培训适用人群</h2>
          <p className={P_SHORT}>{name}急救培训课程适合以下人群参加：</p>
          <ul className="list-disc list-inside text-neutral-700 space-y-1">
            <li>希望学习 CPR 心肺复苏技能的个人</li>
            <li>企业员工安全培训</li>
            <li>学校及教育机构工作人员</li>
            <li>健身房、赛事组织、物业管理人员</li>
          </ul>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            通过系统培训，学员可以掌握基本急救技能，在紧急情况下及时提供帮助。
          </p>
        </section>

        <section className={SECTION_CLASS}>
          <h2 className={H2_CLASS}>{name}培训地点</h2>
          <p className={P_SHORT}>目前{name}培训地点包括：</p>
          <ul className="space-y-2 list-none p-0 m-0">
            {displayLocations.map((addr, i) => (
              <li key={i}>
                <address className="not-italic text-neutral-700 leading-relaxed">{addr}</address>
              </li>
            ))}
          </ul>
          {scheduleDates && (
            <p className="mt-3 text-neutral-700 font-medium leading-relaxed">
              最近急救培训时间：{scheduleDates}
            </p>
          )}
          <p className="mt-3 text-neutral-700 leading-relaxed">
            具体培训地址将在报名确认后通知。
          </p>
        </section>

        <section className={SECTION_CLASS}>
          <h2 className={H2_CLASS}>课程内容</h2>
          <p className={P_SHORT}>培训课程主要包括以下内容：</p>
          <ul className="list-disc list-inside text-neutral-700 space-y-2">
            <li>CPR 心肺复苏操作</li>
            <li>AED 自动体外除颤仪使用</li>
            <li>气道异物梗阻急救</li>
            <li>紧急情况现场应对流程</li>
          </ul>
          <p className="mt-3 text-neutral-700 leading-relaxed">
            课程采用理论讲解 + 实操训练相结合的方式。
          </p>
        </section>

        <section className={SECTION_CLASS}>
          <h2 className={H2_CLASS}>培训现场</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 list-none p-0 m-0">
            {["/images/g3.jpg", "/images/g5.jpg", "/images/g6.jpg"].map((src) => (
              <li key={src} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={src}
                  alt={`${name}急救培训现场`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </li>
            ))}
          </ul>
        </section>

        <section className={SECTION_CLASS}>
          <h2 className={H2_CLASS}>{name}企业急救培训</h2>
          <p className={P_SHORT}>
            如果您的企业需要组织员工急救培训，我们可以提供企业团体培训服务。
          </p>
          <p className="text-neutral-700 leading-relaxed mb-2">培训内容包括：</p>
          <ul className="list-disc list-inside text-neutral-700 space-y-2">
            <li>CPR 心肺复苏</li>
            <li>AED 使用</li>
            <li>气道异物梗阻急救</li>
          </ul>
          <p className="mt-3 text-neutral-700 leading-relaxed">支持企业上门培训或集中培训。</p>
          <div className="mt-5">
            <Link
              href="/enterprise-training"
              className="inline-flex items-center justify-center rounded-xl border border-neutral-300 text-neutral-700 px-5 py-2.5 text-sm font-medium hover:bg-neutral-50"
            >
              咨询企业培训
            </Link>
          </div>
        </section>

        <section className={SECTION_CLASS}>
          <h2 className={H2_CLASS}>{name}急救培训常见问题</h2>
          <dl className="space-y-4">
            <div>
              <dt className="font-medium text-neutral-900">{name}急救培训课程需要多久？</dt>
              <dd className="mt-1 text-neutral-700">
                AHA Heartsaver 急救员课程通常一天即可完成培训与考核。
              </dd>
            </div>
            <div>
              <dt className="font-medium text-neutral-900">证书是否可以查询？</dt>
              <dd className="mt-1 text-neutral-700">证书由美国心脏协会授权体系签发，可官方查询。</dd>
            </div>
            <div>
              <dt className="font-medium text-neutral-900">企业是否可以组织培训？</dt>
              <dd className="mt-1 text-neutral-700">可以，我们支持企业团体培训及上门培训服务。</dd>
            </div>
          </dl>
        </section>

        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6">
          <p className="text-base font-medium text-neutral-900 mb-4">报名入口</p>
          <div className="flex flex-wrap gap-3">
            <EnrollModal cityName={name} buttonText={`报名参加${name}急救培训`} />
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-neutral-300 text-neutral-700 px-5 py-3 text-sm font-medium hover:bg-neutral-50"
            >
              微信咨询
            </Link>
            <Link
              href="/cities"
              className="inline-flex items-center justify-center rounded-xl border border-neutral-300 text-neutral-700 px-5 py-3 text-sm font-medium hover:bg-neutral-50"
            >
              查看培训城市
            </Link>
            <a
              href="tel:13512456138"
              className="inline-flex items-center justify-center rounded-xl border border-neutral-300 text-neutral-700 px-5 py-3 text-sm font-medium hover:bg-neutral-50"
            >
              电话咨询
            </a>
          </div>
        </div>
      </article>
    </div>
  );
}
