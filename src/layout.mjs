import { site } from "./config.mjs";
import { themes, fontsHref } from "./themes.mjs";

const p = (d) => `<path d="${d}"/>`;
const svg = (inner) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${inner}</svg>`;

export const icon = {
  phone: svg(p("M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z")),
  mail: svg(`<rect x="2" y="4" width="20" height="16" rx="2"/>${p("m22 7-10 6L2 7")}`),
  pin: svg(`${p("M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z")}<circle cx="12" cy="10" r="3"/>`),
  clock: svg(`<circle cx="12" cy="12" r="10"/>${p("M12 6v6l4 2")}`),
  shield: svg(`${p("M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z")}${p("m9 12 2 2 4-4")}`),
  hardhat: svg(`${p("M2 18h20")}${p("M4 18v-3a8 8 0 0 1 16 0v3")}${p("M10 7V5a2 2 0 0 1 4 0v2")}${p("M9 11v3M15 11v3")}`),
  heart: svg(`${p("M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z")}`),
  people: svg(`<circle cx="9" cy="7" r="4"/>${p("M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2")}${p("M16 3.1a4 4 0 0 1 0 7.8M21 21v-2a4 4 0 0 0-3-3.9")}`),
  bolt: svg(p("M13 2 3 14h9l-1 8 10-12h-9l1-8z")),
  check: svg(p("M20 6 9 17l-5-5")),
  briefcase: svg(`<rect x="2" y="7" width="20" height="14" rx="2"/>${p("M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M2 13h20")}`),
  user: svg(`<circle cx="12" cy="8" r="4"/>${p("M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1")}`),
  search: svg(`<circle cx="11" cy="11" r="7"/>${p("m21 21-4.3-4.3")}`),
  clipboard: svg(`<rect x="8" y="2" width="8" height="4" rx="1"/>${p("M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2")}${p("m9 14 2 2 4-4")}`),
  truck: svg(`${p("M1 3h15v13H1zM16 8h4l3 3v5h-7")}<circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>`),
  sparkle: svg(p("M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 17l.8 2.2L22 20l-2.2.8L19 23l-.8-2.2L16 20l2.2-.8z")),
  calendar: svg(`<rect x="3" y="4" width="18" height="18" rx="2"/>${p("M16 2v4M8 2v4M3 10h18")}`),
  dollar: svg(p("M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6")),
  doc: svg(`${p("M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z")}${p("M14 2v6h6M8 13h8M8 17h5")}`),
  home: svg(`${p("m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z")}${p("M9 22V12h6v10")}`),
  menu: svg(p("M3 6h18M3 12h18M3 18h18")),
  chevron: svg(p("m6 9 6 6 6-6")),
  close: svg(p("M18 6 6 18M6 6l12 12")),
  map: svg(`${p("M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z")}${p("M8 2v16M16 6v16")}`),
};

export const mark = (title = "") => `<svg viewBox="0 0 64 64" ${title ? `role="img" aria-label="${title}"` : 'aria-hidden="true" focusable="false"'}><g transform="translate(0 56) skewX(-14) translate(0 -56)"><rect x="6" y="38" width="11" height="18" rx="5.5" fill="currentColor"/><rect x="21" y="29" width="11" height="27" rx="5.5" fill="currentColor"/><rect x="36" y="20" width="11" height="36" rx="5.5" fill="var(--mark-accent, #0B6E69)"/><circle cx="41.5" cy="9" r="6" fill="#F5A524"/></g></svg>`;

// Public address of a page, without ".html": Netlify serves /about for about.html, so canonical tags,
// the sitemap and structured data use that form (F3).
export const pageUrl = (file) => (file === "index.html" ? `${site.url}/` : `${site.url}/${file.replace(/\.html$/, "")}`);

export const tel = `tel:${site.phoneIntl}`;
export const mailto = `mailto:${site.email}`;
export const address = `${site.street}, ${site.locality} ${site.region} ${site.postcode}`;

// ---------- Reusable blocks ----------
export const btn = (href, label, kind = "primary", track = "", extra = "") =>
  `<a class="btn btn--${kind}" href="${href}"${track ? ` data-track="${track}"` : ""}${extra}>${label}</a>`;
export const callBtn = (kind = "ghost") => btn(tel, `${icon.phone}<span>Call\u00a0${site.phone}</span>`, kind, "call");

export function breadcrumbs(crumbs) {
  const items = [["Home", "index.html"], ...crumbs];
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>${items.map(([label, href], i) =>
    i === items.length - 1 ? `<li><span aria-current="page">${label}</span></li>` : `<li><a href="${href}">${label}</a></li>`).join("")}</ol></nav>`;
}

