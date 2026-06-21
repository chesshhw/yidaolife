import type { Metadata } from "next";
import type { City } from "@/data/cities";
import { getCityShortName, parseScheduleDates } from "@/data/cities";

export const SITE_URL = "https://yidaolife.com";
export const BRAND_NAME = "都会急救";
export const LEGAL_NAME = "天津一道技术服务有限公司";
export const COURSE_NAME = "AHA Heartsaver First Aid CPR AED";

const SECTION_CLASS = "mb-10";
const H2_CLASS = "text-lg font-semibold text-neutral-900 mb-3";
const P_CLASS = "text-neutral-700 leading-relaxed max-w-[75ch]";
const P_SHORT = "text-neutral-700 leading-relaxed max-w-[75ch] mb-3";
const UL_CLASS = "list-disc list-inside text-neutral-700 space-y-1";
const H3_CLASS = "text-base font-semibold text-neutral-900 mt-4 mb-2";

export const cityPageStyles = {
  SECTION_CLASS,
  H2_CLASS,
  P_CLASS,
  P_SHORT,
  UL_CLASS,
  H3_CLASS,
};

function toIsoDate(chineseDate: string): string {
  const m = chineseDate.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/);
  if (!m) return chineseDate;
  return `${m[1]}-${m[2].padStart(2, "0")}-${m[3].padStart(2, "0")}`;
}

export function getCityPageTitle(city: City): string {
  const short = getCityShortName(city);
  return `${short}急救培训 | AHA Heartsaver急救员认证课程`;
}

export function getCityPageMetadata(city: City, slug: string): Metadata {
  const short = getCityShortName(city);
  const title = `${short}急救培训 | AHA Heartsaver急救员认证课程`;
  const description = `${BRAND_NAME}是${LEGAL_NAME}旗下急救培训品牌，在${short}开展AHA Heartsaver急救员培训。课程内容包括CPR心肺复苏、AED自动体外除颤仪使用、气道异物梗阻急救、常见内科急症、创伤急症和环境相关急症处理。适合个人、企业员工、学校及公共机构参加，完成培训与考核后可获得AHA急救员证书。`;
  const keywords = [
    `${short}急救培训`,
    `${short}AHA急救培训`,
    `${short}CPR培训`,
    `${short}AED培训`,
    `${short}心肺复苏培训`,
    "AHA Heartsaver急救员课程",
    `${short}企业急救培训`,
    `${short}急救员证书`,
    `${short}AED使用培训`,
    LEGAL_NAME,
    BRAND_NAME,
  ];

  return {
    title,
    description,
    keywords,
    alternates: { canonical: `${SITE_URL}/city/${slug}` },
    openGraph: { title, description, url: `${SITE_URL}/city/${slug}` },
    twitter: { title, description },
  };
}

export type CityFaqItem = { question: string; answer: string };

export function getCityFaqItems(city: City): CityFaqItem[] {
  const short = getCityShortName(city);
  return [
    {
      question: `${short}急救培训课程需要多久？`,
      answer:
        "AHA Heartsaver 急救员课程通常为全天课程，约8小时左右。具体时间会根据课程版本、学员人数、现场练习和考核进度进行调整。",
    },
    {
      question: "没有医学背景可以参加吗？",
      answer:
        "可以。Heartsaver 急救员课程面向普通公众、企业员工和非医务人员设计，不要求学员具备医学背景。",
    },
    {
      question: "课程结束后有证书吗？",
      answer:
        "完成课程学习并通过考核后，学员可获得 AHA Heartsaver 急救员证书，证书有效期为2年。",
    },
    {
      question: "证书可以查询吗？",
      answer: "证书由 AHA 授权体系签发，学员可按照证书信息进行查询和核验。",
    },
    {
      question: `${short}企业可以单独预约急救培训吗？`,
      answer:
        "可以。企业、学校、机构和团体可以单独预约培训时间，也可以根据人数和场地情况安排上门培训或集中培训。",
    },
    {
      question: "AED培训和CPR培训有什么区别？",
      answer:
        "CPR主要训练胸外按压和人工呼吸等基础复苏技能，AED培训重点是学习如何正确使用自动体外除颤仪。实际急救中，CPR和AED通常需要配合使用，因此建议一起学习。",
    },
    {
      question: "课程是讲座还是实操课？",
      answer:
        "本课程不是单纯讲座。课程采用互动式学习模式，包含官方视频教学、导师讲解、现场练习、技能考核和课程评估，学员需要实际完成 CPR、AED 和气道异物梗阻等操作练习。",
    },
    {
      question: "个人可以报名吗？",
      answer:
        "可以。个人学员可以报名参加常规班课程。企业、机构和团体学员也可以单独预约团体培训。",
    },
  ];
}

