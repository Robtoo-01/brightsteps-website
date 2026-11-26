// Checks the built site for the website-report changes (R03–R19). Run: npm run build && npm test
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";

const dir = new URL("../site/", import.meta.url);
const read = (f) => readFileSync(new URL(f, dir), "utf8");
const pages = readdirSync(dir).filter((f) => f.endsWith(".html"));
const visible = (html) => html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<!--[\s\S]*?-->/g, "");
const nav = (html) => html.match(/<nav class="site-nav"[\s\S]*?<\/nav>/)[0];
const footer = (html) => html.match(/<footer[\s\S]*?<\/footer>/)[0];

test("R03: no national service-area claims; schema serves NSW only", () => {
  for (const f of pages) {
    const html = read(f);
    for (const bad of ["across Australia", "Australia-wide", "every state and territory", "national reach"]) {
      assert.ok(!visible(html).includes(bad), `${f} still says "${bad}"`);
    }
    assert.ok(!/"@type":"Country","name":"Australia"/.test(html), `${f} schema still serves Australia`);
  }
  assert.match(read("index.html"), /<ul class="chips"><li>New South Wales<\/li><\/ul>/);
});

test("R04: SIL is only offered as staff for registered SIL providers", () => {
  const dis = visible(read("disability-support-staffing.html"));
  assert.ok(dis.includes("We do not deliver Supported Independent Living (SIL) ourselves"));
  assert.ok(!dis.includes("Supported Independent Living (SIL) support<"));
  assert.ok(!visible(read("pricing.html")).includes("In-home, community access, SIL, respite"));
});

test("R05: no universal police/WWCC claim", () => {
  for (const f of pages) {
    const v = visible(read(f));
    assert.ok(!/WWCC verified|Every member of our workforce|police checked and holds/.test(v), `${f} keeps a universal screening claim`);
  }
});

test("R06: disability rate flagged for the 1 December 2026 award increase", () => {
  assert.ok(read("pricing.html").includes("Under review for the award increase from 1 December 2026"));
});

test("R08/R09: client terms and complaints pages exist and are linked from every footer", () => {
  assert.ok(read("client-terms.html").includes("Who employs the workers"));
  assert.ok(read("complaints.html").includes("1800 035 544"));
  for (const f of pages) {
    const ft = footer(read(f));
    assert.ok(ft.includes('href="client-terms.html"') && ft.includes('href="complaints.html"'), `${f} footer missing links`);
  }
});

test("R10: every form shows a collection notice naming Netlify; privacy policy names it too", () => {
  for (const f of ["request-staff.html", "apply.html", "contact.html"]) {
    assert.ok(read(f).includes("Your form is stored by our form provider, Netlify, on servers in the United States"), f);
  }
  assert.ok(read("privacy.html").includes("processed and stored by Netlify, Inc. on servers in the United States"));
});

test("R11: cleaning and transport have their own pages in the Services menu", () => {
  const n = nav(read("index.html"));
  for (const f of ["cleaning-domestic-support.html", "transport-community-access.html"]) {
    assert.ok(pages.includes(f), `${f} missing`);
    assert.ok(n.includes(`href="${f}"`), `${f} not in menu`);
  }
});

test("R12: employer FAQ says BrightSteps employs the workers", () => {
  assert.ok(read("employers.html").includes("BrightSteps employs the workers we supply"));
  assert.ok(read("find-work.html").includes("BrightSteps employs you"));
});

test("R17 (updated 26 Nov 2026): news is published, indexed and linked from the footer, not the main menu", () => {
  for (const f of pages) {
    const html = read(f);
    assert.ok(!nav(html).includes("news.html"), `${f}: news should stay out of the main menu`);
    assert.ok(footer(html).includes('href="news.html"'), `${f}: footer missing news`);
  }
  assert.ok(!read("news.html").includes("noindex"));
  assert.ok(read("sitemap.xml").includes("/news</loc>"));
});

test("R18: accessibility statement no longer says photos are placeholders", () => {
  assert.ok(!read("accessibility.html").includes("currently placeholders"));
});

test("R19: contact page loads no Google map until asked", () => {
  const html = visible(read("contact.html"));
  assert.ok(!/<iframe/.test(html));
  assert.ok(html.includes("data-show-map"));
});

test("Unchanged: ABN, GST and Director wording", () => {
  for (const f of pages) {
    assert.ok(read(f).includes("ABN 18 296 245 747"), `${f} lost the ABN`);
    assert.ok(!read(f).includes("71 374 775 561"), `${f} still shows the old ABN`);
  }
  assert.ok(read("pricing.html").includes("All rates exclude GST."));
  assert.ok(read("terms.html").includes("<strong>Director:</strong> Edwin Ngetich"));
  assert.ok(read("about.html").includes("Led by Director Edwin Ngetich"));
});

test("Mobile menu option A: actions first, Services folds, call card last", () => {
  const n = nav(read("index.html"));
  const ctas = n.indexOf('class="nav-mobile-ctas"'), list = n.indexOf('class="nav-list"'), card = n.indexOf('class="nav-call-card"');
  assert.ok(ctas !== -1 && ctas < list && list < card, "order should be buttons, links, call card");
  assert.match(n, /<button class="nav-sub-toggle" type="button" aria-expanded="false" aria-controls="nav-sub-services">/);
  assert.ok(n.includes('<li class="nav-sub-all"><a href="services.html">All services</a></li>'));
  // On a service page the list starts open, so the current page is visible
  assert.match(nav(read("cleaning-domestic-support.html")), /class="nav-sub-toggle" type="button" aria-expanded="true"/);
});

