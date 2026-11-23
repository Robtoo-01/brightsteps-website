import { site } from "../config.mjs";
import { icon, btn, callBtn, pageHero, photo, faq, ctaBand, serviceSchema } from "../layout.mjs";
import { standard, processSteps } from "./core.mjs";

// One template for the four service pages; copy differs, structure stays consistent.
function servicePage({ file, crumb, title, description, eyebrow, h1, lead, accent, iconName, roles, settings, benefitsTitle, benefits, photoBrief, photoAlt, faqs, schemaType, related, plan }) {
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
    </div>
    ${photo(photoBrief, photoAlt)}
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
};

export const pages = [
  servicePage({
    file: "industrial-labour-hire.html",
    crumb: "Industrial labour hire",
    title: "Industrial Labour Hire Tamworth: Mining & Construction | BrightSteps",
    description: "General labourers for mining, construction, warehousing and logistics in Tamworth and NSW. Police checked, insured and mobilised fast. Request labour hire today.",
    eyebrow: "Industrial labour hire",
    h1: "Labour hire that keeps your site moving",
    lead: "Reliable, experienced labourers for mining, construction, warehousing and logistics, mobilised fast and backed by 24/7 support.",
    accent: "cat-industrial",
    iconName: "hardhat",
    roles: ["General labourers", "Mining labourers", "Construction labourers", "Warehouse and logistics workers", "Site clean-up and support crews"],
    settings: "Mining operations, construction sites, warehouses, distribution centres and industrial facilities across the Tamworth region and NSW.",
    benefitsTitle: "Why site managers call BrightSteps",
    benefits: [
      ["bolt", "High-speed mobilisation", "We specialise in getting crews on site quickly when projects ramp up or plans change."],
      ["shield", "Safety first", "Experienced staff who put on-site safety first. Tell us your induction and ticket requirements and we'll match them."],
      ["clock", "24/7 support", "Around-the-clock support and fast responses when you need replacements or extra hands."],
    ],
    photoBrief: "A BrightSteps crew in hi-vis on a regional NSW site, mid-task, natural light. No posed thumbs-up.",
    photoAlt: "BrightSteps labourers working on a construction site near Tamworth",
    faqs: [
      ["Can you supply workers with specific tickets or licences?", "Yes. Tell us what your site needs (for example a White Card, forklift licence or specific inductions) and we will match workers who hold them."],
      ["What does a general labourer cost?", "Our indicative rate for a general labourer for mining or construction is $70 an hour, excluding GST. It includes training, administration and insurance costs. <a href=\"pricing.html\">See pricing</a>."],
      ["Can you supply a whole crew?", "Yes. From one worker to a full crew, tell us the numbers and timing and we will confirm what we can mobilise."],
    ],
    schemaType: "Labour hire",
    related: [rel.emg, rel.com, rel.emp, rel.price],
    plan: { purpose: "Rank for industrial and mining labour hire in Tamworth; convert site managers.", audience: "Site, project and operations managers in mining, construction and logistics.", imagery: "Crew on a regional NSW site in hi-vis.", conversion: "Hero CTA, rate anchor in FAQ, CTA band.", schemaNote: "Service (serviceType: Labour hire), FAQPage, BreadcrumbList." },
  }),
  servicePage({
    file: "disability-support-staffing.html",
    crumb: "Disability support staffing",
    title: "Disability Support Workers Tamworth: In-Home & SIL | BrightSteps",
    description: "Screened disability support workers for in-home care, community access, SIL and respite in Tamworth and NSW. Police checked, WWCC verified, supported 24/7.",
    eyebrow: "Disability support staffing",
    h1: "Disability support workers who put people first",
    lead: "Compassionate, screened support workers for in-home care, community access, Supported Independent Living (SIL) and respite.",
    accent: "cat-disability",
    iconName: "heart",
    roles: ["Disability support workers", "In-home care support", "Community access support", "Supported Independent Living (SIL) support", "Respite support"],
    settings: "Participants' homes, SIL houses, respite settings and community activities across the Tamworth region and NSW.",
    benefitsTitle: "Support built on dignity and safety",
    benefits: [
      ["heart", "Respectful, person-centred care", "Our workers support participants' choice, independence and dignity in everyday life."],
      ["shield", "Checked and verified", "Police checked and WWCC verified workers, with full workers compensation and public liability insurance."],
      ["clock", "Reliable cover", "24/7 support so shifts are covered and continuity of care is protected."],
    ],
    photoBrief: "A support worker and participant doing an everyday activity together (shopping, cooking, a walk), with the participant leading. Written consent required.",
    photoAlt: "A support worker and participant shopping together at a local market",
    faqs: [
      ["What checks do your support workers have?", "Our workforce is police checked and WWCC verified. Tell us about any additional screening your organisation or participants need, such as an NDIS Worker Screening Check, and we will confirm which workers meet it."],
      ["What does a disability support worker cost?", "Our indicative rate for a disability support worker is $68 an hour, excluding GST, including training, administration and insurance costs. <a href=\"pricing.html\">See pricing</a>."],
      ["Can you provide regular workers for continuity?", "Yes. Let us know if you want the same workers on a regular roster and we will work to keep continuity for your participants."],
    ],
    schemaType: "Disability support staffing",
    related: [rel.com, rel.emg, rel.emp, rel.price],
    plan: { purpose: "Rank for disability support worker staffing in Tamworth; reassure providers on safety and fit.", audience: "Disability service providers, SIL operators, support coordinators, plan managers.", imagery: "Support worker and participant doing an everyday activity, participant leading. Consent essential.", conversion: "Hero CTA, checks FAQ, CTA band.", schemaNote: "Service (serviceType: Disability support staffing), FAQPage, BreadcrumbList." },
  }),
  servicePage({
    file: "community-services-staffing.html",
    crumb: "Community services staffing",
    title: "Community Services Staffing Tamworth | BrightSteps",
    description: "Community support workers, transport and community access, cleaning and support coordinator assistants for NSW community organisations. Request staff today.",
    eyebrow: "Community services staffing",
    h1: "Dependable people for community programs",
    lead: "Experienced community support workers, transport and community access, cleaning and domestic support, and support coordinator assistants.",
    accent: "cat-community",
    iconName: "people",
    roles: ["Community support workers", "Transport and community access", "Residential and commercial cleaners", "Domestic support workers", "Support coordinator assistants"],
    settings: "Community organisations, local programs, clients' homes and commercial premises across Tamworth and NSW.",
    benefitsTitle: "Support that makes a positive impact",
    benefits: [
      ["people", "Experienced personnel", "Workers who understand community settings and the people they serve."],
      ["truck", "Transport and access", "Dedicated transport so clients can reach appointments, work and activities. Vehicle costs are negotiable."],
      ["doc", "Organised administration", "Support coordinator assistants who keep paperwork, scheduling and billing on track."],
    ],
    photoBrief: "A community support worker helping a client into a vehicle for an outing, or a cleaner in a bright home. Consent required.",
    photoAlt: "A community support worker helping a client on a community outing",
    faqs: [
      ["What does transport and community access cost?", "Our indicative rate is $65 an hour, excluding GST. The hourly rate is fixed and vehicle costs are negotiable. <a href=\"pricing.html\">See pricing</a>."],
      ["Do you provide cleaning for both homes and businesses?", "Yes. We supply residential and commercial cleaners, plus domestic support with daily household tasks."],
      ["What does a support coordinator assistant do?", "They provide administrative support, such as scheduling, records and timesheets, so coordinators can focus on participants."],
    ],
    schemaType: "Community services staffing",
    related: [rel.dis, rel.emg, rel.emp, rel.price],
    plan: { purpose: "Capture community, transport and cleaning staffing demand.", audience: "Community organisations, councils, NGOs, homeowners and businesses needing cleaning.", imagery: "Community outing with transport; cleaner in a home.", conversion: "Hero CTA, transport rate FAQ, CTA band.", schemaNote: "Service (serviceType: Community services staffing), FAQPage, BreadcrumbList." },
  }),
  servicePage({
    file: "emergency-short-term-staffing.html",
    crumb: "Emergency & short-term staffing",
    title: "Emergency & Short-Term Staffing NSW: 24/7 Cover | BrightSteps",
    description: "Urgent shift cover, short-term and contract staffing for industrial, disability and community services in Tamworth and NSW. 24/7 support. Call 0424 234 925.",
    eyebrow: "Emergency & short-term staffing",
    h1: "When a shift falls through, call us",
    lead: "Rapid cover for sudden gaps, staff leave and peak periods, plus contract staffing for the length of your project. Our team is available 24/7.",
    accent: "cat-emergency",
    iconName: "bolt",
    roles: ["Same-day and next-day shift cover", "Short-term cover for leave and peak periods", "Contract staffing for projects and programs", "Industrial, disability support and community roles"],
    settings: "",
    benefitsTitle: "Built for the moments that can't wait",
    benefits: [
      ["clock", "24/7 availability", "Call any time. A real person from our team will answer and act on your request."],
      ["bolt", "Rapid response", "We specialise in high-speed mobilisation, so gaps are filled as quickly as possible."],
      ["calendar", "Flexible terms", "One shift, a few weeks or a full contract. Engage us the way you need."],
    ],
    photoBrief: "A BrightSteps team member taking a call at night or early morning, with a roster on screen. Shows that someone is there.",
    photoAlt: "A BrightSteps coordinator arranging urgent shift cover",
    faqs: [
      ["How fast can you fill an urgent shift?", "We specialise in fast mobilisation and work to fill urgent shifts as quickly as possible. Timing depends on the role, location and requirements, so call <a href=\"tel:" + site.phoneIntl + "\">" + site.phone + "</a> and we'll tell you straight away what we can do."],
      ["Is there a minimum engagement?", "Talk to us about your needs. We supply everything from single shifts to longer contracts."],
      ["Do urgent workers meet the same standards?", "Yes. Every worker we supply is police checked and WWCC verified, and covered by workers compensation and public liability insurance."],
    ],
    schemaType: "Emergency staffing",
    related: [rel.ind, rel.dis, rel.com, rel.price],
    plan: { purpose: "Convert urgent, high-intent searches (\"urgent staff Tamworth\") by phone.", audience: "Any employer with an immediate gap.", imagery: "Coordinator on the phone after hours.", conversion: "Phone-first: hero call button, mobile call bar, FAQ answer with phone link.", schemaNote: "Service (serviceType: Emergency staffing), FAQPage, BreadcrumbList." },
  }),
];
