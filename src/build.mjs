// Builds the static site into ../site and the page plan into ../docs. Run: node src/build.mjs
import { writeFileSync, existsSync, cpSync, mkdirSync, rmSync } from "node:fs";
import { themes } from "./themes.mjs";
import { checkThemes } from "./check-contrast.mjs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { site } from "./config.mjs";
import { render, pageUrl } from "./layout.mjs";
import { pages as core } from "./pages/core.mjs";
import { pages as services } from "./pages/services.mjs";
import { pages as conversion } from "./pages/conversion.mjs";
import { pages as legal } from "./pages/legal.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "site");
const pages = [...core, ...services, ...conversion, ...legal];
const strip = (s) => s.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

// ---- Render pages ----
const problems = [];
for (const page of pages) {
  const html = render(page);
  writeFileSync(join(out, page.file), html);

  // Self-checks: one H1, sane title/description lengths, every internal link resolves.
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) problems.push(`${page.file}: ${h1s} <h1> elements`);
  if (page.title.length > 70) problems.push(`${page.file}: title ${page.title.length} chars`);
  if (!page.noindex && (page.description.length < 110 || page.description.length > 165)) problems.push(`${page.file}: description ${page.description.length} chars`);
  for (const [, href] of html.replace(/<!--[\s\S]*?-->/g, "").matchAll(/href="([^"#:?]+\.(?:html|css|svg|webmanifest))[^"]*"/g)) {
    if (!href.startsWith("http") && !existsSync(join(out, href)) && !pages.some((p) => p.file === href)) problems.push(`${page.file}: broken link ${href}`);
  }
}

