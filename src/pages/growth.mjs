import { site } from "../config.mjs";
import { icon, btn, callBtn, pageHero, faq, ctaBand } from "../layout.mjs";
import { jobs, sectors, esc } from "../content.mjs";

const award = "Casual, paid at least the relevant award rate plus casual loading. We confirm your rate and pay cycle before your first shift.";


// Job adverts are edited in Pages CMS (content/jobs). Only roles with "Show on website" ticked appear,
// and only those can be pre-filled on the Apply form. Old links to a hidden role open a blank application.
export const openJobs = jobs.filter((j) => j.show === true);
const noJobs = `<div class="empty-state"><h3>We're not advertising specific roles right now</h3><p>Register anyway. Tell us what you do and where you can work, and we'll contact you when something suits.</p>${btn("apply.html", "Register for work", "secondary", "jobs-empty-register")}</div>`;

const sectorClass = { industrial: "cat-industrial", disability: "cat-disability", community: "cat-community" };
const list = (items) => `<ul class="check-list">${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;

const jobCard = (j) => `<article class="card job-card ${sectorClass[j.sector]}" id="${j.slug}" aria-labelledby="${j.slug}-title">
  <div class="path-head"><span class="icon-badge">${icon[sectors[j.sector]]}</span><h3 id="${j.slug}-title">${esc(j.title)}</h3></div>
  <p class="job-meta"><strong>Where:</strong> ${j.towns.map(esc).join(", ")}<br><strong>Type:</strong> ${award}</p>
  <p>${esc(j.intro)}</p>
  <div class="faq"><details><summary>What you'll do and what you need</summary><div>
    ${j.duties.length ? `<h4>What you'll do</h4>${list(j.duties)}` : ""}
    ${j.need.length ? `<h4>What you need</h4>${list(j.need)}` : ""}
    ${j.nice.length ? `<h4>Great if you also have</h4>${list(j.nice)}` : ""}
  </div></details></div>
  <div class="btn-row">${btn(`apply.html?role=${j.slug}`, `Apply: ${esc(j.title)}`, "primary", `jobs-apply-${j.slug}`)}</div>
</article>`;

const allTowns = Object.values(site.towns).flat();

export const pages = [
  // ---------------- JOBS ----------------
  {
    file: "jobs.html",
    title: "Jobs: Labouring & Support Worker Roles, Regional NSW | BrightSteps",
    description: "Casual labouring, mining, disability support, community, transport and cleaning work in Tamworth, Armidale, Gunnedah, Moree, the Hunter and Sydney. Apply now.",
    crumbs: [["Find work", "find-work.html"], ["Jobs available", ""]],
    audience: "candidate",
    plan: { purpose: "Job adverts by role and town; each Apply button sends the role with the application.", audience: "Job seekers in the New England, North West, Hunter and Sydney.", imagery: "Icons only, so the page stays fast.", conversion: "One Apply button per role, pre-filling the role on the application form.", schemaNote: "BreadcrumbList. Add JobPosting per role only for specific, open vacancies with a closing date." },
    schema: [],
    body: `${pageHero({ crumbs: [["Find work", "find-work.html"], ["Jobs available", ""]], eyebrow: "Jobs available", h1: "Work available now across regional NSW", lead: `We're registering workers for casual and ongoing shifts in ${allTowns.slice(0, 5).map(esc).join(", ")}, the Hunter and Sydney. Choose a role and apply in about five minutes. It's free.`, ctas: btn("#roles", "See the roles", "primary", "jobs-hero-roles") + callBtn(), accent: "cat-community" })}

<section class="section" id="roles" aria-labelledby="roles-title">
  <div class="container">
    <div class="section-head"><h2 id="roles-title">Roles we're hiring for</h2><p>Every role is a casual position with BrightSteps as your employer. Tell us which towns you can work in when you apply.</p></div>
    ${openJobs.length ? `<div class="grid grid--2 jobs-grid">${openJobs.map(jobCard).join("\n")}</div>` : noJobs}
  </div>
</section>

