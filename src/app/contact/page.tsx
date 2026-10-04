import { INQUIRY_EMAIL } from "@/lib/inquiry";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InquiryForm from "@/components/InquiryForm";

const PHONE = "13512456138";
const PAGE_TITLE = "急救培训报名咨询｜个人课程与企业团体培训";
const PAGE_DESCRIPTION = "联系都会急救黄老师，咨询个人急救课程、城市排期与企业团体培训。可通过在线表单、邮箱、电话或微信沟通，课程、日期、费用及授课语言在报名或预约前确认。";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: "https://www.yidaolife.com/contact",
    type: "website",
    locale: "zh_CN",
  },
};

export default function ContactPage() {
  return (
    <div>
      <section className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="site-container py-12 sm:py-16">
          <p className="eyebrow">都会急救 · 课程咨询</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">个人报名与企业团体培训咨询</h1>
          <p className="section-intro mt-5 max-w-2xl">想为自己学习急救，或为同事安排培训，都可以联系黄老师。个人可咨询所在城市的课程与排期；企业团体可沟通人数、培训地点和课程需求。</p>
          <div className="mt-7 flex flex-wrap gap-3"><a href="#inquiry" className="button-primary">个人报名咨询</a><a href="#inquiry" className="button-secondary">企业团体咨询</a></div>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">两类咨询均可使用下方表单。课程、日期、授课语言和费用在报名或预约前确认。</p>
        </div>
      </section>
      <div className="site-container grid items-start gap-8 py-12 sm:py-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
        <aside><p className="eyebrow">在线咨询 · ONLINE ENQUIRY</p><h2 className="section-title mt-4">留下需求，<br />我们通过邮箱联系你</h2><p className="section-intro mt-5">个人报名或企业团体培训均可通过表单留言。姓名、邮箱和培训城市为必填项；人数、单位、手机号和微信等可选填。英文授课需求请一并说明，以便确认安排。</p><Link href="/enterprise-training" className="text-link mt-4">先了解企业培训内容 →</Link><Link href="/en" lang="en" className="text-link mt-3">Individual & corporate enquiries · English</Link><p className="mt-6 break-all text-base text-[var(--brand)]"><a href={`mailto:${INQUIRY_EMAIL}`}>{INQUIRY_EMAIL}</a></p></aside>
        <InquiryForm />
      </div>
      <section id="contact-main" className="site-container scroll-mt-28 py-12 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl bg-[#1c4036] p-7 text-white sm:p-10">
            <p className="text-xs font-medium tracking-[0.12em] text-[#c4dace]">电话咨询</p><h2 className="mt-5 text-2xl font-semibold">直接与老师沟通</h2><p className="mt-4 text-sm leading-7 text-[#d4e4d9]">了解课程内容、培训安排和企业服务。</p><a href={`tel:${PHONE}`} className="mt-7 inline-flex min-h-12 text-[28px] font-medium tracking-wide sm:text-4xl">{PHONE}</a><p className="mt-3 text-sm text-[#d4e4d9]">联系人：黄老师</p><a href={`tel:${PHONE}`} className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#1c4036]">拨打电话 <span aria-hidden>↗</span></a>
          </article>
          <article className="surface-card p-7 sm:p-10">
            <p className="eyebrow">微信咨询</p><h2 className="mt-5 text-2xl font-semibold">扫码添加黄老师</h2><div className="mt-6 flex flex-col items-start gap-6 sm:flex-row sm:items-center"><Image src="/images/wechat.png" alt="都会急救黄老师微信二维码" width={176} height={176} className="h-44 w-44 shrink-0 rounded-lg border border-[var(--border)]" /><div><p className="text-sm leading-7 text-[var(--muted)]">可通过微信沟通课程安排、报名流程及团队培训需求。</p><p className="mt-3 break-all text-sm font-medium">微信号：HHW20190225</p><p className="mt-2 text-xs leading-6 text-[var(--muted)]">手机端可保存二维码后，在微信中识别。</p></div></div>
          </article>
        </div>
        <div className="mt-10 rounded-xl bg-[var(--surface)] p-6 sm:p-8"><h2 className="text-lg font-semibold">咨询前，可以先告诉我们</h2><ul className="mt-5 grid gap-4 text-sm leading-7 text-[var(--muted)] sm:grid-cols-3"><li><span className="font-medium text-[var(--foreground)]">01 所在城市</span><br />方便匹配培训地点与排期。</li><li><span className="font-medium text-[var(--foreground)]">02 学习需求</span><br />个人报名，或企业团体培训。</li><li><span className="font-medium text-[var(--foreground)]">03 时间与人数</span><br />方便进一步沟通课程安排。</li></ul></div>
      </section>
      <section className="site-container pb-16">
        <h2 className="section-title">也可以先了解</h2>
        <div className="mt-7 grid gap-4 md:grid-cols-3">{[{href:"/programs",title:"课程体系",desc:"查看课程内容、学习方式及适合人群。"},{href:"/cities",title:"城市与排期",desc:"查看当地培训地址与课程日期。"},{href:"/enterprise-training",title:"企业团体培训",desc:"了解机构培训、上门授课与方案安排。"}].map(item=><Link key={item.href} href={item.href} className="surface-card p-6 transition-colors hover:border-[var(--brand)]"><h3 className="flex items-center justify-between text-lg font-semibold">{item.title}<span aria-hidden>↗</span></h3><p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.desc}</p></Link>)}</div>
        <p className="mt-10 text-xs text-[var(--muted)]">都会急救 · 运营机构：天津一道技术服务有限公司</p>
      </section>
    </div>
  );
}
