# 7. Accessibility and SEO checklist

Status key: ✅ built into this site · ☐ needs action before or after launch.

## Accessibility (WCAG 2.2 AA)

- ✅ `lang="en-AU"`, one H1 per page, logical H2/H3 order (the build script checks the H1 count)
- ✅ Landmarks: header, nav (labelled), main, footer; "Skip to main content" link
- ✅ Keyboard: every control reachable; visible amber or teal focus ring; Escape closes the mobile menu
- ✅ Colour contrast: all text pairs at 4.5:1 or better (see palette); amber is used only with navy text
- ✅ Targets at least 44 × 44 px for buttons and controls (WCAG 2.5.8 needs 24 px)
- ✅ Forms: visible labels, required markers, hints linked with `aria-describedby`, inline errors, an error summary that receives focus with links to fields, a success message that receives focus, `autocomplete` attributes, no CAPTCHA (honeypot instead)
- ✅ FAQ uses native `<details>`/`<summary>`, which is keyboard and screen reader friendly with no JavaScript
- ✅ Respects `prefers-reduced-motion`; content stays visible if JavaScript fails
- ✅ Reflows at 320 px width and 200% zoom
- ✅ Decorative icons use `aria-hidden`; photo placeholders have descriptive labels
- ☐ Replace photo placeholders with real images and write alt text (see the brand doc)
- ☐ Test with NVDA (Windows), VoiceOver (iOS) and keyboard only before launch
- ☐ Run axe DevTools or WAVE on every page; fix anything flagged
- ☐ If you embed a Google map, give the iframe a descriptive `title`

## SEO

- ✅ Unique titles (≤ 65 characters) and meta descriptions (110–165 characters), checked at build time
- ✅ Canonical URLs; `noindex` on the 404 and article template pages
- ✅ Open Graph and Twitter card tags with a 1200 × 630 share image
- ✅ JSON-LD: EmploymentAgency (LocalBusiness subtype) on every page, BreadcrumbList, Service, FAQPage, OfferCatalog (pricing), AboutPage, ContactPage, Blog, Article
- ✅ `sitemap.xml`, `robots.txt`, 301 redirects from old URLs
- ✅ Tamworth and NSW terms in titles, H1s and copy where natural; service area section
- ✅ Internal linking between service pages, pricing and conversion pages; descriptive link text
- ✅ Fast: no framework, one CSS file (~30 KB, ~7 KB gzipped), one JS file (~10 KB), SVG graphics
- ☐ Validate the schema with Google's Rich Results Test and the Schema.org validator
- ☐ Add `geo` coordinates and `openingHoursSpecification` to the schema in `src/layout.mjs` once confirmed
- ☐ Add `sameAs` social profile URLs in `src/config.mjs` once the profiles exist
- ☐ Submit `sitemap.xml` in Google Search Console and Bing Webmaster Tools

## Local SEO and Google Business Profile

- ☐ Claim and verify the Google Business Profile at 6A Edinburgh Avenue, West Tamworth. Primary category "Employment agency"; secondary categories "Temp agency" and "Recruiter"
- ☐ Use exactly the same name, address and phone (NAP) everywhere: website, Google Business Profile, Facebook, LinkedIn, Yellow Pages, True Local, Hotfrog, ABN Lookup
- ☐ List each service on the profile with links to the matching service page
- ☐ Set the service area to the towns you actually cover, and update `areas` in `src/config.mjs` to match
- ☐ Ask satisfied clients and workers for Google reviews; reply to every review. Then replace the placeholder testimonials, with permission
- ☐ Post monthly on the profile and in Events & News (hiring days, local involvement, workforce tips)
- ☐ Upload real photos: office exterior and signage, team, workers on site (with consent)

---

# 8. Launch and maintenance checklist

## Before launch (must do)

