import { site } from "../config.mjs";
import { icon, btn, callBtn, pageHero, faq, ctaBand, tel, mailto, address } from "../layout.mjs";
import { field, choices, consent, form } from "../forms.mjs";
import { processSteps } from "./core.mjs";
import { openJobs } from "./growth.mjs";
import { newsCards } from "./news.mjs";
import { rates, rateKeys, price, esc } from "../content.mjs";

// Phone fields accept the ways people actually type numbers: 0424 234 925, 0424-234-925, (02) 6766 1234, +61 424 234 925 (F2).
const PHONE = 'pattern="\\+?\\(?[0-9]{1,4}\\)?([ \\-]?[0-9]){6,14}" data-pattern-msg="Enter a phone number, like 0424 234 925 or (02) 6766 1234"';

const contactAside = (heading = "Prefer to talk?") => `<aside class="form-aside card" style="background:var(--sand);border:0" aria-labelledby="aside-title">
  <h2 id="aside-title" style="font-size:var(--step-1)">${heading}</h2>
  <p>Our team is available 24/7.</p>
  <ul class="contact-list">
    <li><span class="icon-badge">${icon.phone}</span><span><strong>Phone</strong><a href="${tel}" data-track="aside-call">${site.phone}</a></span></li>
    <li><span class="icon-badge">${icon.mail}</span><span><strong>Email</strong><a href="${mailto}" data-track="aside-email">${site.email}</a></span></li>
    <li><span class="icon-badge">${icon.pin}</span><span><strong>Office</strong>${site.street}<br>${site.locality} ${site.region} ${site.postcode}</span></li>
  </ul>
</aside>`;

const pricingFaq = faq([
  ["What is included in your rates?", "Our rates are designed to be competitive and include training, administration and insurance costs. All rates exclude GST."],
  ["Why don't all roles show a rate?", "Cleaning, domestic support and support coordinator assistant rates depend on the scope of work. Request a quote and we will price it for you."],
  ["How are shifts recorded and billed?", "Shift completion is verified through digital timesheets. We invoice weekly or fortnightly."],
  ["Are there extra charges for nights, weekends or public holidays?", "Rates can vary with shift times, award conditions and location. Your quote will set out the rates that apply to your request before any work starts."],
  ["Is there a minimum booking or a cancellation fee?", "Any minimum shift length, cancellation notice and charges are set out in your quote before work starts. Our <a href=\"client-terms.html\">client terms</a> explain how bookings, timesheets and invoices work."],
], "Pricing questions", "pricing-faq");

