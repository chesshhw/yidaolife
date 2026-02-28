"use client";

const WECHAT_ID = "13512456138";

export function EnterpriseContactButtons() {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(WECHAT_ID);
      alert("微信号已复制到剪贴板");
    } catch {
      alert("请手动复制：" + WECHAT_ID);
    }
  };

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      <a
        href="tel:13512456138"
        className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition-colors"
      >
        拨打电话
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
      >
        复制微信号
      </button>
    </div>
  );
}
