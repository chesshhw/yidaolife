import { createHash, createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { get, put } from "@vercel/blob";
import { INQUIRY_EMAIL, inquiryEmailText, type Inquiry } from "./inquiry";

const SES_REGION = "ap-hongkong";
const SES_TEMPLATE_ID = 221198;
const SES_FROM = "Yidaolife Training <leads@notify.yidaolife.com>";

// Destination is server configuration, never visitor input.
export function mailConfigured() {
  return Boolean(process.env.TENCENTCLOUD_SECRET_ID && process.env.TENCENTCLOUD_SECRET_KEY);
}

export function inquiryConfigured() {
  return mailConfigured() && Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

function signature(payload: string) {
  return createHmac("sha256", process.env.INQUIRY_SIGNING_SECRET || process.env.TENCENTCLOUD_SECRET_KEY || "").update(payload).digest("hex");
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

// Only allowlisted diagnostic fields may leave the mailer. Provider errors may contain
// addresses or message content, so never log the error/response itself.
export function inquiryMailFailure(error: unknown) {
  const source = error && typeof error === "object" ? error as Record<string, unknown> : {};
  const code = typeof source.code === "string" && /^[A-Za-z][A-Za-z0-9_.-]{0,80}$/.test(source.code) ? source.code : "UNKNOWN";
  return { code, command: "SEND_EMAIL" };
}

async function notifyInquiry(inquiry: Inquiry, reference: string) {
  const secretId = process.env.TENCENTCLOUD_SECRET_ID!.trim();
  const secretKey = process.env.TENCENTCLOUD_SECRET_KEY!.trim();
  const host = "ses.tencentcloudapi.com";
  const timestamp = Math.floor(Date.now() / 1000);
  const date = new Date(timestamp * 1000).toISOString().slice(0, 10);
  const body = JSON.stringify({
    FromEmailAddress: SES_FROM,
    Destination: [INQUIRY_EMAIL],
    ReplyToAddresses: inquiry.email,
    Subject: `New Training Inquiry - ${reference}`,
    Template: { TemplateID: SES_TEMPLATE_ID, TemplateData: JSON.stringify({ lead_details: inquiryEmailText(inquiry, reference) }) },
  });
  const contentType = "application/json; charset=utf-8";
  const canonicalHeaders = `content-type:${contentType}\nhost:${host}\n`;
  const signedHeaders = "content-type;host";
  // TC3 canonical request uses SHA-256 for its payload digest.
  const payloadHash = createHash("sha256").update(body).digest("hex");
  const canonicalRequest = `POST\n/\n\n${canonicalHeaders}\n${signedHeaders}\n${payloadHash}`;
  const credentialScope = `${date}/ses/tc3_request`;
  const stringToSign = `TC3-HMAC-SHA256\n${timestamp}\n${credentialScope}\n${createHash("sha256").update(canonicalRequest).digest("hex")}`;
  const hmac = (key: string | Buffer, value: string) => createHmac("sha256", key).update(value).digest();
  const secretDate = hmac(`TC3${secretKey}`, date);
  const secretService = hmac(secretDate, "ses");
  const secretSigning = hmac(secretService, "tc3_request");
  const signatureHex = hmac(secretSigning, stringToSign).toString("hex");
  const authorization = `TC3-HMAC-SHA256 Credential=${secretId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signatureHex}`;

  const response = await fetch(`https://${host}/`, {
    method: "POST",
    headers: {
      Authorization: authorization,
      "Content-Type": contentType,
      Host: host,
      "X-TC-Action": "SendEmail",
      "X-TC-Region": SES_REGION,
      "X-TC-Timestamp": String(timestamp),
      "X-TC-Version": "2020-10-02",
    },
    body,
    signal: AbortSignal.timeout(12000),
  });
  const result = await response.json() as {
    Response?: { MessageId?: string; RequestId?: string; Error?: { Code?: string } };
  };
  if (!response.ok || result.Response?.Error || !result.Response?.MessageId) {
    const error = new Error("SES_SEND_FAILED") as Error & { code?: string };
    error.code = result.Response?.Error?.Code || `HTTP_${response.status}`;
    throw error;
  }
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
    });
  }
  try {
    await put(`lead-notifications/${day}/${reference}.json`, JSON.stringify({
      id: reference, status: notification, ...(failure ? { failure } : {}), updatedAt: new Date().toISOString(),
    }), { access: "private", contentType: "application/json", addRandomSuffix: false, allowOverwrite: true, abortSignal: AbortSignal.timeout(5000) });
  } catch { console.error("INQUIRY_NOTIFICATION_STATUS_FAILED"); }
  return reference;
}
