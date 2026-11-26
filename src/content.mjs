// Reads the editable content in ../content (managed in Pages CMS, see .pages.yml).
// Any problem stops the build with a plain message, so a bad edit never reaches the live site.
import { readFileSync, readdirSync } from "node:fs";

// BRIGHTSTEPS_CONTENT lets tests point at a scratch copy of the content folder.
const dir = process.env.BRIGHTSTEPS_CONTENT ? new URL(`file://${process.env.BRIGHTSTEPS_CONTENT.replace(/\/?$/, "/")}`) : new URL("../content/", import.meta.url);
const problems = [];

function readJson(path) {
  try { return JSON.parse(readFileSync(new URL(path, dir), "utf8")); }
  catch (e) { problems.push(`content/${path}: ${e.message}`); return {}; }
}
const folder = (name) => readdirSync(new URL(`${name}/`, dir)).filter((f) => f.endsWith(".json")).sort()
  .map((f) => ({ slug: f.replace(/\.json$/, ""), file: `${name}/${f}`, ...readJson(`${name}/${f}`) }));
const need = (item, keys) => { for (const k of keys) if (item[k] === undefined || item[k] === null || item[k] === "" || (Array.isArray(item[k]) && !item[k].length)) problems.push(`content/${item.file}: "${k}" is empty`); };

// Plain text typed by an editor, made safe to put in HTML.
export const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
// Rich text from the editor: keep formatting and links, drop anything that could run code.
export const clean = (html) => String(html ?? "")
  .replace(/<(script|style|iframe|object|embed|form)\b[\s\S]*?<\/\1>/gi, "")
  .replace(/<(script|style|iframe|object|embed|form|input|button|meta|link)\b[^>]*>/gi, "")
  .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
  .replace(/(href|src)\s*=\s*(["'])\s*(javascript|data|vbscript):[^"']*\2/gi, '$1="#"');

// ---- Jobs ----
export const sectors = { industrial: "hardhat", disability: "heart", community: "people" };
export const jobs = folder("jobs").map((j) => {
  need(j, ["title", "sector", "towns", "intro"]);
  if (!/^[a-z0-9-]+$/.test(j.slug)) problems.push(`content/${j.file}: file name must use only lower-case letters, numbers and dashes`);
  if (j.sector && !sectors[j.sector]) problems.push(`content/${j.file}: sector must be industrial, disability or community`);
  return { duties: [], need: [], nice: [], order: 100, show: false, ...j };
}).sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

// ---- News ----
export const posts = folder("news").map((p) => {
  need(p, ["title", "date", "summary", "body"]);
  if (p.date && !/^\d{4}-\d{2}-\d{2}/.test(p.date)) problems.push(`content/${p.file}: date must look like 2026-11-26`);
  if (p.title && p.title.length > 57) problems.push(`content/${p.file}: title is ${p.title.length} characters; keep it to 57 or fewer`);
  if (p.summary && (p.summary.length < 110 || p.summary.length > 165)) problems.push(`content/${p.file}: summary is ${p.summary.length} characters; it needs 110 to 165`);
  return { tag: "News", ...p, date: String(p.date).slice(0, 10), page: `news-${p.slug.replace(/^\d{4}-\d{2}-\d{2}-/, "")}.html` };
}).sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));

// ---- Rates ----
export const rates = readJson("settings/rates.json");
export const rateKeys = ["generalLabourer", "disabilitySupportWorker", "transport", "communitySupportWorker", "cleaner", "supportCoordinatorAssistant"];
for (const k of rateKeys) {
  const r = rates[k];
  if (!r) { problems.push(`content/settings/rates.json: "${k}" is missing`); continue; }
  if (r.rate !== null && r.rate !== undefined && r.rate !== "" && !(Number(r.rate) > 0)) problems.push(`content/settings/rates.json: ${k} rate must be a number or empty`);
}
const has = (k) => rates[k] && rates[k].rate !== null && rates[k].rate !== undefined && rates[k].rate !== "";
/** "$70" for a role, or null when the role is priced by quote. */
export const price = (k) => (has(k) ? `$${Number(rates[k].rate)}` : null);
/** Sentence fragment for FAQs: "$70 an hour, excluding GST" or "priced by quote". */
export const priceText = (k) => (has(k) ? `${price(k)} an hour, excluding GST` : "priced by quote to your needs");
export const lowestRate = () => Math.min(...rateKeys.filter(has).map((k) => Number(rates[k].rate)));

// ---- Areas ----
export const regions = (readJson("settings/areas.json").regions || []).filter((r) => r && r.name && r.towns && r.towns.length);
if (!regions.length) problems.push("content/settings/areas.json: add at least one region with towns");

if (problems.length) throw new Error("Content problems (fix these in Pages CMS):\n- " + problems.join("\n- "));
