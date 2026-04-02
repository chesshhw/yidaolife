"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, type ReactNode } from "react";
import { createPortal } from "react-dom";

/** 与 EnrollModalTrigger、首页 Hero 等入口共用 */
export const ENROLL_MODAL_EVENT = "openEnrollModal";

type EnrollModalProps = {
  cityName: string;
  /** 按钮文案 */
  buttonText?: string;
  /**
   * 为 true 时不渲染默认触发按钮，仅保留弹窗与全局事件监听。
   * 用于首页等场景：由 EnrollModalTrigger 或其他按钮 dispatch 打开。
   */
  hideButton?: boolean;
};

function EnrollModalLayer({
  cityName,
  open,
  onClose,
}: {
  cityName: string;
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <>
      {/* 遮罩：相对视口全屏，避免被父级 transform 影响（须挂到 body） */}
      <div
        className="fixed inset-0 z-[999] bg-black/50"
        onClick={onClose}
        role="presentation"
        aria-hidden
      />
      {/* 弹窗：视口居中 */}
      <div
        className="fixed z-[1000] w-[90%] max-w-[320px] md:max-w-[420px] rounded-2xl bg-white p-6 shadow-2xl dark:bg-neutral-900"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="enroll-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="enroll-modal-title" className="sr-only">
          小程序报名二维码
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
          aria-label="关闭"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="relative mx-auto mt-8 aspect-square w-48 max-w-full">
          <Image
            src="/images/app.jpg"
            alt={`扫描小程序二维码报名${cityName || ""}AHA急救培训课程`}
            fill
            className="rounded-lg object-cover"
            sizes="(max-width: 768px) 90vw, 420px"
          />
        </div>
        <p className="mt-4 text-center text-sm text-neutral-700 dark:text-neutral-300">
          扫描小程序二维码报名{cityName ? `${cityName}` : ""}AHA急救培训课程
        </p>
      </div>
    </>,
    document.body
  );
}

export function EnrollModal({ cityName, buttonText = "立即报名", hideButton = false }: EnrollModalProps) {
  const [open, setOpen] = useState(false);

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(ENROLL_MODAL_EVENT, handler);
    return () => window.removeEventListener(ENROLL_MODAL_EVENT, handler);
  }, []);

  return (
    <>
      {!hideButton ? (
        <button
          type="button"
          onClick={openModal}
          className="inline-flex items-center justify-center rounded-xl bg-neutral-900 text-white px-6 py-3 text-sm font-medium hover:bg-neutral-800"
        >
          {buttonText}
        </button>
      ) : null}

      <EnrollModalLayer cityName={cityName} open={open} onClose={closeModal} />
    </>
  );
}

/** 点击子元素时打开报名弹窗（与 EnrollModal 配合，用于页面内二维码图） */
export function EnrollModalTrigger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const open = () => window.dispatchEvent(new CustomEvent(ENROLL_MODAL_EVENT));

  return (
    <div className={className} onClick={open} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && open()}>
      {children}
    </div>
  );
}
