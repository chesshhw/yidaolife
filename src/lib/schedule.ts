/** Calendar boundaries use the business timezone, never the server's local timezone. */
export function shanghaiDate(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(now);
}

export function scheduleDateIso(value: string): string | null {
  const match = value.match(/^(\d{4})年(\d{1,2})月(\d{1,2})日$/);
  if (!match) return null;
  const [, year, month, day] = match;
  const iso = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  const date = new Date(`${iso}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === iso ? iso : null;
}

/** Retain supplied history, reject malformed dates, and never infer another course. */
export function splitSchedule(raw?: string, asOf = shanghaiDate()) {
  const isMinGroup = Boolean(raw?.includes("满6人开课"));
  const invalidDates: string[] = [];
  const entries = new Map<string, string>();
  if (raw && !isMinGroup) {
    for (const label of raw.split(/[,，]/).map(value => value.trim()).filter(Boolean)) {
      const iso = scheduleDateIso(label);
      if (iso) entries.set(iso, label);
      else invalidDates.push(label);
    }
  }
  const sorted = [...entries].sort(([a], [b]) => a.localeCompare(b));
  return {
    isMinGroup,
    dates: sorted.filter(([iso]) => iso >= asOf).map(([, label]) => label),
    pastDates: sorted.filter(([iso]) => iso < asOf).map(([, label]) => label),
    invalidDates,
  };
}
