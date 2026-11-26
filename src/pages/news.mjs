import { site } from "../config.mjs";
import { btn, ctaBand } from "../layout.mjs";

// News posts, newest first. To add one: copy a block, give it a new file name, date, title, summary and body.
// Keep posts factual: no invented events, numbers or reviews.
export const posts = [
  {
    file: "news-hiring-regional-nsw.html", date: "2026-11-26", tag: "Hiring",
    title: "We're registering workers across regional NSW",
    summary: "Casual labouring, mining, disability support, community, transport and cleaning roles from Tamworth to the Hunter and Sydney. Here's what we're looking for.",
    body: `<p>BrightSteps is registering workers for casual and ongoing shifts across the New England and North West, the Hunter and Sydney. Our new <a href="jobs.html">Jobs page</a> lists each role we're currently hiring for, the towns it covers, and what you need to apply.</p>
<h2>Who we're looking for</h2>
<ul><li><strong>Labourers</strong> for construction, civil, agricultural and warehouse sites</li><li><strong>Mining labourers</strong> for sites around Gunnedah, Narrabri and the Upper Hunter</li><li><strong>Disability support workers</strong> for in-home, community access, respite and SIL shifts</li><li><strong>Community support workers, drivers and cleaners</strong> for local programs</li></ul>
<h2>How to apply</h2>
<p>Choose a role on the <a href="jobs.html">Jobs page</a> and press Apply. The form takes about five minutes and it's free. We read every application and call you to talk about your skills, availability and the towns you can work in.</p>
<p>Don't see your role or town? <a href="apply.html">Register anyway</a> and we'll contact you when something suits.</p>`,
  },
  {
    file: "news-areas-we-cover.html", date: "2026-11-26", tag: "News",
    title: "Where BrightSteps supplies workers",
    summary: "From our Tamworth office we supply labourers and support workers to towns across the New England and North West, the Hunter and Sydney.",
    body: () => `<p>Our office is at ${site.street}, ${site.locality}. From here we supply screened, insured workers to sites and providers across regional New South Wales.</p>
<h2>Towns we cover</h2>
${Object.entries(site.towns).map(([region, towns]) => `<p><strong>${region}:</strong> ${towns.join(", ")}</p>`).join("\n")}
<p>Not on the list? Call us on <a href="tel:${site.phoneIntl}">${site.phone}</a>. We'll tell you straight away whether we can help. See the full <a href="areas-we-cover.html">areas we cover</a> page.</p>
<h2>What we supply</h2>
<p><a href="industrial-labour-hire.html">Industrial labour hire</a> for mines, civil sites and warehouses, <a href="disability-support-staffing.html">disability support workers</a> for NDIS providers, and <a href="community-services-staffing.html">community services staff</a>, including drivers and cleaners.</p>`,
  },
  {
    file: "news-ndis-worker-check-nsw.html", date: "2026-11-26", tag: "Guide",
    title: "How to get an NDIS Worker Check in NSW",
    summary: "Most disability support roles need an NDIS Worker Check. Here's how the NSW process works, step by step, and what to bring.",
    body: `<p>In New South Wales, NDIS worker screening is called the <strong>NDIS Worker Check (NDISWC)</strong>. Most disability support roles need one. Here's how it works.</p>
<h2>Who can apply</h2>
<p>You can apply when you are doing, or about to start, NDIS work, because an NDIS employer has to verify your application. If you're registering with BrightSteps for disability support work, talk to us first and we'll explain what to do.</p>
<h2>The steps</h2>
<ol><li><strong>Apply online</strong> through your MyServiceNSW account on the Service NSW website. You can't apply in the Service NSW phone app.</li><li><strong>Visit a Service NSW centre</strong> within 28 days of starting your application. Bring your original identity documents, pay the fee and have your photo taken.</li><li><strong>The screening agency checks your application</strong>, run by the NSW Office of the Children's Guardian.</li><li><strong>Your employer verifies your application</strong> through the NDIS Worker Screening Database.</li></ol>
<h2>What to bring</h2>
<p>You need four identity documents from set categories. Check the current list in the official application guide before you go.</p>
<h2>How long it lasts</h2>
<p>A clearance is valid for five years. If you change employers or roles while it's current, you don't need to reapply.</p>
<p>Official information: <a href="https://www.service.nsw.gov.au/ndiswc" rel="noopener">Service NSW: NDIS Worker Check</a> and <a href="https://ocg.nsw.gov.au/ndiswc-apply-and-manage/how-apply" rel="noopener">Office of the Children's Guardian: how to apply</a>.</p>
<p>Ready to work? See our <a href="jobs.html">disability support jobs</a>.</p>`,
  },
  {
    file: "news-white-card-nsw.html", date: "2026-11-26", tag: "Guide",
    title: "What is a White Card, and how do you get one in NSW?",
    summary: "You need a White Card to work on a construction site. Here's how to get one in NSW and how long it stays valid.",
    body: `<p>A <strong>White Card</strong> (general construction induction card) is required for anyone who carries out construction work, including labourers, tradespeople and site supervisors. Most of our labouring roles need one.</p>
<h2>How to get one in NSW</h2>
<ol><li><strong>Book a course</strong> in general construction induction training with a Registered Training Organisation (RTO) approved by SafeWork NSW. The course is CPCWHS1001 Prepare to work safely in the construction industry.</li><li><strong>Bring 100 points of identification</strong> to your trainer.</li><li><strong>Complete the training.</strong> Your trainer gives you a statement of training you can use for 60 days while your card arrives from SafeWork NSW.</li></ol>
<p>You can also add a digital White Card to the Service NSW app, but you still need to carry the physical card.</p>
<h2>Does it expire?</h2>
<p>Your White Card becomes void if you haven't done construction work for two years in a row. NSW recognises White Cards issued in other states and territories.</p>
<p>Official information: <a href="https://www.safework.nsw.gov.au/licences-and-registrations/white-cards" rel="noopener">SafeWork NSW: White cards</a>.</p>
<p>Got your card? See our <a href="jobs.html">labouring jobs</a>.</p>`,
  },
];

