import { site } from "../config.mjs";
import { icon, btn, callBtn, pageHero, photo, faq, ctaBand, tel, mailto, address } from "../layout.mjs";

const trust = `<ul class="trust-list">
  <li>${icon.shield}<span>Police checked and WWCC verified workers</span></li>
  <li>${icon.clipboard}<span>Workers compensation and public liability insurance</span></li>
  <li>${icon.clock}<span>24/7 support when shifts change</span></li>
  <li>${icon.pin}<span>Locally owned in West Tamworth, NSW</span></li>
</ul>`;

export const serviceCards = `<div class="grid grid--4">
  <article class="card service-card cat-industrial reveal">
    <span class="icon-badge">${icon.hardhat}</span>
    <h3>Industrial labour hire</h3>
    <p>General labourers for mining, construction, warehousing and logistics, mobilised fast.</p>
    <a class="text-link" href="industrial-labour-hire.html">Industrial staffing</a>
  </article>
  <article class="card service-card cat-disability reveal">
    <span class="icon-badge">${icon.heart}</span>
    <h3>Disability support</h3>
    <p>Screened support workers for in-home care, community access, SIL and respite.</p>
    <a class="text-link" href="disability-support-staffing.html">Disability staffing</a>
  </article>
  <article class="card service-card cat-community reveal">
    <span class="icon-badge">${icon.people}</span>
    <h3>Community services</h3>
    <p>Community support workers, transport, cleaning and support coordination assistants.</p>
    <a class="text-link" href="community-services-staffing.html">Community staffing</a>
  </article>
  <article class="card service-card cat-emergency reveal">
    <span class="icon-badge">${icon.bolt}</span>
    <h3>Emergency &amp; short-term</h3>
    <p>Cover for sudden gaps, leave and peak periods, plus contract staffing, backed by 24/7 support.</p>
    <a class="text-link" href="emergency-short-term-staffing.html">Urgent staffing</a>
  </article>
</div>`;

export const standard = `<div class="grid grid--3">
  <div class="feature reveal"><span class="icon-badge">${icon.shield}</span><div><h3>Fully screened</h3><p>Every member of our workforce is police checked and holds a verified Working With Children Check (WWCC).</p></div></div>
  <div class="feature reveal"><span class="icon-badge">${icon.clipboard}</span><div><h3>Insured and safe</h3><p>Workers compensation and public liability insurance cover every contract, so your project is protected.</p></div></div>
  <div class="feature reveal"><span class="icon-badge">${icon.clock}</span><div><h3>Supported around the clock</h3><p>Our team is available 24/7 to manage changes, replacements and urgent requests.</p></div></div>
</div>`;

export const processSteps = `<ol class="steps steps--4">
  <li class="reveal"><h3>Request</h3><p>Tell us the roles, numbers, location and timing, online or by phone.</p></li>
  <li class="reveal"><h3>Allocate</h3><p>We match screened, supported, ready-to-work people to your brief and confirm with you.</p></li>
  <li class="reveal"><h3>Complete</h3><p>Shifts are verified through transparent digital timesheets.</p></li>
  <li class="reveal"><h3>Invoice</h3><p>Simple, transparent invoicing, weekly or fortnightly.</p></li>
</ol>`;

const homeFaq = faq([
  ["How quickly can you supply staff?", "We specialise in fast mobilisation. Timing depends on the role, the number of workers, the location and the checks your site needs. Call <a href=\"" + tel + "\">" + site.phone + "</a> for urgent requests and we will tell you straight away what we can do."],
  ["Are your workers screened and insured?", "Yes. Our workforce is police checked and WWCC verified, and we provide workers compensation and public liability insurance for every contract."],
  ["What does it cost?", "Our indicative rates start from $65 an hour (ex GST) and include training, administration and insurance. See the <a href=\"pricing.html\">pricing schedule</a> or <a href=\"request-staff.html\">request a quote</a> for your exact needs."],
  ["Which areas do you cover?", "We are based in West Tamworth, NSW, and supply staff to employers and providers across Australia. Tell us where you need people and we will confirm what we can do."],
  ["I'm looking for work. How do I apply?", "Register through our <a href=\"apply.html\">online application</a>. Tell us the type of work you want and your availability, and our team will be in touch about suitable roles."],
]);

