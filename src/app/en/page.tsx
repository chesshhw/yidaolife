import { INQUIRY_EMAIL } from "@/lib/inquiry";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InquiryForm from "@/components/InquiryForm";
import { ENGLISH_TRAINING } from "@/data/english-training";

export const metadata: Metadata = {
  title: "First Aid, CPR & AED Training in China",
  description: "Enquire about AHA Heartsaver courses and workplace first aid, CPR and AED training in China. Share your city, team size, dates and language needs with Yidaolife.",
  alternates: { canonical: "/en" },
  openGraph: { title: "First Aid, CPR & AED Training in China | 都会急救", description: "Practical first aid training for individuals and teams in China. Ask about course dates, workplace training and language arrangements.", url: "https://www.yidaolife.com/en", locale: "en_US" },
};

export default function EnglishTrainingPage() {
  return (
    <div lang="en">
      <section className="border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="site-container grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold tracking-[0.12em] text-[var(--brand)]">YIDAOLIFE · 都会急救</p>
            <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.13] tracking-tight sm:text-5xl lg:text-[56px]">AHA first aid,<br />CPR & AED training<br /><span className="text-[var(--brand)]">in China.</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">Hands-on CPR, AED and first aid courses for workplaces, schools and individuals. Start with your city and your team’s needs.</p>
            <div className="mt-8 flex flex-wrap gap-3"><a href="#inquiry" className="button-primary">Request training information</a><Link href="/contact#inquiry" className="button-secondary" lang="zh-CN">中文咨询</Link></div>
            <p className="mt-6 text-sm leading-6 text-[var(--muted)]">Beijing · Shanghai · Tianjin · Other cities on request</p>
          </div>
          <figure className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
            <div className="relative aspect-[5/4]"><Image src="/images/g6.jpg?v=bebb2a9ae9b6" alt="An instructor guiding hands-on practice with a CPR training manikin" fill priority sizes="(max-width: 1023px) 100vw, 560px" className="object-cover object-[50%_72%]" /></div>
            <figcaption className="px-5 py-4 text-sm text-[var(--muted)]">From our classroom: practice, guidance and feedback.</figcaption>
          </figure>
        </div>
      </section>
      <section className="site-container py-12 sm:py-16" aria-labelledby="training-options">
        <p className="text-sm font-semibold tracking-widest text-[var(--brand)]">COURSES & TEAMS</p><h2 id="training-options" className="section-title mt-3">Find the right training format</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            { title: "AHA Heartsaver courses", href: "/en/aha-training-china", text: "First aid, CPR and AED learning for people without a medical background. Ask which course and assessment match your needs." },
            { title: "Workplace & group training", href: "/en/corporate-first-aid-training-china", text: "Plan a course around your team, location and training goals. Share your group size and ask about on-site arrangements." },
            { title: "Instructor training", href: "/en/aha-instructor-training-china", text: "Explore an instructor pathway. Confirm eligibility, course requirements, language and availability before planning your training." },
          ].map(item => <article key={item.title} className="surface-card p-6 sm:p-7"><h3 className="text-xl font-semibold leading-7"><Link href={item.href} className="underline decoration-[var(--border)] underline-offset-4">{item.title}</Link></h3><p className="mt-4 text-base leading-7 text-[var(--muted)]">{item.text}</p><Link href={item.href} className="text-link mt-5">Explore training →</Link></article>)}
        </div>
        <nav aria-label="Training cities" className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-base"><span className="font-semibold">Choose your city</span>{Object.entries(ENGLISH_TRAINING).filter(([, page]) => page.city).map(([slug, page]) => <Link key={slug} href={`/en/${slug}`} className="text-[var(--brand)] underline underline-offset-4">{page.city}</Link>)}<span className="text-sm text-[var(--muted)]">Other cities for groups: please enquire.</span></nav>
      </section>
      <div className="border-y border-[var(--border)] bg-[var(--surface)]">
        <div className="site-container grid items-start gap-10 py-12 sm:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <aside className="lg:sticky lg:top-28">
            <p className="text-sm font-semibold tracking-widest text-[var(--brand)]">LET’S PLAN YOUR COURSE</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">A clear brief.<br />A useful conversation.</h2>
            <p className="mt-5 text-base leading-8 text-[var(--muted)]">Let us know where in China you need training, who will attend and what you want to achieve. We will discuss course fit, scheduling and delivery with you.</p>
            <div className="mt-7 border-l-2 border-[var(--brand)] pl-5"><h3 className="text-base font-semibold">Need English-language instruction?</h3><p className="mt-2 text-base leading-7 text-[var(--muted)]">Mention it in your enquiry. Teaching language, instructor availability, course materials and dates need to be confirmed before booking.</p></div>
            <div className="mt-8 border-t border-[var(--border)] pt-6"><p className="text-sm font-medium">Direct contact</p><a href={`mailto:${INQUIRY_EMAIL}`} className="mt-2 block break-all text-lg text-[var(--brand)] underline underline-offset-4">{INQUIRY_EMAIL}</a><a href="tel:+8613512456138" className="mt-3 inline-flex min-h-11 items-center text-lg text-[var(--brand)]">+86 135 1245 6138</a><p className="mt-1 text-sm text-[var(--muted)]">Contact: Huang / 黄老师</p></div>
          </aside>
          <InquiryForm initialLanguage="en" />
        </div>
      </div>
      <section className="site-container py-12 sm:py-16" aria-labelledby="questions">
        <h2 id="questions" className="section-title">Before you enquire</h2>
        <div className="mt-7 grid gap-8 md:grid-cols-3">
          <article><h3 className="text-lg font-semibold">Can you train at our workplace?</h3><p className="mt-3 text-base leading-7 text-[var(--muted)]">On-site training can be discussed based on the city, venue, team size and course. Include these details in your message.</p></article>
          <article><h3 className="text-lg font-semibold">Can I enquire without WeChat?</h3><p className="mt-3 text-base leading-7 text-[var(--muted)]">Yes. An email address is enough for us to reply. Phone and WeChat are optional.</p></article>
          <article><h3 className="text-lg font-semibold">Does an enquiry reserve a place?</h3><p className="mt-3 text-base leading-7 text-[var(--muted)]">No. Course availability, language, fees and any certification requirements will be discussed before a booking is confirmed.</p></article>
        </div>
      </section>
    </div>
  );
}
