import { site } from "../config.mjs";
import { icon, btn, callBtn, pageHero, faq, ctaBand } from "../layout.mjs";

const award = "Casual, paid at least the relevant award rate plus casual loading. We confirm your rate and pay cycle before your first shift.";

// Job adverts. Each "Apply" goes to apply.html?role=<slug>; the role travels with the application.
// Applications are emailed by Netlify form notifications (set in the Netlify dashboard), so no inbox address appears in the site.
export const jobs = [
  {
    slug: "general-labourer", title: "General labourer", sector: "industrial", iconName: "hardhat",
    towns: ["Tamworth", "Gunnedah", "Quirindi", "Narrabri", "Moree", "Armidale", "Inverell"],
    intro: "Steady casual work on construction, agricultural, industrial and warehouse sites. Good for people who like being on their feet and want regular shifts close to home.",
    duties: ["Site set-up, clean-up and material handling", "Loading, unloading and stacking", "Helping trades and operators keep the job moving", "Following site safety rules and inductions"],
    need: ["Right to work in Australia", "White Card (construction induction)", "Steel-capped boots", "Reliable way to get to site"],
    nice: ["Forklift licence", "Previous site or warehouse experience", "Driver licence"],
  },
  {
    slug: "mining-labourer", title: "Mining labourer", sector: "industrial", iconName: "hardhat",
    towns: ["Gunnedah", "Narrabri", "Singleton", "Muswellbrook"],
    intro: "Labouring shifts on and around mine sites in the Gunnedah Basin and the Hunter, including shutdowns, wash bays, site services and general labouring.",
    duties: ["General labouring, housekeeping and wash-down", "Shutdown and maintenance support", "Material handling and stores", "Working to mine site safety systems"],
    need: ["Right to work in Australia", "White Card", "Willingness to complete site inductions and drug and alcohol testing", "Driver licence and reliable transport"],
    nice: ["Coal Board medical", "Previous mine site experience", "Working at heights or confined space tickets"],
  },
  {
    slug: "construction-labourer", title: "Construction labourer", sector: "industrial", iconName: "hardhat",
    towns: ["Tamworth", "Armidale", "Newcastle", "Sydney"],
    intro: "Day labour and longer-term placements on residential, commercial and civil construction sites.",
    duties: ["Site preparation, clean-up and waste removal", "Assisting carpenters, concreters and other trades", "Handling materials and tools safely", "Traffic control where you hold the ticket"],
    need: ["Right to work in Australia", "White Card", "Own PPE: steel caps, hi-vis, long pants", "Reliable way to get to site"],
    nice: ["Traffic control ticket", "Concreting or formwork experience", "Driver licence"],
  },
  {
    slug: "warehouse-logistics", title: "Warehouse and logistics worker", sector: "industrial", iconName: "truck",
    towns: ["Tamworth", "Moree", "Newcastle", "Sydney"],
    intro: "Shifts in warehouses, distribution centres and grain and freight facilities, including peak-season work.",
    duties: ["Pick, pack and dispatch", "Receiving and checking stock", "Forklift operation where licensed", "Keeping the floor clean and safe"],
    need: ["Right to work in Australia", "Steel-capped boots", "Able to do physical work for a full shift"],
    nice: ["Forklift licence (LF)", "RF scanner or warehouse system experience", "Harvest or grain receival experience"],
  },
  {
    slug: "disability-support-worker", title: "Disability support worker", sector: "disability", iconName: "heart",
    towns: ["Tamworth", "Armidale", "Gunnedah", "Quirindi", "Moree", "Narrabri", "Inverell", "Glen Innes", "Newcastle", "Sydney"],
    intro: "Support NDIS participants at home, in the community, in respite and in registered SIL providers' homes. Day, evening, weekend, overnight and sleepover shifts.",
    duties: ["Personal care and daily living support", "Community access and social activities", "Supporting participants' goals, choices and independence", "Shift notes and reporting to the provider"],
    need: ["Right to work in Australia", "NDIS Worker Screening Check (or willing to apply)", "Working With Children Check where the role needs it", "Current First Aid and CPR"],
    nice: ["Certificate III or IV in Individual Support or Disability", "Driver licence and a comprehensively insured car", "Manual handling and medication assistance training"],
  },
  {
    slug: "community-support-worker", title: "Community support worker", sector: "community", iconName: "people",
    towns: ["Tamworth", "Armidale", "Gunnedah", "Inverell"],
    intro: "Work with community organisations on programs that keep people connected: group activities, outreach, and day programs.",
    duties: ["Running and supporting group activities", "One-on-one community support", "Helping clients reach services and appointments", "Keeping accurate records"],
    need: ["Right to work in Australia", "National police check (we can arrange)", "Working With Children Check where the role needs it"],
    nice: ["Certificate in community services or individual support", "Driver licence", "Experience with Aboriginal or culturally diverse communities"],
  },
  {
    slug: "transport-community-access", title: "Transport and community access driver", sector: "community", iconName: "truck",
    towns: ["Tamworth", "Armidale", "Gunnedah", "Quirindi", "Moree"],
    intro: "Drive participants to appointments, work and activities, then support them when they get there.",
    duties: ["Safe door-to-door transport", "Support at appointments and outings", "Helping with mobility aids", "Recording kilometres and shift notes"],
    need: ["Right to work in Australia", "Full driver licence with a clean record", "NDIS Worker Screening Check (or willing to apply)", "Current First Aid and CPR"],
    nice: ["Your own comprehensively insured car", "Wheelchair-accessible vehicle experience", "Support work experience"],
  },
  {
    slug: "cleaner-domestic-support", title: "Cleaner and domestic support worker", sector: "community", iconName: "sparkle",
    towns: ["Tamworth", "Armidale", "Gunnedah", "Singleton"],
    intro: "Residential and commercial cleaning, plus help with everyday household tasks for people who need it.",
    duties: ["General and detailed cleaning", "Laundry, linen and kitchen tidying", "Commercial and office cleans", "Following safe chemical use"],
    need: ["Right to work in Australia", "National police check (we can arrange)", "Reliable transport"],
    nice: ["NDIS Worker Screening Check for in-home roles", "Commercial cleaning experience", "Driver licence"],
  },
  {
    slug: "support-coordinator-assistant", title: "Support coordinator assistant", sector: "community", iconName: "doc",
    towns: ["Tamworth", "Armidale"],
    intro: "Help support coordinators keep participant plans, bookings and paperwork organised and on time.",
    duties: ["Booking supports and managing calendars", "Preparing reports and service agreements", "Keeping records accurate and confidential", "Liaising with providers and participants"],
    need: ["Right to work in Australia", "NDIS Worker Screening Check (or willing to apply)", "Strong computer and writing skills"],
    nice: ["NDIS or disability sector experience", "Certificate IV in Disability or a related field", "Experience with CRM or case management software"],
  },
];

