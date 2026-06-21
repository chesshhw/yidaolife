import Link from "next/link";
import type { City } from "@/data/cities";
import {
  getCardScheduleDates,
  getCityShortName,
  getDisplayLocations,
  isMinGroupSchedule,
} from "@/data/cities";

type CityCardProps = {
  city: City;
};

export default function CityCard({ city }: CityCardProps) {
  const short = getCityShortName(city);
  const addrs = getDisplayLocations(city.locations);
  const cardDates = getCardScheduleDates(city.scheduleDates, 3);
  const minGroup = isMinGroupSchedule(city.scheduleDates);

  return (
    <li>
      <Link
        href={`/city/${city.slug}`}
        className="group block rounded-2xl border border-neutral-200 bg-white p-4 md:p-5 shadow-sm hover:shadow-md hover:border-neutral-300 transition cursor-pointer"
        aria-label={`查看${short}急救培训课程时间与报名`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-base md:text-lg font-semibold text-neutral-900 group-hover:text-neutral-700 transition-colors">
              {short}急救培训 | AHA Heartsaver急救员认证课程
            </h3>
            <p className="mt-1 text-sm text-neutral-600">HeartSaver急救员认证课程（纸质证书）</p>
            <p className="mt-2 text-sm text-neutral-700">{short}培训内容包括：</p>
            <ul className="mt-1 list-disc list-inside text-sm text-neutral-700 leading-6 space-y-1">
              <li>CPR心肺复苏</li>
              <li>AED自动体外除颤仪使用</li>
              <li>气道异物梗阻急救</li>
            </ul>
          </div>
          <span
            className="shrink-0 inline-flex items-center gap-1 rounded-full bg-neutral-900 text-white text-sm px-3 py-1.5 group-hover:opacity-90 group-hover:shadow-md transition"
            aria-hidden
          >
            查看课程时间与报名
            <span aria-hidden>→</span>
          </span>
        </div>

        <div className="mt-3 space-y-2">
          {addrs.map((addr, i) => (
            <address key={i} className="not-italic text-sm text-neutral-700 leading-relaxed">
              {addr}
            </address>
          ))}
        </div>

        <div className="mt-3">
          {minGroup ? (
            <p className="text-sm font-medium text-neutral-800">满6人开课</p>
          ) : cardDates.length > 0 ? (
            <>
              <p className="text-sm font-medium text-neutral-800">近期培训时间：</p>
              <ul className="mt-1 list-disc list-inside text-sm text-neutral-700 space-y-0.5">
                {cardDates.map((date) => (
                  <li key={date}>{date}</li>
                ))}
              </ul>
            </>
          ) : null}
        </div>

        <p className="mt-4 text-xs text-neutral-500">点击卡片任意位置进入课程时间与报名</p>
      </Link>
    </li>
  );
}
