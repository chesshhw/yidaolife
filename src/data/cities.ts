/**
 * 城市数据：新增城市即自动生成 /city/[slug] 静态页（generateStaticParams）
 */

export type CityData = {
  slug: string;
  name: string;
  regionId: string;
  /** 区名，用于交通说明 */
  district: string;
  /** 完整地址：区、街道、大厦、门牌号 */
  addressFull: string;
  /** 近期培训时间：具体日期或 "近期均有排期，详情请咨询" */
  schedule: string;
};

export const REGIONS: { id: string; name: string }[] = [
  { id: "bj", name: "京津冀" },
  { id: "yj", name: "长三角" },
  { id: "zj", name: "珠三角" },
  { id: "xn", name: "西南" },
  { id: "xb", name: "西北" },
  { id: "db", name: "东北" },
  { id: "other", name: "其他" },
];

export const CITIES: CityData[] = [
  {
    slug: "beijing",
    name: "北京",
    regionId: "bj",
    district: "朝阳区",
    addressFull: "北京市朝阳区建国路88号SOHO现代城A座2306室",
    schedule: "近期均有排期，详情请咨询",
  },
  {
    slug: "tianjin",
    name: "天津",
    regionId: "bj",
    district: "河西区",
    addressFull: "天津市河西区友谊北路与永安道交口罗马花园1座2门302室",
    schedule: "近期均有排期，详情请咨询",
  },
  {
    slug: "shanghai",
    name: "上海",
    regionId: "yj",
    district: "浦东新区",
    addressFull: "上海市浦东新区张杨路500号华润时代广场写字楼20层2008室",
    schedule: "近期均有排期，详情请咨询",
  },
  {
    slug: "guangzhou",
    name: "广州",
    regionId: "zj",
    district: "天河区",
    addressFull: "广东省广州市天河区体育西路103号维多利广场A座15层1502室",
    schedule: "近期均有排期，详情请咨询",
  },
];

export const CITIES_BY_REGION: Record<string, CityData[]> = (() => {
  const map: Record<string, CityData[]> = {};
  for (const r of REGIONS) {
    map[r.id] = CITIES.filter((c) => c.regionId === r.id);
  }
  return map;
})();

export function getCityBySlug(slug: string): CityData | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return CITIES.map((c) => c.slug);
}