// Only roles switched on in config.mjs (site.jobs) are shown and accepted by the Apply form.
export const openJobs = jobs.filter((j) => site.jobs[j.slug] === true);
const noJobs = `<div class="empty-state"><h3>We're not advertising specific roles right now</h3><p>Register anyway. Tell us what you do and where you can work, and we'll contact you when something suits.</p>${btn("apply.html", "Register for work", "secondary", "jobs-empty-register")}</div>`;

const sectorClass = { industrial: "cat-industrial", disability: "cat-disability", community: "cat-community" };
const list = (items) => `<ul class="check-list">${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;

const jobCard = (j) => `<article class="card job-card ${sectorClass[j.sector]}" id="${j.slug}" aria-labelledby="${j.slug}-title">
  <div class="path-head"><span class="icon-badge">${icon[j.iconName]}</span><h3 id="${j.slug}-title">${j.title}</h3></div>
  <p class="job-meta"><strong>Where:</strong> ${j.towns.join(", ")}<br><strong>Type:</strong> ${award}</p>
  <p>${j.intro}</p>
  <div class="faq"><details><summary>What you'll do and what you need</summary><div>
    <h4>What you'll do</h4>${list(j.duties)}
    <h4>What you need</h4>${list(j.need)}
    <h4>Great if you also have</h4>${list(j.nice)}
  </div></details></div>
  <div class="btn-row">${btn(`apply.html?role=${j.slug}`, `Apply: ${j.title}`, "primary", `jobs-apply-${j.slug}`)}</div>
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
    body: `${pageHero({ crumbs: [["Find work", "find-work.html"], ["Jobs available", ""]], eyebrow: "Jobs available", h1: "Work available now across regional NSW", lead: `We're registering workers for casual and ongoing shifts in ${allTowns.slice(0, 5).join(", ")}, the Hunter and Sydney. Choose a role and apply in about five minutes. It's free.`, ctas: btn("#roles", "See the roles", "primary", "jobs-hero-roles") + callBtn(), accent: "cat-community" })}

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
      ${Object.entries(site.towns).map(([region, towns]) => `<div class="card reveal"><span class="icon-badge">${icon.pin}</span><h2 style="margin-top:var(--space-2);font-size:var(--step-1)">${region}</h2><ul class="chips">${towns.map((t) => `<li>${t}</li>`).join("")}</ul></div>`).join("\n      ")}
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
