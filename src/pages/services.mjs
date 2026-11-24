import { site } from "../config.mjs";
import { icon, btn, callBtn, pageHero, photo, faq, ctaBand, serviceSchema } from "../layout.mjs";
import { standard, processSteps } from "./core.mjs";

// One template for the four service pages; copy differs, structure stays consistent.
function servicePage({ file, crumb, title, description, eyebrow, h1, lead, accent, iconName, roles, settings, benefitsTitle, benefits, photoBrief, photoAlt, photoSrc = "", note = "", aside = "", faqs, schemaType, related, plan }) {
  const f = faq(faqs, "Common questions", "service-faq");
  return {
    file, title, description, plan,
    crumbs: [["Services", "services.html"], [crumb, ""]],
    schema: [serviceSchema(crumb, description, file, schemaType)],
    body: `${pageHero({ crumbs: [["Services", "services.html"], [crumb, ""]], eyebrow, h1, lead, accent, ctas: btn("request-staff.html", "Request staff", "primary", `${file}-hero-request`) + callBtn() })}

<section class="section">
  <div class="container split">
    <div class="${accent} reveal">
      <span class="icon-badge">${icon[iconName]}</span>
      <h2 style="margin-top:var(--space-2)">Roles we supply</h2>
      <ul class="check-list">${roles.map((r) => `<li>${r}</li>`).join("")}</ul>
      ${settings ? `<h3>Where our people work</h3><p>${settings}</p>` : ""}
      ${note ? `<div class="callout callout--info"><p>${note}</p></div>` : ""}
    </div>
    ${aside || photo(photoBrief, photoAlt, photoSrc, { eager: true })}
  </div>
</section>

<section class="section section--sand">
  <div class="container">
    <div class="section-head"><h2>${benefitsTitle}</h2></div>
    <div class="grid grid--3">${benefits.map(([ic, h, t]) => `<div class="card ${accent} reveal"><span class="icon-badge">${icon[ic]}</span><h3 style="margin-top:var(--space-2)">${h}</h3><p>${t}</p></div>`).join("")}</div>
  </div>
</section>

<section class="section section--navy on-dark">
  <div class="container">
    <div class="section-head"><h2>Screened, insured and supported</h2></div>
    ${standard}
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head"><h2>How it works</h2></div>
    ${processSteps}
    <p style="margin-top:var(--space-3)">Indicative rates are on our <a href="pricing.html">pricing schedule</a>.</p>
  </div>
</section>

<section class="section section--sand"><div class="container">${f.html}</div></section>

<section class="section">
  <div class="container">
    <h2>Related services</h2>
    <ul class="chips">${related.map(([l, h]) => `<li><a href="${h}">${l}</a></li>`).join("")}</ul>
  </div>
</section>

${ctaBand()}`,
  };
}

const rel = {
  ind: ["Industrial labour hire", "industrial-labour-hire.html"],
  dis: ["Disability support staffing", "disability-support-staffing.html"],
  com: ["Community services staffing", "community-services-staffing.html"],
  emg: ["Emergency & short-term staffing", "emergency-short-term-staffing.html"],
  emp: ["For employers", "employers.html"],
  price: ["Pricing schedule", "pricing.html"],
  cln: ["Cleaning & domestic support", "cleaning-domestic-support.html"],
  trn: ["Transport & community access", "transport-community-access.html"],
  terms: ["Client terms", "client-terms.html"],
};

