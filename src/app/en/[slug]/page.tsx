import { INQUIRY_EMAIL } from "@/lib/inquiry";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import InquiryForm from "@/components/InquiryForm";
import { ENGLISH_TRAINING } from "@/data/english-training";

export function generateStaticParams() { return Object.keys(ENGLISH_TRAINING).map(slug => ({ slug })); }
export const dynamicParams = false;
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = ENGLISH_TRAINING[slug];
  if (!page) return {};
  return { title: page.title, description: page.description, alternates: { canonical: `/en/${slug}` },
    openGraph: { title: page.title, description: page.description, url: `https://www.yidaolife.com/en/${slug}`, locale: "en_US", type: "website", images: ["/images/g6.jpg"] },
    twitter: { card: "summary_large_image", title: page.title, description: page.description, images: ["/images/g6.jpg"] },
  };
}
export default async function TrainingLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = ENGLISH_TRAINING[slug];
  if (!page) notFound();
  const isCorporate = slug === "corporate-first-aid-training-china";
  const inquiryForm = (
    <div className={`min-w-0 ${isCorporate ? "lg:order-2" : ""}`}>
      <InquiryForm initialLanguage="en" defaultCity={page.city} defaultTraining={page.training} />
    </div>
  );
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Training in China", item: "https://www.yidaolife.com/en" },
      { "@type": "ListItem", position: 2, name: page.title, item: `https://www.yidaolife.com/en/${slug}` },
    ] },
    { "@type": "FAQPage", inLanguage: "en", mainEntity: page.faqs.map(faq => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
  ] };
  return <div lang="en">
    <section className="border-b border-[var(--border)] bg-[var(--surface)]">
      <div className="site-container grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap gap-x-2 text-sm leading-6 text-[var(--muted)]"><Link href="/en" className="underline underline-offset-4">Training in China</Link><span aria-hidden="true">/</span><span aria-current="page">{page.city || (slug.startsWith("corporate") ? "Corporate training" : slug.includes("instructor") ? "Instructor pathway" : "AHA Heartsaver")}</span></nav>
          <p className="text-xs font-semibold tracking-[0.12em] text-[var(--brand)]">{page.eyebrow}</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-[1.13] tracking-tight sm:text-5xl">{page.heading}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">{page.intro}</p>
          <a href="#inquiry" className="button-primary mt-7">{isCorporate ? "Request a team training plan" : "Request training information"}</a>
          {isCorporate && (
            <div className="mt-5 border-l-2 border-[var(--border)] pl-4">
              <p className="text-sm leading-6 text-[var(--muted)]">Share your city in China, team size and preferred dates to start the conversation.</p>
              <p className="mt-3 text-sm font-medium">Direct contact · Huang</p>
              <div className="mt-1 flex flex-col items-start gap-1 text-sm sm:flex-row sm:flex-wrap sm:gap-x-6">
                <a href={`mailto:${INQUIRY_EMAIL}`} className="text-link break-all">{INQUIRY_EMAIL}</a>
                <a href="tel:+8613512456138" className="text-link tabular-nums">+86 135 1245 6138</a>
              </div>
            </div>
          )}
          <p className="mt-4 text-sm leading-6 text-[var(--muted)]">Training takes place in China. Course dates and teaching language are confirmed before booking.</p>
        </div>
        <figure className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
          <div className="relative aspect-[4/3]"><Image src="/images/g6.jpg" alt="Instructor-guided CPR practice with a training manikin" fill priority sizes="(max-width: 1023px) 100vw, 440px" className="object-cover object-[50%_72%]" /></div>
          <figcaption className="px-5 py-4 text-sm text-[var(--muted)]">A view from our training classroom.</figcaption>
        </figure>
      </div>
    </section>
    <div className="site-container grid items-start gap-10 py-12 sm:py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
      {isCorporate && inquiryForm}
      <div className={`min-w-0 space-y-10 ${isCorporate ? "lg:order-1" : ""}`}>
        {page.sections.map(section => <section key={section.title}><h2 className="text-2xl font-semibold leading-snug">{section.title}</h2><p className="mt-4 text-base leading-8 text-[var(--muted)]">{section.text}</p>{section.items && <ul className="mt-4 space-y-3">{section.items.map(item => <li key={item} className="flex gap-3 text-base leading-7"><span aria-hidden="true" className="text-[var(--brand)]">✓</span>{item}</li>)}</ul>}</section>)}
        <p className="border-t border-[var(--border)] pt-6 text-sm leading-7 text-[var(--muted)]">Prefer email? <a className="break-all text-[var(--brand)] underline" href={`mailto:${INQUIRY_EMAIL}`}>{INQUIRY_EMAIL}</a></p>
      </div>
      {!isCorporate && inquiryForm}
    </div>
    <section className="border-t border-[var(--border)] bg-[var(--surface)]"><div className="site-container py-12 sm:py-16"><h2 className="section-title">Before you book</h2><div className="mt-8 grid gap-8 md:grid-cols-2">{page.faqs.map(faq => <article key={faq.question}><h3 className="text-lg font-semibold">{faq.question}</h3><p className="mt-3 text-base leading-7 text-[var(--muted)]">{faq.answer}</p></article>)}</div></div></section>
    <nav aria-label="More training options" className="site-container py-10"><p className="text-sm font-semibold text-[var(--brand)]">EXPLORE TRAINING IN CHINA</p><div className="mt-4 flex flex-wrap gap-x-6 gap-y-4">{Object.entries(ENGLISH_TRAINING).filter(([key]) => key !== slug).map(([key, related]) => <Link key={key} href={`/en/${key}`} className="text-sm underline underline-offset-4">{related.city || (key.startsWith("corporate") ? "Corporate training" : key.includes("instructor") ? "Instructor pathway" : "AHA Heartsaver")}</Link>)}</div></nav>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
  </div>;
}
