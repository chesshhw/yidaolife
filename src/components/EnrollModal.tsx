"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

const ENROLL_MODAL_EVENT = "openEnrollModal";

type EnrollModalProps = {
  cityName: string;
  /** 按钮文案 */
  buttonText?: string;
};

export function EnrollModal({ cityName, buttonText = "立即报名" }: EnrollModalProps) {
  const [open, setOpen] = useState(false);

  const openModal = useCallback(() => setOpen(true), []);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(ENROLL_MODAL_EVENT, handler);
    return () => window.removeEventListener(ENROLL_MODAL_EVENT, handler);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="inline-flex items-center justify-center rounded-xl bg-neutral-900 text-white px-6 py-3 text-sm font-medium hover:bg-neutral-800"
      >
        {buttonText}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="报名二维码"
        >
          <div
            className="relative bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 p-1 text-neutral-500 hover:text-neutral-900 rounded"
              aria-label="关闭"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative w-48 h-48 mt-6">
              <Image
                src="/images/app.jpg"
                alt={`扫描二维码报名${cityName}AHA急救培训课程`}
                fill
                className="object-cover rounded-lg"
                sizes="12rem"
              />
            </div>
            <p className="text-neutral-600 text-sm mt-4 text-center">
              扫描二维码报名{cityName}AHA急救培训课程
            </p>
          </div>
        </div>
      )}
    </>
  );
}

/** 点击子元素时打开报名弹窗（与 EnrollModal 配合，用于页面内二维码图） */
export function EnrollModalTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const open = () => window.dispatchEvent(new CustomEvent(ENROLL_MODAL_EVENT));

  return (
    <div className={className} onClick={open} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && open()}>
      {children}
    </div>
  );
}
