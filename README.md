# BrightSteps Recruitment: website rebuild

A static, accessible, mobile-first website for BrightSteps Recruitment (West Tamworth NSW). It uses plain HTML, CSS and JavaScript with no frameworks or packages.

## Deliverables

| # | Deliverable | Where |
|---|---|---|
| 1 | Audit of the current website | [docs/01-audit.md](docs/01-audit.md) |
| 2–3 | Brand and UX strategy, logo concept, brand system, AI logo prompt | [docs/02-brand-and-ux-strategy.md](docs/02-brand-and-ux-strategy.md) |
| 4 | Sitemap and old-URL redirects | [docs/03-sitemap.md](docs/03-sitemap.md) |
| 5 | Page-by-page content and SEO plan (generated from the pages) | [docs/04-page-plan.md](docs/04-page-plan.md) |
| 6 | Production-ready website code | [site/](site/) (output) and [src/](src/) (source) |
| 7–8 | Accessibility, SEO, launch, hosting and maintenance checklists | [docs/05-checklists.md](docs/05-checklists.md) |
| – | Pre-launch security and quality audit | [docs/06-pre-launch-audit.md](docs/06-pre-launch-audit.md) |
| – | Deployment guide (Netlify / Cloudflare, domain, HTTPS, forms) | [docs/07-deployment-guide.md](docs/07-deployment-guide.md) |
| – | Content editing guide (prices, news, photos, pages) | [docs/08-content-editing-guide.md](docs/08-content-editing-guide.md) |
| – | Forms and data handling procedure (privacy in practice) | [docs/09-forms-and-data-handling.md](docs/09-forms-and-data-handling.md) |
| – | Four website themes, comparison and recommendation (Human & Community is live) | [docs/10-website-themes.md](docs/10-website-themes.md) · screenshots: [docs/themes/index.html](docs/themes/index.html) |
| – | Photo credits and licences (Unsplash) | [docs/photo-credits.md](docs/photo-credits.md) |
| – | Letterhead (Word template and PDF) | [brand/letterhead/](brand/letterhead/) |
| – | All documentation in one Word file and PDF | [docs/BrightSteps-Website-Documentation.docx](docs/BrightSteps-Website-Documentation.docx) · [.pdf](docs/BrightSteps-Website-Documentation.pdf) |

## File structure

```
brightsteps-website/
├── docs/                      strategy, plans, checklists
├── src/
│   ├── config.mjs             business details, theme, form endpoints, service area: edit here
│   ├── themes.mjs             the four themes (fonts, names); styles in site/assets/css/themes/
│   ├── layout.mjs             <head>, header, footer, schema, shared blocks, icons
│   ├── forms.mjs              accessible form field builders
│   ├── pages/                 page content (core, services, conversion, legal)
│   ├── og/                    source for the social share image and app icons
│   └── build.mjs              builds site/ and checks links, H1s, titles and descriptions
└── site/                      ← deploy this folder
    ├── *.html                 20 pages
    ├── assets/css/styles.css  design system (tokens, components, breakpoints 48em / 72em)
    ├── assets/js/main.js      menu, form validation, cookie notice, analytics events
    ├── assets/img/            logo versions, mark, social avatar, OG image, icons
    ├── favicon.svg, site.webmanifest, robots.txt, sitemap.xml, _redirects, _headers
brand/letterhead/             letterhead .docx/.pdf and logo PNG (built by src/letterhead.cjs)
```

## Put this project on GitHub

1. Create a new **private** repository on github.com (for example `brightsteps-website`). Don't add a README, because this project already has one.
2. Unzip `BrightSteps-website-github.zip`, then either:
   - **In the browser:** on the new repository, choose **Add file → Upload files**, drag in everything *inside* the unzipped folder (including `.gitignore`), and commit; or
   - **With git:**

     ```powershell
     git init; git add .; git commit -m "BrightSteps website v1.0"
     ```

     ```powershell
     git branch -M main; git remote add origin https://github.com/YOUR-ACCOUNT/brightsteps-website.git; git push -u origin main
     ```

3. To deploy from GitHub, connect the repository in Netlify or Cloudflare Pages. Use build command `node src/build.mjs` and publish directory `site` (see `docs/07-deployment-guide.md`).

Keep the repository private: it contains business documents. Never commit passwords or API keys; `.gitignore` already excludes `.env` files.

## Commands

The website build needs only Node.js 18 or later; no packages are required. The letterhead script needs `docx`: run `npm install` once.

```powershell
node src/build.mjs
```

```powershell
python -m http.server 8080 --directory site
```

## Before you launch

Read section 9 of the docs (`docs/06-pre-launch-audit.md`) and section 8 (`docs/05-checklists.md`). In short:

- Set up the mailbox info@brightstepsrecruitment.com.au and send it a test email.
- In Netlify, turn on form detection and add email notifications (the forms are already set up for Netlify Forms).
- Have an adviser check the website additions to the privacy policy and terms.
- Add a real team photo and Director portrait; turn reviews back on (`showReviews` in `src/config.mjs`) once you have real, consented reviews.
