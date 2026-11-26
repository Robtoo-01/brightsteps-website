import { site } from "../config.mjs";
import { btn, ctaBand } from "../layout.mjs";
import { posts, esc, clean } from "../content.mjs";

// News posts are edited in Pages CMS (content/news). Newest first.
export { posts };

const fmt = (d) => new Date(`${d}T00:00:00`).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });

export const newsCards = `<div class="grid grid--3">
${posts.map((p) => `  <article class="card news-card">
    <p class="meta"><time datetime="${p.date}">${fmt(p.date)}</time> · ${esc(p.tag)}</p>
    <h2 style="font-size:var(--step-1)"><a href="${p.page}">${esc(p.title)}</a></h2>
    <p>${esc(p.summary)}</p>
  </article>`).join("\n")}
</div>`;

export const pages = posts.map((p) => ({
  file: p.page,
  title: `${esc(p.title)} | BrightSteps`,
  description: esc(p.summary),
  ogType: "article",
  crumbs: [["News", "news.html"], [esc(p.title), ""]],
  plan: { purpose: "News post.", audience: "Employers, job seekers, local community.", imagery: "None yet; add a real photo when available.", conversion: "Links to Jobs and services; CTA band.", schemaNote: "Article." },
  schema: [{ "@context": "https://schema.org", "@type": "Article", headline: p.title, datePublished: p.date, author: { "@id": `${site.url}/#organization` }, publisher: { "@id": `${site.url}/#organization` }, image: `${site.url}/assets/img/og-image.png` }],
  body: `<section class="page-hero"><div class="container">
  <nav class="breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="index.html">Home</a></li><li><a href="news.html">News</a></li><li><span aria-current="page">${esc(p.title)}</span></li></ol></nav>
  <p class="eyebrow">${esc(p.tag)} · <time datetime="${p.date}">${fmt(p.date)}</time></p>
  <h1>${esc(p.title)}</h1>
  <p class="lead">${esc(p.summary)}</p>
</div></section>
<article class="section">
  <div class="container prose">
    ${clean(p.body)}
    <p><a class="text-link" href="news.html">Back to all news</a></p>
  </div>
</article>
${ctaBand({ secondary: btn("jobs.html", "Looking for work? See jobs", "ghost", "news-band-jobs") })}`,
}));
