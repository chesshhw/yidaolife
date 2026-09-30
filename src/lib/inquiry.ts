export const INQUIRY_EMAIL = "13512456138@163.com";

export type Inquiry = {
  name: string;
  company: string;
  email: string;
  phone: string;
  wechat: string;
  message: string;
  language: "en" | "zh";
  page: string;
};

export function validateInquiry(value: unknown): Inquiry | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const data = value as Record<string, unknown>;
  const limits = { name: 100, company: 200, email: 254, phone: 40, wechat: 80, message: 3000 };
  const fields: Record<string, string> = {};
  for (const [key, limit] of Object.entries(limits)) {
    if (typeof data[key] !== "string") return null;
    if (key !== "message" && /[\r\n]/.test(data[key])) return null;
    const text = data[key].trim();
    if (text.length > limit || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(text)) return null;
    if (key !== "message" && /[\r\n]/.test(text)) return null;
    fields[key] = text;
  }
  if (!fields.name || !fields.message || !/^[A-Za-z0-9.!#$%&'*+\/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9.-]*[A-Za-z0-9])?\.[A-Za-z]{2,63}$/.test(fields.email)) return null;
  if (fields.phone && (!/^\+?[\d ()-]+$/.test(fields.phone) || fields.phone.replace(/\D/g, "").length < 6)) return null;
  if (data.consent !== true || (data.language !== "en" && data.language !== "zh")) return null;
  return {
    ...fields,
    language: data.language,
    page: data.page === "/en" ? "/en" : "/contact",
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
    `表单语言 / Form language: ${inquiry.language}`,
    `提交页面 / Page: https://www.yidaolife.com${inquiry.page}`,
    "",
    "留言 / Message:",
    inquiry.message,
    "",
    "访客已同意使用所填信息回复本次咨询。",
    "The visitor agreed to be contacted about this inquiry.",
    "直接回复此邮件可联系访客。/ Reply to this email to contact the visitor.",
  ].join("\n");
}
