import { ATTRIBUTION_KEYS } from "./inquiry";
const KEY = "yidaolife-attribution-v1";
export type Attribution = { landingPage: string; values: Record<string, string> };
let memory: Attribution | null = null;

function validAttribution(value: unknown): value is Attribution {
  if (!value || typeof value !== "object") return false;
  const item = value as Attribution;
  return typeof item.landingPage === "string" && /^\/[a-z0-9/-]{0,160}$/.test(item.landingPage) && !item.landingPage.startsWith("//") && Boolean(item.values) && ATTRIBUTION_KEYS.every(key => typeof item.values[key] === "string" && item.values[key].length <= 200 && !/[\u0000-\u001f\u007f]/.test(item.values[key]));
}
export function captureAttribution(): Attribution {
  const current = new URL(window.location.href);
  let previous: Attribution | null = memory;
  try { const saved: unknown = JSON.parse(sessionStorage.getItem(KEY) || "null"); if (validAttribution(saved)) previous = saved; } catch { /* Storage may be blocked. */ }
  const hasCampaign = ATTRIBUTION_KEYS.some(key => current.searchParams.has(key));
  if (previous && !hasCampaign) return previous;
  const values: Record<string, string> = {};
  for (const key of ATTRIBUTION_KEYS) values[key] = (current.searchParams.get(key) || "").replace(/[\u0000-\u001f\u007f]/g, "").slice(0, 200);
  const path = current.pathname;
  const attribution = { landingPage: /^\/[a-z0-9/-]{0,160}$/.test(path) && !path.startsWith("//") ? path : "/", values };
  memory = attribution;
  try { sessionStorage.setItem(KEY, JSON.stringify(attribution)); } catch { /* Submission works without session storage. */ }
  return attribution;
}
