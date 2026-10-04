import { analyticsCity, TRAINING_CITIES, TRAINING_TYPES } from "./inquiry";

export const GA_MEASUREMENT_ID = "G-8B4KHDJH9E";
const PUBLIC_HOSTS = new Set(["www.yidaolife.com", "yidaolife.com"]);
let deploymentConfigured = false;
let deploymentAllowed = false;
type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  __yidaolifeAnalyticsReady?: boolean;
};
export type AnalyticsEvent = "contact_click" | "inquiry_cta_click" | "wechat_copy" | "form_start" | "form_submit" | "form_error" | "generate_lead";
const EVENT_NAMES: Record<AnalyticsEvent, string> = {
  contact_click: "contact_click", inquiry_cta_click: "inquiry_cta_click", wechat_copy: "wechat_copy",
  // Separate the enquiry funnel from GA enhanced-measurement form events.
  form_start: "inquiry_form_start", form_submit: "inquiry_form_submit", form_error: "inquiry_form_error", generate_lead: "generate_lead",
};
const PLACEMENTS = ["global_link", "floating_contact", "inquiry_form", "header", "footer", "hero", "content"];
const ERROR_TYPES = ["invalid", "expired", "rate_limit", "unavailable", "network", "server", "unknown"];
const SAFE_PATHS = new Set([
  "/", "/contact", "/en", "/thank-you", "/en/thank-you", "/privacy", "/about", "/cities", "/blog", "/programs", "/instructor", "/enterprise-training",
  "/program/enterprise-first-aid-training", "/tianjin-wma-wilderness-first-aid-training",
  "/en/corporate-first-aid-training-china", "/en/aha-training-china", "/en/aha-instructor-training-china",
  ...TRAINING_CITIES.map(city => `/en/${city.name.toLowerCase().replace(/['’ ]/g, "")}-first-aid-training`),
]);

export function configureAnalyticsDeployment(environment?: string) {
  // RootLayout supplies VERCEL_ENV from the server, including for custom preview domains.
  deploymentAllowed = !environment || environment === "production";
  deploymentConfigured = true;
}

export function analyticsEnabled() {
  return deploymentConfigured && deploymentAllowed && process.env.NODE_ENV === "production" && typeof window !== "undefined" && window.location.protocol === "https:" && PUBLIC_HOSTS.has(window.location.hostname);
}

// Only fixed public routes or aggregate route groups enter custom event fields.
// Never copy a query, hash, arbitrary slug, link target, or visitor-entered text.
export function analyticsPath(value: unknown) {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) return "other";
  const path = value.split(/[?#]/, 1)[0].replace(/\/$/, "") || "/";
  if (SAFE_PATHS.has(path)) return path;
  if (path.startsWith("/blog/")) return "/blog";
  if (path.startsWith("/cities/") || path.startsWith("/city/")) return "/cities";
  if (path.startsWith("/en/")) return "/en";
  return "other";
}

function pageType(path: string) {
  if (path === "/") return "home";
  if (path === "/contact") return "contact";
  if (path.includes("thank-you")) return "thank_you";
  if (path === "/en" || path.startsWith("/en/")) return "english_training";
  if (path === "/blog") return "blog";
  if (path === "/cities") return "city";
  if (["/programs", "/instructor", "/enterprise-training", "/program/enterprise-first-aid-training", "/tianjin-wma-wilderness-first-aid-training"].includes(path)) return "training";
  return "other";
}

export function initializeAnalytics() {
  if (!analyticsEnabled()) return false;
  try {
    const browser = window as AnalyticsWindow;
    if (browser.__yidaolifeAnalyticsReady) return true;
    browser.dataLayer = browser.dataLayer || [];
    browser.gtag = browser.gtag || function () { browser.dataLayer!.push(arguments); };
    browser.gtag("js", new Date());
    // Keep GA's normal page-view and engagement behavior; no synthetic heartbeat.
    browser.gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });
    browser.__yidaolifeAnalyticsReady = true;
    return true;
  } catch { return false; }
}

/** Returns true when safely queued, not a guarantee of GA delivery or a customer conversion. */
export function trackAnalyticsEvent(event: AnalyticsEvent, params: Record<string, unknown> = {}) {
  if (!analyticsEnabled() || !Object.prototype.hasOwnProperty.call(EVENT_NAMES, event)) return false;
  try {
    const safe: Record<string, string> = { page_type: pageType(analyticsPath(window.location.pathname)) };
    if (typeof params.placement === "string" && PLACEMENTS.includes(params.placement)) safe.placement = params.placement;
    if (event === "contact_click") {
      if (!["phone", "email", "wechat"].includes(String(params.method))) return false;
      safe.method = String(params.method);
    } else if (event === "wechat_copy") safe.method = "wechat";
    if (["form_start", "form_submit", "form_error", "generate_lead"].includes(event)) {
      if (["english_training_inquiry", "chinese_training_inquiry"].includes(String(params.form_name))) safe.form_name = String(params.form_name);
      if (params.form_language === "en" || params.form_language === "zh") safe.form_language = params.form_language;
      if (typeof params.training_type === "string") safe.training_type = TRAINING_TYPES.find(type => type === params.training_type) || "Not specified";
      if (params.city !== undefined) safe.city = analyticsCity(params.city);
      if (params.landing_page !== undefined) safe.landing_page = analyticsPath(params.landing_page);
      if (event === "form_error") safe.error_type = ERROR_TYPES.includes(String(params.error_type)) ? String(params.error_type) : "unknown";
    }
    if (!initializeAnalytics()) return false;
    (window as AnalyticsWindow).gtag!("event", EVENT_NAMES[event], safe);
    return true;
  } catch { return false; }
}

/** Delegation also covers links rendered after navigation. No prevention or delay of navigation. */
export function installAnalyticsClickTracking() {
  if (!analyticsEnabled()) return () => {};
  const onClick = (event: MouseEvent) => {
    try {
      if (event.button !== 0 || !(event.target instanceof Element)) return;
      const link = event.target.closest("a[href]");
      if (!link || link.closest("[data-analytics-ignore]")) return;
      const href = link.getAttribute("href") || "";
      const placement = link.closest("footer") ? "footer" : link.closest("header") ? "header" : "global_link";
      if (/^tel:/i.test(href)) trackAnalyticsEvent("contact_click", { method: "phone", placement });
      else if (/^mailto:/i.test(href)) trackAnalyticsEvent("contact_click", { method: "email", placement });
      else {
        const target = new URL(href, window.location.href);
        if (target.protocol === "https:" && PUBLIC_HOSTS.has(target.hostname) && (target.hash === "#inquiry" || target.pathname === "/contact")) {
          trackAnalyticsEvent("inquiry_cta_click", { placement });
        }
      }
    } catch { /* Analytics must never interfere with navigation. */ }
  };
  document.addEventListener("click", onClick, true);
  return () => document.removeEventListener("click", onClick, true);
}
