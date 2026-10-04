"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/programs", label: "课程体系" },
  { href: "/cities", label: "开课城市" },
  { href: "/enterprise-training", label: "企业培训" },
  { href: "/blog", label: "急救知识" },
  { href: "/about", label: "关于我们" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); toggleRef.current?.focus(); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);
  const isActive = (href: string) => href === "/" ? pathname === href : pathname.startsWith(href) || (href === "/cities" && pathname.startsWith("/city/"));

  if ((pathname === "/en" || pathname.startsWith("/en/"))) return (
    <header lang="en" className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] bg-white/95 backdrop-blur-md">
      <div className="site-container flex h-[72px] items-center justify-between gap-3 lg:h-20">
        <Link href="/en" aria-label="Yidaolife training home" className="flex shrink-0 items-center gap-2"><Image src="/images/logo.png" alt="" width={44} height={42} className="h-11 w-11 object-contain" /><span className="text-base font-semibold sm:text-lg">都会急救<span className="mt-0.5 block text-xs tracking-widest text-[var(--muted)]">YIDAOLIFE</span></span></Link>
        <nav aria-label="Training navigation" className="flex items-center gap-3 sm:gap-6"><Link href={pathname === "/en/corporate-first-aid-training-china" ? "/enterprise-training" : "/contact"} lang="zh-CN" className="flex min-h-11 items-center text-sm text-[var(--brand)]">中文</Link><a href={pathname === "/en/thank-you" ? "/en#inquiry" : "#inquiry"} className="button-primary !min-h-11 !px-3 sm:!px-5">Enquire</a></nav>
      </div>
    </header>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] bg-white/95 backdrop-blur-md">
      <div className="site-container">
        <div className="flex h-[72px] items-center justify-between gap-3 lg:h-20">
          <Link href="/" aria-label="都会急救首页" className="flex shrink-0 items-center gap-2">
            <Image src="/images/logo.png" alt="" width={48} height={46} className="h-12 w-12 object-contain" />
            <span>
              <span className="block text-lg font-semibold tracking-[0.08em]">都会急救</span>
              <span className="mt-0.5 hidden text-[10px] tracking-[0.14em] text-[var(--muted)] sm:block">急救培训 · 让技能走进生活</span>
            </span>
          </Link>
          <div className="hidden items-center gap-6 lg:flex">
            <nav aria-label="主导航" className="flex items-center gap-5">
              {navItems.map(({ href, label }) => (
                <Link key={href} href={href} aria-current={isActive(href) ? "page" : undefined} className={`flex min-h-11 items-center border-b-2 pt-0.5 text-sm transition-colors ${isActive(href) ? "border-[var(--brand)] font-semibold text-[var(--brand)]" : "border-transparent text-[var(--muted)] hover:text-[var(--brand)]"}`}>
                  {label}
                </Link>
              ))}
            </nav>
            <Link href="/en" lang="en" className="text-sm font-medium text-[var(--brand)]">English</Link>
            <Link href="/contact" className="button-primary !min-h-11 !px-4">课程咨询 <span aria-hidden>↗</span></Link>
          </div>
          <div className="flex items-center gap-1 lg:hidden">
            <Link href="/en" lang="en" className="flex min-h-11 items-center px-2 text-sm text-[var(--brand)]">EN</Link>
            <Link href="/contact" className="flex min-h-11 items-center px-2 text-sm font-medium text-[var(--brand)]">咨询</Link>
            <button ref={toggleRef} type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "关闭导航菜单" : "打开导航菜单"} className="flex h-11 w-11 items-center justify-center rounded-lg hover:bg-[var(--surface)]">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeWidth={1.5} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 7h16M4 12h16M4 17h16"} />
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav id="mobile-navigation" aria-label="手机导航" className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-[var(--border)] pb-5 pt-3 lg:hidden">
            <ul className="grid grid-cols-2 gap-2">
              {navItems.map(({ href, label }) => (
                <li key={href}><Link href={href} onClick={() => setMenuOpen(false)} aria-current={isActive(href) ? "page" : undefined} className={`block rounded-lg px-4 py-3 text-sm ${isActive(href) ? "bg-[var(--surface)] font-semibold text-[var(--brand)]" : "hover:bg-[var(--surface)]"}`}>{label}</Link></li>
              ))}
            </ul>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="button-primary mt-3 w-full">联系黄老师 · 咨询课程</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
