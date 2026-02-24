/**
 * 城市数据：全量城市 + 地址，用于 /city/[slug] 与 /cities、首页
 * 新增城市只改此处，无需新建页面
 */

/** 清洗展示用地址：去掉 暂定、待定、（暂定）、； 等 */
export function cleanAddress(raw: string): string {
  return raw
    .replace(/\s*[；;]\s*$/g, "")
    .replace(/\s*（?\s*暂定\s*）?/g, "")
    .replace(/\s*待定\s*/g, "")
    .replace(/\s*（?\s*待定\s*）?/g, "")
    .trim();
}

/** 是否为“待定”类地址（仅城市名或含待定），展示时可用 fallback 文案 */
export function isTentativeAddress(raw: string): boolean {
  const c = cleanAddress(raw);
  return !c || /待定|暂定/i.test(raw);
}

export type CityData = {
  name: string;
  slug: string;
  /** 一个城市多个地址（深圳两条，其它通常一条） */
  locations: string[];
  /** 可选，近期排期文案，如 "2026年3月8日、3月22日有课" */
  scheduleText?: string;
  /** 首页是否展示为前 6 个核心城市（北京、天津、上海、广州、深圳、重庆） */
  isCore?: boolean;
  /** 北京/上海/天津/深圳：每月开课2次；其它：每月开课 */
  twicePerMonth?: boolean;
};

/** 首页展示顺序：北京、天津、上海、广州、深圳、重庆 */
const CORE_ORDER = ["beijing", "tianjin", "shanghai", "guangzhou", "shenzhen", "chongqing"];

export const CITIES: CityData[] = [
  {
    name: "北京",
    slug: "beijing",
    locations: ["北京市，丰台区石榴中心2号楼714-715"],
    isCore: true,
    twicePerMonth: true,
  },
  {
    name: "天津",
    slug: "tianjin",
    locations: ["天津市，和平区大沽北路与徐州道交口万通中心20层培训教室"],
    isCore: true,
    twicePerMonth: true,
  },
  {
    name: "上海",
    slug: "shanghai",
    locations: ["上海市，徐汇区吴中路8号锦辉大厦714室"],
    isCore: true,
    twicePerMonth: true,
  },
  {
    name: "广州",
    slug: "guangzhou",
    locations: ["广州市，荔湾区南岸路63号城启大厦513室"],
    isCore: true,
    twicePerMonth: false,
  },
  {
    name: "深圳",
    slug: "shenzhen",
    locations: [
      "深圳市，南山区新西路9号兰光科技园C栋603A",
      "深圳市，福田区八卦岭工业区511栋",
    ],
    isCore: true,
    twicePerMonth: true,
  },
  {
    name: "重庆",
    slug: "chongqing",
    locations: ["重庆市，渝中区南纪门街道复旦中学飞腾游泳馆"],
    isCore: true,
    twicePerMonth: false,
  },
];

/** 首页展示：前 6 个核心城市（按 CORE_ORDER 顺序）+ “其他城市” 入口用 */
export function getHomepageCitySlugs(): string[] {
  return [...CORE_ORDER];
}

export function getCityBySlug(slug: string): CityData | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return CITIES.map((c) => c.slug);
}

/** 所有城市（顺序：核心 6 个按 CORE_ORDER，其余按 CITIES 顺序） */
export function getAllCitiesForListing(): CityData[] {
  const rest = CITIES.filter((c) => !CORE_ORDER.includes(c.slug));
  const core = CORE_ORDER.map((s) => CITIES.find((c) => c.slug === s)).filter(Boolean) as CityData[];
  return [...core, ...rest];
}