1. ☐ **Set up the mailbox** info@brightstepsrecruitment.com.au (the owner's chosen address, matching the website domain) and send a test email to it. The domain needs MX records with your email provider. If mail still arrives at the old brighsteps… address, set up forwarding from it until everyone has the new one.
2. ☐ **Connect the forms.** Create endpoints (see Forms below) and set `forms` in `src/config.mjs`. Until then, forms show a success message but **send nothing**. The browser console shows a warning when that happens.
3. ☐ The privacy policy and terms now follow BrightSteps' own January 2026 PDFs. Have a qualified adviser check the website additions (cookie consent, overseas storage by form/email providers, Notifiable Data Breaches) and confirm the overseas-storage sentence matches your providers. Then remove the old PDFs from the old host.
4. ☐ Confirm every claim with the business: 24/7 support, police check and WWCC for all workers, insurance cover, Australian-owned, rates ($70/$68/$65 ex GST), towns in the service area.
5. ☐ Decide on NDIS Worker Screening Check requirements for disability placements. Do not add an NDIS claim to the site until it is true.
6. ☐ Add Edwin's bio and real photos. Remove the photo placeholders, or keep them only where no photo exists yet.
7. ☐ Replace or remove the placeholder testimonials. **Never publish invented reviews.**
8. ☐ Export final logo PNGs and outline the wordmark text (see the brand doc).
9. ☐ Run `node src/build.mjs` and make sure it reports no problems.
10. ☐ Test every form end to end on a phone and a desktop: required fields, errors, success message, and the email arriving.

## Hosting, domain and SSL

- **Recommended host:** Netlify or Cloudflare Pages (free tiers suit this site). Both support `_redirects`, provide free automatic SSL and serve from a global CDN. Deploy by connecting a Git repository or dragging the `site/` folder in.
- **Domain:** keep the domain with its current registrar (auDA-accredited for .com.au). Point DNS to the new host: an `A`/`ALIAS` record for the root and a `CNAME` for `www`. Choose one version (root, without www) and redirect the other.
- **SSL:** enable the host's free certificate, then turn on "Force HTTPS".
- **Email:** changing website hosting does **not** move email. Leave the existing `MX` records untouched when you update DNS.
- **Security headers:** already generated in `site/_headers` (CSP, HSTS, nosniff, frame and referrer policies). The build adds your form endpoint and analytics domains to the CSP automatically. See `docs/06-pre-launch-audit.md`.

## Forms

| Option | Good for | Notes |
|---|---|---|
| Netlify Forms | Hosting on Netlify | Add `data-netlify="true"` to each `<form>` and set the endpoint to the page itself. Supports file uploads |
| Formspree / Basin / Getform | Any host | Paste the endpoint URL into `src/config.mjs`. Check the plan supports file uploads (resume field) |
| Your own API | Integration with an ATS or CRM | POST multipart form data; return a 2xx status on success |

Send request-staff submissions to a monitored inbox and, ideally, to SMS for urgent requests. Store candidate data securely and delete it in line with the privacy policy.

## Analytics (privacy-first)

- The site pushes events to `window.dataLayer`: `cta_click` (every button has a `data-track` name), `form_submit`, `form_error`, `form_failure`, `analytics_consent_granted`.
- Add your analytics snippet inside `loadAnalytics()` in `site/assets/js/main.js`. It runs only after the visitor accepts the privacy notice. No tracking IDs are included.
- Lower-friction alternative: Plausible or Fathom, which are cookieless. You could then simplify or remove the cookie notice; update the privacy policy to match.
- Key conversions to track: `form_submit` (request-staff-form, apply-form, contact-form) and `cta_click` where the cta contains "call".

## Ongoing maintenance

| When | Task |
|---|---|
| Weekly | Check form inboxes and spam folders. Reply to Google reviews |
| Monthly | Publish one news post or Business Profile update. Check Search Console for errors. Test both forms |
| Quarterly | Review rates and service area. Check broken links. Update photos. Re-run an accessibility scan |
| Yearly | Review the privacy policy, terms and accessibility statement, and update `lastUpdated` in `src/config.mjs`. Renew the domain. Review the hosting plan |

## Editing the site

1. Business details: `src/config.mjs`. Page copy: `src/pages/*.mjs`. Header, footer and shared blocks: `src/layout.mjs`. Styles: `site/assets/css/styles.css`. Behaviour: `site/assets/js/main.js`.
2. Run `node src/build.mjs` (Node 18 or later, no packages needed). It writes the HTML into `site/`, regenerates `sitemap.xml` and `docs/04-page-plan.md`, and checks for broken links.
3. Preview locally: `python -m http.server 8080 --directory site`, then open http://localhost:8080.
4. Deploy the `site/` folder.