export function buildCityJsonLd(city: City, slug: string) {
  const short = getCityShortName(city);
  const pageUrl = `${SITE_URL}/city/${slug}`;
  const { isMinGroup, dates } = parseScheduleDates(city.scheduleDates);
  const faqItems = getCityFaqItems(city);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首页", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "培训城市", item: `${SITE_URL}/cities` },
      { "@type": "ListItem", position: 3, name: short, item: pageUrl },
    ],
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND_NAME,
    legalName: LEGAL_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    areaServed: { "@type": "City", name: short },
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BRAND_NAME,
    legalName: LEGAL_NAME,
    url: pageUrl,
    image: `${SITE_URL}/images/logo.png`,
    telephone: "13512456138",
    areaServed: { "@type": "City", name: short },
    parentOrganization: {
      "@type": "Organization",
      name: LEGAL_NAME,
      url: SITE_URL,
    },
  };

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${short} AHA Heartsaver 急救员认证课程`,
    description: `${BRAND_NAME}在${short}开展 AHA Heartsaver First Aid CPR AED 急救员认证培训，课程内容包括 CPR 心肺复苏、AED 自动体外除颤仪使用、气道异物梗阻急救及常见急症处理。`,
    provider: {
      "@type": "Organization",
      name: BRAND_NAME,
      legalName: LEGAL_NAME,
      url: SITE_URL,
    },
    educationalCredentialAwarded: "AHA Heartsaver 急救员证书",
    timeRequired: "PT8H",
    courseMode: "in person",
    inLanguage: "zh-CN",
    ...(isMinGroup || dates.length === 0
      ? {}
      : {
          hasCourseInstance: dates.map((date) => ({
            "@type": "CourseInstance",
            courseMode: "in person",
            location: { "@type": "Place", name: short },
            startDate: toIsoDate(date),
          })),
        }),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return [breadcrumbJsonLd, organizationJsonLd, localBusinessJsonLd, courseJsonLd, faqJsonLd];
}

export const TRAINING_IMAGES = [
  {
    src: "/images/g3.jpg",
    caption: (short: string) => `${short}AHA急救培训实操现场`,
    alt: (short: string) => `${short}AHA急救培训CPR实操现场`,
  },
  {
    src: "/images/g5.jpg",
    caption: () => "企业员工急救培训现场",
    alt: (short: string) => `${short}企业急救培训AED使用练习`,
  },
  {
    src: "/images/g6.jpg",
    caption: () => "Heartsaver急救员课程课堂场景",
    alt: (short: string) => `${short}Heartsaver急救员课程培训现场`,
  },
] as const;

export const TARGET_AUDIENCE = [
  "希望学习 CPR 心肺复苏和 AED 使用的个人学员",
  "企业员工、行政人员、安全管理人员、EHS相关人员",
  "学校、幼儿园、教育培训机构工作人员",
  "健身教练、体育老师、赛事组织人员",
  "物业、商场、酒店、写字楼工作人员",
  "户外运动、露营、徒步、骑行、跑步爱好者",
  "家中有老人、儿童或慢病患者的家庭成员",
  "需要组织员工急救培训的企业、机构和社会团体",
];

export const APPLICABLE_SCENARIOS = [
  "企业员工安全培训",
  "学校、幼儿园、教育机构安全培训",
  "写字楼、商场、酒店、物业单位应急能力建设",
  "健身房、体育场馆、赛事活动工作人员培训",
  "AED配置单位员工培训",
  "个人及家庭急救技能学习",
];

export const BASIC_FIRST_AID_TOPICS = [
  "急救员的职责和义务",
  "自我防护措施",
  "PPE个人防护",
  "如何启动120",
  "现场求助与应急反应流程",
  "急救相关法律保护基础知识",
];

export const INTERNAL_EMERGENCY_TOPICS = [
  "呼吸问题",
  "过敏反应",
  "心脏病发作",
  "低血糖",
  "晕厥",
  "卒中，也就是中风",
  "癫痫发作",
];

export const TRAUMA_TOPICS = [
  "外出血",
  "内出血",
  "骨折和扭伤",
  "头颈部和脊柱创伤",
  "烧伤",
  "电击伤",
];

export const ENVIRONMENT_TOPICS = [
  "动物咬伤",
  "昆虫叮咬和蜇伤",
  "高温相关急症",
  "低温相关急症",
  "中毒急症",
];

export const ENTERPRISE_TOPICS = [
  "CPR 心肺复苏",
  "AED 自动体外除颤仪使用",
  "气道异物梗阻急救",
  "常见内科急症处理",
  "常见创伤急症处理",
  "环境相关急症处理",
  "企业内部应急流程演练",
];

export const TEACHING_FLOW = [
  "观看 AHA 官方课程视频",
  "导师讲解重点知识和操作要求",
  "跟随视频和导师进行分步骤练习",
  "完成 CPR、AED 和气道异物梗阻等技能操作",
  "进行技能练习、技能考核和课程评估",
  "根据课程要求完成相关笔试或知识考核",
];

export const CTA_BUTTON_CLASS =
  "inline-flex items-center justify-center rounded-xl border border-neutral-300 text-neutral-700 px-5 py-3 text-sm font-medium hover:bg-neutral-50";
