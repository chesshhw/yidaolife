import Link from "next/link";
import type { City } from "@/data/cities";
import { getCardScheduleDates, getCityShortName, getDisplayLocations, isMinGroupSchedule } from "@/data/cities";

export default function CityCard({ city }: { city: City }) {
  const short = getCityShortName(city);
  const addrs = getDisplayLocations(city.locations);
  const cardDates = getCardScheduleDates(city.scheduleDates, 3);
  const minGroup = isMinGroupSchedule(city.scheduleDates);
  return (
    <li className="min-w-0">
      <Link href={`/city/${city.slug}`} className="group flex h-full flex-col rounded-xl border border-[var(--border)] bg-white p-5 transition-colors hover:border-[var(--brand)] hover:bg-[#fafcf9] sm:p-6" aria-label={`查看${short}急救培训课程时间与报名`}>
        <div className="flex items-center justify-between gap-3"><h3 className="text-xl font-semibold text-[var(--foreground)]">{short}</h3><span className="text-lg text-[var(--brand)]" aria-hidden>↗</span></div>
        <p className="mt-2 text-sm text-[var(--muted)]">AHA Heartsaver 急救员课程</p>
        <p className="mt-2 text-xs leading-6 text-[var(--muted)]">CPR · AED · 气道异物梗阻急救</p>
        <div className="mb-5 mt-4 space-y-2">{addrs.map((addr,i) => <address key={i} className="text-sm not-italic leading-7 text-[var(--muted)]">{addr}</address>)}</div>
        <div className="mt-auto border-t border-[var(--border)] pt-4">
          {minGroup ? <p className="text-sm font-medium text-[var(--brand)]">满6人开课</p> : cardDates.length > 0 ? <><p className="text-xs text-[var(--muted)]">近期培训时间</p><ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm font-medium leading-7 text-[var(--brand)]">{cardDates.map(date => <li key={date}>{date}</li>)}</ul></> : <p className="text-sm text-[var(--muted)]">咨询最新课程安排</p>}
          <p className="mt-3 text-xs text-[var(--muted)]">查看详情与报名 <span aria-hidden>→</span></p>
        </div>
      </Link>
    </li>
  );
}
