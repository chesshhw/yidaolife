import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { get, put } from "@vercel/blob";
import nodemailer from "nodemailer";
import { inquiryEmailText, type Inquiry } from "./inquiry";

// Destination is server configuration, never visitor input.
export function mailConfigured() {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS && /^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+$/.test(process.env.LEAD_NOTIFICATION_EMAIL || ""));
}

export function inquiryConfigured() {
  return mailConfigured() && Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

function signature(payload: string) {
  return createHmac("sha256", process.env.INQUIRY_SIGNING_SECRET || process.env.SMTP_PASS || "").update(payload).digest("hex");
}

export function createInquiryToken(now = Date.now()) {
  const payload = `${now}.${randomUUID()}`;
  return `${payload}.${signature(payload)}`;
}

export function verifyInquiryToken(token: unknown, now = Date.now()) {
  if (typeof token !== "string" || token.length > 200) return false;
  const [time, id, digest, extra] = token.split(".");
  if (extra || !/^\d{13}$/.test(time || "") || !/^[a-f0-9-]{36}$/.test(id || "") || !/^[a-f0-9]{64}$/.test(digest || "")) return false;
  const age = now - Number(time);
  if (age < 1500 || age > 2 * 60 * 60 * 1000) return false;
  return timingSafeEqual(Buffer.from(digest), Buffer.from(signature(`${time}.${id}`)));
}

// Best-effort per-instance protection, not a distributed quota. No raw IPs retained.
const attempts = new Map<string, { count: number; expires: number }>();
export function allowInquiryAttempt(ip: string, now = Date.now()) {
  for (const [key, value] of attempts) if (value.expires <= now) attempts.delete(key);
  if (attempts.size > 5000) return false;
  const key = signature(ip);
  const existing = attempts.get(key);
  if (!existing) { attempts.set(key, { count: 1, expires: now + 10 * 60 * 1000 }); return true; }
  return ++existing.count <= 5;
}

async function notifyInquiry(inquiry: Inquiry, reference: string) {
  const port = Number(process.env.SMTP_PORT || "465");
  const recipient = process.env.LEAD_NOTIFICATION_EMAIL!;
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.163.com", port, secure: port === 465,
    ...(port === 465 ? {} : { requireTLS: true }),
    auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
    connectionTimeout: 8000, greetingTimeout: 8000, socketTimeout: 12000, dnsTimeout: 5000,
    tls: { minVersion: "TLSv1.2" }, disableFileAccess: true, disableUrlAccess: true, logger: false, debug: false,
  });
  try {
    const result = await transport.sendMail({
      from: { name: "都会急救网站咨询", address: process.env.SMTP_USER! },
      to: recipient, replyTo: { name: inquiry.name, address: inquiry.email },
      subject: `New Training Inquiry - ${inquiry.company || inquiry.name} - ${inquiry.city}`,
      text: inquiryEmailText(inquiry, reference), messageId: `<${reference}@yidaolife.com>`,
    });
    if (!result.accepted.some(address => String(address).toLowerCase() === recipient.toLowerCase())) throw new Error("MAIL_NOT_ACCEPTED");
  } finally { transport.close(); }
}

export async function deliverInquiry(inquiry: Inquiry, token: string) {
  const [timestamp, uuid] = token.split(".");
  const reference = `YD-${uuid}`;
  const day = new Date(Number(timestamp)).toISOString().slice(0, 10);
  const pathname = `leads/${day}/${reference}.json`;
  const fingerprint = signature(JSON.stringify(inquiry));
  const record = {
    schemaVersion: 1, id: reference, ...inquiry, ...inquiry.attribution,
    source: inquiry.attribution.gclid ? "google_ads" : inquiry.attribution.utm_source || "direct_or_unknown",
    consent: true, createdAt: new Date().toISOString(), notification: "pending", fingerprint,
  };
  // Private, immutable create is the idempotency boundary across all serverless instances.
  try {
    await put(pathname, JSON.stringify(record), {
      access: "private", contentType: "application/json", addRandomSuffix: false,
      allowOverwrite: false, abortSignal: AbortSignal.timeout(10000),
    });
  } catch {
    // A retry may follow a lost response or concurrent request. Only accept an identical saved payload.
    try {
      const existing = await get(pathname, { access: "private", useCache: false, abortSignal: AbortSignal.timeout(8000) });
      if (existing?.statusCode === 200) {
        const saved = await new Response(existing.stream).json();
        if (saved.id === reference && saved.fingerprint === fingerprint) return reference;
      }
    } catch { /* Never expose provider responses or customer data. */ }
    throw new Error("INQUIRY_STORAGE_FAILED");
  }

  // A mail failure must not discard a saved lead or invite a duplicate submission.
  let notification = "sent";
  try { await notifyInquiry(inquiry, reference); }
  catch { notification = "failed"; console.error("INQUIRY_NOTIFICATION_FAILED"); }
  try {
    await put(`lead-notifications/${day}/${reference}.json`, JSON.stringify({
      id: reference, status: notification, updatedAt: new Date().toISOString(),
    }), { access: "private", contentType: "application/json", addRandomSuffix: false, allowOverwrite: true, abortSignal: AbortSignal.timeout(5000) });
  } catch { console.error("INQUIRY_NOTIFICATION_STATUS_FAILED"); }
  return reference;
}
