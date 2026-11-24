# 11. Content editing guide

For anyone updating the website. The site is a set of JavaScript files that a build script turns into HTML pages. You edit the source in `src/`, run the build, and deploy the `site/` folder. Never edit the HTML in `site/` directly: the next build overwrites it.

## Where things live

| To change… | Edit this file |
|---|---|
| Phone, email, address, ABN, director, towns served, form endpoints, analytics ID | `src/config.mjs` |
| Home, About, Services, For employers, Find work | `src/pages/core.mjs` |
| The six service pages | `src/pages/services.mjs` |
| Pricing, News, Contact, Request staff, Apply, Thank you | `src/pages/conversion.mjs` |
| Privacy, Terms, Client terms, Complaints, Accessibility, 404 | `src/pages/legal.mjs` |
| Header, footer, navigation, shared blocks and icons | `src/layout.mjs` |
| Form fields and their behaviour | `src/forms.mjs`, `site/assets/js/main.js` |
| Colours, spacing, layout | `site/assets/css/styles.css` (edited directly; not generated) |
| Fonts | Self-hosted in `site/assets/fonts/`, loaded by `site/assets/css/fonts.css`. No Google Fonts requests. |

## The edit cycle

1. Open the file in a text editor (VS Code is free and recommended).
2. Make the change. Text sits between backticks, as in `` `...` `` blocks, or in quotes. Keep the quotes and backticks in place.
3. Run the build:

   ```powershell
   node src/build.mjs
   ```

4. Preview the result at http://localhost:8080:

   ```powershell
   python -m http.server 8080 --directory site
   ```

5. Deploy the `site/` folder (see the deployment guide).

If the build prints "Problems:", fix what it lists before deploying. It checks for broken links, missing or doubled H1 headings, and titles or descriptions of the wrong length.

## Common tasks

### Change prices

In `src/pages/conversion.mjs`, find the `pricing.html` page:

- Update the dollar figure in the table row, for example `<span class="rate">$70</span>`.
- Update the matching number in the `OfferCatalog` schema just above the table (`["General labourer (mining or construction)", 70]`).
- Search all of `src/pages/` for the old figure. Rates are also quoted in FAQ answers on the service pages and the home page.

### Change the phone number or email

Edit `src/config.mjs` only. Every page, schema and form updates on the next build. Keep the non-breaking spaces in the phone number (`\u00a0`), so it never splits across two lines. Then also update the letterhead: edit `src/letterhead.cjs`, run `node src/letterhead.cjs`, and export the PDF.

### Add or remove towns in the service area

Edit the `areas` list in `src/config.mjs`. It feeds the home page chips and the local business schema. It lists New South Wales only: add another state only once BrightSteps holds that state's labour hire licence, and update the "across New South Wales" wording in the pages.

### Publish a news post

1. In `src/pages/conversion.mjs`, copy the whole `news-article-template.html` page object.
2. Give it a new `file` name (for example `news-tamworth-hiring-day-2027.html`), plus a new title, description, date and text. Remove `noindex: true` and the template notice.
3. On the `news.html` page, replace the empty state with a card that links to the post. The example card is in the comment there.
4. News is hidden while it has no posts. Once it has two or more, remove `noindex: true` from the `news.html` page and add News back to the menu and footer in `src/layout.mjs`.
4. Build and deploy. The post is added to the sitemap automatically.

For an event, include the date, time, address, who it's for and how to register. Change the schema `@type` from `Article` to `Event`, with `startDate` and `location`.

### Replace a photo placeholder

Placeholders are made with `photo("brief", "alt text")`. Replace the call with an image:

```html
<img src="assets/img/team-west-tamworth.webp" alt="The BrightSteps team outside the Tamworth office" width="1600" height="1200" loading="lazy" style="border-radius:var(--radius-lg)">
```

Put the image file in `site/assets/img/`. Export it as WebP, about 1600 px wide. Write alt text that describes what matters in the photo. Get written consent from everyone pictured, especially support participants.

### Replace a placeholder testimonial

On the home page, replace a `quote-card` block's quote and name, and delete its "Placeholder" tag. Only publish real reviews, quoted accurately, with the reviewer's permission. Delete any placeholder cards you cannot fill.

### Add a new page

Copy a similar page object, give it a unique `file`, `title` (under 65 characters), `description` (110–165 characters) and exactly one `<h1>`. Then link to it from the navigation in `src/layout.mjs`, the footer, or a related page.

## Check before you deploy

```powershell
node src/build.mjs
npm test
npm run lint
```

`npm test` checks the built site (service area, screening wording, forms, menu, ABN and GST wording). `npm run lint` validates every page's HTML and the JavaScript. Run `npm install` once first, so the lint tools are available.

## Writing style

- Plain Australian English (labour, organisation, mobilisation). Short sentences and short paragraphs.
- Address the reader as "you". Lead with the benefit to them.
- Never publish claims the business can't back up: no "best", "#1" or "guaranteed", and no invented statistics, clients or reviews.
- Keep the two journeys separate: "Request staff" for employers, "Apply for work" for job seekers.
- Link text should say where it goes ("See pricing"), never "click here".
