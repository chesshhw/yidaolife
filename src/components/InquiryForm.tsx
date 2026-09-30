"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { INQUIRY_EMAIL } from "@/lib/inquiry";

const copy = {
  en: {
    heading: "Tell us about your training needs",
    intro: "For an individual course or a team enquiry, share your city, preferred dates and group size in the message.",
    note: "* Required. Phone, WeChat and company name are optional.",
    name: "Full name", company: "Company / Organization", email: "Email", phone: "Phone with country code", wechat: "WeChat ID", message: "Message",
    consent: "I agree that 都会急救 may use these details to reply to this enquiry.",
    privacy: "How we use your information", submit: "Send enquiry", sending: "Sending…", loading: "Checking availability…",
    unavailable: "Online enquiries are temporarily unavailable. Please email us directly; your form has not been sent.",
    error: "We could not confirm delivery. Your entries are still here. Please email us directly if needed; avoid repeated submissions.",
    invalid: "Please check your details. Use a valid email and include a country code if entering a phone number.",
    expired: "This form has expired. Reload the form connection below, then submit again. Your entries will be kept.",
    limited: "Too many attempts. Please wait ten minutes or email us directly.",
    retry: "Reconnect form", fallback: "Email us directly", messagePlaceholder: "City in China, number of participants, preferred dates, course and language requirements…",
  },
  zh: {
    heading: "告诉我们你的培训需求",
    intro: "个人报名或企业团体培训均可咨询。请在留言中说明城市、人数、计划时间及授课语言需求。",
    note: "* 为必填项。手机号、微信和单位名称可选填。",
    name: "姓名", company: "单位名称", email: "邮箱", phone: "手机号（含国际区号）", wechat: "微信", message: "留言",
    consent: "我同意都会急救使用上述信息回复本次咨询。",
    privacy: "了解信息使用方式", submit: "提交咨询", sending: "正在发送…", loading: "正在检查表单连接…",
    unavailable: "在线表单暂时不可用，请直接发送邮件联系。当前填写的内容尚未发送。",
    error: "未能确认邮件发送成功，填写内容已保留。请通过邮箱直接联系，避免连续重复提交。",
    invalid: "请检查填写内容，使用有效邮箱；填写电话时请带上国际区号。",
    expired: "表单连接已过期，请点击下方重新连接后提交，已填写内容会保留。",
    limited: "提交过于频繁，请十分钟后重试，或直接发送邮件。",
    retry: "重新连接表单", fallback: "直接发送邮件", messagePlaceholder: "例如：上海，企业员工 20 人，计划下月培训，需要 CPR / AED 课程，希望了解英文授课安排…",
  },
};