export function pageHero({ crumbs, h1, lead, ctas = "", accent = "" }) {
  return `<section class="page-hero${accent ? ` ${accent}` : ""}"${accent ? " data-accent" : ""}>
  <div class="container">
    ${breadcrumbs(crumbs)}
    
    <h1>${h1}</h1>
    ${lead ? `<p class="lead">${lead}</p>` : ""}
    ${ctas ? `<div class="btn-row">${ctas}</div>` : ""}
  </div>
</section>`;
}

export function photo(brief, alt, src = "", { portrait = false, w = 1200, h = 900, eager = false } = {}) {
  // With src: a real photo (stock photos are credited in docs/photo-credits.md). Without: a labelled placeholder.
  if (src) return `<figure class="photo${portrait ? " photo--portrait" : ""}"><img src="assets/img/photos/${src}" alt="${alt}" width="${w}" height="${h}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></figure>`; // eager: in the first screen (F10)
  return `<figure class="photo-ph" role="img" aria-label="Photo placeholder: ${alt}"><figcaption><strong>Photo placeholder</strong>${brief}</figcaption></figure>`;
}

export function faq(items, heading = "Frequently asked questions", id = "faq") {
  const html = `<div class="faq">${items.map(([q, a]) => `<details><summary>${q}</summary><div><p>${a}</p></div></details>`).join("")}</div>`;
  const schema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: items.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a.replace(/<[^>]+>/g, "") } })),
  };
  return { html: `<h2 id="${id}">${heading}</h2>${html}<script type="application/ld+json">${JSON.stringify(schema)}</script>`, schema };
}

export function ctaBand({ h2 = "Need reliable people on the ground?", text = "Tell us what you need. We'll confirm availability and next steps, fast.", primary = btn("request-staff.html", "Request staff", "primary", "cta-band-request"), secondary = callBtn("ghost") } = {}) {
  return `<section class="section" aria-labelledby="cta-band-title"><div class="container"><div class="cta-band reveal">
  <div><h2 id="cta-band-title">${h2}</h2><p>${text}</p></div>
  <div class="btn-row">${primary}${secondary}</div>
</div></div></section>`;
}

export function serviceSchema(name, description, url, serviceType) {
  return {
    "@context": "https://schema.org", "@type": "Service", name, description, serviceType,
    url: pageUrl(url),
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "State", name: "New South Wales" },
  };
}