<section class="section section--sand">
  <div class="container split split--top">
    <div>
      <h2>Why work with BrightSteps</h2>
      <ul class="check-list">
        <li>Pick the shifts and towns that suit you</li>
        <li>A local team in Tamworth who know you by name</li>
        <li>Someone to call 24/7 while you're on shift</li>
        <li>Paid at least the award rate, with hours on a digital timesheet</li>
        <li>Free to register</li>
      </ul>
    </div>
    <div class="card">
      <h2 style="font-size:var(--step-1)">Don't see your role or town?</h2>
      <p>Register anyway. Tell us what you do and where you can work, and we'll contact you when something suits.</p>
      ${btn("apply.html", "Register for work", "secondary btn--block", "jobs-register")}
    </div>
  </div>
</section>

${ctaBand({ h2: "Questions about a role?", text: "Call our Tamworth team any time. We're happy to talk it through before you apply.", primary: btn("apply.html", "Apply now", "primary", "jobs-band-apply"), secondary: callBtn("ghost") })}`,
  },

  // ---------------- AREAS WE COVER ----------------
  {
    file: "areas-we-cover.html",
    title: "Areas We Cover: Tamworth, New England, Hunter & Sydney | BrightSteps",
    description: "BrightSteps supplies labourers and support workers from Tamworth to Armidale, Gunnedah, Quirindi, Moree, Narrabri, Singleton, Newcastle, Sydney and more.",
    crumbs: [["Areas we cover", ""]],
    plan: { purpose: "Answer 'do you cover my town?' and rank for town searches.", audience: "Employers and providers outside Tamworth; job seekers in those towns.", imagery: "None.", conversion: "Request staff and Find work CTAs.", schemaNote: "EmploymentAgency areaServed lists every town (site-wide)." },
    schema: [],
    body: (() => {
      const f = faq([
        ["Do you supply workers outside these towns?", "Often, yes. Tell us where you need people and we'll confirm on the first call whether we can cover it and when."],
        ["Do you charge for travel?", "For regular work in or near Tamworth, no. For remote sites, any travel or accommodation costs are agreed in your written quote before work starts."],
        ["Do you work outside New South Wales?", "Only where we hold the labour hire licence that state requires. Right now we supply workers within NSW."],
      ], "Questions about coverage", "areas-faq");
      return `${pageHero({ crumbs: [["Areas we cover", ""]], eyebrow: "Areas we cover", h1: "Where we supply workers", lead: "Our office is in Tamworth. From here we supply labourers and support workers across the New England and North West, the Hunter and Sydney.", ctas: btn("request-staff.html", "Request staff", "primary", "areas-hero-request") + callBtn() })}

<section class="section">
  <div class="container">
    <div class="grid grid--3">
      ${Object.entries(site.towns).map(([region, towns]) => `<div class="card reveal"><span class="icon-badge">${icon.pin}</span><h2 style="margin-top:var(--space-2);font-size:var(--step-1)">${esc(region)}</h2><ul class="chips">${towns.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>`).join("\n      ")}
    </div>
    <p style="margin-top:var(--space-4)">Not on the list? <a href="contact.html">Ask us</a>. We'll tell you straight away whether we can help.</p>
  </div>
</section>

<section class="section section--sand">
  <div class="container">
    <div class="section-head"><h2>What we supply in these areas</h2></div>
    <div class="grid grid--3">
      <div class="card cat-industrial"><span class="icon-badge">${icon.hardhat}</span><h3 style="margin-top:var(--space-2)">Sites and warehouses</h3><p>General, mining and construction labourers, and warehouse and logistics workers.</p><a class="text-link" href="industrial-labour-hire.html">Industrial labour hire</a></div>
      <div class="card cat-disability"><span class="icon-badge">${icon.heart}</span><h3 style="margin-top:var(--space-2)">Disability providers</h3><p>Support workers for in-home care, community access, respite and registered SIL providers' homes.</p><a class="text-link" href="disability-support-staffing.html">Disability support staffing</a></div>
      <div class="card cat-community"><span class="icon-badge">${icon.people}</span><h3 style="margin-top:var(--space-2)">Community programs</h3><p>Community support workers, drivers, cleaners and support coordinator assistants.</p><a class="text-link" href="community-services-staffing.html">Community services staffing</a></div>
    </div>
  </div>
</section>

<section class="section"><div class="container">${f.html}</div></section>

${ctaBand({ h2: "Need people in your town?", text: "Tell us the town, the roles and the dates. We'll confirm what we can do.", secondary: btn("jobs.html", "Looking for work? See jobs", "ghost", "areas-band-jobs") })}`;
    })(),
  },
];
