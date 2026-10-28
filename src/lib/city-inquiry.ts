import { getCityBySlug, getCityShortName, parseScheduleDates } from "@/data/cities";
import { scheduleDateIso, shanghaiDate } from "@/lib/schedule";

/** Accept known city/course choices and current source dates only. */
export function getCityInquiryDefaults(params: Record<string, string | string[] | undefined>, asOf = shanghaiDate()) {
  const city = typeof params.city === "string" ? getCityBySlug(params.city) : undefined;
  if (!city) return { defaultCity: "", defaultTraining: "", defaultDate: "" };
  const dates = parseScheduleDates(city.scheduleDates, asOf).dates.map(scheduleDateIso);
  return {
    defaultCity: getCityShortName(city),
    defaultTraining: params.training === "enterprise" ? "Corporate First Aid Training" : params.training === "individual" ? "AHA Heartsaver First Aid CPR AED" : "",
    defaultDate: typeof params.date === "string" && dates.includes(params.date) ? params.date : "",
  };
}