export const pages = [
  // ---------------- PRICING ----------------
  {
    file: "pricing.html",
    title: "Labour Hire & Support Worker Rates (ex GST) | BrightSteps Pricing",
    description: `Transparent indicative rates (ex GST): ${rateKeys.filter(price).slice(0, 3).map((k) => `${esc(rates[k].label).toLowerCase()} ${price(k)}/hr`).join(", ")}. Request a tailored quote.`,
    crumbs: [["Pricing schedule", ""]],
    plan: { purpose: "Show published rates (a differentiator) and convert price-checkers into quote requests.", audience: "Procurement, finance, operations and service managers.", imagery: "None; a clean rate table builds trust.", conversion: "Rate table with 'Get a quote' CTAs, FAQ, CTA band.", schemaNote: "OfferCatalog (Offers with UnitPriceSpecification, AUD, ex GST), FAQPage, BreadcrumbList." },
    schema: [{
      "@context": "https://schema.org", "@type": "OfferCatalog", name: "BrightSteps indicative hourly rates", url: `${site.url}/pricing`,
      itemListElement: rateKeys.filter(price).map((k) => [rates[k].label, Number(rates[k].rate)]).map(([name, price]) => ({
        "@type": "Offer", itemOffered: { "@type": "Service", name }, seller: { "@id": `${site.url}/#organization` },
        priceSpecification: { "@type": "UnitPriceSpecification", price, priceCurrency: "AUD", unitCode: "HUR", valueAddedTaxIncluded: false },
      })),
    }],
    body: `${pageHero({ crumbs: [["Pricing schedule", ""]], eyebrow: "Pricing schedule", h1: "Transparent rates. No hidden costs.", lead: "Our hourly rates include training, administration and insurance costs, so you can budget with confidence. All rates exclude GST.", ctas: btn("request-staff.html", "Get a quote", "primary", "pricing-hero-quote") + callBtn() })}

<section class="section">
  <div class="container">
    <div class="table-wrap">
      <table class="rate-table">
        <caption>Indicative hourly rates, excluding GST. Your quote confirms the final rate.</caption>
        <thead><tr><th scope="col">Role</th><th scope="col">What's included</th><th scope="col">Rate (ex GST)</th></tr></thead>
        <tbody>
          ${rateKeys.map((k) => { const r = rates[k]; const link = {"transport":"transport-community-access.html","cleaner":"cleaning-domestic-support.html"}[k];
            const name = link ? `<a href="${link}">${esc(r.label)}</a>` : esc(r.label);
            return `<tr><th scope="row">${name}${r.detail ? `<small>${esc(r.detail)}</small>` : ""}</th><td>${esc(r.included)}</td><td>${price(k) ? `<span class="rate">${price(k)}</span><small>${esc(r.unit)}</small>` : `<a href="request-staff.html" data-track="pricing-quote-${k}">Get a quote</a>`}</td></tr>`; }).join("\n          ")}
        </tbody>
      </table>
    </div>
    <p class="hint" style="margin-top:var(--space-2)">${esc(rates.footnote)} See our <a href="client-terms.html">client terms</a>.</p>
  </div>
</section>

<section class="section section--sand">
  <div class="container">
    <div class="section-head"><h2>Simple process, clear billing</h2></div>
    ${processSteps}
  </div>
</section>

<section class="section"><div class="container">${pricingFaq.html}</div></section>

${ctaBand({ h2: "Get a quote for your exact needs", text: "Tell us the roles, hours and location. We'll send clear pricing." })}`,
  },

  // ---------------- NEWS LISTING ----------------
  {
    file: "news.html",
    title: "Events & News | BrightSteps Recruitment Tamworth",
    description: "Workforce updates, hiring events and company news from BrightSteps Recruitment in Tamworth, NSW, for local employers and job seekers.",
    crumbs: [["Events & news", ""]],
    plan: { purpose: "Local SEO and trust through regular, genuine updates (hiring days, community involvement, workforce tips).", audience: "Employers, candidates, local community.", imagery: "A real photo per article, 16:9, with descriptive alt text.", conversion: "Empty state and article footer CTAs.", schemaNote: "Blog / ItemList when posts exist; each post uses Article (or Event for events)." },
    schema: [{ "@context": "https://schema.org", "@type": "Blog", name: "BrightSteps Events & News", url: `${site.url}/news`, publisher: { "@id": `${site.url}/#organization` } }],
    body: `${pageHero({ crumbs: [["Events & news", ""]], eyebrow: "Events & news", h1: "News and events from BrightSteps", lead: "Hiring updates, practical guides for workers, and company news from our Tamworth team." })}
<section class="section">
  <div class="container">
    <!-- Posts come from src/pages/news.mjs: add a post there, then rebuild. -->
    ${newsCards}
  </div>
</section>
${ctaBand()}`,
  },

  // ---------------- ARTICLE TEMPLATE ----------------
  {
    file: "news-article-template.html",
    title: "Article Template | BrightSteps Recruitment",
    description: "Template for BrightSteps news articles and event announcements.",
    noindex: true,
    ogType: "article",
    crumbs: [["Events & news", "news.html"], ["Article template", ""]],
    plan: { purpose: "Reusable layout for news posts and event announcements. Not for publication as-is (noindex).", audience: "Content editors.", imagery: "Lead image 16:9, real and relevant, with descriptive alt text.", conversion: "End-of-article CTA band.", schemaNote: "Article (or Event with startDate, location and organizer for events)." },
    schema: [{ "@context": "https://schema.org", "@type": "Article", headline: "Article headline goes here", datePublished: "2027-01-01", author: { "@id": `${site.url}/#organization` }, publisher: { "@id": `${site.url}/#organization` }, image: `${site.url}/assets/img/og-image.png` }],
    body: `<section class="page-hero"><div class="container">
  <nav class="breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="index.html">Home</a></li><li><a href="news.html">Events &amp; news</a></li><li><span aria-current="page">Article template</span></li></ol></nav>
  <p class="eyebrow">News · <time datetime="2027-01-01">1 January 2027</time></p>
  <h1>Article headline goes here</h1>
  <p class="lead">A one-sentence summary of the article that also works as its meta description.</p>
</div></section>
<article class="section">
  <div class="container prose">
    <div class="callout"><p><strong>Template.</strong> This page is a layout example and is hidden from search engines. Copy it for each new post, replace all text, update the title, description, date and Article schema, then remove this notice and the noindex tag.</p></div>
    <p>Start with the most useful information for the reader. Keep paragraphs short and use plain Australian English.</p>
    <h2>Use H2 subheadings to break up the article</h2>
    <p>Explain the detail. Link to relevant pages, such as <a href="industrial-labour-hire.html">industrial labour hire</a> or <a href="find-work.html">find work</a>.</p>
    <ul><li>Use lists for steps or key points</li><li>Add a real, consented photo with descriptive alt text</li></ul>
    <h2>For events, include the essentials</h2>
    <p>Date, time, address, who it's for, what to bring, and how to register.</p>
    <p><a class="text-link" href="news.html">Back to all news</a></p>
  </div>
</article>
${ctaBand()}`,
  },

  // ---------------- CONTACT ----------------
  {
    file: "contact.html",
    title: "Contact BrightSteps Recruitment | 0424 234 925 | Tamworth",
    description: "Contact BrightSteps Recruitment at 6A Edinburgh Avenue, Tamworth NSW 2340. Call 0424 234 925 any time, or send us a message online.",
    crumbs: [["Contact", ""]],
    plan: { purpose: "Make every contact method obvious; catch general enquiries.", audience: "Everyone.", imagery: "Exterior of the office for local recognition; embedded map.", conversion: "Phone and email links, contact form, routes to specialised forms.", schemaNote: "ContactPage + EmploymentAgency (address, phone), BreadcrumbList." },
    schema: [{ "@context": "https://schema.org", "@type": "ContactPage", name: "Contact BrightSteps Recruitment", url: `${site.url}/contact` }],
    body: `${pageHero({ crumbs: [["Contact", ""]], eyebrow: "Contact us", h1: "Talk to the BrightSteps team", lead: "Call us any time, 24/7, or send a message and we'll get back to you. Need staff or looking for work? Use the quicker forms below." , ctas: btn("request-staff.html", "Request staff", "primary", "contact-hero-request") + btn("apply.html", "Apply for work", "ghost", "contact-hero-apply") })}
<section class="section">
  <div class="container form-layout">
    ${form({
      id: "contact-form", endpoint: site.forms.contact, submit: "Send message", time: "Takes about a minute",
      body: `<fieldset><legend>Your message</legend><div class="field-grid">
        ${field("c-name", "Full name", { required: true, attrs: 'autocomplete="name"', requiredMsg: "Enter your full name" })}
        ${field("c-email", "Email", { type: "email", required: true, attrs: 'autocomplete="email" spellcheck="false"', requiredMsg: "Enter your email address" })}
        ${field("c-phone", "Phone", { type: "tel", attrs: 'autocomplete="tel" ' + PHONE })}
        ${field("c-type", "I am", { type: "select", required: true, options: ["An employer or service provider", "Looking for work", "Something else"], requiredMsg: "Choose who you are" })}
        ${field("c-message", "How can we help?", { type: "textarea", required: true, full: true, requiredMsg: "Enter your message" })}
      </div></fieldset>
      ${consent("c-consent")}`,
    })}
    ${contactAside("Contact details")}
  </div>
</section>
<section class="section section--sand">
  <div class="container split">
    <div>
      <h2>Visit our office</h2>
      <p class="lead">${address}</p>
      <p>Please call ahead to arrange a time, so the right person is available to meet you.</p>
      <p><a class="text-link" href="https://www.google.com/maps/search/?api=1&amp;query=6A+Edinburgh+Avenue+Tamworth+NSW+2340" rel="noopener" target="_blank">Open in Google Maps (new tab)</a></p>
      <p><strong>ABN</strong> ${site.abn}</p>
    </div>
    <!-- Click-to-load map: nothing is requested from Google until the visitor chooses to show it (report R19). main.js swaps in the iframe. -->
    <div class="map-embed map-consent" data-map-src="https://www.google.com/maps?q=6A+Edinburgh+Avenue,+Tamworth+NSW+2340&amp;output=embed" data-map-title="Map showing BrightSteps Recruitment at 6A Edinburgh Avenue, Tamworth NSW">
      <p>The map is provided by Google. Showing it lets Google set cookies and see your IP address.</p>
      <button class="btn btn--secondary" type="button" data-show-map>Show map</button>
    </div>
  </div>
</section>`,
  },

  // ---------------- REQUEST STAFF ----------------
  {
    file: "request-staff.html",
    title: "Request Staff or Get a Quote | BrightSteps Recruitment",
    description: "Request labour hire, disability support or community staff, or get a quote. Tell us your roles, location and timing; BrightSteps will confirm availability fast.",
    crumbs: [["Request staff", ""]],
    plan: { purpose: "Primary employer conversion: capture a complete, qualified staffing request.", audience: "Employers, providers, procurement.", imagery: "None; keep focus on the form.", conversion: "Short structured form, error summary, success message, phone fallback, process reminder.", schemaNote: "BreadcrumbList. Track form_submit as the key conversion." },
    schema: [],
    body: `${pageHero({ crumbs: [["Request staff", ""]], eyebrow: "Request staff · Get a quote", h1: "Tell us who you need", lead: "Complete this short form and we'll confirm availability and pricing. For urgent shifts, call us on " + site.phone + ": we're available 24/7." })}
<section class="section">
  <div class="container form-layout">
    ${form({
      id: "request-staff-form", endpoint: site.forms.requestStaff, submit: "Send staffing request", time: "3 short steps · about 2 minutes",
      body: `<fieldset><legend>1. Your details</legend><div class="field-grid">
        ${field("r-name", "Full name", { required: true, attrs: 'autocomplete="name"', requiredMsg: "Enter your full name" })}
        ${field("r-org", "Organisation", { required: true, attrs: 'autocomplete="organization"', requiredMsg: "Enter your organisation name" })}
        ${field("r-email", "Work email", { type: "email", required: true, attrs: 'autocomplete="email" spellcheck="false"', requiredMsg: "Enter your email address" })}
        ${field("r-phone", "Phone", { type: "tel", required: true, attrs: 'autocomplete="tel" ' + PHONE, requiredMsg: "Enter your phone number" })}
      </div></fieldset>
      <fieldset><legend>2. Who you need</legend><div class="field-grid">
        ${field("r-sector", "Type of work", { type: "select", required: true, options: ["Industrial / labour hire", "Mining or construction", "Warehousing or logistics", "Disability support", "Community support", "Transport & community access", "Cleaning or domestic support", "Support coordinator assistant", "Other"], requiredMsg: "Choose the type of work" })}
        ${field("r-workers", "Number of workers", { type: "number", required: true, attrs: 'min="1" max="500" inputmode="numeric" value="1"', requiredMsg: "Enter how many workers you need" })}
        ${field("r-roles", "Roles or skills needed", { full: true, hint: "For example: 4 general labourers with White Cards, or 1 support worker for community access.", required: true, requiredMsg: "Describe the roles you need" })}
      </div></fieldset>
      <fieldset><legend>3. When and where</legend><div class="field-grid">
        ${field("r-start", "Start date", { type: "date", required: true, requiredMsg: "Enter a start date" })}
        ${field("r-duration", "Duration", { type: "select", required: true, options: ["Urgent / emergency cover", "Single shift", "Short-term (up to 4 weeks)", "Ongoing or contract", "Not sure yet"], requiredMsg: "Choose a duration" })}
        ${field("r-location", "Work location (town or suburb)", { required: true, attrs: 'autocomplete="address-level2"', requiredMsg: "Enter the work location" })}
        ${field("r-shifts", "Shift times", { hint: "For example: Mon–Fri 6am–2:30pm, or overnight." })}
        ${field("r-notes", "Anything else we should know?", { type: "textarea", full: true, hint: "Inductions, licences, PPE, participant needs, budget or quote requirements." })}
      </div></fieldset>
      ${choices("r-contact-pref", "Best way to contact you", ["Phone", "Email"], { type: "radio" })}
      ${consent("r-consent")}`,
    })}
    <div class="form-aside">
      ${contactAside("Urgent? Call us now")}
      <div class="card" style="margin-top:var(--space-3)">
        <h2 style="font-size:var(--step-1)">What happens next</h2>
        <ol style="padding-left:1.2rem;margin:0"><li>We review your request.</li><li>We call to confirm the details and pricing.</li><li>We send a written quote with the terms that apply.</li><li>We allocate screened, ready-to-work people.</li></ol>
        <p style="margin:var(--space-2) 0 0">Read our <a href="client-terms.html">client terms</a>.</p>
      </div>
    </div>
  </div>
</section>`,
  },

  // ---------------- APPLY ----------------
  {
    file: "apply.html",
    title: "Apply for Work | Register as a Candidate | BrightSteps Recruitment",
    description: "Register with BrightSteps for labouring, disability support, community, transport and cleaning work across NSW. Free and takes about five minutes.",
    crumbs: [["Find work", "find-work.html"], ["Apply for work", ""]],
    audience: "candidate",
    plan: { purpose: "Primary candidate conversion: capture registrations with skills, checks and availability.", audience: "Job seekers, support workers, labourers, contractors.", imagery: "None; keep focus on the form.", conversion: "Grouped form, checkboxes over free text, optional resume, success message.", schemaNote: "BreadcrumbList." },
    schema: [],
    body: `${pageHero({ crumbs: [["Find work", "find-work.html"], ["Apply for work", ""]], eyebrow: "Register as a candidate", h1: "Apply for work with BrightSteps", lead: "It's free and takes about five minutes. Tell us about yourself and the work you want, and our team will be in touch.", accent: "cat-community" })}
<section class="section">
  <div class="container form-layout">
    ${form({
      id: "apply-form", endpoint: site.forms.apply, submit: "Submit application", time: "3 short steps · about 5 minutes · free",
      body: `<p class="form-role" data-role-line hidden>Applying for: <span data-role-name></span></p>
      <input type="hidden" name="a-role" id="a-role" value="" data-prefill-role data-roles="${esc(JSON.stringify(Object.fromEntries(openJobs.map((j) => [j.slug, j.title]))))}">
      <fieldset><legend>1. About you</legend><div class="field-grid">
        ${field("a-first", "First name", { required: true, attrs: 'autocomplete="given-name"', requiredMsg: "Enter your first name" })}
        ${field("a-last", "Last name", { required: true, attrs: 'autocomplete="family-name"', requiredMsg: "Enter your last name" })}
        ${field("a-email", "Email", { type: "email", required: true, attrs: 'autocomplete="email" spellcheck="false"', requiredMsg: "Enter your email address" })}
        ${field("a-phone", "Mobile", { type: "tel", required: true, attrs: 'autocomplete="tel" ' + PHONE, requiredMsg: "Enter your mobile number" })}
        ${field("a-suburb", "Town or suburb", { required: true, attrs: 'autocomplete="address-level2"', requiredMsg: "Enter your town or suburb" })}
        ${field("a-postcode", "Postcode", { required: true, attrs: 'autocomplete="postal-code" inputmode="numeric" pattern="[0-9]{4}" data-pattern-msg="Enter a 4-digit postcode" maxlength="4"', requiredMsg: "Enter your postcode" })}
      </div></fieldset>
      <fieldset><legend>2. Work you're interested in</legend><div class="field-grid">
        ${choices("a-work", "Type of work", ["General labouring", "Mining or construction", "Warehousing or logistics", "Disability support", "Community support", "Transport & community access", "Cleaning or domestic support", "Support coordinator assistant"], { minOne: true, requiredMsg: "Select at least one type of work" })}
        ${choices("a-availability", "Availability", ["Weekdays", "Nights", "Weekends", "On call / emergency shifts"], { minOne: true, requiredMsg: "Select your availability" })}
      </div></fieldset>
      <fieldset><legend>3. Checks and qualifications</legend><div class="field-grid">
        ${choices("a-rights", "Do you have the right to work in Australia?", ["Yes", "No"], { type: "radio", requiredRadio: true, requiredMsg: "Tell us whether you have the right to work in Australia" })}
        ${choices("a-checks", "Checks, licences and tickets you currently hold", ["National police check", "Working With Children Check (WWCC)", "NDIS Worker Screening Check", "First aid / CPR", "Driver licence", "Own reliable vehicle", "White Card (construction induction)", "Forklift licence"], { hint: "Tick all that apply. Don't worry if you don't hold these yet." })}
        ${field("a-experience", "Tell us about your experience", { type: "textarea", full: true, hint: "Recent roles, skills and the kind of work you enjoy. Please don't include health or criminal history details here." })}
        ${field("a-resume", "Upload your resume", { type: "file", full: true, hint: "PDF or Word, up to 5 MB.", attrs: 'accept=".pdf,.doc,.docx" data-max-bytes="5242880" data-type-msg="Upload your résumé as a PDF or Word file" data-size-msg="Your résumé must be smaller than 5 MB"' })}
      </div></fieldset>
      ${consent("a-consent")}`,
    })}
    <div class="form-aside">
      <div class="card cat-community" style="background:var(--clay-tint);border:0">
        <h2 style="font-size:var(--step-1)">After you apply</h2>
        <ol style="padding-left:1.2rem"><li>We review your application.</li><li>We call you for a chat about your skills and goals.</li><li>We confirm checks and documents.</li><li>We offer you suitable shifts.</li></ol>
        <p style="margin:0">Questions? Call <a href="${tel}">${site.phone}</a>.</p>
      </div>
    </div>
  </div>
</section>`,
  },

  // ---------------- THANK YOU ----------------
  {
    file: "thank-you.html",
    title: "Thank You | BrightSteps Recruitment",
    description: "Thanks for contacting BrightSteps Recruitment. Our team will be in touch soon.",
    noindex: true,
    plan: { purpose: "Confirm a form was sent, set expectations, and give a single conversion URL for analytics goals.", audience: "Anyone who just submitted a form.", imagery: "None.", conversion: "Next steps, phone for urgent needs, links back into the site.", schemaNote: "None (noindex)." },
    schema: [],
    body: `<section class="not-found"><div class="container">
  <span class="icon-badge" style="margin:0 auto var(--space-3);width:4.5rem;height:4.5rem">${icon.check}</span>
  <h1>Thank you</h1>
  <p class="lead" data-for-default>Thanks for getting in touch with BrightSteps. If you sent us a form, our team will be in touch soon.</p>
  <p class="lead" data-for="request-staff-form" hidden>We've received your staffing request. A member of our team will contact you to confirm availability and next steps.</p>
  <p class="lead" data-for="apply-form" hidden>We've received your application. Our team reviews every application and will contact you about suitable roles.</p>
  <p class="lead" data-for="contact-form" hidden>Your message has been sent. We'll get back to you as soon as we can.</p>
  <p>Need us urgently? Call <a href="${tel}">${site.phone}</a>. We're available 24/7.</p>
  <div class="btn-row">${btn("index.html", "Back to the home page", "secondary", "thanks-home")}${btn("services.html", "Our services", "ghost", "thanks-services")}</div>
</div></section>`,
  },
];
