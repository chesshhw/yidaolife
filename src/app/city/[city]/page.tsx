import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCityBySlug, getAllCitySlugs, cleanAddress, isTentativeAddress } from "@/data/cities";
import { EnrollModal, EnrollModalTrigger } from "@/components/EnrollModal";

const SITE_URL = "https://yidaolife.com";

const SECTION_CLASS = "mb-10";
const H2_CLASS = "text-lg font-semibold text-neutral-900 mb-3";
const P_CLASS = "text-neutral-700 leading-relaxed max-w-[75ch]";
const P_SHORT = "text-neutral-700 leading-relaxed max-w-[75ch] mb-3";

const FALLBACK_ADDRESS = "城市内常用固定培训场地（报名后告知具体教室）";

export async function generateStaticParams() {
  return getAllCitySlugs().map((slug) => ({ city: slug }));
}

type Props = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const data = getCityBySlug(city);
  if (!data) return { title: "城市课程 | 全国AHA HeartSaver急救员认证中心" };
  const title = `${data.name}AHA急救培训-HeartSaver急救员认证课程`;
  const firstRaw = data.locations[0];
  const firstAddr = firstRaw ? cleanAddress(firstRaw) : "";
  const addrForMeta = firstAddr && !isTentativeAddress(firstRaw) ? firstAddr : `${data.name}培训点`;
  const description = `${data.name}AHA急救培训，美国心脏协会HeartSaver急救员认证，CPR心肺复苏、AED使用。培训地址：${addrForMeta}。证书全球通用。`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/city/${city}` },
    openGraph: { title, description, url: `${SITE_URL}/city/${city}` },
  };
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const data = getCityBySlug(city);

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

  const { name, locations, scheduleText, twicePerMonth } = data;
  const scheduleLine = twicePerMonth
    ? `${name}长期滚动开班，每月开课2次，一般安排在周末时间，建议提前预约，${name}AHA急救培训名额有限。`
    : `${name}长期滚动开班，每月开课，一般安排在周末时间，建议提前预约，${name}AHA急救培训名额有限。`;

  const displayLocations = locations.map((raw) => {
    const cleaned = cleanAddress(raw);
    if (isTentativeAddress(raw) || !cleaned) return FALLBACK_ADDRESS;
    return cleaned;
  });

  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <h1 className="text-xl sm:text-2xl font-semibold text-neutral-900 mb-6">
          {name}AHA急救培训｜HeartSaver急救员认证课程
        </h1>

        {/* 开篇两段 */}
        <section className={SECTION_CLASS}>
          <p className={P_SHORT}>
            在{name}参加美国心脏协会（AHA）HeartSaver急救员认证课程，是目前{name}地区广受认可的国际急救培训项目。
            本课程在{name}长期稳定开课，涵盖 CPR 心肺复苏、AED 自动体外除颤仪使用、成人及儿童急救处理。
          </p>
          <p className={P_CLASS}>
            {name}AHA急救培训采用 American Heart Association 官方教学体系，考试通过后颁发 AHA 官方纸质证书，证书全球通用。
          </p>
        </section>

        {/* 一、{城市}培训地点 */}
        <section className={SECTION_CLASS}>
          <h2 className={H2_CLASS}>一、{name}培训地点</h2>
          {displayLocations.length > 1 ? (
            <>
              <p className="text-neutral-800 font-medium mb-1">A)</p>
              <address className="text-neutral-700 not-italic mb-2">{displayLocations[0]}</address>
              <p className="text-neutral-600 text-sm mb-3">可就近选择培训地点</p>
              <p className="text-neutral-800 font-medium mb-1">B)</p>
              <address className="text-neutral-700 not-italic mb-4">{displayLocations[1]}</address>
            </>
          ) : (
            <address className="text-neutral-700 not-italic mb-4">{displayLocations[0]}</address>
          )}
          {scheduleText && (
            <p className="text-neutral-700 mb-2">近期排期：{scheduleText}</p>
          )}
          <p className={P_SHORT}>{scheduleLine}</p>
          <p className={P_CLASS}>也可单独预约开课时间，建议6人起开班。</p>
        </section>

        {/* 二、培训现场实拍 */}
        <section className={SECTION_CLASS}>
          <h2 className={H2_CLASS}>二、培训现场实拍</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 list-none p-0 m-0">
            {["/images/g3.jpg", "/images/g5.jpg", "/images/g6.jpg"].map((src) => (
              <li key={src} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={src}
                  alt={`${name}AHA急救培训现场`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </li>
            ))}
          </ul>
        </section>

        {/* 三、课程内容 */}
        <section className={SECTION_CLASS}>
          <h2 className={H2_CLASS}>三、课程内容</h2>
          <p className={P_SHORT}>{name}HeartSaver急救培训包括：</p>
          <ul className="list-disc list-inside text-neutral-700 space-y-2">
            <li>成人CPR实操</li>
            <li>儿童CPR实操</li>
            <li>AED使用演练</li>
            <li>气道异物梗阻处理</li>
            <li>创伤急救基础处理</li>
          </ul>
          <p className={`${P_CLASS} mt-3`}>课程以实操为主，{name}培训现场设备齐全。</p>
        </section>

        {/* 四、AHA官方体系介绍 */}
        <section className={SECTION_CLASS}>
          <h2 className={H2_CLASS}>四、AHA官方体系介绍</h2>
          <p className={P_CLASS}>
            American Heart Association（AHA）是全球知名心血管急救培训机构，HeartSaver课程为非医护人员设计，符合国际急救标准。
          </p>
        </section>

        {/* 五、证书样式展示（纸质证书） */}
        <section className={SECTION_CLASS}>
          <h2 className={H2_CLASS}>五、证书样式展示</h2>
          <div className="relative aspect-[4/3] max-w-md rounded-lg overflow-hidden">
            <Image
              src="/images/cert-sample.jpg"
              alt={`${name}AHA急救培训官方证书样式（纸质证书）`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 28rem"
            />
          </div>
          <p className="text-neutral-600 text-sm mt-3 text-center">
            {name}AHA急救培训官方证书样式（纸质证书）
          </p>
        </section>

        {/* 六、报名方式 */}
        <section className={SECTION_CLASS}>
          <h2 className={H2_CLASS}>六、报名方式</h2>
          <EnrollModalTrigger className="relative w-48 h-48 mx-auto rounded-lg overflow-hidden cursor-pointer">
            <Image
              src="/images/app.jpg"
              alt={`扫描二维码报名${name}AHA急救培训课程`}
              fill
              className="object-cover"
              sizes="12rem"
            />
          </EnrollModalTrigger>
          <p className="text-neutral-600 text-sm mt-3 text-center">
            扫描二维码报名{name}AHA急救培训课程
          </p>
        </section>

        {/* 七、常见问题 FAQ */}
        <section className={SECTION_CLASS}>
          <h2 className={H2_CLASS}>七、常见问题 FAQ</h2>
          <dl className="space-y-4">
            <div>
              <dt className="font-medium text-neutral-900">Q1：{name}AHA急救培训多少钱？</dt>
              <dd className="mt-1 text-neutral-700">A：根据班型不同，详情咨询。</dd>
            </div>
            <div>
              <dt className="font-medium text-neutral-900">Q2：证书多久下发？</dt>
              <dd className="mt-1 text-neutral-700">A：考试通过后发放官方纸质证书。</dd>
            </div>
            <div>
              <dt className="font-medium text-neutral-900">Q3：是否国际通用？</dt>
              <dd className="mt-1 text-neutral-700">A：是，美国心脏协会官方体系证书。</dd>
            </div>
            <div>
              <dt className="font-medium text-neutral-900">Q4：{name}是否支持企业团训？</dt>
              <dd className="mt-1 text-neutral-700">A：支持，可上门培训。</dd>
            </div>
            <div>
              <dt className="font-medium text-neutral-900">Q5：是否包含AED实操？</dt>
              <dd className="mt-1 text-neutral-700">A：包含完整AED实操训练。</dd>
            </div>
          </dl>
        </section>

        {/* 八、企业团训模块 */}
        <section className={SECTION_CLASS}>
          <h2 className={H2_CLASS}>八、企业团训模块</h2>
          <p className={P_SHORT}>{name}支持企业上门急救培训：</p>
          <ul className="list-disc list-inside text-neutral-700 space-y-2">
            <li>可定制时间</li>
            <li>可开具发票</li>
            <li>可纳入企业安全培训体系</li>
            <li>支持企业专场</li>
          </ul>
        </section>

        <div className="flex flex-wrap gap-4 pt-4">
          <EnrollModal cityName={name} />
          <Link
            href="/cities"
            className="inline-flex items-center justify-center rounded-xl border border-neutral-300 text-neutral-700 px-6 py-3 text-sm font-medium hover:bg-neutral-50"
          >
            查看全国开课城市
          </Link>
        </div>
      </article>
    </div>
  );
}
