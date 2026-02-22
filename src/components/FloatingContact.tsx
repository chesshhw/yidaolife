"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";

const WECHAT_ID = "HHW20190225";
const SIGNUP_URL = ""; // 可选：报名链接，非空则显示「立即报名」按钮

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  const copyWechat = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(WECHAT_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("textarea");
      el.value = WECHAT_ID;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  return (
    <>
      {/* 悬浮按钮 */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full bg-neutral-900 text-white shadow-lg hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center text-sm font-medium"
        aria-label="打开联系弹窗"
      >
        咨询
      </button>

      {/* 弹窗 */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && close()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="floating-contact-title"
        >
          <div className="max-w-sm w-[92%] rounded-2xl bg-white dark:bg-neutral-900 shadow-2xl overflow-hidden">
            <div className="relative p-6">
              <button
                type="button"
                onClick={close}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="关闭"
              >
                <span className="text-xl leading-none">×</span>
              </button>
              <h2 id="floating-contact-title" className="text-lg font-semibold text-neutral-900 dark:text-white pr-8">
                联系老师
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                扫码添加微信，24小时内回复
              </p>
              <div className="mt-4 flex justify-center">
                <Image
                  src="/images/wechat.png"
                  alt="微信二维码"
                  width={180}
                  height={180}
                  className="rounded-xl"
                />
              </div>
              <p className="mt-3 text-center text-sm text-neutral-600 dark:text-neutral-400">
                微信号：{WECHAT_ID}
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={copyWechat}
                  className="w-full rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 py-3 px-4 text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
                >
                  {copied ? "已复制" : "复制微信号"}
                </button>
                <Link
                  href="/contact"
                  onClick={close}
                  className="w-full rounded-xl border border-neutral-300 dark:border-neutral-600 py-3 px-4 text-sm font-medium text-center text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                >
                  前往联系页
                </Link>
                {SIGNUP_URL && (
                  <a
                    href={SIGNUP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={close}
                    className="w-full rounded-xl border border-neutral-300 dark:border-neutral-600 py-3 px-4 text-sm font-medium text-center text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                  >
                    立即报名
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
