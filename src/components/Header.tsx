"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Programs" },
  { href: "/cities", label: "Cities" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-[var(--border)] dark:bg-black/90 dark:border-[var(--border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-medium tracking-tight text-[var(--foreground)] hover:opacity-70 transition-opacity"
          >
            <img src="/images/logo.png" alt="都会急救" className="h-10 w-auto" />
            <span className="hidden sm:inline">都会急救</span>
            <span className="sm:hidden">都会急救</span>
          </Link>

          {/* Desktop nav + CTA */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm tracking-wide transition-opacity ${
                    pathname === href
                      ? "text-[var(--foreground)] font-medium"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <Link
              href="/contact"
              className="btn-subtle shrink-0"
            >
              立即咨询
            </Link>
          </div>

          {/* Mobile: 立即咨询 + menu button */}
          <div className="md:hidden flex items-center gap-2">
            <Link href="/contact" className="btn-subtle text-sm py-2 px-4">
              立即咨询
            </Link>
            <button
            type="button"
            className="p-2 -mr-2 text-[var(--foreground)]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          </div>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden py-4 border-t border-[var(--border)]">
            <ul className="flex flex-col gap-4">
              {navItems.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`block text-sm tracking-wide ${
                      pathname === href ? "font-medium" : "text-[var(--muted)]"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
