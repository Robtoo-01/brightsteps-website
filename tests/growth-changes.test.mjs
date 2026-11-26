// Checks the Contract Care comparison changes and the jobs page (26 Nov 2026). Run: npm run build && npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";

const dir = new URL("../site/", import.meta.url);
const read = (f) => readFileSync(new URL(f, dir), "utf8");
const pages = readdirSync(dir).filter((f) => f.endsWith(".html"));
const visible = (html) => html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<!--[\s\S]*?-->/g, "");
const towns = ["Tamworth", "Armidale", "Gunnedah", "Quirindi", "Moree", "Sydney", "Newcastle", "Singleton"];

test("Application inbox never appears in the built site", () => {
  const all = [...pages, "assets/js/main.js", "_headers", "_redirects", "sitemap.xml"];
  for (const f of all) assert.ok(!read(f).includes("araptera"), `${f} exposes the application inbox`);
});

test("Home hero names the sectors and region; cliché lines are gone", () => {
  const home = visible(read("index.html"));
  assert.match(home, /<h1 id="hero-title">Labour hire and support workers for regional NSW/);
  for (const bad of ["One trusted partner", "Bridging the gap", "more than a transaction"]) {
    for (const f of pages) assert.ok(!visible(read(f)).includes(bad), `${f} still says "${bad}"`);
  }
  assert.ok(home.includes("Urgent cover or planned staffing"));
});

test("Requested towns appear on the home page, Areas page and in schema", () => {
  const areas = visible(read("areas-we-cover.html"));
  const home = read("index.html");
  for (const t of towns) {
    assert.ok(areas.includes(`<li>${t}</li>`), `Areas page missing ${t}`);
    assert.ok(home.includes(`{"@type":"City","name":"${t}"}`), `schema missing ${t}`);
  }
  assert.ok(read("sitemap.xml").includes("/areas-we-cover</loc>") && read("sitemap.xml").includes("/jobs</loc>"));
});

test("Care pages no longer use construction wording for insurance", () => {
  for (const f of ["disability-support-staffing.html", "community-services-staffing.html", "cleaning-domestic-support.html", "transport-community-access.html"]) {
    assert.ok(!visible(read(f)).includes("so your project is protected"), f);
  }
  assert.ok(visible(read("industrial-labour-hire.html")).includes("we only send workers who hold them"));
});

test("Every job advert's Apply button maps to a role the form knows", () => {
  const roles = JSON.parse(read("apply.html").match(/data-roles="([^"]+)"/)[1].replaceAll("&quot;", '"'));
  const slugs = [...read("jobs.html").matchAll(/href="apply\.html\?role=([a-z-]+)"/g)].map((m) => m[1]);
  assert.equal(slugs.length, 9);
  for (const s of slugs) assert.ok(roles[s], `no role for ${s}`);
  assert.match(read("apply.html"), /<input type="hidden" name="a-role" id="a-role" value="" data-prefill-role/);
});

test("Jobs and Areas are linked from the nav or footer of every page", () => {
  for (const f of pages) {
    const html = read(f);
    assert.ok(html.includes('href="jobs.html"') && html.includes('href="areas-we-cover.html"'), f);
  }
});

test("News: every post is listed on the news page, indexed and cites official sources for the guides", () => {
  const list = read("news.html");
  const posts = [...list.matchAll(/<h2[^>]*><a href="(news-[a-z0-9-]+\.html)">/g)].map((m) => m[1]);
  assert.equal(posts.length, 4);
  for (const f of posts) {
    assert.ok(pages.includes(f), `${f} not built`);
    assert.ok(read("sitemap.xml").includes(`/${f.replace(".html", "")}</loc>`), `${f} not in sitemap`);
  }
  assert.ok(read("news-ndis-worker-check-nsw.html").includes("https://www.service.nsw.gov.au/ndiswc"));
  assert.ok(read("news-white-card-nsw.html").includes("https://www.safework.nsw.gov.au/licences-and-registrations/white-cards"));
});

