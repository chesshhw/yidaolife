const fs = require("fs");
const path = require("path");
// 从项目内复制或用户桌面路径
const jsonPath = path.join(__dirname, "../trainingLocations.json");
const altPath = "c:\\Users\\汉文\\Desktop\\trainingLocations.json";
const p = fs.existsSync(jsonPath) ? jsonPath : altPath;
if (!fs.existsSync(p)) {
  console.error("File not found:", p);
  process.exit(1);
}
const text = fs.readFileSync(p, "utf8");
const lines = text.trim().split("\n").filter(Boolean);
const arr = lines.map((l) => {
  const o = JSON.parse(l);
  return { city: o.city, location: o.location };
});
const out = `export const RAW_DATA: Array<{ city: string; location: string }> = ${JSON.stringify(arr, null, 2)};\n`;
fs.writeFileSync(path.join(__dirname, "../src/data/cities.raw.ts"), out, "utf8");
console.log("Wrote", arr.length, "entries");
