# 4. Sitemap

```
Home (index.html)
├── Services (services.html)                       ← replaces old "Products" + "Services"
│   ├── Industrial labour hire (industrial-labour-hire.html)
│   ├── Disability support staffing (disability-support-staffing.html)
│   ├── Community services staffing (community-services-staffing.html)
│   └── Emergency & short-term staffing (emergency-short-term-staffing.html)
├── For employers (employers.html)
│   └── Request staff / Get a quote (request-staff.html)   ★ employer conversion
├── Find work (find-work.html)
│   └── Apply for work (apply.html)                        ★ candidate conversion
├── Pricing schedule (pricing.html)
├── About us (about.html)
├── Events & news (news.html)
│   └── Article template (news-article-template.html, noindex)
├── Contact (contact.html)
└── Footer only
    ├── Privacy policy (privacy.html)
    ├── Legal notice & terms (terms.html)
    ├── Accessibility statement (accessibility.html)
    ├── Thank you (thank-you.html, noindex, shown after any form is sent)
    └── 404 (404.html, noindex)
```

## Navigation

- **Header (desktop):** Services (dropdown with the four service pages) · For employers · Find work · Pricing · About · News · Contact · phone number · **Request staff** button.
- **Header (mobile):** logo, call button and menu button. The menu holds every link plus Request staff, Apply for work and Call buttons.
- **Mobile bottom bar:** Call, plus Request staff (Apply for work on candidate pages).
- **Footer:** services, company links, full contact block with ABN, policy links, cookie settings.

## Old URL redirects (`site/_redirects`)

| Old URL | New URL |
|---|---|
| /about-us | /about.html |
| /pricing-schedule-8 | /pricing.html |
| /products | /services.html |
| /events-news | /news.html |
| /privacy | /privacy.html |
| /Classes | /request-staff.html |
| /images/document/…/BrightStepsPrivacyPolicy-….pdf | /privacy.html |
| /images/document/…/BrightStepsLegalNotice-….pdf | /terms.html |
| /images/document/* (any other old file) | /privacy.html |