export const pages = [
  servicePage({
    file: "industrial-labour-hire.html",
    crumb: "Industrial labour hire",
    title: "Industrial Labour Hire Tamworth: Mining & Construction | BrightSteps",
    description: "General labourers for mining, construction, warehousing and logistics across NSW, from our Tamworth base. Screened for the role, insured and supported 24/7.",
    eyebrow: "Industrial labour hire",
    h1: "Labour hire that keeps your site moving",
    lead: "Reliable, experienced labourers for mining, construction, warehousing and logistics, matched to your site and backed by 24/7 support.",
    accent: "cat-industrial",
    iconName: "hardhat",
    roles: ["General labourers", "Mining labourers", "Construction labourers", "Warehouse and logistics workers", "Site clean-up and support crews"],
    settings: "Mining operations, construction sites, warehouses, distribution centres and industrial facilities in Tamworth and across New South Wales.",
    benefitsTitle: "Why site managers call BrightSteps",
    benefits: [
      ["bolt", "Quick to respond", "We work to get crews on site quickly when projects ramp up or plans change."],
      ["shield", "Safety first", "Experienced staff who put on-site safety first. Tell us your induction and ticket requirements and we'll match them."],
      ["clock", "24/7 support", "Around-the-clock support and fast responses when you need replacements or extra hands."],
    ],
    photoBrief: "A BrightSteps crew in hi-vis on a regional NSW site, mid-task, natural light. No posed thumbs-up.",
    photoAlt: "Construction worker in a hard hat, face shield and hi-vis vest measuring timber on a workbench",
    photoSrc: "industrial-worker.webp",
    faqs: [
      ["Can you supply workers with specific tickets or licences?", "Yes. Tell us what your site needs (for example a White Card, forklift licence or specific inductions) and we will match workers who hold them."],
      ["What does a general labourer cost?", "Our indicative rate for a general labourer for mining or construction is $70 an hour, excluding GST. It includes training, administration and insurance costs. <a href=\"pricing.html\">See pricing</a>."],
      ["Can you supply a whole crew?", "Yes. From one worker to a full crew, tell us the numbers and timing and we will confirm what we can mobilise."],
      ["Who is responsible for safety on site?", "Safety is shared. You provide a safe site, a site induction and day-to-day supervision. We check that workers hold the tickets and PPE the role needs, and we follow up any incident with you. See our <a href=\"client-terms.html\">client terms</a>."],
    ],
    schemaType: "Labour hire",
    related: [rel.emg, rel.com, rel.emp, rel.price, rel.terms],
    plan: { purpose: "Rank for industrial and mining labour hire in Tamworth; convert site managers.", audience: "Site, project and operations managers in mining, construction and logistics.", imagery: "Crew on a regional NSW site in hi-vis.", conversion: "Hero CTA, rate anchor in FAQ, CTA band.", schemaNote: "Service (serviceType: Labour hire), FAQPage, BreadcrumbList." },
  }),
  servicePage({
    file: "disability-support-staffing.html",
    crumb: "Disability support staffing",
    title: "Disability Support Workers Tamworth: In-Home & Respite | BrightSteps",
    description: "Screened disability support workers for in-home care, community access, respite and registered SIL providers' homes across NSW, supported 24/7.",
    eyebrow: "Disability support staffing",
    h1: "Disability support workers who put people first",
    lead: "Compassionate, screened support workers for in-home care, community access and respite, and for registered Supported Independent Living (SIL) providers' homes.",
    accent: "cat-disability",
    iconName: "heart",
    roles: ["Disability support workers", "In-home care support", "Community access support", "Respite support", "Support workers for registered SIL providers' homes"],
    settings: "Participants' homes, registered SIL providers' houses, respite settings and community activities in Tamworth and across New South Wales.",
    note: "BrightSteps supplies support workers to disability providers. We do not deliver Supported Independent Living (SIL) ourselves. In a SIL home, your organisation remains the registered NDIS provider and directs the support.",
    benefitsTitle: "Support built on dignity and safety",
    benefits: [
      ["heart", "Respectful, person-centred care", "Our workers support participants' choice, independence and dignity in everyday life."],
      ["shield", "Checked and verified", "Workers screened for their role, including NDIS Worker Screening Checks where required, with full workers compensation and public liability insurance."],
      ["clock", "Reliable cover", "24/7 support so shifts are covered and continuity of care is protected."],
    ],
    photoBrief: "A support worker and participant doing an everyday activity together (shopping, cooking, a walk), with the participant leading. Written consent required.",
    photoAlt: "Support worker kneeling beside a woman in a wheelchair as she lifts hand weights at home",
    photoSrc: "disability-support.webp",
    faqs: [
      ["What checks do your support workers have?", "Every worker is screened for their role, including a national police check, and a WWCC and NDIS Worker Screening Check where the role requires them. We confirm each worker's checks before placing them. Tell us about any extra screening your organisation or participants need, and we will confirm which workers meet it."],
      ["Do you deliver SIL?", "No. We supply support workers to providers. Supported Independent Living must be delivered by a provider registered with the NDIS Quality and Safeguards Commission. In a SIL home, your organisation remains that provider."],
      ["What does a disability support worker cost?", "Our indicative rate for a disability support worker is $68 an hour, excluding GST, including training, administration and insurance costs. We are reviewing this rate for the award increase that starts on 1 December 2026, and your quote confirms the current rate. <a href=\"pricing.html\">See pricing</a>."],
      ["Can you provide regular workers for continuity?", "Yes. Let us know if you want the same workers on a regular roster and we will work to keep continuity for your participants."],
      ["How do I raise a concern about a worker?", "Call us any time on " + site.phone + ". Our <a href=\"complaints.html\">feedback and complaints</a> page explains how we handle concerns, and how participants can contact the NDIS Quality and Safeguards Commission."],
    ],
    schemaType: "Disability support staffing",
    related: [rel.com, rel.trn, rel.emg, rel.price],
    plan: { purpose: "Rank for disability support worker staffing in Tamworth; reassure providers on safety and fit.", audience: "Disability service providers, SIL operators, support coordinators, plan managers.", imagery: "Support worker and participant doing an everyday activity, participant leading. Consent essential.", conversion: "Hero CTA, checks FAQ, CTA band.", schemaNote: "Service (serviceType: Disability support staffing), FAQPage, BreadcrumbList." },
  }),
  servicePage({
    file: "community-services-staffing.html",
    crumb: "Community services staffing",
    title: "Community Services Staffing Tamworth | BrightSteps",
    description: "Community support workers, transport, cleaning and support coordinator assistants for community organisations across NSW. Request staff today.",
    eyebrow: "Community services staffing",
    h1: "Dependable people for community programs",
    lead: "Experienced community support workers, transport and community access, cleaning and domestic support, and support coordinator assistants.",
    accent: "cat-community",
    iconName: "people",
    roles: ["Community support workers", "Transport and community access", "Residential and commercial cleaners", "Domestic support workers", "Support coordinator assistants"],
    settings: "Community organisations, local programs, clients' homes and commercial premises in Tamworth and across New South Wales.",
    benefitsTitle: "Support that makes a positive impact",
    benefits: [
      ["people", "Experienced personnel", "Workers who understand community settings and the people they serve."],
      ["truck", "Transport and access", "Dedicated transport so clients can reach appointments, work and activities. Vehicle costs are negotiable."],
      ["doc", "Organised administration", "Support coordinator assistants who keep paperwork, scheduling and billing on track."],
    ],
    photoBrief: "A community support worker helping a client into a vehicle for an outing, or a cleaner in a bright home. Consent required.",
    photoAlt: "Carer holding hands and laughing with an older woman in a lounge room",
    photoSrc: "community-care.webp",
    faqs: [
      ["What does transport and community access cost?", "Our indicative rate is $65 an hour, excluding GST. The hourly rate is fixed and vehicle costs are negotiable. <a href=\"transport-community-access.html\">See transport and community access</a>."],
      ["Do you provide cleaning for both homes and businesses?", "Yes. We supply residential and commercial cleaners, plus domestic support with daily household tasks. <a href=\"cleaning-domestic-support.html\">See cleaning and domestic support</a>."],
      ["What does a support coordinator assistant do?", "They provide administrative support, such as scheduling, records and timesheets, so coordinators can focus on participants."],
    ],
    schemaType: "Community services staffing",
    related: [rel.dis, rel.cln, rel.trn, rel.price],
    plan: { purpose: "Capture community, transport and cleaning staffing demand.", audience: "Community organisations, councils, NGOs, homeowners and businesses needing cleaning.", imagery: "Community outing with transport; cleaner in a home.", conversion: "Hero CTA, transport rate FAQ, CTA band.", schemaNote: "Service (serviceType: Community services staffing), FAQPage, BreadcrumbList." },
  }),
  servicePage({
    file: "emergency-short-term-staffing.html",
    crumb: "Emergency & short-term staffing",
    title: "Emergency & Short-Term Staffing NSW: 24/7 Cover | BrightSteps",
    description: "Urgent shift cover, short-term and contract staffing for industrial, disability and community services, Tamworth and across NSW. 24/7 support. Call 0424 234 925.",
    eyebrow: "Emergency & short-term staffing",
    h1: "When a shift falls through, call us",
    lead: "Rapid cover for sudden gaps, staff leave and peak periods, plus contract staffing for the length of your project. Our team is available 24/7.",
    accent: "cat-emergency",
    iconName: "bolt",
    roles: ["Same-day and next-day shift cover", "Short-term cover for leave and peak periods", "Contract staffing for projects and programs", "Industrial, disability support and community roles"],
    settings: "",
    benefitsTitle: "Built for the moments that can't wait",
    benefits: [
      ["clock", "24/7 availability", "Call any time and our on-call team will act on your request."],
      ["bolt", "Rapid response", "We work to fill gaps as quickly as possible, without cutting corners on screening."],
      ["calendar", "Flexible terms", "One shift, a few weeks or a full contract. Engage us the way you need."],
    ],
    photoBrief: "A BrightSteps team member taking a call at night or early morning, with a roster on screen. Shows that someone is there.",
    photoAlt: "Coordinator on the phone while checking a laptop at her desk",
    photoSrc: "coordinator-phone.webp",
    faqs: [
      ["How fast can you fill an urgent shift?", "We work to fill urgent shifts as quickly as possible. Timing depends on the role, location and requirements, so call <a href=\"tel:" + site.phoneIntl + "\">" + site.phone + "</a> and we'll tell you straight away what we can do."],
      ["Is there a minimum engagement?", "We supply everything from single shifts to longer contracts. Any minimum shift length, short-notice terms and cancellation terms are set out in your quote. See our <a href=\"client-terms.html\">client terms</a>."],
      ["Do urgent workers meet the same standards?", "Yes. Every worker we supply is screened for their role, including a national police check, and a WWCC and NDIS Worker Screening Check where the role requires them, and covered by workers compensation and public liability insurance."],
    ],
    schemaType: "Emergency staffing",
    related: [rel.ind, rel.dis, rel.com, rel.price, rel.terms],
    plan: { purpose: "Convert urgent, high-intent searches (\"urgent staff Tamworth\") by phone.", audience: "Any employer with an immediate gap.", imagery: "Coordinator on the phone after hours.", conversion: "Phone-first: hero call button, mobile call bar, FAQ answer with phone link.", schemaNote: "Service (serviceType: Emergency staffing), FAQPage, BreadcrumbList." },
  }),
];

