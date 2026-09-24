const fs = require("fs");
const path = require("path");

// trainingDates.json uses one JSON object per line, like trainingLocations.json.
// 常州、泰州的重复记录已由用户确认采用固定日期，并在源表中消除冲突。
const source = path.join(__dirname, "../trainingDates.json");
const rows = fs.readFileSync(source, "utf8").replace(/^\uFEFF/, "").trim().split(/\r?\n/).map(JSON.parse);
// Preserve the existing city key and URL until the location dataset is corrected.
const aliases = { "海西蒙古族藏族自治州": "海西蒙古族藏族自治州江门市" };
const dates = {};
for (const { city, date } of rows) {
  if (typeof city !== "string" || typeof date !== "string" || !city.trim() || !date.trim()) {
    throw new Error("Invalid city schedule record");
  }
  const key = aliases[city] ?? city;
  if (Object.hasOwn(dates, key)) throw new Error("Duplicate city: " + city);
  if (date.includes("满6人开课")) {
    dates[key] = "满6人开课";
    continue;
  }
  const values = date.split(/[,，]\s*/).map((value) => value.trim());
  for (const value of values) {
    const match = /^(\d{4})年(\d{1,2})月(\d{1,2})日$/.exec(value);
    if (!match) throw new Error("Invalid date for " + city + ": " + value);
    const [, year, month, day] = match.map(Number);
    const parsed = new Date(Date.UTC(year, month - 1, day));
    if (parsed.getUTCFullYear() !== year || parsed.getUTCMonth() !== month - 1 || parsed.getUTCDate() !== day) {
      throw new Error("Invalid calendar date for " + city + ": " + value);
    }
  }
  dates[key] = values.join(", ");
}
const header = "/**\n * 各城市最近急救培训时间（用于城市页展示）\n * key：城市全称（与 RAW_DATA / cities 一致）\n * 数据来源：trainingDates.json，2026-09-24 更新\n * 由 scripts/gen-city-dates.js 生成\n */\nexport const CITY_SCHEDULE_DATES: Record<string, string> = ";
const sorted = Object.fromEntries(Object.entries(dates).sort(([a], [b]) => a.localeCompare(b, "zh-CN")));
fs.writeFileSync(path.join(__dirname, "../src/data/city-dates.ts"), header + JSON.stringify(sorted, null, 2) + ";\n", "utf8");
console.log("Wrote", Object.keys(dates).length, "city schedules");
