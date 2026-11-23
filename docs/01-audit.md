# 1. Audit of brightstepsrecruitment.com.au

Reviewed 23 November 2026. Pages read: Home, About Us, Pricing Schedule, Products, Services, Events & News, /privacy, plus the two footer PDFs (Privacy Policy and Legal Notice, January 2026, supplied by the owner and reviewed afterwards). Meta descriptions and alt attributes were read from converted page output, so confirm them against the raw HTML.

## What the site does today

| Item | Finding |
|---|---|
| Purpose | Lead generation for a Tamworth labour-hire and community-care staffing agency |
| Positioning | "Labour-Hire & Industrial Solutions" plus "Community Care". Locally owned, 24/7 support, screened and insured workforce |
| Services named | Disability support workers (in-home, community access, SIL, respite), community support workers, general labour, mining and construction labour, cleaning (residential, commercial, domestic support), transport and community access, support coordinator assistants. Short-term, emergency and contract staffing |
| Audiences | Employers and project managers, disability and community providers. Candidates are barely addressed: one caption ("We get link you a job") and no way to apply |
| Leadership | Director Edwin Ngetich (also called "CEO" on a button) |
| Claims the owner makes | Police checked and WWCC verified workforce; workers compensation and public liability insurance; 24/7 support; Australian-owned; transparent digital timesheets; weekly or fortnightly invoicing |
| Prices | $70/hr general labourer (mining/construction), $68/hr disability support worker, $65/hr transport and community access (vehicle costs negotiable). All ex GST. Shown only inside an FAQ answer |
| Contact | 0424 234 925 · info@brighstepsrecruitment.com.au · 6A Edinburgh Avenue, Tamworth NSW 2340 · ABN 71 374 775 561. No opening hours, no social profiles |

## Strengths to keep

- A clear compliance message: screened, insured, supported workers.
- A simple four-step process: Request → Allocate → Complete → Invoice.
- Published indicative rates, which few competitors show.
- A genuine local story: Tamworth, locally owned, a named director.
- Real breadth: one supplier for both industrial and care staffing.

## Problems, ranked by impact on enquiries

1. **Email domain probably mistyped.** Every mailto link and the footer use `brighstepsrecruitment.com.au` (no "t" after "brigh"); the website domain is `brightstepsrecruitment.com.au`. If that mailbox does not exist, email enquiries are being lost. **Update:** the owner chose to use `info@brightstepsrecruitment.com.au` everywhere. The new site, letterhead and documents use it (set once in `src/config.mjs`). Make sure that mailbox exists and receives mail before launch.
2. **Broken calls to action.** "Request" and "get assistance" go to `/Classes`, which returns 404. All six "drop your request" buttons link to `#`. "See all pricing plans" opens a JPG.
3. **No way to request staff or apply for work.** The only form has no visible fields beyond a consent checkbox and an image CAPTCHA.
4. **Candidates are ignored.** There is no job seeker journey, application form or explanation of what happens after applying.
5. **Empty Events & News page** in the main navigation.
6. **Privacy policy is an unedited German GDPR template.** It names no operator, mentions online shops, payments and newsletters the business does not have, and is not written for the Australian Privacy Act 1988 or the Australian Privacy Principles. The owner's own PDF policies (January 2026) are Australian, specific and good. They are now the basis of the new Privacy and Legal Notice pages. Their file metadata contains a personal author name; remove it from any copies you keep online.
7. **Malformed phone links** (`tel:0424 234 925` with spaces) can fail on some phones.
8. **Accessibility.** An image-only CAPTCHA blocks screen reader and low-vision users; content images have empty alt text; link text such as "request" and "REQUEST" is vague; headings are duplicated by the slider template.
9. **Copy errors** that undermine trust: "BrigthSteps", "We get link you a job", "Adminstrative", "know About Us"; US and Australian spellings mixed (labor/labour, mobilization/mobilisation).
10. **Unsupported absolutes.** "100% compliance with Australian labor laws" and "premier" have no evidence on the page. These have been removed or softened.
11. **Duplicate content.** The mission paragraph, pricing cards and "Rapid Response" block repeat across four pages. "24/7 4u" appears as a heading four times.
12. **Confusing navigation.** "Products" and "Services" cover the same things. The footer omits Events & News. Three social icons link to `#`.

## SEO findings

| Area | Current | Fix in new build |
|---|---|---|
| Titles | "brightstepsrecruitment.com.au - Tamworth NSW 2340" and "Page - domain" | Unique, keyword-led titles under 60 characters, brand last |
| Meta descriptions | Not found in the page output | Unique 140–160 character descriptions on every page |
| Headings | Duplicate H2/H3 pairs; taglines marked up as headings | One H1 per page, logical H2/H3 outline |
| Alt text | Empty | Alt text written for every meaningful image; decorative images use `alt=""` |
| Schema | None found | EmploymentAgency (a LocalBusiness subtype), Service, BreadcrumbList, FAQPage, Article |
| Local SEO | Address only in the footer | Address in schema and footer, a service area section, Tamworth in key titles, Google Business Profile checklist |
| Internal links | Broken /Classes links; thin linking | Service pages cross-linked; every page ends in a relevant CTA |
| URLs | `/pricing-schedule-8`, `/products` | Clean URLs with 301 redirects from the old ones (`site/_redirects`) |
| Mobile and performance | Slider template with heavy images and inline placeholder SVGs | No slider, no framework, one CSS and one JS file, system font fallback |

## Content decisions

| Keep and rewrite | Remove | Add |
|---|---|---|
| Service list, compliance claims, process, rates, director, local story, mission ("dignity, safety, and professionalism") | "Products" page (merged into Services), "100% compliance", "premier", "24/7 4u", duplicate blocks, image CAPTCHA, GDPR template, vendor phone number in the footer credit | Candidate journey and application form, Request Staff form, separate service pages, FAQ, service area, accessibility statement, Australian privacy policy, terms, 404 page |

## Compliance and Australian business information

- ABN, business name, address, phone and email are in the footer on every page. The ABN passes the check-digit test; confirm it on ABN Lookup.
- The privacy policy is rewritten for the Australian Privacy Principles. It covers sensitive information (health, disability, criminal history checks), which candidates and support work involve. **Have it reviewed by a qualified adviser before launch.**
- If disability support workers are placed with NDIS providers, confirm each worker's **NDIS Worker Screening Check** status. The current site does not mention it and the new site does not claim it. It is listed as an optional credential on the application form only.
- NSW labour hire: NSW has no labour hire licensing scheme at the time of writing, but confirm current requirements and any obligations under the Fair Work Act before publishing claims about compliance.
- Pay rates must follow the relevant modern awards. The site describes charge rates only, not worker pay.
