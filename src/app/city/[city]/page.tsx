import type { Metadata } from "next";
import Link from "next/link";
import { getCityBySlug, getAllCitySlugs } from "@/data/cities";

const SITE_URL = "https://yidaolife.com";

export async function generateStaticParams() {
  return getAllCitySlugs().map((city) => ({ city }));
}

type Props = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const data = getCityBySlug(city);
  if (!data) return { title: "城市课程 | 全国AHA HeartSaver急救员认证中心" };
  const title = `${data.name}AHA急救培训-HeartSaver急救员认证课程`;
  const description = `${data.name}地区AHA美国心脏协会HeartSaver急救员认证：CPR心肺复苏、AED使用、急救技能。培训地址：${data.addressFull}。全国统一标准，证书全球通用。`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/city/${city}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/city/${city}`,
    },
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

  const { name, district, addressFull, schedule } = data;

  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 mb-8">
          {name}AHA急救培训-HeartSaver急救员认证课程
        </h1>

        {/* 第一段：简介 */}
        <section className="mb-10">
          <p className="text-neutral-700 leading-relaxed max-w-[75ch]">
            在{name}参加美国心脏协会（AHA）HeartSaver急救员认证课程，
            本课程涵盖 CPR、AED 使用、成人及儿童急救处理，
            通过考核颁发 AHA 官方电子证书，全国统一标准，全球通用。
          </p>
          <p className="text-neutral-700 leading-relaxed mt-3 max-w-[75ch]">
            {name}AHA急救培训由全国AHA HeartSaver急救员认证中心统一授课体系，
            {name}学员与全国其他城市享受相同课程内容与证书效力。
          </p>
        </section>

        {/* 模块一：近期培训时间 */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-neutral-900 mb-3">近期培训时间</h2>
          <p className="text-neutral-700">{schedule}</p>
          <p className="text-neutral-600 text-sm mt-2">以上为{name}地区当前排期，具体以客服确认为准。</p>
        </section>

        {/* 模块二：培训地点 */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-neutral-900 mb-3">培训地点</h2>
          <address className="text-neutral-700 not-italic">
            {addressFull}
          </address>
          <p className="text-neutral-600 text-sm mt-2">上述为{name}AHA急救培训固定授课地址，请按地址前往。</p>
        </section>

        {/* 模块三：交通说明 */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-neutral-900 mb-3">交通说明</h2>
          <p className="text-neutral-700 leading-relaxed max-w-[75ch]">
            培训地点位于{district}核心区域，周边交通便利，地铁/公交均可直达。
          </p>
          <p className="text-neutral-700 leading-relaxed mt-2 max-w-[75ch]">
            {name}培训场地便于{name}各区学员到达，报名后可获取详细交通指引。
          </p>
        </section>

        {/* 模块四：课程内容 */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-neutral-900 mb-3">课程内容</h2>
          <p className="text-neutral-700 mb-3 max-w-[75ch]">
            {name}AHA急救培训课程包含以下核心内容，与全国其他城市一致。
          </p>
          <ul className="list-disc list-inside text-neutral-700 space-y-2">
            <li>成人CPR</li>
            <li>儿童CPR</li>
            <li>AED操作</li>
            <li>气道异物梗阻处理</li>
            <li>创伤基础处理</li>
          </ul>
        </section>

        {/* 模块五：证书说明 */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-neutral-900 mb-3">证书说明</h2>
          <p className="text-neutral-700 leading-relaxed max-w-[75ch]">
            课程采用 American Heart Association (AHA) 官方 HeartSaver 教学体系，
            考试合格后获得 AHA 官方电子证书，证书全球通用。
          </p>
          <p className="text-neutral-700 leading-relaxed mt-2 max-w-[75ch]">
            在{name}完成培训并通过考核的学员，将获得与全国其他城市相同的AHA官方电子证书。
          </p>
        </section>

        {/* 模块六：适合人群 */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-neutral-900 mb-3">适合人群</h2>
          <p className="text-neutral-700 mb-3 max-w-[75ch]">
            {name}AHA急救培训面向以下人群开放报名。
          </p>
          <ul className="list-disc list-inside text-neutral-700 space-y-2">
            <li>企业员工</li>
            <li>健身教练</li>
            <li>出国留学</li>
            <li>教师</li>
            <li>家庭成员</li>
          </ul>
        </section>

        {/* 模块七：企业团训 */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-neutral-900 mb-3">企业团训</h2>
          <p className="text-neutral-700 leading-relaxed max-w-[75ch]">
            支持{name}企业上门急救培训，可定制时间，可开具发票，可纳入企业安全培训体系。
          </p>
          <p className="text-neutral-700 leading-relaxed mt-2 max-w-[75ch]">
            {name}本地企业如需团体报名或上门培训，可直接联系客服安排{name}地区企业团训档期。
          </p>
        </section>

        {/* 模块八：FAQ */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">常见问题</h2>
          <dl className="space-y-4">
            <div>
              <dt className="font-medium text-neutral-900">Q1：{name}AHA急救培训多少钱？</dt>
              <dd className="mt-1 text-neutral-700">A：费用根据班型安排，详情咨询客服。</dd>
            </div>
            <div>
              <dt className="font-medium text-neutral-900">Q2：证书多久下发？</dt>
              <dd className="mt-1 text-neutral-700">A：考试通过后发放官方电子证书。</dd>
            </div>
            <div>
              <dt className="font-medium text-neutral-900">Q3：是否国际通用？</dt>
              <dd className="mt-1 text-neutral-700">A：是，美国心脏协会官方体系。</dd>
            </div>
            <div>
              <dt className="font-medium text-neutral-900">Q4：是否支持企业团训？</dt>
              <dd className="mt-1 text-neutral-700">A：支持，可定制时间和人数。</dd>
            </div>
            <div>
              <dt className="font-medium text-neutral-900">Q5：培训是否包含AED实操？</dt>
              <dd className="mt-1 text-neutral-700">A：是，课程包含完整AED实操训练。</dd>
            </div>
          </dl>
        </section>

        <p className="text-neutral-600 text-sm mb-8">
          {name}地区AHA急救培训由全国AHA HeartSaver急救员认证中心提供，
          全国统一认证体系，{name}学员与全国其他城市享受同等课程与证书标准。
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-neutral-900 text-white px-6 py-3 text-sm font-medium hover:bg-neutral-800"
          >
            立即报名
          </Link>
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
