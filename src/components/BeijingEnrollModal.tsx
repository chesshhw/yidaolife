"use client";

import Image from "next/image";
import { useState } from "react";

export default function BeijingEnrollModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-xl bg-neutral-900 text-white px-6 py-3 text-sm font-medium hover:bg-neutral-800"
      >
        立即报名
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
                alt="扫描二维码报名北京AHA急救培训课程"
                fill
                className="object-cover rounded-lg"
                sizes="12rem"
              />
            </div>
            <p className="text-neutral-600 text-sm mt-4 text-center">
              扫描二维码报名北京AHA急救培训课程
            </p>
          </div>
        </div>
      )}
    </>
  );
}