const glance = (items) => `<aside class="card" style="background:var(--sand);border:0" aria-label="At a glance">
  <h2 style="font-size:var(--step-1)">At a glance</h2>
  <ul class="check-list">${items.map((i) => `<li>${i}</li>`).join("")}</ul>
  ${btn("request-staff.html", "Get a quote", "primary btn--block", "glance-quote")}
</aside>`;

pages.push(
  servicePage({
    file: "cleaning-domestic-support.html",
    crumb: "Cleaning & domestic support",
    title: "Cleaning & Domestic Support Tamworth: Homes & Business | BrightSteps",
    description: "Screened, insured residential and commercial cleaners and domestic support workers from Tamworth, across NSW. Priced by quote to your scope of work.",
    eyebrow: "Cleaning & domestic support",
    h1: "Cleaning and domestic support you can trust",
    lead: "Residential and commercial cleaners, plus domestic support with everyday household tasks, priced to the scope you need.",
    accent: "cat-disability",
    iconName: "sparkle",
    roles: ["Residential cleaners", "Commercial and office cleaners", "Domestic support workers for everyday household tasks"],
    settings: "Homes, offices and commercial premises in Tamworth and across New South Wales.",
    aside: glance([
      "<strong>Pricing:</strong> by quote, based on the area, how often and the tasks",
      "<strong>Scope:</strong> we agree a task list with you before the first clean",
      "<strong>Changes and cancellations:</strong> set out in your quote and our <a href=\"client-terms.html\">client terms</a>",
      "<strong>Households:</strong> your rights under the Australian Consumer Law always apply",
    ]),
    benefitsTitle: "Clean, safe spaces without the hassle",
    benefits: [
      ["shield", "Screened and insured", "Workers screened for their role, with workers compensation and public liability insurance."],
      ["doc", "An agreed scope", "We agree the tasks, frequency and areas with you first, so you know exactly what is included."],
      ["calendar", "Regular or one-off", "Weekly, fortnightly or one-off cleaning, plus help with daily household tasks."],
    ],
    faqs: [
      ["What does cleaning cost?", "Cleaning is priced by quote, because it depends on the size of the space, how often you need it and the tasks involved. <a href=\"request-staff.html\">Request a quote</a>."],
      ["Do you clean homes and businesses?", "Yes. We supply residential and commercial cleaners, plus domestic support with daily household tasks."],
      ["What if I'm not happy with a clean?", "Tell us as soon as you can and we will work with you to put it right. You can also use our <a href=\"complaints.html\">feedback and complaints</a> process."],
    ],
    schemaType: "Cleaning services",
    related: [rel.com, rel.trn, rel.emp, rel.terms],
    plan: { purpose: "Give cleaning and domestic support its own page with scope, pricing basis and terms (report R11).", audience: "Households, offices and commercial premises; community organisations.", imagery: "None yet; an 'At a glance' card instead. Add a real or licensed cleaning photo later.", conversion: "Hero CTA, quote card, CTA band.", schemaNote: "Service (serviceType: Cleaning services), FAQPage, BreadcrumbList." },
  }),
  servicePage({
    file: "transport-community-access.html",
    crumb: "Transport & community access",
    title: "Transport & Community Access Workers Tamworth | BrightSteps",
    description: "Driver-support workers who help participants reach appointments, work and community activities, from Tamworth across NSW. Hourly rate plus vehicle costs.",
    eyebrow: "Transport & community access",
    h1: "Transport that gets people where they need to go",
    lead: "Support workers who drive participants to appointments, work and activities, then support them when they arrive.",
    accent: "cat-community",
    iconName: "truck",
    roles: ["Driver-support workers", "Community access support", "Transport to appointments, work and activities"],
    settings: "Participants' homes, appointments, workplaces and community activities in Tamworth and across New South Wales.",
    aside: glance([
      "<strong>Rate:</strong> $65 an hour (ex GST) plus vehicle costs",
      "<strong>Vehicle costs:</strong> negotiable, and agreed in your quote before the first trip",
      "<strong>Vehicle and insurance:</strong> we confirm in writing whose vehicle is used and how it is insured",
      "<strong>Terms:</strong> see our <a href=\"client-terms.html\">client terms</a>",
    ]),
    benefitsTitle: "Door-to-door support",
    benefits: [
      ["truck", "Getting there and back", "Workers drive participants to appointments, work and activities, and bring them home."],
      ["shield", "Screened for the role", "A current driver licence, a police check, and an NDIS Worker Screening Check where the role requires it."],
      ["dollar", "Clear costs", "An hourly rate plus vehicle costs, agreed in your quote before the first trip."],
    ],
    faqs: [
      ["What does transport and community access cost?", "Our indicative rate is $65 an hour, excluding GST, plus vehicle costs. Vehicle costs are negotiable and set out in your quote. <a href=\"pricing.html\">See pricing</a>."],
      ["Whose vehicle is used?", "It depends on the booking. Before the first trip we confirm in writing which vehicle will be used and how it is insured."],
      ["Can the worker support the participant at the destination?", "Yes. Our workers can support participants during appointments and activities, as well as driving them there and back."],
    ],
    schemaType: "Transport and community access",
    related: [rel.dis, rel.com, rel.price, rel.terms],
    plan: { purpose: "Give transport and community access its own page with rate basis and vehicle terms (report R11).", audience: "Disability and community providers, support coordinators, plan managers.", imagery: "None yet; an 'At a glance' card instead. Add a real, consented photo later.", conversion: "Hero CTA, quote card, CTA band.", schemaNote: "Service (serviceType: Transport and community access), FAQPage, BreadcrumbList." },
  }),
);
