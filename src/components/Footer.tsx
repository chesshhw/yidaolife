import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Programs" },
  { href: "/cities", label: "开课城市" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
          <div>
            <p className="text-sm font-medium text-[var(--foreground)]">都会急救</p>
            <p className="mt-1 text-xs text-[var(--muted)]">天津一道技术服务有限公司 · 全国AHA HeartSaver急救员认证中心</p>
          </div>
          <nav className="flex flex-wrap gap-6 sm:gap-8">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors tracking-wide"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-10 text-xs text-[var(--muted)]">
          @2019 都会急救 · 掌握急救技能 为生命护航
        </p>
      </div>
    </footer>
  );
}