const fmt = (d) => new Date(`${d}T00:00:00`).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
const bodyOf = (p) => (typeof p.body === "function" ? p.body() : p.body);

export const newsCards = `<div class="grid grid--3">
${posts.map((p) => `  <article class="card news-card">
    <p class="meta"><time datetime="${p.date}">${fmt(p.date)}</time> · ${p.tag}</p>
    <h2 style="font-size:var(--step-1)"><a href="${p.file}">${p.title}</a></h2>
    <p>${p.summary}</p>
  </article>`).join("\n")}
</div>`;

export const pages = posts.map((p) => ({
  file: p.file,
  title: `${p.title} | BrightSteps`,
  description: p.summary,
  ogType: "article",
  crumbs: [["News", "news.html"], [p.title, ""]],
  plan: { purpose: "News post.", audience: "Employers, job seekers, local community.", imagery: "None yet; add a real photo when available.", conversion: "Links to Jobs and services; CTA band.", schemaNote: "Article." },
  schema: [{ "@context": "https://schema.org", "@type": "Article", headline: p.title, datePublished: p.date, author: { "@id": `${site.url}/#organization` }, publisher: { "@id": `${site.url}/#organization` }, image: `${site.url}/assets/img/og-image.png` }],
  body: `<section class="page-hero"><div class="container">
  <nav class="breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="index.html">Home</a></li><li><a href="news.html">News</a></li><li><span aria-current="page">${p.title}</span></li></ol></nav>
  <p class="eyebrow">${p.tag} · <time datetime="${p.date}">${fmt(p.date)}</time></p>
  <h1>${p.title}</h1>
  <p class="lead">${p.summary}</p>
</div></section>
<article class="section">
  <div class="container prose">
    ${bodyOf(p)}
    <p><a class="text-link" href="news.html">Back to all news</a></p>
  </div>
</article>
${ctaBand({ secondary: btn("jobs.html", "Looking for work? See jobs", "ghost", "news-band-jobs") })}`,
}));
