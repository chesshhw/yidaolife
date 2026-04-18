"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  qrImageSrc: string;
  qrAlt: string;
  noteLines?: string[];
};

export default function QrModal({ open, onClose, title, qrImageSrc, qrAlt, noteLines }: Props) {
  const close = useCallback(() => onClose(), [onClose]);

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

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4"
      onClick={(e) => e.target === e.currentTarget && close()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="qr-modal-title"
    >
      <div className="w-[92%] max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="relative p-6">
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100"
            aria-label="关闭"
          >
            <span className="text-xl leading-none">×</span>
          </button>

          <h2 id="qr-modal-title" className="pr-8 text-lg font-semibold text-neutral-900">
            {title}
          </h2>
          <p className="mt-2 text-sm text-neutral-600">使用微信扫码即可</p>

          <div className="mt-4 flex justify-center">
            <Image
              src={qrImageSrc}
              alt={qrAlt}
              width={320}
              height={320}
              className="h-auto w-[260px] sm:w-[320px]"
            />
          </div>

          {noteLines?.length ? (
            <div className="mt-4 space-y-1 text-center">
              {noteLines.map((t) => (
                <p key={t} className="text-base text-neutral-800">
                  {t}
                </p>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

