/**
 * 从 RAW_DATA 自动生成：清洗、归并、slug、区域
 */

import { RAW_DATA } from "./cities.raw";

/** 清洗展示用地址：删括号内容、日期、暂定/待定、多余标点、合并空格。页面不得出现日期。 */
export function sanitizeLocation(text: string): string {
  let s = text
    .replace(/[（(].*?[）)]/g, "")
    .replace(/\d{4}年\d{1,2}月\d{1,2}日/g, "")
    .replace(/\d{1,2}月\d{1,2}日/g, "")
    .replace(/有课/g, "")
    .replace(/暂定/g, "")
    .replace(/待定/g, "")
    .replace(/[；;,，]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return s;
}

export type City = {
  name: string;
  slug: string;
  locations: string[];
  isCore: boolean;
  region: string;
};

/** 核心城市：北京、天津、上海、广州、深圳、重庆 */
const CORE_NAMES = new Set(["北京市", "天津市", "上海市", "广州市", "深圳市", "重庆市"]);

/** 每月开课2次的城市（名称） */
const TWICE_PER_MONTH_NAMES = new Set(["北京市", "天津市", "上海市", "深圳市"]);

/** 区域顺序 */
export const REGION_ORDER = [
  "京津冀",
  "长江三角洲",
  "珠江三角洲",
  "华南",
  "华东（山东）",
  "华中",
  "西南",
  "西北",
  "东北",
  "华北",
  "其他",
] as const;

/** 城市 -> 区域 */
const REGION_MAP: Record<string, string> = {
  "北京市": "京津冀",
  "天津市": "京津冀",
  "石家庄市": "京津冀",
  "廊坊市": "京津冀",
  "保定市": "京津冀",
  "张家口市": "京津冀",
  "秦皇岛市": "京津冀",
  "邢台市": "京津冀",
  "唐山市": "京津冀",
  "涿州市": "京津冀",
  "上海市": "长江三角洲",
  "杭州市": "长江三角洲",
  "南京市": "长江三角洲",
  "苏州市": "长江三角洲",
  "无锡市": "长江三角洲",
  "常州市": "长江三角洲",
  "宁波市": "长江三角洲",
  "舟山市": "长江三角洲",
  "常熟市": "长江三角洲",
  "连云港市": "长江三角洲",
  "盐城市": "长江三角洲",
  "泰州市": "长江三角洲",
  "六安市": "长江三角洲",
  "温州市": "长江三角洲",
  "嘉兴市": "长江三角洲",
  "绍兴市": "长江三角洲",
  "台州市": "长江三角洲",
  "扬州市": "长江三角洲",
  "镇江市": "长江三角洲",
  "淮安市": "长江三角洲",
  "南通市": "长江三角洲",
  "徐州市": "长江三角洲",
  "广州市": "珠江三角洲",
  "深圳市": "珠江三角洲",
  "珠海市": "珠江三角洲",
  "东莞市": "珠江三角洲",
  "中山市": "珠江三角洲",
  "佛山市": "珠江三角洲",
  "惠州市": "珠江三角洲",
  "江门市": "珠江三角洲",
  "汕头市": "华南",
  "河源市": "华南",
  "福州市": "华南",
  "厦门市": "华南",
  "南宁市": "华南",
  "桂林市": "华南",
  "三亚市": "华南",
  "海口市": "华南",
  "北海市": "华南",
  "柳州市": "华南",
  "防城港市": "华南",
  "龙岩市": "华南",
  "三明市": "华南",
  "南平市": "华南",
  "漳州市": "华南",
  "泉州市": "华南",
  "梅州市": "华南",
  "济南市": "华东（山东）",
  "青岛市": "华东（山东）",
  "烟台市": "华东（山东）",
  "威海市": "华东（山东）",
  "东营市": "华东（山东）",
  "滨州市": "华东（山东）",
  "聊城市": "华东（山东）",
  "德州市": "华东（山东）",
  "日照市": "华东（山东）",
  "潍坊市": "华东（山东）",
  "泰安市": "华东（山东）",
  "济宁市": "华东（山东）",
  "淄博市": "华东（山东）",
  "武汉市": "华中",
  "长沙市": "华中",
  "郑州市": "华中",
  "合肥市": "华中",
  "南昌市": "华中",
  "洛阳市": "华中",
  "许昌市": "华中",
  "赣州市": "华中",
  "九江市": "华中",
  "新余市": "华中",
  "蚌埠市": "华中",
  "淮北市": "华中",
  "铜陵市": "华中",
  "黄山市": "华中",
  "宣城市": "华中",
  "安庆市": "华中",
  "马鞍山市": "华中",
  "芜湖市": "华中",
  "淮南市": "华中",
  "平顶山市": "华中",
  "南阳市": "华中",
  "三门峡市": "华中",
  "济源市": "华中",
  "十堰市": "华中",
  "襄阳市": "华中",
  "宜昌市": "华中",
  "荆门市": "华中",
  "咸宁市": "华中",
  "鄂州市": "华中",
  "仙桃市": "华中",
  "潜江市": "华中",
  "岳阳市": "华中",
  "常德市": "华中",
  "株洲市": "华中",
  "湘潭市": "华中",
  "成都市": "西南",
  "重庆市": "西南",
  "昆明市": "西南",
  "贵阳市": "西南",
  "大理白族自治州": "西南",
  "眉山市": "西南",
  "铜仁市": "西南",
  "铜仁地区": "西南",
  "普洱市": "西南",
  "都江堰市": "西南",
  "绵阳市": "西南",
  "德阳市": "西南",
  "乐山市": "西南",
  "遵义市": "西南",
  "玉溪市": "西南",
  "拉萨市": "西南",
  "山南市": "西南",
  "林芝市": "西南",
  "西安市": "西北",
  "兰州市": "西北",
  "西宁市": "西北",
  "银川市": "西北",
  "乌鲁木齐市": "西北",
  "克拉玛依市": "西北",
  "张掖市": "西北",
  "昌吉回族自治州": "西北",
  "喀什地区": "西北",
  "酒泉市": "西北",
  "金昌市": "西北",
  "阿拉尔市": "西北",
  "咸阳市": "西北",
  "宝鸡市": "西北",
  "榆林市": "西北",
  "延安市": "西北",
  "阿拉善盟": "西北",
  "海西蒙古族藏族自治州江门市": "西北",
  "哈尔滨市": "东北",
  "沈阳市": "东北",
  "大连市": "东北",
  "长春市": "东北",
  "锦州市": "东北",
  "呼伦贝尔市": "东北",
  "营口市": "东北",
  "盘锦市": "东北",
  "鞍山市": "东北",
  "佳木斯市": "东北",
  "延边朝鲜族自治州": "东北",
  "松原市": "东北",
  "太原市": "华北",
  "大同市": "华北",
  "长治市": "华北",
  "忻州市": "华北",
  "包头市": "华北",
  "呼和浩特市": "华北",
  "赤峰市": "华北",
  "鄂尔多斯市": "华北",
  "锡林郭勒盟": "华北",
  "晋中市": "华北",
  "阳泉市": "华北",
  "晋城市": "华北",
};

/** 城市名 -> slug（拼音小写，冲突 -2 -3） */
const SLUG_MAP: Record<string, string> = {
  "北京市": "beijing",
  "天津市": "tianjin",
  "上海市": "shanghai",
  "广州市": "guangzhou",
  "深圳市": "shenzhen",
  "重庆市": "chongqing",
  "西安市": "xian",
  "杭州市": "hangzhou",
  "成都市": "chengdu",
  "武汉市": "wuhan",
  "长沙市": "changsha",
  "济南市": "jinan",
  "南京市": "nanjing",
  "苏州市": "suzhou",
  "哈尔滨市": "haerbin",
  "沈阳市": "shenyang",
  "包头市": "baotou",
  "大连市": "dalian",
  "青岛市": "qingdao",
  "呼和浩特市": "huhehaote",
  "邢台市": "xingtai",
  "长春市": "changchun",
  "德州市": "dezhou",
  "东营市": "dongying",
  "滨州市": "binzhou",
  "聊城市": "liaocheng",
  "烟台市": "yantai",
  "石家庄市": "shijiazhuang",
  "张家口市": "zhangjiakou",
  "威海市": "weihai",
  "兰州市": "lanzhou",
  "秦皇岛市": "qinhuangdao",
  "赤峰市": "chifeng",
  "廊坊市": "langfang",
  "西宁市": "xining",
  "克拉玛依市": "kelamayi",
  "乌鲁木齐市": "wulumuqi",
  "银川市": "yinchuan",
  "郑州市": "zhengzhou",
  "无锡市": "wuxi",
  "太原市": "taiyuan",
  "许昌市": "xuchang",
  "大同市": "datong",
  "合肥市": "hefei",
  "宁波市": "ningbo",
  "连云港市": "lianyungang",
  "盐城市": "yancheng",
  "泰州市": "taizhou",
  "常熟市": "changshu",
  "中山市": "zhongshan",
  "福州市": "fuzhou",
  "贵阳市": "guiyang",
  "洛阳市": "luoyang",
  "南宁市": "nanning",
  "厦门市": "xiamen",
  "珠海市": "zhuhai",
  "东莞市": "dongguan",
  "长治市": "changzhi",
  "大理白族自治州": "dali",
  "昆明市": "kunming",
  "桂林市": "guilin",
  "三亚市": "sanya",
  "汕头市": "shantou",
  "河源市": "heyuan",
  "忻州市": "xinzhou",
  "锦州市": "jinzhou",
  "舟山市": "zhoushan",
  "宁德市": "ningde",
  "日照市": "rizhao",
  "南昌市": "nanchang",
  "眉山市": "meishan",
  "铜仁市": "tongren",
  "张掖市": "zhangye",
  "保定市": "baoding",
  "常州市": "changzhou",
  "六安市": "liuan",
  "呼伦贝尔市": "hulunbeier",
  "海口市": "haikou",
  "普洱市": "puer",
  "赣州市": "ganzhou",
  "都江堰市": "dujiangyan",
  "涿州市": "zhuozhou",
  "徐州市": "xuzhou",
  "南通市": "nantong",
  "营口市": "yingkou",
  "盘锦市": "panjin",
  "鞍山市": "anshan",
  "佳木斯市": "jiamusi",
  "延边朝鲜族自治州": "yanbian",
  "松原市": "songyuan",
  "扬州市": "yangzhou",
  "镇江市": "zhenjiang",
  "淮安市": "huaian",
  "绍兴市": "shaoxing",
  "台州市": "taizhou-2",
  "宣城市": "xuancheng",
  "淮北市": "huaibei",
  "铜陵市": "tongling",
  "黄山市": "huangshan",
  "泉州市": "quanzhou",
  "蚌埠市": "bangbu",
  "金华市": "jinhua",
  "衢州市": "quzhou",
  "丽水市": "lishui",
  "湖州市": "huzhou",
  "芜湖市": "wuhu",
  "安庆市": "anqing",
  "马鞍山市": "maanshan",
  "唐山市": "tangshan",
  "晋中市": "jinzhong",
  "阳泉市": "yangquan",
  "鄂尔多斯市": "eerduosi",
  "锡林郭勒盟": "xilinguolemeng",
  "温州市": "wenzhou",
  "阿拉善盟": "alashanmeng",
  "龙岩市": "longyan",
  "三明市": "sanming",
  "南平市": "nanping",
  "九江市": "jiujiang",
  "新余市": "xinyu",
  "昌吉回族自治州": "changji",
  "山南市": "shannan",
  "林芝市": "linzhi",
  "阿拉尔市": "alaer",
  "遵义市": "zunyi",
  "潍坊市": "weifang",
  "泰安市": "taian",
  "济宁市": "jining",
  "淄博市": "zibo",
  "平顶山市": "pingdingshan",
  "南阳市": "nanyang",
  "三门峡市": "sanmenxia",
  "北海市": "beihai",
  "柳州市": "liuzhou",
  "防城港市": "fangchenggang",
  "绵阳市": "mianyang",
  "德阳市": "deyang",
  "乐山市": "leshan",
  "济源市": "jiyuan",
  "十堰市": "shiyan",
  "襄阳市": "xiangyang",
  "宜昌市": "yichang",
  "荆门市": "jingmen",
  "咸宁市": "xianning",
  "鄂州市": "ezhou",
  "仙桃市": "xiantao",
  "岳阳市": "yueyang",
  "常德市": "changde",
  "株洲市": "zhuzhou",
  "湘潭市": "xiangtan",
  "佛山市": "foshan",
  "梅州市": "meizhou",
  "潜江市": "qianjiang",
  "铜仁地区": "tongren-diqu",
  "玉溪市": "yuxi",
  "拉萨市": "lasa",
  "咸阳市": "xianyang",
  "宝鸡市": "baoji",
  "榆林市": "yulin",
  "延安市": "yanan",
  "惠州市": "huizhou",
  "江门市": "jiangmen",
  "酒泉市": "jiuquan",
  "金昌市": "jinchang",
  "海西蒙古族藏族自治州江门市": "haixi",
  "喀什地区": "kashi",
  "晋城市": "jincheng",
  "嘉兴市": "jiaxing",
  "漳州市": "zhangzhou",
};

function getRegion(cityName: string): string {
  return REGION_MAP[cityName] ?? "其他";
}

function getSlug(cityName: string, used: Set<string>): string {
  let base = SLUG_MAP[cityName];
  if (!base) {
    base = cityName.replace(/[市自治州盟地区]+$/, "").toLowerCase();
    base = base.replace(/\s+/g, "");
    if (!/^[a-z0-9-]+$/.test(base)) base = "other-" + cityName.length;
  }
  let slug = base;
  let n = 2;
  while (used.has(slug)) {
    slug = `${base}-${n}`;
    n++;
  }
  used.add(slug);
  return slug;
}

/** 从 RAW_DATA 生成城市列表：同名合并、locations 去重、清洗后空地址丢弃 */
function buildCities(): City[] {
  const byCity = new Map<string, string[]>();
  for (const { city, location } of RAW_DATA) {
    const cleaned = sanitizeLocation(location);
    if (!cleaned) continue;
    const list = byCity.get(city) ?? [];
    if (!list.includes(cleaned)) list.push(cleaned);
    byCity.set(city, list);
  }
  const usedSlugs = new Set<string>();
  const cities: City[] = [];
  for (const [cityName, locs] of byCity) {
    if (!locs.length) continue;
    const name = cityName.replace(/市$/, "").replace(/自治州$/, "").replace(/盟$/, "").replace(/地区$/, "") || cityName;
    cities.push({
      name,
      slug: getSlug(cityName, usedSlugs),
      locations: locs,
      isCore: CORE_NAMES.has(cityName),
      region: getRegion(cityName),
    });
  }
  return cities;
}

export const CITIES: City[] = buildCities();

/** 首页 6 个核心城市顺序 */
const HOME_SLUG_ORDER = ["beijing", "tianjin", "shanghai", "guangzhou", "shenzhen", "chongqing"];

export function getHomepageCitySlugs(): string[] {
  return [...HOME_SLUG_ORDER];
}

export function getCityBySlug(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return CITIES.map((c) => c.slug);
}

/** 按 REGION_ORDER 排序的城市列表（用于 /cities） */
export function getCitiesByRegion(): Array<{ region: string; cities: City[] }> {
  const byRegion = new Map<string, City[]>();
  for (const c of CITIES) {
    const list = byRegion.get(c.region) ?? [];
    list.push(c);
    byRegion.set(c.region, list);
  }
  return REGION_ORDER.filter((r) => byRegion.has(r)).map((region) => ({
    region,
    cities: byRegion.get(region)!,
  }));
}

/** 是否每月开课2次（北京/上海/天津/深圳） */
export function isTwicePerMonth(cityName: string): boolean {
  const full = cityName + (cityName.endsWith("市") ? "" : "市");
  return TWICE_PER_MONTH_NAMES.has(full) || TWICE_PER_MONTH_NAMES.has(cityName);
}

/** 展示用地址：清洗后若为空则用 fallback */
const FALLBACK_ADDRESS = "城市内常用固定培训场地（报名后告知具体教室）";

export function getDisplayLocations(locations: string[]): string[] {
  return locations.map((raw) => {
    const cleaned = sanitizeLocation(raw);
    return cleaned || FALLBACK_ADDRESS;
  });
}
