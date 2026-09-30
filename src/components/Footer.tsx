import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[#f5f7f4] pb-24 pt-14 sm:pb-12">
      <div className="site-container">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link href="/" className="text-2xl font-semibold tracking-[0.08em]">都会急救</Link>
            <p className="mt-4 max-w-sm text-sm leading-7 text-[var(--muted)]">从课堂中的每一次练习开始，<br />让急救技能成为生活与工作中的一份准备。</p>
            <p className="mt-4 text-xs leading-6 text-[var(--muted)]">运营机构：天津一道技术服务有限公司</p>
          </div>
          <nav aria-label="页脚导航">
            <p className="text-sm font-semibold">课程与服务</p>
            <div className="mt-3 grid grid-cols-2 gap-x-5">
              {[{href:"/programs",label:"课程体系"},{href:"/cities",label:"开课城市"},{href:"/enterprise-training",label:"企业培训"},{href:"/blog",label:"急救知识"},{href:"/about",label:"关于我们"},{href:"/contact",label:"联系我们"}].map(({href,label}) => <Link key={href} href={href} className="flex min-h-11 items-center text-sm text-[var(--muted)] hover:text-[var(--brand)]">{label}</Link>)}
            </div>
          </nav>
          <div>
            <p className="text-sm font-semibold">课程咨询 · 黄老师</p>
            <a href="tel:13512456138" className="mt-3 inline-flex min-h-11 items-center text-2xl font-medium tabular-nums tracking-wide text-[var(--brand)]">13512456138</a>
            <p className="mt-1 text-sm text-[var(--muted)]">个人报名 / 企业培训 / 城市排期</p>
            <Link href="/contact#contact-main" className="text-link mt-2">查看微信联系方式 <span aria-hidden>↗</span></Link>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap justify-between gap-3 border-t border-[var(--border)] pt-6 text-xs leading-6 text-[var(--muted)]">
          <p>© {new Date().getFullYear()} 都会急救 · 天津一道技术服务有限公司</p>
          <p>AHA Heartsaver 急救培训 · CPR · AED</p>
        </div>
      </div>
    </footer>
  );
}