// ---------- Page shell ----------
const nav = [
  ["Services", "services.html", [
    ["Industrial labour hire", "industrial-labour-hire.html"],
    ["Disability support staffing", "disability-support-staffing.html"],
    ["Community services staffing", "community-services-staffing.html"],
    ["Emergency & short-term staffing", "emergency-short-term-staffing.html"],
    ["Cleaning & domestic support", "cleaning-domestic-support.html"],
    ["Transport & community access", "transport-community-access.html"],
  ]],
  ["For employers", "employers.html"],
  ["Find work", "find-work.html"],
  ["Jobs", "jobs.html"],
  ["Pricing", "pricing.html"],
  ["About", "about.html"],
  ["Contact", "contact.html"],
];

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "EmploymentAgency",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: `${site.url}/`,
  logo: `${site.url}/assets/img/logo-horizontal.svg`,
  image: `${site.url}/assets/img/og-image.png`,
  telephone: site.phoneIntl,
  email: site.email,
  taxID: `ABN ${site.abn}`,
  address: { "@type": "PostalAddress", streetAddress: site.street, addressLocality: site.locality, addressRegion: site.region, postalCode: site.postcode, addressCountry: site.country },
  areaServed: [...site.areas.map((name) => ({ "@type": "State", name })), ...Object.values(site.towns).flat().map((name) => ({ "@type": "City", name }))],
  founder: { "@type": "Person", name: site.director, jobTitle: "Director", image: `${site.url}/assets/img/photos/edwin-ngetich.jpg` },
  ...(site.social.length ? { sameAs: site.social.map((s) => s.url) } : {}),
};

