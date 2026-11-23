// Fills docs/themes/index.html with one section per theme (palette, type, screenshots).
// Screenshots come from the theme previews (see docs/10-website-themes.md, "Regenerating the screenshots").
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { themes } from "./themes.mjs";
import { site } from "./config.mjs";

const file = join(dirname(fileURLToPath(import.meta.url)), "..", "docs", "themes", "index.html");

const info = {
  quiet: {
    line: "Calm, editorial and precise: a supplier procurement teams can sign off with confidence.",
    palette: [["Warm off-white", "#F7F5F0"], ["Stone", "#ECE8E0"], ["Charcoal", "#1E2124"], ["Graphite", "#4F5357"], ["Cobalt (accent)", "#1D4F91"]],
    type: ["Headings: Newsreader 500 (serif)", "Body: Source Sans 3 400/600", "Square corners, hairline rules, no shadows"],
  },
  human: {
    line: "Warm, plain-spoken and reassuring: built for support workers, participants' families and care providers.",
    palette: [["Cream", "#FFF9F2"], ["Sand", "#F4EADF"], ["Warm charcoal", "#2B2A28"], ["Deep sage", "#3E6A56"], ["Terracotta (action)", "#B04A2F"], ["Eucalypt", "#2F4F41"]],
    type: ["Headings: Lexend 600", "Body: Atkinson Hyperlegible 400/700, 18 px base", "Rounded, flat, tinted surfaces"],
  },
  industrial: {
    line: "Direct, fast and unmistakable: crews on site, rosters filled, 24/7.",
    palette: [["Charcoal", "#16181A"], ["Concrete", "#E6E8EA"], ["White", "#FFFFFF"], ["Steel", "#4B5157"], ["Safety yellow (action)", "#FFC20E"]],
    type: ["Headings: Barlow Condensed 700, uppercase", "Body: Barlow 400/600 · Labels: IBM Plex Mono", "Hard edges, 2 px rules, grid lines"],
  },
  studio: {
    line: "Polished, contemporary and quietly local: one credible partner for the worksite and the home.",
    palette: [["Bone", "#F4EFE6"], ["Deep bone", "#EAE2D5"], ["Deep ink", "#1C2430"], ["Eucalypt", "#56685A"], ["Burnt ochre (accent)", "#A4471F"]],
    type: ["Headings: Fraunces 500 (optical serif)", "Body: Instrument Sans 400/600", "Asymmetric 7/5 hero, ochre horizon line, hairline cards"],
  },
};

const sections = Object.entries(themes).map(([key, t], i) => {
  const d = info[key];
  return `<section class="theme" id="${key}" aria-labelledby="${key}-h">
  <div class="wrap">
    <p class="tag">Theme ${i + 1}</p>
    <h2 id="${key}-h">${t.name}${key === site.theme ? '<span class="recommended">RECOMMENDED · LIVE THEME</span>' : ""}</h2>
    <p>${d.line}</p>
    <h3>Palette</h3>
    <ul class="swatches">${d.palette.map(([n, hex]) => `<li><span style="background:${hex}"></span><strong>${n}</strong><br>${hex}</li>`).join("")}</ul>
    <h3>Typography and form</h3>
    <div class="type">${d.type.map((x) => `<div>${x}</div>`).join("")}</div>
    <h3>Home page: desktop and phone</h3>
    <div class="shots">
      <div><div class="tall"><img src="${key}-home-desktop.png" alt="${t.name} theme: full home page at desktop width" loading="lazy"></div><p class="cap">Desktop, 1440 px wide (scroll inside the frame)</p></div>
      <div><div class="tall"><img src="${key}-home-mobile.png" alt="${t.name} theme: full home page on a phone" loading="lazy"></div><p class="cap">Phone, 390 px wide</p></div>
    </div>
    <div class="row2">
      <div><div class="tall"><img src="${key}-service-desktop.png" alt="${t.name} theme: Industrial labour hire service page" loading="lazy"></div><p class="cap">Service page: Industrial labour hire</p></div>
      <div><div class="tall"><img src="${key}-form-desktop.png" alt="${t.name} theme: Request staff form" loading="lazy"></div><p class="cap">Request staff form (first screen)</p></div>
    </div>
  </div>
</section>`;
}).join("\n");

const html = readFileSync(file, "utf8").replace(/<!--THEMES-->[\s\S]*?<!--\/THEMES-->|<!--THEMES-->/, `<!--THEMES-->\n${sections}\n<!--/THEMES-->`);
writeFileSync(file, html);
console.log("Updated", file);
