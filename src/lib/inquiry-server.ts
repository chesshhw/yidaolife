import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import nodemailer from "nodemailer";
import { INQUIRY_EMAIL, inquiryEmailText, type Inquiry } from "./inquiry";

// Fixed destination and authenticated From prevent this endpoint becoming an open relay.
export function mailConfigured() {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
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

// Best-effort per-instance protection, not a distributed quota. No raw IPs or form data retained.
const attempts = new Map<string, { count: number; expires: number }>();
const usedTokens = new Map<string, { reference: string; expires: number; state: "pending" | "sent" | "failed" }>();

export function allowInquiryAttempt(ip: string, now = Date.now()) {
  for (const [key, value] of attempts) if (value.expires <= now) attempts.delete(key);
  if (attempts.size > 5000) return false;
  const key = signature(ip);
  const existing = attempts.get(key);
  if (!existing) { attempts.set(key, { count: 1, expires: now + 10 * 60 * 1000 }); return true; }
  return ++existing.count <= 5;
}

export async function deliverInquiry(inquiry: Inquiry, token: string) {
  const now = Date.now();
  for (const [key, item] of usedTokens) if (item.expires <= now) usedTokens.delete(key);
  const key = signature(token);
  const previous = usedTokens.get(key);
  if (previous?.state === "sent") return previous.reference;
  if (previous) throw new Error("INQUIRY_ALREADY_ATTEMPTED");
  if (usedTokens.size > 5000) throw new Error("INQUIRY_CAPACITY");
  const reference = `YD-${randomUUID()}`;
  const record = { reference, expires: now + 2 * 60 * 60 * 1000, state: "pending" as "pending" | "sent" | "failed" };
  usedTokens.set(key, record);
  const port = Number(process.env.SMTP_PORT || "465");
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.163.com",
    port,
    secure: port === 465,
    requireTLS: true,
    auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 12000,
    dnsTimeout: 5000,
    tls: { minVersion: "TLSv1.2" },
    disableFileAccess: true,
    disableUrlAccess: true,
    logger: false,
    debug: false,
  });
  try {
    const result = await transport.sendMail({
      from: { name: "都会急救网站咨询", address: process.env.SMTP_USER! },
      to: INQUIRY_EMAIL,
      replyTo: { name: inquiry.name, address: inquiry.email },
      subject: `[都会急救咨询] ${inquiry.company || inquiry.name}`,
      text: inquiryEmailText(inquiry, reference),
      messageId: `<${reference}@yidaolife.com>`,
    });
    if (!result.accepted.some(address => String(address).toLowerCase() === INQUIRY_EMAIL)) throw new Error("MAIL_NOT_ACCEPTED");
    record.state = "sent";
    return reference;
  } catch {
    record.state = "failed";
    // Do not log customer details, credentials or raw SMTP responses.
    throw new Error("INQUIRY_DELIVERY_FAILED");
  } finally {
    transport.close();
  }
}
