"use client";

import Link from "next/link";
import { ENROLL_MODAL_EVENT } from "@/components/EnrollModal";

export function HomeCourseCTA() {
  const openEnroll = () => {
    window.dispatchEvent(new CustomEvent(ENROLL_MODAL_EVENT));
  };

  return (
    <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-4 sm:gap-5">
      <button
        type="button"
        onClick={openEnroll}
        className="inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-neutral-900 px-10 py-4 text-base font-semibold text-white shadow-lg transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
      >
        立即报名
      </button>
      <Link
        href="/cities"
        className="inline-flex min-h-[52px] items-center justify-center rounded-2xl border-2 border-neutral-900 bg-white px-10 py-4 text-base font-semibold text-neutral-900 shadow-md transition-colors hover:bg-neutral-50 dark:border-white dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900"
      >
        查看开课城市与排期
      </Link>
    </div>
  );
}
