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

// Only allowlisted diagnostic fields may leave the mailer. SMTP errors can contain
// credentials, addresses and message content, so never log the error/response itself.
export function inquiryMailFailure(error: unknown) {
  const source = error && typeof error === "object" ? error as Record<string, unknown> : {};
  const codes = ["EAUTH", "ETIMEDOUT", "ESOCKET", "ECONNECTION", "EDNS", "EENVELOPE", "EMESSAGE", "ETLS", "ECONNRESET", "ECONNREFUSED", "ENOTFOUND", "EAI_AGAIN"];
  const code = typeof source.code === "string" && codes.includes(source.code) ? source.code : "UNKNOWN";
  const verb = typeof source.command === "string" ? source.command.split(/[\s:]/, 1)[0].toUpperCase() : "";
  const command = ["AUTH", "CONN", "EHLO", "HELO", "STARTTLS", "MAIL", "RCPT", "DATA", "API"].includes(verb) ? verb : "UNKNOWN";
  const responseCode = typeof source.responseCode === "number" && Number.isInteger(source.responseCode) && source.responseCode >= 400 && source.responseCode <= 599 ? source.responseCode : undefined;
  const method = typeof source.command === "string" ? source.command.split(/\s+/)[1] : undefined;
  const authMethod = command === "AUTH" && method && ["PLAIN", "LOGIN", "CRAM-MD5", "XOAUTH2"].includes(method) ? method : undefined;
  const response = typeof source.response === "string" ? source.response.toLowerCase() : "";
  const reason = response.includes("user has no permission") ? "USER_HAS_NO_PERMISSION"
    : response.includes("invalid user") ? "INVALID_USER"
    : response.includes("authentication failed") ? "AUTHENTICATION_FAILED"
    : response.includes("user is locked") || response.includes("account locked") ? "ACCOUNT_LOCKED"
    : "UNCLASSIFIED";
  return { code, command, reason, ...(authMethod ? { authMethod } : {}), ...(responseCode === undefined ? {} : { responseCode }) };
}

async function notifyInquiry(inquiry: Inquiry, reference: string) {
  const port = Number(process.env.SMTP_PORT || "465");
  const recipient = process.env.LEAD_NOTIFICATION_EMAIL!.trim();
  const smtpUser = process.env.SMTP_USER!.trim();
  // Retry NetEase with its alternate supported SMTP AUTH mechanism after PLAIN was rejected.
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.163.com", port, secure: port === 465,
    authMethod: (process.env.SMTP_HOST || "smtp.163.com").toLowerCase() === "smtp.163.com" ? "LOGIN" : undefined,
    ...(port === 465 ? {} : { requireTLS: true }),
    auth: { user: smtpUser, pass: process.env.SMTP_PASS!.trim() },
    connectionTimeout: 8000, greetingTimeout: 8000, socketTimeout: 12000, dnsTimeout: 5000,
    tls: { minVersion: "TLSv1.2" }, disableFileAccess: true, disableUrlAccess: true, logger: false, debug: false,
  });
  try {
    const result = await transport.sendMail({
      from: { name: "都会急救网站咨询", address: smtpUser },
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
  let failure: ReturnType<typeof inquiryMailFailure> | undefined;
  try {
    await notifyInquiry(inquiry, reference);
    console.info("INQUIRY_NOTIFICATION_ACCEPTED", { reference });
  } catch (error) {
    notification = "failed";
    failure = inquiryMailFailure(error);
    console.error("INQUIRY_NOTIFICATION_FAILED", {
      reference, ...failure,
      smtpUserIsEmail: /^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+$/.test(process.env.SMTP_USER!.trim()),
      smtpUserMatchesRecipient: process.env.SMTP_USER!.trim().toLowerCase() === process.env.LEAD_NOTIFICATION_EMAIL!.trim().toLowerCase(),
    });
  }
  try {
    await put(`lead-notifications/${day}/${reference}.json`, JSON.stringify({
      id: reference, status: notification, ...(failure ? { failure } : {}), updatedAt: new Date().toISOString(),
    }), { access: "private", contentType: "application/json", addRandomSuffix: false, allowOverwrite: true, abortSignal: AbortSignal.timeout(5000) });
  } catch { console.error("INQUIRY_NOTIFICATION_STATUS_FAILED"); }
  return reference;
}
