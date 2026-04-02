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
      <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={openEnrollModal}
          className="btn-subtle text-white border-white hover:bg-white hover:text-black"
        >
          立即报名
        </button>
        <Link
          href="/cities"
          className="btn-subtle text-white border-white hover:bg-white hover:text-black"
        >
          查看课程时间
        </Link>
      </div>
    </>
  );
}
