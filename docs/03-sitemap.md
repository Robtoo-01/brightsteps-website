# 4. Sitemap

```
Home (index.html)
├── Services (services.html)                       ← replaces old "Products" + "Services"
│   ├── Industrial labour hire (industrial-labour-hire.html)
│   ├── Disability support staffing (disability-support-staffing.html)
│   ├── Community services staffing (community-services-staffing.html)
│   ├── Emergency & short-term staffing (emergency-short-term-staffing.html)
│   ├── Cleaning & domestic support (cleaning-domestic-support.html)
│   └── Transport & community access (transport-community-access.html)
├── For employers (employers.html)
│   └── Request staff / Get a quote (request-staff.html)   ★ employer conversion
├── Find work (find-work.html)
│   └── Apply for work (apply.html)                        ★ candidate conversion
├── Pricing schedule (pricing.html)
├── About us (about.html)
├── Events & news (news.html, noindex and out of the menus until there are posts)
│   └── Article template (news-article-template.html, noindex)
├── Contact (contact.html)
└── Footer only
    ├── Privacy policy (privacy.html)
    ├── Legal notice & terms (terms.html)
    ├── Client terms (client-terms.html)
    ├── Feedback & complaints (complaints.html)
    ├── Accessibility statement (accessibility.html)
    ├── Thank you (thank-you.html, noindex, shown after any form is sent)
    └── 404 (404.html, noindex)
```

## Navigation

- **Header (desktop):** Services (dropdown with the six service pages) · For employers · Find work · Pricing · About · Contact · phone number · **Request staff** button.
- **Header (mobile):** logo, call button and menu button. The menu opens with Request staff and Apply for work side by side, then Services (folds open to list "All services" and the six service pages), the other links, and a call card. While it is open, keyboard focus stays in the menu.
- **Mobile bottom bar:** Call, plus Request staff (Apply for work on candidate pages).
- **Footer:** services, company links, full contact block with ABN, policy links (privacy, legal notice, client terms, complaints, accessibility), cookie settings.

## Page addresses

Netlify serves each page without `.html` (for example `/about` for `about.html`). Canonical tags, the sitemap, structured data and the redirects below all use that form.

## Old URL redirects (`site/_redirects`)

| Old URL | New URL |
|---|---|
| /about-us | /about |
| /pricing-schedule-8 | /pricing |
| /products | /services |
| /services/ | /services |
| /events-news | /news |
| /Classes | /request-staff |
| /images/document/…/BrightStepsPrivacyPolicy-….pdf | /privacy |
| /images/document/…/BrightStepsLegalNotice-….pdf | /terms |
| /images/document/* (any other old file) | /privacy |
