import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "咨询提交结果 | Enquiry confirmation", robots: { index: false, follow: false }, alternates: { canonical: "/thank-you" } };

// No analytics conversion here: direct visits or reloads must not create leads.
export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const english = (await searchParams).lang === "en";
  return <section lang={english ? "en" : "zh-CN"} className="site-container max-w-3xl py-16 sm:py-24">
    <p className="text-sm font-semibold tracking-widest text-[var(--brand)]">都会急救 · YIDAOLIFE</p>
    <h1 className="mt-5 text-4xl font-semibold leading-tight">{english ? "Thank you for your enquiry." : "感谢你的咨询。"}</h1>
    <p className="mt-6 text-lg leading-8 text-[var(--muted)]">{english ? "If you arrived here after submitting the form, our mail server accepted your enquiry for delivery. We will review your request and reply using your contact details." : "如果你是提交表单后进入此页，邮件服务器已接受本次咨询邮件。我们会查看需求并通过你提供的联系方式回复。"}</p>
    <p className="mt-4 text-base leading-7 text-[var(--muted)]">{english ? "An enquiry does not reserve a course place. Dates, fees and teaching language will be confirmed separately." : "提交咨询不代表已预订课程，时间、费用和授课语言需另行确认。"}</p>
    <a href="mailto:13512456138@163.com" className="mt-6 block break-all text-lg text-[var(--brand)] underline underline-offset-4">13512456138@163.com</a>
    <Link href={english ? "/en" : "/contact"} className="button-primary mt-8">{english ? "Back to training information" : "返回咨询页面"}</Link>
  </section>;
}