export const pages = [
  // ---------------- HOME ----------------
  {
    file: "index.html",
    title: "Labour Hire & Disability Support Staffing Tamworth | BrightSteps",
    description: "Screened, insured labour hire and disability support staff from West Tamworth. Fast mobilisation and 24/7 support Australia-wide. Request staff or find work today.",
    plan: {
      purpose: "Explain who BrightSteps serves in five seconds and route employers to Request Staff and candidates to Apply.",
      audience: "All: employers, care providers, procurement, job seekers.",
      imagery: "Hero: real BrightSteps workers in hi-vis and a support worker with a participant (split or alternating). Until then, the hero uses brand graphics only.",
      conversion: "Hero dual pathway card, trust list, sticky mobile call bar, service cards, final CTA band.",
      schemaNote: "EmploymentAgency (LocalBusiness), FAQPage.",
    },
    schema: [],
    body: `
<section class="hero on-dark" aria-labelledby="hero-title">
  <div class="container hero-grid">
    <div>
      
      <h1 id="hero-title">Reliable people. <em>Right when you need them.</em></h1>
      <p class="lead">From West Tamworth, BrightSteps supplies screened, insured and supported workers for industrial sites, disability support and community services, with fast mobilisation and 24/7 support.</p>
      <div class="btn-row">${btn("request-staff.html", "Request staff", "primary", "hero-request")}${btn("find-work.html", "Find work", "ghost", "hero-find-work")}</div>
      ${trust}
    </div>
    <div class="hero-visual">
      <div class="hero-card">
        <h2>How can we help today?</h2>
        <p>Choose your path. It takes about two minutes to get started.</p>
        <div class="hero-paths">
          <a class="hero-path" href="request-staff.html" data-track="hero-path-employer"><span class="icon-badge">${icon.briefcase}</span><span><strong>I need staff</strong><span>Labour hire, support workers, urgent cover</span></span></a>
          <a class="hero-path cat-community" href="apply.html" data-track="hero-path-candidate"><span class="icon-badge">${icon.user}</span><span><strong>I'm looking for work</strong><span>Register for industrial or care roles</span></span></a>
          <a class="hero-path cat-industrial" href="${tel}" data-track="hero-path-call"><span class="icon-badge">${icon.phone}</span><span><strong>Call ${site.phone}</strong><span>Speak to our team, 24/7</span></span></a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="who-title">
  <div class="container split">
    <div class="reveal">
      
      <h2 id="who-title">One trusted partner, from the worksite to the home</h2>
      <p class="lead">Staff shortages stall projects and leave people without the support they rely on. We close those gaps with dependable people who arrive ready to work.</p>
      <p>Site supervisors use us to keep crews at full strength. Disability and community providers trust us with workers who treat every participant with dignity, safety and professionalism. Our mission is the same in both settings: dependable staffing from fully screened, trained and supported workers.</p>
      <a class="text-link" href="about.html">About BrightSteps</a>
    </div>
    ${photo("Two shots side by side: a BrightSteps crew on site in hi-vis, and a support worker and participant out in the community.", "Warehouse staff in hi-vis walking between pallet racks", "warehouse-team.webp")}
  </div>
</section>

<section class="section section--sand" aria-labelledby="services-title">
  <div class="container">
    <div class="section-head"><h2 id="services-title">Staffing for the work that can't wait</h2><p>Short-term, emergency and contract staffing across four core areas.</p></div>
    ${serviceCards}
    <p style="margin-top:var(--space-4)"><a class="text-link" href="services.html">See all services, including cleaning and transport</a></p>
  </div>
</section>

<section class="section" aria-labelledby="how-title">
  <div class="container">
    <div class="section-head section-head--center"><h2 id="how-title">Simple steps for employers and job seekers</h2></div>
    <div class="tabs-pair">
      <div>
        <div class="path-head"><span class="icon-badge">${icon.briefcase}</span><h3>For employers</h3></div>
        <ol class="steps">
          <li><h3>Tell us what you need</h3><p>Roles, numbers, location, start date and shift pattern.</p></li>
          <li><h3>We match and confirm</h3><p>Screened, ready-to-work people are allocated and confirmed with you.</p></li>
          <li><h3>Work gets done</h3><p>Shifts are verified on digital timesheets, then invoiced weekly or fortnightly.</p></li>
        </ol>
        <div class="btn-row" style="margin-top:var(--space-3)">${btn("request-staff.html", "Request staff", "secondary", "how-request")}</div>
      </div>
      <div class="cat-community">
        <div class="path-head"><span class="icon-badge">${icon.user}</span><h3>For job seekers</h3></div>
        <ol class="steps">
          <li><h3>Register online</h3><p>Share your experience, checks and availability. It takes about five minutes.</p></li>
          <li><h3>Have a chat with us</h3><p>We get to know your skills and the kind of work you want.</p></li>
          <li><h3>Start working</h3><p>We offer you suitable shifts and support you while you work.</p></li>
        </ol>
        <div class="btn-row" style="margin-top:var(--space-3)">${btn("apply.html", "Apply for work", "ghost", "how-apply")}</div>
      </div>
    </div>
  </div>
</section>

<section class="section section--navy on-dark" aria-labelledby="why-title">
  <div class="container">
    <div class="section-head"><h2 id="why-title">The BrightSteps Standard</h2><p class="lead">Fast mobilisation. Careful screening. Support when every second counts.</p></div>
    <div class="grid grid--2">
      <div class="feature reveal"><span class="icon-badge">${icon.bolt}</span><div><h3>Fast mobilisation</h3><p>We specialise in high-speed mobilisation for mining, construction, industrial and care settings.</p></div></div>
      <div class="feature reveal"><span class="icon-badge">${icon.clock}</span><div><h3>24/7 support</h3><p>Our team is available around the clock to manage replacements, changes and urgent requests.</p></div></div>
      <div class="feature reveal"><span class="icon-badge">${icon.shield}</span><div><h3>Compliance focus</h3><p>Police checked and WWCC verified workers, plus workers compensation and public liability insurance on every contract.</p></div></div>
      <div class="feature reveal"><span class="icon-badge">${icon.clipboard}</span><div><h3>Reliable, transparent service</h3><p>Digital timesheets, clear rates and simple weekly or fortnightly invoicing.</p></div></div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="paths-title">
  <div class="container">
    <h2 id="paths-title" class="visually-hidden">Choose your path</h2>
    <div class="grid grid--2">
      <div class="pathway pathway--employer on-dark reveal">
        
        <h3>Keep your roster full</h3>
        <p>From a single replacement shift to a full crew, tell us what you need and we will confirm availability fast.</p>
        <div class="btn-row">${btn("request-staff.html", "Request staff", "primary", "path-request")}${btn("employers.html", "How we work with employers", "ghost", "path-employers")}</div>
      </div>
      <div class="pathway pathway--candidate reveal">
        
        <h3>Find work that fits your life</h3>
        <p>Industrial, disability support, community and cleaning roles in Tamworth and across Australia.</p>
        <div class="btn-row">${btn("apply.html", "Apply for work", "secondary", "path-apply")}${btn("find-work.html", "What to expect", "ghost", "path-find-work")}</div>
      </div>
    </div>
  </div>
</section>

${site.showReviews ? `<section class="section section--sand" aria-labelledby="reviews-title">
  <div class="container">
    <div class="section-head"><h2 id="reviews-title">Feedback from employers and workers</h2><p>We will publish genuine reviews here, with permission from the people who wrote them.</p></div>
    <!-- PLACEHOLDERS: replace each card with a real, consented testimonial (name, role, organisation) or a Google review embed. Do not invent reviews. -->
    <div class="grid grid--3">
      <figure class="quote-card"><span class="placeholder-tag">Placeholder: not a real review</span><blockquote><p>Space for a review from an industrial or construction client about speed and reliability.</p></blockquote><figcaption>Client name, role, organisation</figcaption></figure>
      <figure class="quote-card"><span class="placeholder-tag">Placeholder: not a real review</span><blockquote><p>Space for a review from a disability or community provider about worker quality and care.</p></blockquote><figcaption>Client name, role, organisation</figcaption></figure>
      <figure class="quote-card"><span class="placeholder-tag">Placeholder: not a real review</span><blockquote><p>Space for a review from a BrightSteps worker about their experience being placed and supported.</p></blockquote><figcaption>Worker first name, role</figcaption></figure>
    </div>
  </div>
</section>` : ""}

<section class="section" aria-labelledby="faq">
  <div class="container split split--top">
    <div>${homeFaq.html}</div>
    <div class="card reveal" style="background:var(--sand);border:0">
      <h3>Still have a question?</h3>
      <p>Talk to a real person. We are here 24/7.</p>
      <ul class="contact-list">
        <li><span class="icon-badge">${icon.phone}</span><span><strong>Phone</strong><a href="${tel}" data-track="faq-call">${site.phone}</a></span></li>
        <li><span class="icon-badge">${icon.mail}</span><span><strong>Email</strong><a href="${mailto}" data-track="faq-email">${site.email}</a></span></li>
      </ul>
      <p style="margin-top:var(--space-3)"><a class="text-link" href="contact.html">Send us a message</a></p>
    </div>
  </div>
</section>

<section class="section section--navy on-dark" aria-labelledby="area-title">
  <div class="container split">
    <div>
      
      <h2 id="area-title">Based in Tamworth, working across Australia</h2>
      <p class="lead">Our home is West Tamworth in regional NSW. From here we supply screened, supported workers to employers and providers in every state and territory.</p>
      <p>Find us at <a href="contact.html">${address}</a>.</p>
    </div>
    <div><ul class="chips">${site.areas.map((a) => `<li>${a}</li>`).join("")}</ul></div>
  </div>
</section>

${ctaBand()}`,
  },

  // ---------------- ABOUT ----------------
  {
    file: "about.html",
    title: "About BrightSteps Recruitment | Locally Owned, West Tamworth",
    description: "Australian-owned workforce provider based in West Tamworth, led by Director Edwin Ngetich, connecting organisations across Australia with skilled, caring workers.",
    crumbs: [["About us", ""]],
    plan: { purpose: "Build trust: who runs BrightSteps, why it exists and what it stands for.", audience: "Employers vetting a new supplier; candidates choosing an agency.", imagery: "Portrait of Edwin Ngetich in a real local setting; team photo outside the West Tamworth office.", conversion: "CTA band, links to services and Find Work.", schemaNote: "EmploymentAgency with founder; AboutPage." },
    schema: [{ "@context": "https://schema.org", "@type": "AboutPage", name: "About BrightSteps Recruitment", url: `${site.url}/about.html` }],
    body: `${pageHero({ crumbs: [["About us", ""]], eyebrow: "About us", h1: "Bridging the gap between quality talent and community need", lead: "BrightSteps Recruitment is an Australian-owned workforce solutions provider based in West Tamworth, NSW. We believe recruitment should be more than a transaction." })}

<section class="section">
  <div class="container split">
    <div class="reveal">
      <h2>Who we are</h2>
      <p>We work where industrial labour hire meets community care. One day that means a crew of general labourers for a construction site. The next it means a support worker who helps someone live more independently at home.</p>
      <p>What connects that work is people. We build lasting relationships with the organisations we supply and the workers we place, because reliable staffing depends on both.</p>
      <p>We are proudly based in West Tamworth, and we supply people to employers and providers across Australia. Regional roots, national reach.</p>
    </div>
    ${photo("The BrightSteps team outside the West Tamworth office, natural light, relaxed and approachable.", "Warehouse supervisor checking a roster on a tablet between shelving aisles", "warehouse-supervisor.webp")}
  </div>
</section>

<section class="section section--sand">
  <div class="container">
    <div class="section-head"><h2>Connecting organisations with skilled and compassionate workers</h2><p class="lead">Our mission is to supply workers who promote dignity, safety and professionalism in every setting.</p></div>
    <div class="grid grid--3">
      <div class="card reveal"><span class="icon-badge">${icon.shield}</span><h3 style="margin-top:var(--space-2)">Safety without compromise</h3><p>Every worker is fully screened, insured and verified before they start.</p></div>
      <div class="card reveal"><span class="icon-badge">${icon.bolt}</span><h3 style="margin-top:var(--space-2)">Rapid mobilisation</h3><p>Our systems are built for 24/7 responsiveness, so gaps get filled quickly.</p></div>
      <div class="card reveal"><span class="icon-badge">${icon.home}</span><h3 style="margin-top:var(--space-2)">Community first</h3><p>As a local business, we invest in the people and organisations of our region.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container split">
    ${photo("", "Edwin Ngetich, Director of BrightSteps Recruitment", "edwin-ngetich.jpg", { portrait: true, w: 400, h: 400 })}
    <div class="reveal">
      
      <h2>Led by Director ${site.director}</h2>
      <p>Under Edwin's leadership, BrightSteps has become a reliable partner in the Tamworth business community, known for responsive service and for treating workers and clients with respect.</p>
      <!-- Add a short, factual bio (background, qualifications, why he started BrightSteps) supplied by Edwin. -->
      <p>Want to talk about a staffing partnership? Edwin and the team would like to hear from you.</p>
      <div class="btn-row">${btn("contact.html", "Contact us", "secondary", "about-contact")}${callBtn()}</div>
    </div>
  </div>
</section>

<section class="section section--navy on-dark">
  <div class="container">
    <div class="section-head"><h2>Why organisations choose BrightSteps</h2></div>
    ${standard}
  </div>
</section>

${ctaBand({ h2: "Let's work together", text: "Whether you need staff or you're looking for work, we're ready to help.", secondary: btn("find-work.html", "Find work", "ghost", "about-band-find-work") })}`,
  },

  // ---------------- SERVICES ----------------
  {
    file: "services.html",
    title: "Staffing Services: Labour Hire, Disability & Community | BrightSteps",
    description: "Industrial labour hire, disability support, community services, cleaning, transport and emergency staffing from BrightSteps in Tamworth. Short-term or contract.",
    crumbs: [["Services", ""]],
    plan: { purpose: "Overview of every service with routes to the four detailed pages; replaces the old Products page.", audience: "Employers and providers comparing options.", imagery: "Icon-led cards; no photos needed.", conversion: "Service cards, delivery models, CTA band.", schemaNote: "ItemList of Services (each detailed page carries its own Service schema)." },
    schema: [{ "@context": "https://schema.org", "@type": "ItemList", name: "BrightSteps staffing services", itemListElement: ["industrial-labour-hire.html", "disability-support-staffing.html", "community-services-staffing.html", "emergency-short-term-staffing.html"].map((u, i) => ({ "@type": "ListItem", position: i + 1, url: `${site.url}/${u}` })) }],
    body: `${pageHero({ crumbs: [["Services", ""]], eyebrow: "Services", h1: "Workforce solutions for industry and community", lead: "Dependable staffing across labour hire, disability support and community services, available short-term, in an emergency or on contract.", ctas: btn("request-staff.html", "Request staff", "primary", "services-hero-request") + callBtn() })}

<section class="section">
  <div class="container">
    <div class="section-head"><h2>Our core services</h2></div>
    ${serviceCards}
  </div>
</section>

<section class="section section--sand">
  <div class="container">
    <div class="section-head"><h2>Every role we supply</h2><p>A single supplier for your industrial, care and support staffing needs.</p></div>
    <div class="grid grid--3">
      <div class="card cat-industrial"><span class="icon-badge">${icon.hardhat}</span><h3 style="margin-top:var(--space-2)">General labourers</h3><p>Experienced workers for mining, construction, warehousing and logistics.</p></div>
      <div class="card cat-disability"><span class="icon-badge">${icon.heart}</span><h3 style="margin-top:var(--space-2)">Disability support workers</h3><p>In-home care, community access, Supported Independent Living (SIL) and respite.</p></div>
      <div class="card cat-community"><span class="icon-badge">${icon.people}</span><h3 style="margin-top:var(--space-2)">Community support workers</h3><p>Experienced personnel who make a positive impact in community programs.</p></div>
      <div class="card cat-community"><span class="icon-badge">${icon.truck}</span><h3 style="margin-top:var(--space-2)">Transport &amp; community access</h3><p>Dedicated transport so participants can get to appointments, work and activities.</p></div>
      <div class="card cat-disability"><span class="icon-badge">${icon.sparkle}</span><h3 style="margin-top:var(--space-2)">Cleaning &amp; domestic support</h3><p>Residential and commercial cleaning, plus help with daily household tasks.</p></div>
      <div class="card cat-emergency"><span class="icon-badge">${icon.doc}</span><h3 style="margin-top:var(--space-2)">Support coordinator assistants</h3><p>Administrative support that keeps coordination organised and on time.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head"><h2>Flexible ways to engage us</h2></div>
    <div class="grid grid--3">
      <div class="feature"><span class="icon-badge">${icon.calendar}</span><div><h3>Short-term staffing</h3><p>Cover immediate gaps, staff leave and seasonal peaks.</p></div></div>
      <div class="feature cat-emergency"><span class="icon-badge">${icon.bolt}</span><div><h3>Emergency solutions</h3><p>Rapid replacements when someone can't make a shift, backed by 24/7 support.</p></div></div>
      <div class="feature cat-industrial"><span class="icon-badge">${icon.briefcase}</span><div><h3>Contract staffing</h3><p>Reliable workers for the length of your project or program.</p></div></div>
    </div>
  </div>
</section>

<section class="section section--sand">
  <div class="container">
    <div class="section-head"><h2>From request to invoice in four steps</h2></div>
    ${processSteps}
  </div>
</section>

${ctaBand()}`,
  },

  // ---------------- EMPLOYERS ----------------
  {
    file: "employers.html",
    title: "For Employers: Labour Hire & Support Staff on Demand | BrightSteps",
    description: "Need screened, insured staff fast? BrightSteps supplies labour hire and support workers across Australia, with 24/7 support, digital timesheets and simple invoicing.",
    crumbs: [["For employers", ""]],
    plan: { purpose: "Persuade employers and providers to submit a staffing request.", audience: "Site managers, operations managers, disability and community service managers, procurement.", imagery: "Supervisor briefing a BrightSteps crew; coordinator reviewing a roster with a support worker.", conversion: "Hero CTAs, process, FAQ, CTA band.", schemaNote: "FAQPage, BreadcrumbList." },
    audience: "employer",
    schema: [],
    body: (() => {
      const f = faq([
        ["What information do you need for a staffing request?", "The roles, number of workers, location, start date, expected duration and any site or participant requirements (for example inductions, licences or language). The <a href=\"request-staff.html\">request form</a> covers it all."],
        ["Who employs the workers?", "BrightSteps manages the workers we supply, including screening, insurance and timesheets. Talk to us about the arrangement that suits your organisation."],
        ["How are shifts verified and billed?", "Shifts are verified through digital timesheets. We invoice weekly or fortnightly, with clear line items."],
        ["What happens if a worker can't make a shift?", "Our team is available 24/7. Call us and we will work to arrange a replacement as quickly as possible."],
        ["Do your rates include on-costs?", "Our indicative hourly rates include training, administration and insurance costs. All rates exclude GST. See the <a href=\"pricing.html\">pricing schedule</a>."],
      ], "Employer FAQs", "employer-faq");
      return `${pageHero({ crumbs: [["For employers", ""]], eyebrow: "For employers & providers", h1: "Screened, insured staff, when and where you need them", lead: "Whether you're short a crew on a construction site or a support worker for tonight's shift, BrightSteps mobilises reliable people quickly and supports them 24/7.", ctas: btn("request-staff.html", "Request staff", "primary", "employers-hero-request") + callBtn() })}

<section class="section">
  <div class="container">
    <div class="section-head"><h2>What you can expect from us</h2></div>
    <div class="grid grid--2">
      <div class="feature reveal"><span class="icon-badge">${icon.bolt}</span><div><h3>Fast mobilisation</h3><p>We specialise in high-speed mobilisation, so you can keep projects and programs on track.</p></div></div>
      <div class="feature reveal"><span class="icon-badge">${icon.shield}</span><div><h3>Screened workers</h3><p>Police checked and WWCC verified, with workers compensation and public liability insurance on every contract.</p></div></div>
      <div class="feature reveal"><span class="icon-badge">${icon.clock}</span><div><h3>24/7 support</h3><p>Talk to our team any time about changes, replacements or urgent requests.</p></div></div>
      <div class="feature reveal"><span class="icon-badge">${icon.dollar}</span><div><h3>Transparent costs</h3><p>Published indicative rates, digital timesheets and simple weekly or fortnightly invoicing.</p></div></div>
    </div>
  </div>
</section>

<section class="section section--sand">
  <div class="container">
    <div class="section-head"><h2>Built for both worksites and care settings</h2></div>
    ${serviceCards}
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head"><h2>How engaging BrightSteps works</h2></div>
    ${processSteps}
  </div>
</section>

<section class="section section--sand">
  <div class="container">${f.html}</div>
</section>

${ctaBand({ h2: "Request staff in two minutes", text: "Share your requirements and we'll confirm availability and next steps." })}`;
    })(),
  },

  // ---------------- FIND WORK ----------------
  {
    file: "find-work.html",
    title: "Find Work in Tamworth: Labour & Support Worker Jobs | BrightSteps",
    description: "Looking for labouring, disability support, community or cleaning work in Tamworth or across Australia? Register with BrightSteps for supported shifts that suit you.",
    crumbs: [["Find work", ""]],
    audience: "candidate",
    plan: { purpose: "Give job seekers a clear reason and path to register.", audience: "Labourers, support workers, community workers, cleaners, drivers, admin assistants.", imagery: "Workers in their own words: a labourer at the end of a shift, a support worker with a participant (consented).", conversion: "Apply CTA in hero, mobile bar and footer of page; requirements checklist reduces drop-off.", schemaNote: "FAQPage, BreadcrumbList. Add JobPosting schema per live vacancy when jobs are listed." },
    schema: [],
    body: (() => {
      const f = faq([
        ["Do I need experience?", "It depends on the role. Some roles need specific experience, licences or qualifications; others suit people who are reliable and keen to learn. Tell us about yourself in the application."],
        ["Which checks do I need?", "Our workforce is police checked and WWCC verified. Some roles, such as disability support, may need extra checks (for example an NDIS Worker Screening Check). We will explain what applies to the roles you're interested in."],
        ["Can I choose my shifts?", "Tell us your availability when you register: weekdays, nights, weekends or on-call. We'll offer shifts that match."],
        ["How do I get paid?", "Your hours are recorded on digital timesheets. We will explain pay rates and pay cycles before you start any role."],
        ["Does it cost anything to register?", "No. Registering with BrightSteps is free."],
      ], "Job seeker FAQs", "candidate-faq");
      return `${pageHero({ crumbs: [["Find work", ""]], eyebrow: "For job seekers", h1: "Find work that fits your skills and your life", lead: "We place people in industrial, disability support, community and cleaning roles across Tamworth and NSW, and we support you every step of the way.", ctas: btn("apply.html", "Apply for work", "primary", "find-work-hero-apply") + callBtn(), accent: "cat-community" })}

<section class="section">
  <div class="container">
    <div class="section-head"><h2>Types of work we offer</h2></div>
    <div class="grid grid--3">
      <div class="card cat-industrial reveal"><span class="icon-badge">${icon.hardhat}</span><h3 style="margin-top:var(--space-2)">Labour &amp; industrial</h3><p>General labouring for mining, construction, warehousing and logistics.</p></div>
      <div class="card cat-disability reveal"><span class="icon-badge">${icon.heart}</span><h3 style="margin-top:var(--space-2)">Disability support</h3><p>In-home care, community access, SIL and respite support.</p></div>
      <div class="card cat-community reveal"><span class="icon-badge">${icon.people}</span><h3 style="margin-top:var(--space-2)">Community &amp; domestic</h3><p>Community support, transport, cleaning and support coordination assistance.</p></div>
    </div>
  </div>
</section>

<section class="section section--sand">
  <div class="container split split--top">
    <div>
      <h2>Why work with BrightSteps</h2>
      <ul class="check-list">
        <li>Flexible shifts: short-term, ongoing and on-call</li>
        <li>A local team in West Tamworth who know you by name</li>
        <li>Support available 24/7 while you're on shift</li>
        <li>Workers compensation and public liability insurance</li>
        <li>Clear digital timesheets</li>
        <li>Free to register</li>
      </ul>
    </div>
    <div class="card">
      <h2 style="font-size:var(--step-1)">Before you apply, have ready</h2>
      <ul class="check-list">
        <li>Your contact details and the area you can work in</li>
        <li>Your work history or a resume (optional)</li>
        <li>Details of checks you hold, such as police check, WWCC or NDIS Worker Screening Check</li>
        <li>Licences or tickets, such as driver licence, White Card, forklift or first aid</li>
        <li>Your availability</li>
      </ul>
      ${btn("apply.html", "Start your application", "primary btn--block", "find-work-card-apply")}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head"><h2>What happens after you apply</h2></div>
    <ol class="steps steps--4">
      <li><h3>We review</h3><p>Our team reads every application.</p></li>
      <li><h3>We talk</h3><p>We call you to learn about your skills and goals.</p></li>
      <li><h3>Checks</h3><p>We confirm the checks and documents your roles need.</p></li>
      <li><h3>You start</h3><p>We offer you suitable shifts and support you on the job.</p></li>
    </ol>
  </div>
</section>

<section class="section section--sand"><div class="container">${f.html}</div></section>

${ctaBand({ h2: "Ready to take the next step?", text: "Register in about five minutes. It's free.", primary: btn("apply.html", "Apply for work", "primary", "find-work-band-apply"), secondary: btn("contact.html", "Ask a question", "ghost", "find-work-band-contact") })}`;
    })(),
  },
];
