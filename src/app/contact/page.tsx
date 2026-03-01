"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback } from "react";

const PHONE = "13512456138";
const EMAIL = "13512456138@163.com";

const CITIES = [
  "北京",
  "上海",
  "深圳",
  "广州",
  "杭州",
  "苏州",
  "南京",
  "成都",
  "重庆",
  "其他",
];

const HEADCOUNTS = [
  { value: "10-20", label: "10-20人" },
  { value: "20-50", label: "20-50人" },
  { value: "50-100", label: "50-100人" },
  { value: "100+", label: "100人以上" },
];

const DURATIONS = [
  { value: "2小时", label: "2小时" },
  { value: "半天", label: "半天" },
  { value: "全天-含证书", label: "全天（含证书）" },
];

type FormState = {
  company: string;
  name: string;
  phone: string;
  city: string;
  headcount: string;
  duration: string;
  note: string;
};

const initialForm: FormState = {
  company: "",
  name: "",
  phone: "",
  city: "",
  headcount: "",
  duration: "",
  note: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: "" });

  const showToast = useCallback((message: string) => {
    setToast({ show: true, message });
    const t = setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3500);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { company, name, phone, city, headcount, duration, note } = form;
    if (!name.trim() || !phone.trim() || !city || !headcount || !duration) {
      showToast("请填写必填项：姓名、手机、城市、培训人数、课程时长");
      return;
    }
    setSubmitting(true);
    const payload = {
      company: company.trim() || undefined,
      name: name.trim(),
      phone: phone.trim(),
      city,
      headcount,
      duration,
      note: note.trim() || undefined,
      pageUrl: typeof window !== "undefined" ? window.location.href : undefined,
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
      ts: Date.now(),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok === true) {
        setSubmitted(true);
        setForm(initialForm);
        if (typeof window !== "undefined" && (window as unknown as { gtag?: (a: string, b: string, c: object) => void }).gtag) {
          (window as unknown as { gtag: (a: string, b: string, c: object) => void }).gtag("event", "form_submit", { form_name: "contact" });
        }
      } else {
        showToast(data?.error || "提交失败，请稍后重试");
      }
    } catch {
      showToast("网络错误，请检查网络后重试");
    } finally {
      setSubmitting(false);
    }
  };

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="border-b border-neutral-100 bg-neutral-50/50">
        <div className="mx-auto max-w-[1120px] px-4 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr,minmax(280px,1fr)] lg:items-center">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
                企业合作与培训预约
              </h1>
              <p className="mt-3 text-base text-neutral-600 sm:text-lg">
                AHA Heartsaver CPR AED｜企业团体培训可定制｜导师认证咨询
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-xl bg-red-600 px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-red-700 transition-colors"
                >
                  预约企业团训
                </a>
                <Link
                  href="/program/enterprise-first-aid-training"
                  className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
                >
                  查看企业团训方案
                </Link>
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 lg:aspect-[4/3]">
              <Image
                src="/images/g3.jpg"
                alt="企业急救培训 CPR AED 现场"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 联系方式模块 */}
      <section className="border-b border-neutral-100 py-12 sm:py-16">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2 className="sr-only">联系方式</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* 卡片A：微信 */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-neutral-900">微信咨询（推荐）</h3>
              <p className="mt-1 text-sm text-neutral-600">扫码添加课程顾问，工作日 9:00–18:00 优先回复</p>
              <div className="mt-4">
                <Image
                  src="/images/wechat.png"
                  alt="都会急救课程顾问微信二维码"
                  width={160}
                  height={160}
                  className="h-40 w-40 rounded-xl border border-neutral-100"
                />
              </div>
            </div>

            {/* 卡片B：电话 */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-neutral-900">电话咨询</h3>
              <p className="mt-1 text-sm text-neutral-600">同微信</p>
              <a
                href={`tel:${PHONE}`}
                className="mt-3 inline-block text-lg font-semibold text-neutral-900 hover:text-red-600 transition-colors"
              >
                {PHONE}
              </a>
            </div>

            {/* 卡片C：企业合作 */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-neutral-900">企业合作</h3>
              <p className="mt-1 text-sm text-neutral-600">企业团训 / 长期合作 / 年度安全培训</p>
              <a
                href="#contact"
                className="mt-4 inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors"
              >
                提交需求
              </a>
            </div>

            {/* 卡片D：邮箱 */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-neutral-900">邮箱</h3>
              <p className="mt-1 text-sm text-neutral-600">企业合作与咨询</p>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-3 block text-sm font-medium text-neutral-900 break-all hover:text-red-600 transition-colors"
              >
                {EMAIL}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 快速入口 */}
      <section className="border-b border-neutral-100 bg-neutral-50/50 py-12 sm:py-16">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2 className="sr-only">快速入口</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Link
              href="/program/enterprise-first-aid-training"
              className="group block rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-neutral-300 transition"
            >
              <h3 className="text-lg font-semibold text-neutral-900">企业急救培训（可定制）</h3>
              <ul className="mt-3 space-y-1 text-sm text-neutral-600">
                <li>· 按人数分级报价</li>
                <li>· 2小时/半天/全天（含证书）</li>
                <li>· 支持上门 / 分批 / 全国排期</li>
              </ul>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-red-600 group-hover:gap-2 transition-all">
                查看企业团训方案 →
              </span>
            </Link>

            <Link
              href="/instructor"
              className="group block rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-neutral-300 transition"
            >
              <h3 className="text-lg font-semibold text-neutral-900">AHA 导师认证咨询</h3>
              <ul className="mt-3 space-y-1 text-sm text-neutral-600">
                <li>· 申请条件与流程说明</li>
                <li>· 排期与带教支持</li>
                <li>· 全国开放城市可协调</li>
              </ul>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-red-600 group-hover:gap-2 transition-all">
                查看导师认证 →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 信任背书 */}
      <section className="border-b border-neutral-100 py-12 sm:py-16">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2 className="text-xl font-semibold text-neutral-900">资质与体系</h2>
          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
            <div className="space-y-4 text-neutral-700">
              <p>
                课程依托 AHA 授权培训体系开展，遵循标准化教学流程。证书按体系规则发放并可查询。
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Image
                src="/images/license.png"
                alt="AHA 授权证明"
                width={400}
                height={300}
                loading="lazy"
                sizes="(max-width: 640px) 100vw, 50vw"
                className="h-auto w-full rounded-xl border border-neutral-200"
              />
              <Image
                src="/images/cert-sample.jpg"
                alt="AHA Heartsaver 证书样本"
                width={400}
                height={300}
                loading="lazy"
                sizes="(max-width: 640px) 100vw, 50vw"
                className="h-auto w-full rounded-xl border border-neutral-200"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 覆盖城市 */}
      <section className="border-b border-neutral-100 bg-neutral-50/50 py-10 sm:py-12">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2 className="text-lg font-semibold text-neutral-900">支持排期城市（可上门/集中培训）</h2>
          <p className="mt-3 text-neutral-700">
            北京、上海、深圳、广州、杭州、苏州、南京、成都、重庆等。
          </p>
          <p className="mt-1 text-sm text-neutral-600">更多城市可沟通排期。</p>
        </div>
      </section>

      {/* 预约表单 #contact */}
      <section id="contact" className="scroll-mt-24 py-12 sm:py-16">
        <div className="mx-auto max-w-[1120px] px-4">
          <h2 className="text-xl font-semibold text-neutral-900">提交需求，获取方案与报价</h2>

          {submitted ? (
            <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
              <p className="font-medium text-green-800">已收到，我们将尽快联系您。</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 max-w-xl space-y-4">
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-neutral-700">公司/机构名称（选填）</label>
                <input
                  id="company"
                  type="text"
                  value={form.company}
                  onChange={update("company")}
                  className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-neutral-900 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700">姓名（必填）</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={update("name")}
                  className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-neutral-900 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-700">手机（必填）</label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={update("phone")}
                  className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-neutral-900 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-neutral-700">城市（必填）</label>
                <select
                  id="city"
                  required
                  value={form.city}
                  onChange={update("city")}
                  className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-neutral-900 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                >
                  <option value="">请选择</option>
                  {CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="headcount" className="block text-sm font-medium text-neutral-700">培训人数（必填）</label>
                <select
                  id="headcount"
                  required
                  value={form.headcount}
                  onChange={update("headcount")}
                  className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-neutral-900 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                >
                  <option value="">请选择</option>
                  {HEADCOUNTS.map((h) => (
                    <option key={h.value} value={h.value}>{h.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-neutral-700">课程时长（必填）</label>
                <select
                  id="duration"
                  required
                  value={form.duration}
                  onChange={update("duration")}
                  className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-neutral-900 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                >
                  <option value="">请选择</option>
                  {DURATIONS.map((d) => (
                    <option key={d.value} value={d.value}>{d.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="note" className="block text-sm font-medium text-neutral-700">备注（选填）</label>
                <textarea
                  id="note"
                  rows={3}
                  value={form.note}
                  onChange={update("note")}
                  className="mt-1 w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-neutral-900 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-red-600 py-3 text-sm font-medium text-white hover:bg-red-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed sm:w-auto sm:px-8"
              >
                {submitting ? "提交中…" : "提交"}
              </button>
            </form>
          )}

          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10">
            <div>
              <p className="text-sm font-medium text-neutral-900">电话</p>
              <a href={`tel:${PHONE}`} className="text-lg font-semibold text-neutral-900 hover:text-red-600 transition-colors">
                {PHONE}
              </a>
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-900">微信</p>
              <Image
                src="/images/wechat.png"
                alt="课程顾问微信二维码"
                width={120}
                height={120}
                className="mt-2 h-28 w-28 rounded-xl border border-neutral-200"
              />
            </div>
          </div>
        </div>
      </section>

      {toast.show && (
        <div
          className="fixed bottom-6 left-1/2 z-[100] max-w-[90vw] -translate-x-1/2 rounded-lg bg-neutral-900 px-4 py-3 text-sm text-white shadow-lg"
          role="status"
          aria-live="polite"
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
