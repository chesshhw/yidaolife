"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import QrModal from "@/components/QrModal";

type Props = {
  primary: { label: string; modalTitle: string; qrImageSrc: string; qrAlt: string };
  secondary: { label: string; href: string };
};

export default function BlogBottomCta({ primary, secondary }: Props) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <section className="mt-12 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-neutral-900">下一步</h2>
        <p className="mt-3 text-neutral-700 leading-relaxed">
          如需报名课程或查看所在城市开课安排，可直接操作。
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
          >
            {primary.label}
          </button>
          <Link
            href={secondary.href}
            className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
          >
            {secondary.label}
          </Link>
        </div>
      </section>

      <QrModal
        open={open}
        onClose={close}
        title={primary.modalTitle}
        qrImageSrc={primary.qrImageSrc}
        qrAlt={primary.qrAlt}
      />
    </>
  );
}

