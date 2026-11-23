import { site } from "../config.mjs";
import { btn, pageHero, tel, mailto, address } from "../layout.mjs";

const legalPage = (file, crumb, title, description, h1, lead, content, plan) => ({
  file, title, description, plan,
  crumbs: [[crumb, ""]],
  schema: [],
  body: `${pageHero({ crumbs: [[crumb, ""]], h1, lead })}
<section class="section"><div class="container prose">
${content}
</div></section>`,
});

export const pages = [
  // Source: BrightSteps Privacy Policy (PDF, January 2026), merged with website-specific sections (forms, cookie consent).
  legalPage("privacy.html", "Privacy policy",
    "Privacy Policy | BrightSteps Recruitment",
    "How BrightSteps Recruitment collects, uses, stores and protects personal information under the Privacy Act 1988 (Cth) and the Australian Privacy Principles.",
    "Privacy policy",
    `Last updated: ${site.lastUpdated}`,
    `<div class="callout callout--info"><p><strong>Our commitment:</strong> ${site.name} is committed to protecting your privacy and handling your personal information in accordance with the Australian Privacy Principles (APPs) in the <em>Privacy Act 1988</em> (Cth).</p></div>

<h2>1. About this privacy policy</h2>
<p>This policy explains how ${site.name} (ABN ${site.abn}) ("BrightSteps", "we", "us") collects, uses, discloses and safeguards your personal information. It applies to everyone who interacts with us, including job candidates, employees, contractors, clients and website visitors.</p>
<p>BrightSteps is an Australian-owned workforce solutions provider based in Tamworth, NSW, led by Director ${site.director}. We specialise in industrial labour hire and community care.</p>

<h2>2. What personal information we collect</h2>
<h3>2.1 Job candidates and employees</h3>
<ul>
  <li><strong>Identity information:</strong> full name, date of birth, gender, photograph.</li>
  <li><strong>Contact information:</strong> address, phone number, email address.</li>
  <li><strong>Professional information:</strong> resume, employment history, qualifications, certifications, references.</li>
  <li><strong>Financial information:</strong> bank account details, tax file number, superannuation details (collected once you are engaged, not through our website).</li>
  <li><strong>Background checks:</strong> police checks, Working With Children Checks, professional licences.</li>
  <li><strong>Health information:</strong> medical certificates and pre-employment health assessments, where legally required for specific roles.</li>
  <li><strong>Right to work:</strong> visa status, citizenship information, passport details.</li>
</ul>
<h3>2.2 Client organisations</h3>
<ul>
  <li>Business contact information.</li>
  <li>Organisation details and staffing requirements.</li>
  <li>Billing and payment information.</li>
  <li>Service preferences and feedback.</li>
</ul>
<h3>2.3 Website visitors</h3>
<ul>
  <li>IP address and browser information.</li>
  <li>Pages visited and time spent on the site.</li>
  <li>Referring website information.</li>
  <li>Cookie data, only if you agree (see section 8).</li>
  <li>Anything you enter in our website forms (Request staff, Apply for work and Contact).</li>
</ul>

<h2>3. How we collect personal information</h2>
<ul>
  <li>Directly from you, through application forms, registration, interviews and correspondence, including our website forms.</li>
  <li>From third parties such as referees, previous employers and screening service providers.</li>
  <li>From publicly available sources, including professional networking sites.</li>
  <li>Through our website and online portals.</li>
  <li>While providing our services.</li>
</ul>

<h2>4. Why we collect and use your information</h2>
<h3>4.1 Primary purposes</h3>
<ul>
  <li><strong>Recruitment services:</strong> matching candidates with suitable work.</li>
  <li><strong>Employment management:</strong> managing employment relationships, payroll and workplace obligations.</li>
  <li><strong>Client services:</strong> providing workforce solutions to our clients.</li>
  <li><strong>Compliance:</strong> meeting legal and regulatory requirements, including workplace health and safety, tax and employment law.</li>
  <li><strong>Communication:</strong> contacting you about job opportunities, appointments and service updates.</li>
  <li><strong>Assessment:</strong> evaluating suitability for positions and conducting background checks.</li>
  <li><strong>Administration:</strong> managing our business operations and keeping records.</li>
</ul>
<h3>4.2 Secondary purposes</h3>
<ul>
  <li>Improving our services and website.</li>
  <li>Marketing our services, with your consent.</li>
  <li>Research and analysis to improve our recruitment processes.</li>
  <li>Protecting against fraud and maintaining security.</li>
</ul>

<h2>5. Disclosure of personal information</h2>
<h3>5.1 When we share your information</h3>
<ul>
  <li><strong>Client organisations:</strong> potential and actual employers, for recruitment and placement.</li>
  <li><strong>Service providers:</strong> background check companies, medical assessors, payroll processors, and IT providers (including the services that run our website forms and email).</li>
  <li><strong>Referees:</strong> people you have nominated as references.</li>
  <li><strong>Professional advisers:</strong> lawyers, accountants and business consultants.</li>
  <li><strong>Government agencies:</strong> when required by law or to meet legal obligations.</li>
  <li><strong>Emergency services:</strong> where there is a health or safety concern.</li>
</ul>
<h3>5.2 Overseas disclosure</h3>
<!-- Check with your form and email providers: if they store data outside Australia, keep the second sentence; if all data stays in Australia, delete it. -->
<p>We generally do not disclose personal information overseas. Some technology providers we use to run our website forms and email may store data on servers outside Australia. Where information is disclosed or stored overseas, we take reasonable steps to make sure appropriate safeguards are in place, and we obtain your consent where the law requires it.</p>
<p><strong>We will never sell your personal information to third parties for marketing purposes.</strong></p>

<h2>6. Data security and storage</h2>
<h3>6.1 Security measures</h3>
<p>We take reasonable steps to protect your personal information from misuse, interference and loss; unauthorised access, modification or disclosure; and cyber threats and data breaches. Our measures include:</p>
<ul>
  <li>Secure, encrypted databases and storage systems, and encrypted (HTTPS) connections on our website.</li>
  <li>Access controls and authentication requirements.</li>
  <li>Regular security audits and updates.</li>
  <li>Staff training on privacy and data protection.</li>
  <li>Physical security for paper-based records.</li>
</ul>
<h3>6.2 Data retention</h3>
<p>We keep personal information only as long as needed for the purposes it was collected for, to meet legal obligations and to resolve disputes. Generally:</p>
<ul>
  <li><strong>Employee records:</strong> 7 years after employment ends.</li>
  <li><strong>Candidate records:</strong> up to 2 years after last contact, unless you ask us to delete them sooner.</li>
  <li><strong>Financial records:</strong> 7 years, as required by taxation law.</li>
</ul>
<p>After that, we securely destroy or de-identify the information.</p>
<h3>6.3 Notifiable data breaches</h3>
<p>If a data breach is likely to result in serious harm, we will notify the people affected and the Office of the Australian Information Commissioner (OAIC), as required by the Notifiable Data Breaches scheme.</p>

<h2>7. Your privacy rights</h2>
<h3>7.1 Access and correction</h3>
<ul>
  <li><strong>Access:</strong> ask for access to the personal information we hold about you.</li>
  <li><strong>Correction:</strong> ask us to correct inaccurate or incomplete information.</li>
  <li><strong>Update:</strong> update your contact details and preferences at any time.</li>
</ul>
<h3>7.2 Additional rights</h3>
<ul>
  <li><strong>Withdraw consent:</strong> for marketing communications or specific uses of your information.</li>
  <li><strong>Anonymity:</strong> deal with us anonymously or using a pseudonym where practicable. This may limit our ability to provide services, for example, we cannot place a worker we cannot identify.</li>
  <li><strong>Complaints:</strong> make a complaint about how we have handled your personal information.</li>
</ul>
<h3>7.3 How to exercise your rights</h3>
<p>Contact our Privacy Officer using the details in section 11. We will respond to access and correction requests within a reasonable time, usually 30 days.</p>

<h2 id="cookies">8. Cookies and website analytics</h2>
<p>Our website uses essential browser storage to remember your privacy choice. With your permission, we also use analytics cookies to understand website traffic and usage patterns so we can improve the site.</p>
<p>Analytics cookies are only set if you select "Accept analytics" in the privacy notice, or turn analytics on in Cookie settings. You can change your choice at any time using <button type="button" class="link-btn" data-cookie-settings aria-haspopup="dialog">Cookie settings</button>, or control cookies through your browser settings. Disabling cookies does not stop the website from working.</p>

<h2>9. Sensitive information</h2>
<p>We only collect sensitive information, such as health information, criminal records or information about racial or ethnic origin, when:</p>
<ul>
  <li>you have given consent;</li>
  <li>it is required or authorised by law; or</li>
  <li>it is necessary for specific job requirements, for example health assessments for safety-critical roles.</li>
</ul>
<p>Sensitive information is handled with extra care and subject to stricter security measures. Please do not include health information or criminal history in our website forms. We will ask for it securely if a role requires it.</p>

<h2>10. Changes to this privacy policy</h2>
<p>We may update this policy from time to time to reflect changes in our practices or legal requirements. We will post the updated policy on this page with a revised "Last updated" date. We encourage you to review it periodically.</p>

<h2>11. Contact us and privacy complaints</h2>
<p><strong>Privacy Officer</strong><br>${site.name}<br>Attention: Privacy Officer<br>${address}<br>Phone: <a href="${tel}">${site.phone}</a><br>Email: <a href="${mailto}">${site.email}</a></p>
<h3>Complaint resolution process</h3>
<ol>
  <li>Send your complaint in writing to our Privacy Officer.</li>
  <li>We will acknowledge receipt within 7 business days.</li>
  <li>We will investigate and respond within 30 days.</li>
  <li>If you are not satisfied with our response, you can contact the Office of the Australian Information Commissioner (OAIC).</li>
</ol>
<p><strong>Office of the Australian Information Commissioner</strong><br>Website: <a href="https://www.oaic.gov.au" rel="noopener">oaic.gov.au</a><br>Phone: 1300 363 992<br>Email: <a href="mailto:enquiries@oaic.gov.au">enquiries@oaic.gov.au</a></p>

<h2>12. Consent</h2>
<p>By providing your personal information to BrightSteps and using our services, you consent to the collection, use and disclosure of your information as described in this privacy policy.</p>`,
    { purpose: "Meet Australian Privacy Act obligations and build trust with candidates handing over sensitive information. Based on the business's own January 2026 policy.", audience: "Candidates, workers, clients, participants, visitors.", imagery: "None.", conversion: "Privacy Officer contact details.", schemaNote: "BreadcrumbList." }),

  // Source: BrightSteps Legal Notice (PDF, January 2026), with ABN, address and contact details added.
  legalPage("terms.html", "Legal notice & terms",
    "Legal Notice & Website Terms | BrightSteps Recruitment",
    "Legal notice, business details and website terms of use for BrightSteps Recruitment, Tamworth NSW. ABN 71 374 775 561.",
    "Legal notice and website terms",
    `Last updated: ${site.lastUpdated}`,
    `<h2>1. Company information</h2>
<p><strong>Business name:</strong> ${site.name}<br>
<strong>ABN:</strong> ${site.abn}<br>
<strong>Type:</strong> Australian-owned workforce solutions provider<br>
<strong>Director:</strong> ${site.director}<br>
<strong>Principal place of business:</strong> ${address}<br>
<strong>Industries:</strong> Industrial labour hire and community care<br>
<strong>Phone:</strong> <a href="${tel}">${site.phone}</a><br>
<strong>Email:</strong> <a href="${mailto}">${site.email}</a></p>

<h2>2. Website terms of use</h2>
<h3>2.1 Acceptance of terms</h3>
<p>By accessing and using the BrightSteps Recruitment website, you accept and agree to be bound by these terms. If you do not agree, please do not use this website.</p>
<h3>2.2 Intellectual property</h3>
<p>All content on this website, including text, graphics, logos, images and software, is the property of ${site.name} and is protected by Australian and international copyright laws. You may view and print pages for personal or internal business use. Any other use, reproduction or distribution needs our written permission.</p>
<h3>2.3 Website use</h3>
<p>You may use this website for lawful purposes only. You agree not to:</p>
<ul>
  <li>use the website in any way that breaches applicable laws or regulations;</li>
  <li>transmit any harmful or malicious code;</li>
  <li>attempt to gain unauthorised access to any part of the website;</li>
  <li>interfere with or disrupt the website's functionality; or</li>
  <li>use automated systems to access the website without our written permission.</li>
</ul>
<h3>2.4 Your submissions</h3>
<p>When you submit a form on this website, you confirm that the information is accurate and that you are allowed to share it. Please do not submit information about other people without their consent. We handle all submissions in line with our <a href="privacy.html">privacy policy</a>.</p>

<h2>3. Services disclaimer</h2>
<h3>3.1 Recruitment services</h3>
<p>BrightSteps provides workforce solutions in the industrial labour hire and community care sectors. While we work to match candidates with suitable positions and to provide clients with qualified personnel, we cannot guarantee employment outcomes or specific results.</p>
<h3>3.2 Information accuracy and rates</h3>
<p>We make every effort to keep the information on this website accurate and up to date, but we do not warrant its completeness, reliability or accuracy. Any reliance you place on it is at your own risk. Rates on our pricing schedule are indicative, exclude GST, and may vary with shift times, award conditions, location and requirements. A written quote or agreement confirms the terms of any engagement and takes priority over this website.</p>

<h2>4. Limitation of liability</h2>
<p>To the fullest extent permitted by Australian law, ${site.name} is not liable for any direct, indirect, incidental, consequential or punitive damages arising from:</p>
<ul>
  <li>your use of, or inability to use, our website or services;</li>
  <li>any errors or omissions in website content;</li>
  <li>unauthorised access to or alteration of your transmissions or data; or</li>
  <li>any third-party content or conduct on the website.</li>
</ul>
<p>Nothing in these terms excludes, restricts or modifies any right or remedy you have under the Australian Consumer Law that cannot lawfully be excluded.</p>

<h2>5. Third-party links</h2>
<p>Our website may contain links to third-party websites for your convenience. We have no control over, and take no responsibility for, the content, privacy policies or practices of those websites.</p>

<h2>6. Compliance with Australian law</h2>
<p>BrightSteps is committed to operating in line with relevant Australian legislation, including:</p>
<ul>
  <li><em>Fair Work Act 2009</em> (Cth)</li>
  <li><em>Work Health and Safety Act 2011</em> (NSW)</li>
  <li><em>Privacy Act 1988</em> (Cth)</li>
  <li>Australian Consumer Law</li>
  <li>Anti-discrimination legislation</li>
</ul>

<h2>7. Professional standards</h2>
<p>As a recruitment and workforce solutions provider, we are committed to professional and ethical conduct, and to integrity, transparency and trust in all our business dealings.</p>

<h2>8. Changes to these terms</h2>
<p>We may change these terms at any time. Changes take effect when posted on this page. Your continued use of the website after changes are posted means you accept them.</p>

<h2>9. Governing law</h2>
<p>These terms are governed by the laws of New South Wales, Australia. Any disputes arising from them are subject to the exclusive jurisdiction of the courts of New South Wales.</p>

<h2>10. Severability</h2>
<p>If any provision of these terms is found to be invalid or unenforceable, the remaining provisions continue in full force and effect.</p>

<h2>Contact</h2>
<p>For questions about this legal notice or our terms of use, contact ${site.name}, ${address}, on <a href="${tel}">${site.phone}</a> or at <a href="${mailto}">${site.email}</a>.</p>`,
    { purpose: "Australian business identification and website terms. Based on the business's own January 2026 legal notice.", audience: "Clients, procurement, legal reviewers.", imagery: "None.", conversion: "Contact details.", schemaNote: "BreadcrumbList." }),

  legalPage("accessibility.html", "Accessibility",
    "Accessibility Statement | BrightSteps Recruitment",
    "BrightSteps Recruitment is committed to an accessible website for everyone, aiming for WCAG 2.2 Level AA. Tell us about any barriers and we'll help.",
    "Accessibility statement",
    "We want everyone to be able to find work and request staff through this website, including people with disability.",
    `<h2>Our commitment</h2>
<p>We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA. As a business that places disability support workers, accessibility is part of how we work, not an add-on.</p>

<h2>What we've done</h2>
<ul>
  <li>Used a clear, high-contrast colour palette that meets WCAG AA contrast ratios.</li>
  <li>Chose Atkinson Hyperlegible, a typeface designed for readers with low vision.</li>
  <li>Built every page to work with a keyboard, with visible focus indicators and a "skip to main content" link.</li>
  <li>Used meaningful headings, landmarks and labels for screen reader users.</li>
  <li>Labelled every form field, with clear error messages and an error summary. There is no CAPTCHA on our forms.</li>
  <li>Made the site work at 200% zoom and on small screens, and respected the "reduce motion" setting.</li>
</ul>

<h2>Known limitations</h2>
<p>Photos on this site are currently placeholders. When we add real photography we will write descriptive alternative text for each image. Some third-party content, such as embedded maps, may not be fully accessible.</p>

<h2>Need help or found a barrier?</h2>
<p>If you have trouble using any part of this website, or need information in another format, please tell us. We can complete a staffing request or job application with you over the phone.</p>
<p>Phone: <a href="${tel}">${site.phone}</a><br>Email: <a href="${mailto}">${site.email}</a></p>
<p>If you are deaf, or have a hearing or speech impairment, you can contact us through the <a href="https://www.accesshub.gov.au/about-the-nrs" rel="noopener">National Relay Service</a>.</p>
<p>This statement was last reviewed on ${site.lastUpdated}.</p>`,
    { purpose: "Show commitment to accessibility and give a path for help. This matters to disability-sector clients.", audience: "People with disability, providers, procurement.", imagery: "None.", conversion: "Phone and email for assisted applications.", schemaNote: "BreadcrumbList." }),

  {
    file: "404.html",
    title: "Page Not Found | BrightSteps Recruitment",
    description: "Sorry, we couldn't find that page. Request staff, find work or contact BrightSteps Recruitment.",
    noindex: true,
    plan: { purpose: "Recover visitors from broken or old links (including old /Classes and /products URLs).", audience: "Anyone on a dead link.", imagery: "Brand mark only.", conversion: "Three clear routes plus phone.", schemaNote: "None." },
    schema: [],
    body: `<section class="not-found"><div class="container">
  <p class="big" aria-hidden="true">404</p>
  <h1>We couldn't find that page</h1>
  <p class="lead">It may have moved when we updated our website. Here are the most popular places to go next.</p>
  <div class="btn-row">${btn("request-staff.html", "Request staff", "primary", "404-request")}${btn("find-work.html", "Find work", "secondary", "404-find-work")}${btn("index.html", "Go to the home page", "ghost", "404-home")}</div>
  <p style="margin-top:var(--space-4)">Or call us 24/7 on <a href="${tel}">${site.phone}</a>.</p>
</div></section>`,
  },
];
