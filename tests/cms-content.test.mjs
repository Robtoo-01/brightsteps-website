// Proves the Pages CMS content drives the site, and that a bad edit is stopped before it goes live.
// Each test copies content/ to a scratch folder, makes an editor-style change, and renders pages from it.
import { test } from "node:test";
import assert from "node:assert/strict";
import { cpSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";

const root = new URL("../", import.meta.url).pathname;
function scratch(edit) {
  const dir = mkdtempSync(join(tmpdir(), "bs-content-"));
  cpSync(join(root, "content"), dir, { recursive: true });
  const json = (f) => JSON.parse(readFileSync(join(dir, f), "utf8"));
  const save = (f, d) => writeFileSync(join(dir, f), JSON.stringify(d, null, 2));
  edit({ json, save, dir });
  return dir;
}
// Renders the named page bodies with the scratch content, in a fresh Node process.
function render(dir, script) {
  return execFileSync(process.execPath, ["--input-type=module", "-e", script], { cwd: root, env: { ...process.env, BRIGHTSTEPS_CONTENT: dir }, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
}
const page = (mod, file) => `import { pages } from "./src/pages/${mod}.mjs"; process.stdout.write(pages.find((p) => p.file === "${file}").body);`;

test("Unticking 'Show on website' hides a job everywhere it could appear", () => {
  const dir = scratch(({ json, save }) => {
    for (const f of ["general-labourer", "mining-labourer", "construction-labourer", "warehouse-logistics", "community-support-worker", "transport-community-access", "cleaner-domestic-support", "support-coordinator-assistant"]) save(`jobs/${f}.json`, { ...json(`jobs/${f}.json`), show: false });
  });
  const jobs = render(dir, page("growth", "jobs.html"));
  assert.equal([...jobs.matchAll(/apply\.html\?role=/g)].length, 1);
  assert.ok(jobs.includes("Apply: Disability support worker"));
  const apply = render(dir, page("conversion", "apply.html"));
  assert.ok(apply.includes("disability-support-worker") && !apply.includes("general-labourer"));
});

test("With every job hidden, the Jobs page invites people to register", () => {
  const dir = scratch(({ json, save }) => {
    for (const f of ["general-labourer", "mining-labourer", "construction-labourer", "warehouse-logistics", "disability-support-worker", "community-support-worker", "transport-community-access", "cleaner-domestic-support", "support-coordinator-assistant"]) save(`jobs/${f}.json`, { ...json(`jobs/${f}.json`), show: false });
  });
  assert.ok(render(dir, page("growth", "jobs.html")).includes("not advertising specific roles right now"));
});

test("Changing a rate updates the pricing table, the service page FAQ and the home page 'from' price", () => {
  const dir = scratch(({ json, save }) => {
    const r = json("settings/rates.json");
    r.generalLabourer.rate = 75; r.transport.rate = 66; r.cleaner.rate = 60;
    save("settings/rates.json", r);
  });
  const pricing = render(dir, page("conversion", "pricing.html"));
  assert.ok(pricing.includes('<span class="rate">$75</span>') && pricing.includes('<span class="rate">$60</span>'));
  assert.ok(render(dir, page("services", "industrial-labour-hire.html")).includes("$75 an hour, excluding GST"));
  assert.ok(render(dir, page("services", "transport-community-access.html")).includes("$66 an hour (ex GST) plus vehicle costs"));
  assert.ok(render(dir, page("core", "index.html")).includes("start from $60 an hour"));
});

test("Emptying a rate shows 'Get a quote' instead of a price", () => {
  const dir = scratch(({ json, save }) => { const r = json("settings/rates.json"); r.transport.rate = null; save("settings/rates.json", r); });
  const pricing = render(dir, page("conversion", "pricing.html"));
  assert.ok(pricing.includes('data-track="pricing-quote-transport">Get a quote'));
  assert.ok(render(dir, page("services", "transport-community-access.html")).includes("priced by quote"));
});

test("A new town added in Areas shows on the Areas page", () => {
  const dir = scratch(({ json, save }) => { const a = json("settings/areas.json"); a.regions[0].towns.push("Barraba"); save("settings/areas.json", a); });
  assert.ok(render(dir, page("growth", "areas-we-cover.html")).includes("<li>Barraba</li>"));
});

test("A new news post appears on the News page and gets its own page", () => {
  const dir = scratch(({ save }) => save("news/2026-12-05-open-day.json", { title: "Hiring open day in Gunnedah", date: "2026-12-05", tag: "Event", summary: "Meet our team, bring your tickets and resume, and register for labouring and support work on the day. Free, no appointment needed.", body: "<p>Details here.</p>" }));
  const out = render(dir, `import { pages } from "./src/pages/news.mjs"; import { newsCards } from "./src/pages/news.mjs"; process.stdout.write(newsCards + pages.map((p) => p.file).join(","));`);
  assert.ok(out.includes('href="news-open-day.html">Hiring open day in Gunnedah') && out.includes("news-open-day.html"));
  assert.ok(out.indexOf("open-day") < out.indexOf("hiring-regional-nsw"), "newest post first");
});

test("Editor text can't inject code into the site", () => {
  const dir = scratch(({ json, save }) => {
    save("jobs/general-labourer.json", { ...json("jobs/general-labourer.json"), title: "Labourer <script>alert(1)</script>" });
    save("news/2026-11-26-white-card-nsw.json", { ...json("news/2026-11-26-white-card-nsw.json"), body: '<p onclick="x()">Hi</p><script>alert(1)</script><a href="javascript:alert(1)">x</a><iframe src="https://evil"></iframe>' });
  });
  const jobs = render(dir, page("growth", "jobs.html"));
  assert.ok(!jobs.includes("<script>") && jobs.includes("Labourer &lt;script&gt;"));
  const post = render(dir, page("news", "news-white-card-nsw.html"));
  for (const bad of ["<script", "onclick", "javascript:", "<iframe"]) assert.ok(!post.includes(bad), bad);
});

test("A bad edit stops the build with a plain message, so the live site is untouched", () => {
  const dir = scratch(({ json, save }) => {
    save("news/2026-11-26-white-card-nsw.json", { ...json("news/2026-11-26-white-card-nsw.json"), summary: "Too short." });
    save("jobs/mining-labourer.json", { ...json("jobs/mining-labourer.json"), towns: [] });
  });
  let err;
  try { render(dir, `import "./src/content.mjs";`); } catch (e) { err = e.stderr; }
  assert.match(err, /summary is 10 characters; it needs 110 to 165/);
  assert.match(err, /mining-labourer\.json: "towns" is empty/);
});

test("The Pages CMS settings file covers jobs, news, rates and areas", () => {
  const yml = readFileSync(join(root, ".pages.yml"), "utf8");
  for (const p of ["path: content/jobs", "path: content/news", "path: content/settings/rates.json", "path: content/settings/areas.json"]) assert.ok(yml.includes(p), p);
  assert.match(readFileSync(join(root, "netlify.toml"), "utf8"), /command = "node src\/build.mjs"\s+publish = "site"/);
});
