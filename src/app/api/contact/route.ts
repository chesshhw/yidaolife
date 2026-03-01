import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * 环境变量（部署时配置）：
 * - RESEND_API_KEY: Resend API Key（必填）
 * - CONTACT_TO_EMAIL: 收件人邮箱，如 13512456138@163.com
 * - CONTACT_FROM_EMAIL: 发件人邮箱，需在 Resend 验证的域名下，或使用 Resend 提供的测试发件人
 * 详见项目 README 或 .env.example
 */

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 分钟
const RATE_LIMIT_MAX = 5;

const ipCounts = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

function checkRateLimit(ip: string): { allowed: boolean } {
  const now = Date.now();
  const entry = ipCounts.get(ip);
  if (!entry) {
    ipCounts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }
  if (now >= entry.resetAt) {
    ipCounts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return { allowed: false };
  }
  entry.count += 1;
  return { allowed: true };
}

function normalizePhone(raw: string): string {
  return raw.replace(/\D/g, "");
}

function validatePhone(phone: string): { valid: boolean; error?: string } {
  const digits = normalizePhone(phone);
  if (digits.length !== 11) {
    return { valid: false, error: "请填写正确的 11 位手机号" };
  }
  if (!/^1[3-9]\d{9}$/.test(digits)) {
    return { valid: false, error: "请填写正确的手机号格式" };
  }
  return { valid: true };
}

function maskPhone(phone: string): string {
  const d = normalizePhone(phone);
  if (d.length < 4) return "****";
  return d.slice(0, 3) + "****" + d.slice(-4);
}

type Body = {
  company?: string;
  name: string;
  phone: string;
  city: string;
  headcount: string;
  duration: string;
  note?: string;
  pageUrl?: string;
  userAgent?: string;
  ts?: number;
};

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { ok: false, error: "提交过于频繁，请稍后再试" },
      { status: 429 }
    );
  }

  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "请求格式错误" },
      { status: 400 }
    );
  }

  const { company, name, phone, city, headcount, duration, note, pageUrl, userAgent, ts } = body;

  if (!name || typeof name !== "string" || !name.trim()) {
    return NextResponse.json({ ok: false, error: "请填写姓名" }, { status: 400 });
  }
  if (!phone || typeof phone !== "string" || !phone.trim()) {
    return NextResponse.json({ ok: false, error: "请填写手机号" }, { status: 400 });
  }
  const phoneCheck = validatePhone(phone);
  if (!phoneCheck.valid) {
    return NextResponse.json({ ok: false, error: phoneCheck.error }, { status: 400 });
  }
  if (!city || typeof city !== "string" || !city.trim()) {
    return NextResponse.json({ ok: false, error: "请选择城市" }, { status: 400 });
  }
  if (!headcount || typeof headcount !== "string" || !headcount.trim()) {
    return NextResponse.json({ ok: false, error: "请选择培训人数" }, { status: 400 });
  }
  if (!duration || typeof duration !== "string" || !duration.trim()) {
    return NextResponse.json({ ok: false, error: "请选择课程时长" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    console.error("[contact] Missing env: RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL");
    return NextResponse.json(
      { ok: false, error: "服务暂不可用，请稍后重试或直接致电联系" },
      { status: 500 }
    );
  }

  function escapeHtml(s: string): string {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  const submitTime = ts ? new Date(ts).toLocaleString("zh-CN") : new Date().toLocaleString("zh-CN");
  const subject = `【企业团训表单】${city}｜${headcount}｜${duration}｜${name}`;

  const textBody = [
    `公司/机构：${company ?? "—"}`,
    `姓名：${name}`,
    `手机：${phone}`,
    `城市：${city}`,
    `人数：${headcount}`,
    `时长：${duration}`,
    `备注：${note ?? "—"}`,
    `提交时间：${submitTime}`,
    `来源页面：${pageUrl ?? "—"}`,
    `UA：${userAgent ?? "—"}`,
    `IP：${ip}`,
  ].join("\n");

  const htmlBody = `
    <h2>企业团训表单</h2>
    <table style="border-collapse: collapse;">
      <tr><td style="padding:4px 8px;border:1px solid #eee;">公司/机构</td><td style="padding:4px 8px;border:1px solid #eee;">${escapeHtml(company ?? "—")}</td></tr>
      <tr><td style="padding:4px 8px;border:1px solid #eee;">姓名</td><td style="padding:4px 8px;border:1px solid #eee;">${escapeHtml(name)}</td></tr>
      <tr><td style="padding:4px 8px;border:1px solid #eee;">手机</td><td style="padding:4px 8px;border:1px solid #eee;">${escapeHtml(phone)}</td></tr>
      <tr><td style="padding:4px 8px;border:1px solid #eee;">城市</td><td style="padding:4px 8px;border:1px solid #eee;">${escapeHtml(city)}</td></tr>
      <tr><td style="padding:4px 8px;border:1px solid #eee;">人数</td><td style="padding:4px 8px;border:1px solid #eee;">${escapeHtml(headcount)}</td></tr>
      <tr><td style="padding:4px 8px;border:1px solid #eee;">时长</td><td style="padding:4px 8px;border:1px solid #eee;">${escapeHtml(duration)}</td></tr>
      <tr><td style="padding:4px 8px;border:1px solid #eee;">备注</td><td style="padding:4px 8px;border:1px solid #eee;">${escapeHtml(note ?? "—")}</td></tr>
      <tr><td style="padding:4px 8px;border:1px solid #eee;">提交时间</td><td style="padding:4px 8px;border:1px solid #eee;">${escapeHtml(submitTime)}</td></tr>
      <tr><td style="padding:4px 8px;border:1px solid #eee;">来源页面</td><td style="padding:4px 8px;border:1px solid #eee;">${escapeHtml(pageUrl ?? "—")}</td></tr>
      <tr><td style="padding:4px 8px;border:1px solid #eee;">UA</td><td style="padding:4px 8px;border:1px solid #eee;">${escapeHtml((userAgent ?? "—").slice(0, 200))}</td></tr>
      <tr><td style="padding:4px 8px;border:1px solid #eee;">IP</td><td style="padding:4px 8px;border:1px solid #eee;">${escapeHtml(ip)}</td></tr>
    </table>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject,
      text: textBody,
      html: htmlBody,
    });

    if (error) {
      console.error("[contact] Resend error:", error.message, "phone:", maskPhone(phone));
      return NextResponse.json(
        { ok: false, error: "发送失败，请稍后重试或直接致电联系" },
        { status: 500 }
      );
    }

    console.log("[contact] OK", city, headcount, duration, "phone:", maskPhone(phone));
    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[contact] Exception:", msg, "phone:", maskPhone(phone));
    return NextResponse.json(
      { ok: false, error: "系统繁忙，请稍后重试或直接致电联系" },
      { status: 500 }
    );
  }
}
