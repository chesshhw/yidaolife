"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const WECHAT_ID = "HHW20190225";

export default function FloatingContact() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!open) { if (dialog.open) dialog.close(); return; }
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; if (dialog.open) dialog.close(); };
  }, [open]);

  const copyWechat = async () => {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(WECHAT_ID);
      else {
        const field = document.createElement("textarea");
        field.value = WECHAT_ID;
        dialogRef.current?.appendChild(field);
        field.select();
        const copied = document.execCommand("copy");
        field.remove();
        if (!copied) throw new Error("Copy unavailable");
      }
      setCopyStatus("微信号已复制");
    } catch { setCopyStatus("请长按上方微信号复制"); }
  };

  if ((pathname === "/en" || pathname.startsWith("/en/"))) return <a href={pathname === "/en/thank-you" ? "/en#inquiry" : "#inquiry"} lang="en" className="fixed bottom-[max(16px,env(safe-area-inset-bottom))] right-4 z-40 inline-flex min-h-12 items-center rounded-full border border-white/30 bg-[var(--brand)] px-5 py-3 text-sm font-medium text-white shadow-lg">Enquire</a>;

  return (
    <>
      <button type="button" onClick={() => { setCopyStatus(""); setOpen(true); }} className="fixed bottom-[max(16px,env(safe-area-inset-bottom))] right-4 z-40 flex h-12 w-12 items-center justify-center gap-2 rounded-full border border-white/30 bg-[var(--brand)] px-0 text-sm font-medium text-white shadow-lg transition-colors hover:bg-[#193f34] sm:bottom-6 sm:right-6 sm:w-auto sm:px-5" aria-label="打开微信咨询">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="hidden h-5 w-5 sm:block" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M20 11.5a8 8 0 0 1-8 8 9 9 0 0 1-3.5-.7L4 20l1.2-4.2A7.8 7.8 0 0 1 4 11.5a8 8 0 0 1 16 0Z"/><path strokeLinecap="round" d="M8 11.5h.01M12 11.5h.01M16 11.5h.01"/></svg>
        <span className="hidden sm:inline">微信咨询</span><span className="sm:hidden">咨询</span>
      </button>
      <dialog ref={dialogRef} onCancel={close} onClick={event=>{if(event.target===event.currentTarget)close();}} aria-labelledby="floating-contact-title" className="m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-sm overflow-y-auto rounded-2xl bg-white p-0 text-[var(--foreground)] shadow-2xl backdrop:bg-[#102c24]/50 backdrop:backdrop-blur-sm">
        <div className="relative p-6 sm:p-7">
          <button type="button" onClick={close} className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-2xl text-[var(--muted)] hover:bg-[var(--surface)]" aria-label="关闭咨询弹窗">×</button>
          <p className="eyebrow">都会急救 · 课程咨询</p>
          <h2 id="floating-contact-title" className="mt-3 pr-9 text-2xl font-semibold">联系黄老师</h2>
          <p className="mt-2 text-sm leading-7 text-[var(--muted)]">个人报名、城市排期与企业培训</p>
          <Image src="/images/wechat.png" alt="黄老师微信二维码" width={176} height={176} className="mx-auto mt-5 rounded-lg border border-[var(--border)]" />
          <p className="mt-4 select-text text-center text-sm">微信号：{WECHAT_ID}</p>
          <div className="mt-5 grid gap-3"><button type="button" onClick={copyWechat} className="button-primary w-full">复制微信号</button><a href="tel:13512456138" className="button-secondary w-full">电话咨询 · 13512456138</a></div>
          <p role="status" aria-live="polite" className="mt-2 min-h-5 text-center text-xs text-[var(--brand)]">{copyStatus}</p>
          <Link href="/contact" onClick={close} className="text-link w-full justify-center">查看完整联系方式 <span aria-hidden>→</span></Link>
        </div>
      </dialog>
    </>
  );
}
