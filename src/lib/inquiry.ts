export const INQUIRY_EMAIL = "contact@yidaolife.com";
export const TRAINING_CITIES = [
  {
    "name": "Beijing",
    "zh": "北京"
  },
  {
    "name": "Shanghai",
    "zh": "上海"
  },
  {
    "name": "Tianjin",
    "zh": "天津"
  },
  {
    "name": "Guangzhou",
    "zh": "广州"
  },
  {
    "name": "Shenzhen",
    "zh": "深圳"
  },
  {
    "name": "Chengdu",
    "zh": "成都"
  },
  {
    "name": "Hangzhou",
    "zh": "杭州"
  },
  {
    "name": "Suzhou",
    "zh": "苏州"
  },
  {
    "name": "Xi’an",
    "zh": "西安"
  },
  {
    "name": "Wuhan",
    "zh": "武汉"
  },
  {
    "name": "Changsha",
    "zh": "长沙"
  },
  {
    "name": "Nanjing",
    "zh": "南京"
  },
  {
    "name": "Qingdao",
    "zh": "青岛"
  },
  {
    "name": "Dalian",
    "zh": "大连"
  },
  {
    "name": "Hefei",
    "zh": "合肥"
  },
  {
    "name": "Jinan",
    "zh": "济南"
  }
];

export function analyticsCity(value: unknown) {
  const normalized = String(value || "").trim().toLowerCase().replace(/['’ -]/g, "");
  return TRAINING_CITIES.find(city => city.name.toLowerCase().replace(/['’ -]/g, "") === normalized || city.zh === normalized)?.name || "Other";
}
export const TRAINING_TYPES = ["AHA Heartsaver First Aid CPR AED", "Corporate First Aid Training", "CPR & AED Training", "AHA Instructor Training", "Other"] as const;
export const ATTRIBUTION_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid"] as const;

export type Inquiry = {
  name: string;
  company: string;
  email: string;
  phone: string;
  wechat: string;
  message: string;
  city: string;
  participantCount: string;
  trainingType: string;
  preferredDate: string;
  language: "en" | "zh";
  page: string;
  landingPage: string;
  attribution: Record<string, string>;
};

export function validateInquiry(value: unknown): Inquiry | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const data = value as Record<string, unknown>;
  const limits = { name: 100, company: 200, email: 254, phone: 40, wechat: 80, message: 3000, city: 100, participantCount: 6, trainingType: 80, preferredDate: 10 };
  const fields: Record<string, string> = {};
  for (const [key, limit] of Object.entries(limits)) {
    if (typeof data[key] !== "string") return null;
    if (key !== "message" && /[\r\n]/.test(data[key])) return null;
    const text = data[key].trim();
    if (text.length > limit || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(text)) return null;
    if (key !== "message" && /[\r\n]/.test(text)) return null;
    fields[key] = text;
  }
  if (!fields.name || !fields.city || !/^[A-Za-z0-9.!#$%&'*+\/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9.-]*[A-Za-z0-9])?\.[A-Za-z]{2,63}$/.test(fields.email)) return null;
  if (fields.phone && (!/^\+?[\d ()-]+$/.test(fields.phone) || fields.phone.replace(/\D/g, "").length < 6)) return null;
  if (data.consent !== true || (data.language !== "en" && data.language !== "zh")) return null;
  if (fields.participantCount && !/^[1-9]\d{0,4}$/.test(fields.participantCount)) return null;
  if (fields.trainingType && !TRAINING_TYPES.some(type => type === fields.trainingType)) return null;
  if (fields.preferredDate && (!/^\d{4}-\d{2}-\d{2}$/.test(fields.preferredDate) || Number.isNaN(Date.parse(fields.preferredDate)) || new Date(fields.preferredDate).toISOString().slice(0, 10) !== fields.preferredDate)) return null;
  const safePath = (path: unknown) => typeof path === "string" && /^\/[a-z0-9/-]{0,160}$/.test(path) && !path.startsWith("//") ? path : "/contact";
  const attribution: Record<string, string> = {};
  const incoming = data.attribution && typeof data.attribution === "object" ? data.attribution as Record<string, unknown> : {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = incoming[key];
    if (value !== undefined && (typeof value !== "string" || value.length > 200 || /[\u0000-\u001f\u007f]/.test(value))) return null;
    attribution[key] = typeof value === "string" ? value.trim() : "";
  }
  return {
    ...fields,
    language: data.language,
    page: safePath(data.page),
    landingPage: safePath(data.landingPage),
    attribution,
  } as Inquiry;
}

export function inquiryEmailText(inquiry: Inquiry, reference: string, now = new Date()) {
  return [
    "都会急救网站咨询 / Yidaolife website inquiry",
    `编号 / Reference: ${reference}`,
    `时间 / Time (UTC): ${now.toISOString()}`,
    `姓名 / Name: ${inquiry.name}`,
    `单位 / Company: ${inquiry.company || "—"}`,
    `邮箱 / Email: ${inquiry.email}`,
    `电话 / Phone: ${inquiry.phone || "—"}`,
    `微信 / WeChat: ${inquiry.wechat || "—"}`,
    `培训城市 / City: ${inquiry.city}`,
    `人数 / Participants: ${inquiry.participantCount || "—"}`,
    `课程 / Training: ${inquiry.trainingType || "—"}`,
    `期望日期 / Preferred date: ${inquiry.preferredDate || "—"}`,
    `表单语言 / Form language: ${inquiry.language}`,
    `提交页面 / Page: https://www.yidaolife.com${inquiry.page}`,
    `来源落地页 / Landing page: ${inquiry.landingPage}`,
    ...ATTRIBUTION_KEYS.map(key => `${key}: ${inquiry.attribution[key] || "—"}`),
    "",
    "留言 / Message:",
    inquiry.message,
    "",
    "访客已同意使用所填信息回复本次咨询。",
    "The visitor agreed to be contacted about this inquiry.",
    "直接回复此邮件可联系访客。/ Reply to this email to contact the visitor.",
  ].join("\n");
}
