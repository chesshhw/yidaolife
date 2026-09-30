import { NextRequest, NextResponse } from "next/server";
import { validateInquiry } from "@/lib/inquiry";
import { allowInquiryAttempt, createInquiryToken, deliverInquiry, mailConfigured, verifyInquiryToken } from "@/lib/inquiry-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

function response(body: object, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
}

export async function GET() {
  if (!mailConfigured()) return response({ ready: false });
  return response({ ready: true, token: createInquiryToken() });
}

export async function POST(request: NextRequest) {
  const allowed = new Set(["https://www.yidaolife.com", "https://yidaolife.com"]);
  if (process.env.NODE_ENV !== "production") allowed.add(request.nextUrl.origin);
  // Explicit preview origin may be configured, never accept arbitrary forwarded host headers.
  if (process.env.INQUIRY_ALLOWED_ORIGIN) allowed.add(process.env.INQUIRY_ALLOWED_ORIGIN);
  if (!allowed.has(request.headers.get("origin") || "")) return response({ error: "ORIGIN" }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return response({ error: "CONTENT_TYPE" }, 415);
  if (!mailConfigured()) return response({ error: "UNAVAILABLE" }, 503);
  const ip = request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!allowInquiryAttempt(ip)) return response({ error: "RATE_LIMIT" }, 429);
  const length = Number(request.headers.get("content-length"));
  if (length > 16000) return response({ error: "TOO_LARGE" }, 413);
  let value: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return response({ error: "INVALID" }, 400);
    const parts: Uint8Array[] = [];
    let total = 0;
    while (true) {
      const { done, value: part } = await reader.read();
      if (done) break;
      total += part.byteLength;
      if (total > 16000) { await reader.cancel(); return response({ error: "TOO_LARGE" }, 413); }
      parts.push(part);
    }
    value = JSON.parse(Buffer.concat(parts).toString("utf8"));
  } catch { return response({ error: "INVALID" }, 400); }
  if (!value || typeof value !== "object" || Array.isArray(value)) return response({ error: "INVALID" }, 400);
  const data = value as Record<string, unknown>;
  if (data.website !== "" || !verifyInquiryToken(data.token)) return response({ error: "EXPIRED" }, 400);
  const inquiry = validateInquiry(data);
  if (!inquiry) return response({ error: "INVALID" }, 400);
  try {
    const reference = await deliverInquiry(inquiry, data.token as string);
    return response({ ok: true, reference });
  } catch {
    return response({ error: "DELIVERY_FAILED" }, 502);
  }
}
