"use client";

import { useState, useCallback } from "react";

const WECHAT_NUM = "13512456138";
const TOAST_MSG = "已复制，可直接粘贴到微信/拨号";

export default function HomeContactBar() {
  const [toast, setToast] = useState(false);

  const copyWechat = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(WECHAT_NUM);
    } catch {
      const el = document.createElement("textarea");
      el.value = WECHAT_NUM;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  }, []);

  return (
    <section className="border-t border-[var(--border)] bg-white">
      <div className="site-container grid items-center gap-7 py-12 lg:grid-cols-[1fr_auto] lg:py-16">
        <div>
          <h2 className="text-2xl font-semibold">准备好开始学习了吗？</h2>
          <p className="section-intro mt-3">个人报名、企业培训或城市排期，欢迎联系黄老师。</p>
          <a href="tel:13512456138" className="text-link mt-2 text-lg tabular-nums">13512456138</a>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href="/contact"
            className="button-primary w-full sm:w-auto"
          >
            咨询课程安排
          </a>
          <button
            type="button"
            onClick={copyWechat}
            className="button-secondary w-full sm:w-auto"
          >
            复制咨询号码
          </button>
          <a
            href={`tel:${WECHAT_NUM}`}
            className="button-secondary w-full sm:w-auto"
          >
            电话咨询
          </a>
        </div>
      </div>
      {toast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-4 py-3 rounded-lg bg-black text-white text-sm shadow-lg dark:bg-white dark:text-black"
          role="status"
          aria-live="polite"
        >
          {TOAST_MSG}
        </div>
      )}
    </section>
  );
}