test("Accessibility: logo link's visible text is part of its name (WCAG 2.5.3)", () => {
  for (const f of pages) {
    assert.ok(read(f).includes('Steps</span></span> <span class="brand-sub">RECRUITMENT</span>'), `${f}: logo words run together`);
  }
});

test("Images: every photo is compressed to 120 KB or less", () => {
  const photos = new URL("assets/img/photos/", dir);
  for (const f of readdirSync(photos)) {
    const kb = readFileSync(new URL(f, photos)).length / 1024;
    assert.ok(kb <= 120, `${f} is ${Math.round(kb)} KB`);
  }
});

// ---- Re-audit fixes (24 Nov 2026) ----
const root = new URL("../", import.meta.url);
const indexable = pages.filter((f) => !read(f).includes("noindex"));

test("F2: phone fields accept common Australian formats and reject junk", () => {
  const pattern = read("contact.html").match(/id="c-phone"[^>]*pattern="([^"]+)"/)[1];
  const re = new RegExp(`^(?:${pattern})$`, "v"); // browsers apply the pattern attribute with the v flag
  for (const ok of ["0424 234 925", "0424-234-925", "(02) 6766 1234", "+61 424 234 925", "0267661234"]) assert.ok(re.test(ok), ok);
  for (const bad of ["abc", "12345", "0424 234 925 ext"]) assert.ok(!re.test(bad), bad);
  for (const f of ["request-staff.html", "apply.html"]) assert.ok(read(f).includes(`pattern="${pattern}"`), `${f} uses the same rule`);
});

test("F3: canonical tags, sitemap and redirects use addresses without .html", () => {
  for (const f of indexable) {
    const canon = read(f).match(/rel="canonical" href="([^"]+)"/)[1];
    assert.ok(!canon.endsWith(".html"), `${f}: ${canon}`);
  }
  assert.ok(!/\.html<\/loc>/.test(read("sitemap.xml")));
  for (const line of read("_redirects").trim().split("\n")) {
    const target = line.split(/\s+/)[1];
    assert.ok(!target.endsWith(".html") && pages.includes(`${target.slice(1)}.html`), `redirect target ${target}`);
  }
});

test("F5: no page loads Google Fonts; fonts are self-hosted and the CSP no longer allows Google", () => {
  for (const f of pages) assert.ok(!/fonts\.(googleapis|gstatic)\.com/.test(read(f)), f);
  const css = read("assets/css/fonts.css");
  for (const m of css.matchAll(/url\("\.\.\/fonts\/([^"]+)"\)/g)) assert.ok(readdirSync(new URL("assets/fonts/", dir)).includes(m[1]), m[1]);
  assert.ok(!/googleapis|gstatic/.test(read("_headers")));
  // First-screen fonts are preloaded, so text doesn't jump when they arrive (layout shift)
  for (const f of pages) assert.equal((read(f).match(/rel="preload" href="assets\/fonts\/[^"]+\.woff2" as="font" type="font\/woff2" crossorigin/g) || []).length, 4, f);
});

test("F6: long links in page text can wrap", () => {
  assert.match(read("assets/css/styles.css"), /\.prose a \{ overflow-wrap: anywhere; \}/);
});

test("F7: résumé field states its allowed types and clear messages", () => {
  const f = read("apply.html").match(/id="a-resume"[^>]*>/)[0];
  assert.ok(f.includes('accept=".pdf,.doc,.docx"') && f.includes('data-type-msg="Upload your résumé as a PDF or Word file"') && f.includes('data-size-msg="Your résumé must be smaller than 5 MB"'));
});

test("F9: thank-you page doesn't claim a message was sent when opened directly", () => {
  const html = read("thank-you.html");
  assert.ok(!html.includes("Your message has been sent. Our team will be in touch soon."));
  assert.match(html, /data-for-default>Thanks for getting in touch with BrightSteps\. If you sent us a form/);
});

test("F10: the first photo on About and the service pages loads straight away; others stay lazy", () => {
  for (const f of ["about.html", "industrial-labour-hire.html", "disability-support-staffing.html", "community-services-staffing.html", "emergency-short-term-staffing.html"]) {
    const first = read(f).match(/<img [^>]*photos\/[^>]*>/)[0];
    assert.ok(first.includes('fetchpriority="high"') && !first.includes('loading="lazy"'), f);
  }
  assert.match(read("index.html").match(/<img [^>]*photos\/[^>]*>/)[0], /loading="lazy"/);
});

test("F11: the sticky mobile bar is a labelled landmark", () => {
  for (const f of pages) assert.ok(read(f).includes('<nav class="mobile-cta-bar" aria-label="Quick actions">'), f);
});

test("F12: docs list the current pages and menu", () => {
  const sitemap = readFileSync(new URL("docs/03-sitemap.md", root), "utf8");
  for (const p of ["cleaning-domestic-support.html", "transport-community-access.html", "client-terms.html", "complaints.html"]) assert.ok(sitemap.includes(p), p);
  assert.ok(!sitemap.includes("About · News · Contact"));
});

test("F13: npm test uses Node's own test discovery", () => {
  assert.equal(JSON.parse(readFileSync(new URL("package.json", root), "utf8")).scripts.test, "node --test");
});
