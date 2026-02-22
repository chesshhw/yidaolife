"use client";

import Link from "next/link";
import { useState, useCallback } from "react";

const WECHAT_LABEL = "黄老师微信：13512456138（点击复制）";
const PHONE_LABEL = "电话：13512456138（点击复制）";
const PHONE_NUM = "13512456138";
const TOAST_MSG = "已复制，可直接粘贴到微信/拨号";

function CopyBlock({
  label,
  value,
  onCopy,
}: {
  label: string;
  value: string;
  onCopy: () => void;
}) {
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          onCopy();
        } catch {
          // fallback: select + execCommand for older env
          const el = document.createElement("textarea");
          el.value = value;
          document.body.appendChild(el);
          el.select();
          document.execCommand("copy");
          document.body.removeChild(el);
          onCopy();
        }
      }}
      className="w-full text-left block rounded-lg border border-[var(--border)] dark:border-[var(--border)] px-4 py-4 sm:px-5 sm:py-5 transition-colors hover:bg-black/5 dark:hover:bg-white/5"
    >
      <span className="text-sm text-[var(--foreground)]">{label}</span>
    </button>
  );
}

export default function ContactPage() {
  const [toast, setToast] = useState(false);

  const showToast = useCallback(() => {
    setToast(true);
    const t = setTimeout(() => setToast(false), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[var(--foreground)]">
            Contact
          </h1>
          <p className="mt-4 text-[var(--muted)] text-sm sm:text-base">
            占位副标题，后续替换。
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28">
        <div className="mx-auto max-w-xl">
          <p className="text-[var(--muted)] text-sm sm:text-base leading-relaxed mb-8">
            占位文案：如有课程咨询、合作或媒体联系，欢迎通过以下方式与我们联系。此处为占位内容，后续替换为真实联系方式。
          </p>

          <div className="mt-8 text-center">
            <img src="/images/wechat.png" alt="微信二维码" className="w-40 rounded-xl shadow-lg mx-auto" />
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">扫码添加微信，24小时内回复</p>
          </div>

          <div className="space-y-4">
            <CopyBlock label={WECHAT_LABEL} value={PHONE_NUM} onCopy={showToast} />
            <CopyBlock label={PHONE_LABEL} value={PHONE_NUM} onCopy={showToast} />
          </div>

          <ul className="mt-8 space-y-4 text-sm">
            <li>
              <span className="text-[var(--muted)]">邮箱：</span>
              <span className="text-[var(--foreground)]">placeholder@yidaolife.com</span>
            </li>
          </ul>

          <div className="mt-10">
            <Link href="/programs" className="btn-subtle">
              查看课程
            </Link>
          </div>
        </div>
      </section>

      {/* Toast */}
      {toast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-4 py-3 rounded-lg bg-black text-white text-sm shadow-lg dark:bg-white dark:text-black"
          role="status"
          aria-live="polite"
        >
          {TOAST_MSG}
        </div>
      )}
    </>
  );
}
