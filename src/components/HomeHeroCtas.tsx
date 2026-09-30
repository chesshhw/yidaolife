"use client";

import Link from "next/link";
import { EnrollModal, ENROLL_MODAL_EVENT } from "@/components/EnrollModal";

/**
 * 首页 Hero 区 CTA：立即报名打开小程序二维码弹窗；查看课程时间跳转开课城市页。
 */
export default function HomeHeroCtas() {
  const openEnrollModal = () => {
    window.dispatchEvent(new CustomEvent(ENROLL_MODAL_EVENT));
  };

  return (
    <>
      {/* 仅挂载弹窗与事件监听，不显示默认按钮 */}
      <EnrollModal cityName="" hideButton />
      <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8">
        <button
          type="button"
          onClick={openEnrollModal}
          className="button-primary flex-1 sm:flex-none"
        >
          报名急救课程 <span aria-hidden>↗</span>
        </button>
        <Link
          href="/cities"
          className="button-secondary flex-1 sm:flex-none"
        >
          查看城市与排期
        </Link>
      </div>
    </>
  );
}
