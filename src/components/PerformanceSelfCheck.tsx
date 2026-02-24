"use client";

import { useEffect, useState } from "react";

export default function PerformanceSelfCheck({
  heroFile,
  heroPriority,
  heroSizes,
}: {
  heroFile: string;
  heroPriority: boolean;
  heroSizes: string;
}) {
  const [rawImgCount, setRawImgCount] = useState<number | null>(null);

  useEffect(() => {
    const imgs = document.querySelectorAll("img");
    const raw = Array.from(imgs).filter((el) => !el.getAttribute("data-nimg"));
    setRawImgCount(raw.length);
    if (document.documentElement.innerHTML.includes("hero.jpg")) {
      console.warn("[性能自检] hero.jpg 仍被引用，请改用 hero.webp");
    }
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 text-xs text-[var(--muted)] border-t border-[var(--border)] bg-amber-50 dark:bg-neutral-900">
      <p className="font-medium text-amber-800 dark:text-amber-200 mb-1">性能自检（仅开发环境）</p>
      <ul className="list-none p-0 m-0 space-y-0.5">
        <li>Hero next/image 文件: {heroFile}</li>
        <li>Hero sizes: {heroSizes}</li>
        <li>Hero priority: {heroPriority ? "是" : "否"}</li>
        <li>页面内原生 &lt;img&gt; 数量: {rawImgCount === null ? "检测中…" : rawImgCount}</li>
      </ul>
      <p className="mt-2 text-amber-700 dark:text-amber-300">
        Network 自检：Chrome DevTools → Network → 筛选 Img → 应看到 <code className="bg-amber-100 dark:bg-neutral-800 px-1">/_next/image?url=%2Fimages%2Fhero.webp&amp;w=...&amp;q=...</code>，不要出现直链 <code className="bg-amber-100 dark:bg-neutral-800 px-1">/images/hero.webp</code>；Hero 请求体积应在几百 KB 内（非 6MB 级）。
      </p>
    </div>
  );
}
