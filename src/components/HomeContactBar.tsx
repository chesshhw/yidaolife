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
    <section className="border-t border-[var(--border)] bg-neutral-50 dark:bg-neutral-900/50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <p className="text-center text-[var(--foreground)] text-sm sm:text-base mb-6 sm:mb-8">
          需要改期/城市不确定？24小时内专人确认排期
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={copyWechat}
            className="btn-subtle w-full sm:w-auto min-w-[140px]"
          >
            复制微信
          </button>
          <a
            href={`tel:${WECHAT_NUM}`}
            className="btn-subtle w-full sm:w-auto min-w-[140px] text-center no-underline"
          >
            拨打电话
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
