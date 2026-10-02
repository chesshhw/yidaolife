import Link from "next/link";

export default function HomePromoVideo() {
  return (
    <section
      id="aha-course-video"
      className="section-space scroll-mt-24 border-b border-[var(--border)]"
      aria-labelledby="aha-course-video-heading"
    >
      <div className="site-container">
        <div className="mx-auto max-w-[960px]">
          <p className="eyebrow">中心与课程介绍</p>
          <h2 id="aha-course-video-heading" className="section-title mt-3">
            90秒，走进都会急救课堂
          </h2>
          <p id="aha-course-video-description" className="section-intro mt-4">
            了解中心授权、AHA课程与真实课堂实操，也看看我们如何为企业和团队提供上门培训。
          </p>

          <figure className="mt-8">
            <video
              controls
              playsInline
              preload="none"
              width={1280}
              height={720}
              poster="/videos/aha-course-20261002-poster.jpg"
              aria-label="都会急救 AHA课程宣传片，时长90秒"
              aria-describedby="aha-course-video-description"
              className="aspect-video w-full rounded-xl bg-[#142e2b] shadow-[0_12px_40px_-24px_rgba(28,48,45,0.3)]"
            >
              <source src="/videos/aha-course-20261002.mp4" type="video/mp4" />
              <track
                kind="captions"
                src="/videos/aha-course-20261002-zh.vtt"
                srcLang="zh"
                label="中文字幕"
              />
              您的浏览器暂不支持视频播放，
              <a href="/videos/aha-course-20261002.mp4">点击观看宣传片</a>。
            </video>
            <figcaption className="mt-3 text-sm leading-7 text-[var(--muted)]">
              中心授权 · 实操教学 · 企业上门培训
            </figcaption>
          </figure>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="button-primary">
              咨询课程 <span aria-hidden>↗</span>
            </Link>
            <Link href="/enterprise-training" className="button-secondary">
              企业上门培训 <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
