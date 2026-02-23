import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://yidaolife.com";

const CITIES: Record<
  string,
  { name: string; title: string; description: string }
> = {
  beijing: {
    name: "北京",
    title: "北京AHA急救培训｜美国心脏协会CPR AED认证课程｜都会急救",
    description:
      "北京地区 AHA 美国心脏协会 HeartSaver 急救员认证培训：CPR 心肺复苏、AED 使用、急救技能。小班实操，证书全国通用，支持企业团建与个人报名。",
  },
  tianjin: {
    name: "天津",
    title: "天津AHA急救培训｜美国心脏协会CPR AED认证课程｜都会急救",
    description:
      "天津地区 AHA 美国心脏协会 HeartSaver 急救员认证培训：CPR、AED、急救技能。官方授权，小班教学，支持企业内训与个人认证报名。",
  },
  shanghai: {
    name: "上海",
    title: "上海AHA急救培训｜美国心脏协会CPR AED认证课程｜都会急救",
    description:
      "上海地区 AHA 美国心脏协会 HeartSaver 急救员认证培训：CPR 心肺复苏、AED 使用与急救技能。全国多城可约，证书全球通用，企业团建可定制。",
  },
  guangzhou: {
    name: "广州",
    title: "广州AHA急救培训｜美国心脏协会CPR AED认证课程｜都会急救",
    description:
      "广州地区 AHA 美国心脏协会 HeartSaver 急救员认证培训：CPR、AED、急救技能。小班实操，证书全国通用，支持企业团建与个人报名。",
  },
};

const CITY_SLUGS = ["beijing", "tianjin", "shanghai", "guangzhou"] as const;

export async function generateStaticParams() {
  return CITY_SLUGS.map((city) => ({ city }));
}

type Props = {
  params: Promise<{ city: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const data = CITIES[city];
  if (!data) return { title: "城市课程 | 都会急救" };
  return {
    title: data.title,
    description: data.description,
    alternates: { canonical: `${SITE_URL}/cities/${city}` },
    openGraph: {
      title: data.title,
      description: data.description,
      url: `${SITE_URL}/cities/${city}`,
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const data = CITIES[city];

  if (!data) {
    return (
      <div className="min-h-screen bg-white py-24 px-4 text-center">
        <h1 className="text-2xl font-semibold text-neutral-900">未找到该城市</h1>
        <Link href="/cities" className="mt-4 inline-block text-neutral-600 hover:underline">
          返回城市列表
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">
          {data.name} AHA急救培训
        </h1>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">课程介绍</h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            都会急救在{data.name}提供美国心脏协会（AHA）HeartSaver 国际急救员认证课程，涵盖 CPR 心肺复苏、AED 使用、气道异物梗阻等实用技能。小班实操教学，证书全球通用，支持企业团建培训与个人报名。
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">培训内容</h2>
          <ul className="list-disc list-inside text-neutral-600 dark:text-neutral-400 space-y-2">
            <li>CPR 心肺复苏（成人/儿童/婴儿）</li>
            <li>AED 自动体外除颤器使用</li>
            <li>气道异物梗阻急救</li>
            <li>创伤与急症现场处置基础</li>
            <li>实操练习与考核</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-neutral-900 mb-3">适合人群</h2>
          <ul className="list-disc list-inside text-neutral-600 dark:text-neutral-400 space-y-2">
            <li>企业安全负责人、HR、行政人员</li>
            <li>教师、教练、户外领队</li>
            <li>希望掌握急救技能的个人与家庭</li>
            <li>需持证上岗或年审的相关岗位</li>
          </ul>
        </section>

        <div className="mt-12">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-6 py-3 text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
          >
            立即报名
          </Link>
        </div>
      </div>
    </div>
  );
}