export default function InquiryForm({ initialLanguage = "zh" }: { initialLanguage?: "en" | "zh" }) {
  const [language, setLanguage] = useState(initialLanguage);
  const [token, setToken] = useState("");
  const [availability, setAvailability] = useState<"loading" | "ready" | "unavailable">("loading");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const errorRef = useRef<HTMLParagraphElement>(null);
  const submitting = useRef(false);
  const router = useRouter();
  const t = copy[language];
  const loadConnection = async () => {
    setAvailability("loading"); setError("");
    try {
      const res = await fetch("/api/inquiry", { cache: "no-store", signal: AbortSignal.timeout(10000) });
      const data = await res.json();
      if (!res.ok || !data.ready || !data.token) throw new Error();
      setToken(data.token); setAvailability("ready");
    } catch { setToken(""); setAvailability("unavailable"); }
  };
  useEffect(() => { void loadConnection(); }, []);
  useEffect(() => { if (error) errorRef.current?.focus(); }, [error]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current || !token || availability !== "ready") return;
    const form = new FormData(event.currentTarget);
    const payload = { name: form.get("name"), company: form.get("company"), email: form.get("email"), phone: form.get("phone"), wechat: form.get("wechat"), message: form.get("message"), website: form.get("website"), consent: form.get("consent") === "on", language, token, page: initialLanguage === "en" ? "/en" : "/contact" };
    submitting.current = true; setBusy(true); setError("");
    try {
      const res = await fetch("/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), signal: AbortSignal.timeout(30000) });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        if (data.error === "EXPIRED") setError("expired");
        else if (data.error === "INVALID") setError("invalid");
        else if (res.status === 429) setError("limited");
        else if (res.status === 503) { setAvailability("unavailable"); setError("unavailable"); }
        else setError("error");
        return;
      }
      // Conversion only after server acknowledgement. Never pass contact details to analytics.
      try {
        const analytics = window as typeof window & { gtag?: (...args: unknown[]) => void };
        analytics.gtag?.("event", "generate_lead", { form_name: "training_inquiry", form_language: language });
      } catch { /* Analytics must never prevent a successful enquiry. */ }
      router.push(`/thank-you?lang=${language}`);
      return;
    } catch { setError("error"); }
    finally { setBusy(false); submitting.current = false; }
  }

  const labels = [
    { key: "name", required: true, auto: "name", max: 100 },
    { key: "company", required: false, auto: "organization", max: 200 },
    { key: "email", required: true, auto: "email", max: 254 },
    { key: "phone", required: false, auto: "tel", max: 40 },
    { key: "wechat", required: false, auto: "off", max: 80 },
  ] as const;
  return (
    <section id="inquiry" lang={language === "en" ? "en" : "zh-CN"} aria-labelledby="inquiry-title" className="scroll-mt-28 rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[0_16px_60px_-40px_rgba(28,64,54,0.4)] sm:p-9">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm font-semibold tracking-widest text-[var(--brand)]">TRAINING ENQUIRY</p>
        <div role="group" aria-label="Form language / 表单语言" className="inline-flex rounded-lg border border-[var(--border)] p-1">
          {(["en", "zh"] as const).map(lang => <button key={lang} type="button" onClick={() => setLanguage(lang)} aria-pressed={language === lang} className={`min-h-10 rounded-md px-3 text-sm ${language === lang ? "bg-[var(--brand)] text-white" : "text-[var(--muted)]"}`}>{lang === "en" ? "English" : "中文"}</button>)}
        </div>
      </div>
      <h2 id="inquiry-title" className="text-2xl font-semibold leading-snug">{t.heading}</h2>
      <p className="mt-3 text-base leading-7 text-[var(--muted)]">{t.intro}</p>
      <p className="mt-4 text-sm text-[var(--muted)]">{t.note}</p>
      <form onSubmit={submit} className="mt-7" aria-busy={busy}>
        <fieldset disabled={busy} className="grid min-w-0 gap-5 sm:grid-cols-2">
          <legend className="sr-only">{t.heading}</legend>
          {labels.map(({ key, required, auto, max }) => <div key={key} className={key === "wechat" ? "sm:col-span-2" : ""}>
            <label htmlFor={`inquiry-${key}`} className="block text-sm font-medium">{t[key]}{required && " *"}<span lang={language === "en" ? "zh-CN" : "en"} className="ml-2 font-normal text-[var(--muted)]">{copy[language === "en" ? "zh" : "en"][key]}</span></label>
            <input id={`inquiry-${key}`} name={key} type={key === "email" ? "email" : key === "phone" ? "tel" : "text"} autoComplete={auto} required={required} maxLength={max} placeholder={key === "phone" ? "+86 … / +65 … / +1 …" : undefined} className="mt-2 min-h-12 w-full min-w-0 rounded-lg border border-[#bccac2] bg-white px-3 py-3 text-base text-[var(--foreground)] disabled:bg-[var(--surface)]" />
          </div>)}
          <div className="sm:col-span-2"><label htmlFor="inquiry-message" className="block text-sm font-medium">{t.message} *<span lang={language === "en" ? "zh-CN" : "en"} className="ml-2 font-normal text-[var(--muted)]">{copy[language === "en" ? "zh" : "en"].message}</span></label><textarea id="inquiry-message" name="message" required maxLength={3000} rows={5} placeholder={t.messagePlaceholder} className="mt-2 w-full min-w-0 resize-y rounded-lg border border-[#bccac2] px-3 py-3 text-base leading-7" /></div>
          <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true"><label htmlFor="inquiry-website">Leave this empty<input id="inquiry-website" name="website" autoComplete="off" tabIndex={-1} /></label></div>
          <div className="sm:col-span-2"><label className="flex items-start gap-3 text-sm leading-6"><input name="consent" type="checkbox" required className="mt-1 h-5 w-5 shrink-0 accent-[#245b4b]" /><span>{t.consent} <Link href="/privacy" target="_blank" rel="noopener" className="text-[var(--brand)] underline underline-offset-4">{t.privacy}</Link></span></label></div>
        </fieldset>
        {error && <p ref={errorRef} tabIndex={-1} role="alert" className="mt-5 rounded-lg bg-red-50 p-4 text-sm leading-6 text-red-800">{t[error as "error" | "invalid" | "expired" | "limited" | "unavailable"]}</p>}
        <div role="status" className="mt-5 text-sm leading-6 text-[var(--muted)]">{availability === "loading" ? t.loading : availability === "unavailable" ? t.unavailable : ""}</div>
        <button type="submit" disabled={busy || availability !== "ready"} className="button-primary mt-4 w-full text-base disabled:cursor-not-allowed disabled:opacity-50">{busy ? t.sending : t.submit}</button>
        {(availability === "unavailable" || error === "expired") && <button type="button" onClick={loadConnection} className="text-link mt-3">{t.retry}</button>}
        <p className="mt-5 break-words text-center text-sm leading-6 text-[var(--muted)]">{t.fallback}: <a href={`mailto:${INQUIRY_EMAIL}`} className="text-[var(--brand)] underline underline-offset-4">{INQUIRY_EMAIL}</a></p>
        <noscript><p>请启用 JavaScript 提交表单，或直接发送邮件。Enable JavaScript or email us directly.</p></noscript>
      </form>
    </section>
  );
}