export function render(page, themeKey = site.theme) {
  const theme = themes[themeKey];
  const url = pageUrl(page.file);
  const isActive = (href, sub = []) => href === page.file || sub.some(([, h]) => h === page.file);
  const schemas = [orgSchema, ...(page.schema || [])];
  if (page.crumbs) {
    const items = [["Home", "index.html"], ...page.crumbs];
    schemas.push({
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: items.map(([name, href], i) => ({ "@type": "ListItem", position: i + 1, name, item: pageUrl(href || page.file) })),
    });
  }
  const candidate = page.audience === "candidate";
  const barCta = candidate ? btn("apply.html", "Apply for work", "primary", "bar-apply") : btn("request-staff.html", "Request staff", "primary", "bar-request");

  return `<!DOCTYPE html>
<html lang="en-AU"${site.analyticsId ? ` data-ga="${site.analyticsId}"` : ""}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${page.file === "404.html" ? '<base href="/">' /* 404 is served at any depth; resolve assets from the root */ : ""}
<title>${page.title}</title>
<meta name="description" content="${page.description}">
${page.noindex ? '<meta name="robots" content="noindex, follow">' : `<link rel="canonical" href="${url}">`}
<meta name="theme-color" content="${theme.themeColor}">
<meta property="og:type" content="${page.ogType || "website"}">
<meta property="og:site_name" content="${site.name}">
<meta property="og:locale" content="en_AU">
<meta property="og:title" content="${page.ogTitle || page.title}">
<meta property="og:description" content="${page.description}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${site.url}/assets/img/og-image.png">
<meta property="og:image:alt" content="BrightSteps Recruitment logo on a navy background">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${page.ogTitle || page.title}">
<meta name="twitter:description" content="${page.description}">
<meta name="twitter:image" content="${site.url}/assets/img/og-image.png">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png">
<link rel="manifest" href="site.webmanifest">
${theme.localFonts ? "" : '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'}<link rel="stylesheet" href="${fontsHref(themeKey)}">
${theme.localFonts ? ["lexend-latin-600-normal", "atkinson-hyperlegible-latin-400-normal", "atkinson-hyperlegible-latin-700-normal", "bricolage-grotesque-latin-800-normal"].map((f) => `<link rel="preload" href="assets/fonts/${f}.woff2" as="font" type="font/woff2" crossorigin>`).join("\n") : "" /* first-screen fonts arrive before first paint, so text doesn't jump (layout shift) */}
<link rel="stylesheet" href="assets/css/styles.css">
<link rel="stylesheet" href="assets/css/themes/${themeKey}.css">
<script>document.documentElement.classList.add("js")</script>
<script src="assets/js/main.js" defer></script>
${schemas.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join("\n")}
</head>
<body>
<a class="skip-link" href="#main">Skip to main content</a>
<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="index.html" aria-label="${site.name} home">${mark()}<span><span class="brand-name">Bright<span>Steps</span></span> <span class="brand-sub">RECRUITMENT</span></span></a>
    <nav class="site-nav" id="site-nav" aria-label="Main">
      <div class="nav-mobile-ctas">
        ${btn("request-staff.html", "Request staff", "primary", "nav-request")}
        ${btn("apply.html", "Apply for work", "apply", "nav-apply")}
      </div>
      <ul class="nav-list">
        ${nav.map(([label, href, sub]) => sub
          // Desktop: the link with a hover dropdown. Mobile: a button that folds the list open (option A, 24 Nov 2026).
          ? `<li class="has-sub"><a class="nav-sub-link" href="${href}"${isActive(href) ? ' aria-current="page"' : ""}>${label}</a><button class="nav-sub-toggle" type="button" aria-expanded="${isActive(href, sub) ? "true" : "false"}" aria-controls="nav-sub-${href.replace(".html", "")}"><span><span class="nav-sub-label">${label}</span><span class="nav-sub-hint">${sub.length} ways we can help</span></span><span class="nav-chevron">${icon.chevron}</span></button><ul class="nav-sub" id="nav-sub-${href.replace(".html", "")}"><li class="nav-sub-all"><a href="${href}"${href === page.file ? ' aria-current="page"' : ""}>All ${label.toLowerCase()}</a></li>${sub.map(([l, h]) => `<li><a href="${h}"${h === page.file ? ' aria-current="page"' : ""}>${l}</a></li>`).join("")}</ul></li>`
          : `<li><a href="${href}"${isActive(href) ? ' aria-current="page"' : ""}>${label}</a></li>`).join("\n        ")}
      </ul>
      <a class="nav-call-card" href="${tel}" data-track="nav-call"><span class="nav-call-icon">${icon.phone}</span><span><strong>${site.phone}</strong><span>Call us any time, 24/7</span></span></a>
    </nav>
    <div class="header-actions">
      <a class="header-call" href="${tel}" data-track="header-call">${icon.phone}<span class="header-call-text">${site.phone}</span><span class="visually-hidden"> (call BrightSteps)</span></a>
      ${btn("request-staff.html", "Request staff", "primary header-cta", "header-request")}
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu"><span class="icon-menu">${icon.menu}</span><span class="icon-close">${icon.close}</span></button>
    </div>
  </div>
</header>

<main id="main" tabindex="-1">
${page.body}
</main>

<footer class="site-footer on-dark">
  <div class="container">
    <div class="footer-grid">
      <div>
        <a class="brand" href="index.html" style="--mark-accent:#7FD1C9">${mark()}<span><span class="brand-name">Bright<span>Steps</span></span> <span class="brand-sub">RECRUITMENT</span></span></a>
        <p>Locally owned workforce solutions from Tamworth. Screened, insured and supported people for industrial sites, disability support and community services across New South Wales.</p>
        ${site.social.length ? `<div class="social">${site.social.map((s) => `<a href="${s.url}" rel="noopener" target="_blank"><span class="visually-hidden">${s.name} (opens in a new tab)</span>${icon.people}</a>`).join("")}</div>` : ""}
      </div>
      <nav aria-labelledby="f-services">
        <h2 id="f-services">Services</h2>
        <ul>
          <li><a href="industrial-labour-hire.html">Industrial labour hire</a></li>
          <li><a href="disability-support-staffing.html">Disability support staffing</a></li>
          <li><a href="community-services-staffing.html">Community services staffing</a></li>
          <li><a href="emergency-short-term-staffing.html">Emergency &amp; short-term staffing</a></li>
          <li><a href="cleaning-domestic-support.html">Cleaning &amp; domestic support</a></li>
          <li><a href="transport-community-access.html">Transport &amp; community access</a></li>
          <li><a href="pricing.html">Pricing schedule</a></li>
        </ul>
      </nav>
      <nav aria-labelledby="f-company">
        <h2 id="f-company">Company</h2>
        <ul>
          <li><a href="about.html">About us</a></li>
          <li><a href="employers.html">For employers</a></li>
          <li><a href="find-work.html">Find work</a></li>
          <li><a href="jobs.html">Jobs available</a></li>
          <li><a href="areas-we-cover.html">Areas we cover</a></li>
          <li><a href="news.html">News</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
      <div>
        <h2>Contact</h2>
        <address>
          <span>${site.name}</span>
          <span>${site.street}<br>${site.locality} ${site.region} ${site.postcode}</span>
          <a href="${tel}" data-track="footer-call">${site.phone}</a>
          <a href="${mailto}" data-track="footer-email">${site.email}</a>
          <span>ABN ${site.abn}</span>
          <span>Support available 24/7</span>
        </address>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; <span data-year>2026</span> ${site.name}. ABN ${site.abn}.<span class="dev-credit"> Website developed by <a href="${site.developer.url}" target="_blank" rel="noopener" data-track="developer-credit">${site.developer.name}<span class="visually-hidden"> (opens in a new tab)</span></a></span></p>
      <ul>
        <li><a href="privacy.html">Privacy policy</a></li>
        <li><a href="terms.html">Legal notice &amp; terms</a></li>
        <li><a href="client-terms.html">Client terms</a></li>
        <li><a href="complaints.html">Feedback &amp; complaints</a></li>
        <li><a href="accessibility.html">Accessibility</a></li>
        <li><button type="button" class="link-btn" data-cookie-settings aria-haspopup="dialog">Cookie settings</button></li>
      </ul>
    </div>
  </div>
</footer>

<nav class="mobile-cta-bar" aria-label="Quick actions">${btn(tel, `${icon.phone}<span>Call</span>`, "secondary", "bar-call")}${barCta}</nav>

<section class="cookie-notice" id="cookie-notice" aria-labelledby="cookie-title" hidden>
  <h2 id="cookie-title">Your privacy</h2>
  <p>We use essential storage to run this site. With your permission we'd also use analytics cookies to understand which pages help people most. <a href="privacy.html#cookies">Read our privacy policy</a>.</p>
  <div class="btn-row"><button class="btn btn--secondary" type="button" data-consent="accepted">Accept analytics</button><button class="btn btn--ghost" type="button" data-consent="declined">Essential only</button></div>
  <p class="cookie-manage"><button type="button" class="link-btn" data-cookie-settings aria-haspopup="dialog">Manage cookie settings</button></p>
</section>

<dialog class="cookie-dialog" id="cookie-settings" aria-labelledby="cookie-settings-title" aria-describedby="cookie-settings-intro">
  <form method="dialog">
    <div class="cookie-dialog-head">
      <h2 id="cookie-settings-title">Cookie settings</h2>
      <button class="cookie-close" type="submit" value="cancel" aria-label="Close cookie settings">${icon.close}</button>
    </div>
    <p id="cookie-settings-intro">Choose which cookies we can use. You can change this at any time from "Cookie settings" at the bottom of every page. <a href="privacy.html#cookies">Read our privacy policy</a>.</p>
    <div class="cookie-option">
      <div>
        <h3 id="cookie-essential-label">Essential</h3>
        <p id="cookie-essential-desc">Needed for the site to work, such as remembering your cookie choice. These can't be turned off.</p>
      </div>
      <span class="cookie-always">Always on</span>
    </div>
    <div class="cookie-option">
      <div>
        <h3><label for="cookie-analytics">Analytics</label></h3>
        <p id="cookie-analytics-desc">Anonymous statistics about which pages people visit, so we can improve the site. Never used for advertising.</p>
      </div>
      <input class="switch" type="checkbox" id="cookie-analytics" role="switch" aria-describedby="cookie-analytics-desc">
    </div>
    <div class="cookie-dialog-actions">
      <button class="btn btn--ghost" type="submit" value="save">Save my choices</button>
      <button class="btn btn--secondary" type="submit" value="accept-all">Accept all</button>
    </div>
  </form>
</dialog>
</body>
</html>
`;
}