// ---- sitemap.xml, robots.txt, redirects, manifest ----
const indexable = pages.filter((p) => !p.noindex);
writeFileSync(join(out, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable.map((p) => `  <url><loc>${pageUrl(p.file)}</loc></url>`).join("\n")}
</urlset>
`);
writeFileSync(join(out, "robots.txt"), `User-agent: *\nAllow: /\nDisallow: /news-article-template\n\nSitemap: ${site.url}/sitemap.xml\n`);
// Netlify / Cloudflare Pages format. Keeps old URLs (and their search ranking) working.
writeFileSync(join(out, "_redirects"), `/about-us              /about                 301
/pricing-schedule-8    /pricing               301
/products              /services              301
/services/             /services              301
/events-news           /news                  301
/Classes               /request-staff         301
/images/document/22319576/BrightStepsPrivacyPolicy-J5S4wulODMCXSGtDo1gifQ.pdf  /privacy  301
/images/document/22321807/BrightStepsLegalNotice-AchkSWtX5VGYCrH51NZIvw.pdf    /terms    301
/images/document/*     /privacy               301
`);
// ---- Security headers (Netlify / Cloudflare Pages `_headers` format) ----
// CSP is derived from config so it stays correct when form endpoints or analytics are added.
const inlineScripts = new Set(pages.flatMap((p) => [...render(p).matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1])));
const scriptHashes = [...inlineScripts].map((code) => `'sha256-${createHash("sha256").update(code).digest("base64")}'`);
const formOrigins = Object.values(site.forms).filter((u) => /^https:\/\//.test(u)).map((u) => new URL(u).origin);
const ga = site.analyticsId ? { script: " https://www.googletagmanager.com", connect: " https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com", img: " https://*.google-analytics.com https://www.googletagmanager.com" } : { script: "", connect: "", img: "" };
const csp = [
  "default-src 'self'",
  `script-src 'self' ${scriptHashes.join(" ")}${ga.script}`,
  // Google Fonts are allowed only when the live theme doesn't self-host its fonts (F5).
  `style-src 'self' 'unsafe-inline'${themes[site.theme].localFonts ? "" : " https://fonts.googleapis.com"}`,
  `font-src 'self'${themes[site.theme].localFonts ? "" : " https://fonts.gstatic.com"}`,
  `img-src 'self' data:${ga.img}`,
  `connect-src 'self' ${formOrigins.join(" ")}${ga.connect}`.trim(),
  "frame-src https://www.google.com",
  `form-action 'self' ${formOrigins.join(" ")}`.trim(),
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");
writeFileSync(join(out, "_headers"), `/*
  Content-Security-Policy: ${csp}
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()
  Cross-Origin-Opener-Policy: same-origin

/assets/*
  Cache-Control: public, max-age=604800
`);

writeFileSync(join(out, "site.webmanifest"), JSON.stringify({
  name: site.name, short_name: "BrightSteps", start_url: "/", display: "standalone",
  background_color: "#FFFFFF", theme_color: "#0F2A44",
  icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }, { src: "/assets/img/icon-512.png", sizes: "512x512", type: "image/png" }],
}, null, 2));

// ---- Theme previews: the full site once per theme, in previews/<theme>/ (not deployed) ----
const previews = join(root, "previews");
rmSync(previews, { recursive: true, force: true });
for (const key of Object.keys(themes)) {
  const dir = join(previews, key);
  mkdirSync(dir, { recursive: true });
  for (const f of ["assets", "favicon.svg", "site.webmanifest"]) cpSync(join(out, f), join(dir, f), { recursive: true });
  for (const page of pages) writeFileSync(join(dir, page.file), render(page, key));
}

// ---- Page-by-page content and SEO plan, generated from the pages themselves ----
const plan = pages.map((p) => {
  const html = render(p);
  const body = p.body;
  const headings = [...body.matchAll(/<h([1-3])[^>]*>([\s\S]*?)<\/h\1>/g)].map(([, lvl, txt]) => `${"  ".repeat(lvl - 1)}- H${lvl}: ${strip(txt)}`);
  const links = [...new Set([...body.matchAll(/href="([a-z0-9-]+\.html)"/g)].map((m) => m[1]).filter((h) => h !== p.file))];
  const ctas = [...new Set([...body.matchAll(/class="btn btn--[^"]*"[^>]*>([\s\S]*?)<\/a>/g)].map((m) => strip(m[1])))];
  const schemaTypes = [...new Set([...html.matchAll(/"@type":"([A-Za-z]+)"/g)].map((m) => m[1]))].filter((t) => !["PostalAddress", "City", "State", "Person", "ListItem", "Question", "Answer", "Offer", "UnitPriceSpecification", "Service"].includes(t) || (t === "Service" && /"@type":"Service","name"/.test(html)));
  return `## ${p.title.split("|")[0].trim()} (\`${p.file}\`)

| | |
|---|---|
| Purpose | ${p.plan.purpose} |
| Audience | ${p.plan.audience} |
| SEO title | ${p.title} (${p.title.length} chars) |
| Meta description | ${p.description} (${p.description.length} chars) |
| Indexing | ${p.noindex ? "noindex" : "index, canonical"} |
| Calls to action | ${ctas.join(" · ") || "None"} |
| Conversion elements | ${p.plan.conversion} |
| Imagery | ${p.plan.imagery} |
| Internal links | ${links.map((l) => `\`${l}\``).join(", ")} |
| Schema | ${schemaTypes.join(", ")} (${p.plan.schemaNote}) |

**Heading structure**

${headings.join("\n")}

Full copy: see \`site/${p.file}\`.
`;
}).join("\n---\n\n");

writeFileSync(join(root, "docs", "04-page-plan.md"), `# 5. Page-by-page content and SEO plan

Generated by \`node src/build.mjs\` from the page source, so it always matches the built site. The full copy for each page is in its HTML file.

${plan}`);

problems.push(...checkThemes());
console.log(`Built ${pages.length} pages into site/ (theme: ${themes[site.theme].name}), plus previews of ${Object.keys(themes).length} themes in previews/.`);
if (problems.length) { console.error("Problems:\n- " + problems.join("\n- ")); process.exitCode = 1; }
else console.log("Self-checks passed: one H1 per page, titles and descriptions in range, no broken internal links.");
