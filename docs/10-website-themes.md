# 13. Website themes: four directions and a recommendation

Prepared 23 November 2026. All four themes are built and working. They share the same 20 pages, content, forms, schema and accessibility features; only the visual layer changes. Screenshots of every theme are in `docs/themes/` (open `docs/themes/index.html`). To switch the live site, set `theme` in `src/config.mjs` and run `node src/build.mjs`.

**Live theme: Theme 2, Human & Community**, chosen by BrightSteps on 23 November 2026. The original recommendation, Theme 4 (Modern Australian Studio), stays available with a one-line switch.

Business details are unchanged, with one exception: the email address is **info@brightstepsrecruitment.com.au**. The brief pasted for this task still listed the old misspelled address ("brighsteps…"); the site keeps the corrected address you chose on 23 November.

---

## 1. Current website audit (summary)

The full audit is section 1 (`docs/01-audit.md`). In short, the original site had:

- broken calls to action (a 404 `/Classes` link, buttons pointing to `#`)
- no working Request Staff or Apply for Work form, and no candidate journey
- an empty Events & News page
- a European GDPR template as its privacy policy
- an image CAPTCHA, empty alt text, typos and duplicated blocks
- no structured data and unclear navigation (Products and Services overlapped)

**Status:** all of these are fixed in the current build, in every theme.

## 2. Content that must be kept (all four themes)

| Type | Kept |
|---|---|
| Pages (20) | Home, About, Services, Industrial labour hire, Disability support staffing, Community services staffing, Emergency & short-term staffing, For employers, Find work, Pricing, Events & news, Article template, Contact, Request staff, Apply for work, Thank you, Privacy, Legal notice & terms, Accessibility, 404 |
| Forms | Request staff / Get a quote, Apply for work (with resume upload), Contact. All with labels, inline errors, an error summary, a honeypot and a minimum fill time |
| Calls to action | Request staff (employers), Get a quote (pricing), Find work / Apply for work (candidates), Contact us, Call 0424 234 925 |
| Trust content | Police check and WWCC, workers compensation and public liability insurance, 24/7 support, locally owned in West Tamworth, Director Edwin Ngetich, the four-step process, published rates ($70 / $68 / $65 per hour, ex GST) |
| Policies | Privacy policy and legal notice (based on your January 2026 PDFs), accessibility statement, cookie choice |
| Business details | 6A Edinburgh Avenue, West Tamworth NSW 2340 · 0424 234 925 · info@brightstepsrecruitment.com.au · ABN 71 374 775 561 |
| Clearly labelled placeholders | Photos (each with a shot brief) and review cards (marked "Placeholder: not a real review") |

## 3. Issues to fix: status

| Area | Status in every theme |
|---|---|
| Hierarchy | One H1 per page (checked at build), logical H2/H3 order |
| Weak calls to action | One primary action per section. Request staff is in the header, the hero, a sticky mobile bar and the closing band |
| Trust signals | The trust list sits beside the hero buttons; the BrightSteps Standard section; published rates. **Still needed from you:** real reviews, case studies, team photo |
| Accessibility | All colour pairs pass WCAG AA (`node src/check-contrast.mjs`); visible focus; keyboard menus; no CAPTCHA; works with reduced motion |
| SEO | Unique titles and descriptions; EmploymentAgency, Service, FAQ and Breadcrumb schema; sitemap; old-URL redirects |
| Mobile | Mobile-first layout, 44 px tap targets, sticky Call / Request staff bar |
| Redundant content | Products page merged into Services; duplicated blocks removed |

## 4. Information architecture (shared)

The same sitemap serves all four themes (section 4, `docs/03-sitemap.md`):

- **Home**
- **Services:** Industrial · Disability · Community · Emergency
- **For employers**, leading to **Request staff**
- **Find work**, leading to **Apply for work**
- **Pricing**, **About**, **News**, **Contact**
- **Footer:** Privacy, Terms, Accessibility

Each page has one primary action:
- Employer pages: Request staff
- Candidate pages: Apply for work
- About, News and legal pages: Contact us

## 5. Shared design-system foundation

Themes change the *values*; the *system* stays the same. That is why one codebase serves all four.

| Element | Shared rule |
|---|---|
| Type scale | Fluid steps: body 1.0625 rem (1.125 rem in Human); H3 1.25–1.5 rem; H2 1.75–2.5 rem; H1 2.25–3.75 rem (larger in hero) |
| Line length | Body text up to 68 characters; leads up to 60 characters |
| Line height | Body 1.6 (1.65 in Human); headings 1.0–1.1 |
| Spacing scale | 0.5 · 1 · 1.5 · 2 · 3 rem, then a fluid 3.5–6 rem between sections |
| Grid | Container up to 72 rem with 1.25 rem side margins. 1 column on phones, 2 from 48 em, 3–4 from 64 em. Navigation becomes a menu below 72 em |
| Breakpoints | Phone under 48 em (768 px) · Tablet 48–72 em · Desktop 72 em+ (1152 px) |
| Buttons | Primary (filled), Secondary (dark), Ghost (outlined). Minimum height 48 px. States: hover (colour change, no movement), focus (3 px outline, 3 px offset), active, busy ("Sending…") |
| Forms | Visible labels above fields; hint text tied to each field; red "!" inline errors plus a linked error summary; required "*" explained at the top; native date, email and number inputs |
| Icons | One 24 px line icon set (2 px stroke), always shown with a text label and hidden from screen readers |
| Images | Real people from BrightSteps' own work, in natural light around Tamworth and the region; participants shown active and with consent. No stock photo clichés. Placeholders carry a shot brief |
| Components | Header and navigation, hero with a path card, page hero with breadcrumbs, service card, feature row, numbered steps, pathway panels, review card, FAQ (native details), area chips, CTA band, rate table, forms, contact list, footer, cookie notice, mobile action bar |

---

## 6. Theme 1: Quiet Professional

**Positioning:** Calm, editorial and precise: a supplier procurement teams can sign off with confidence.

**Best fit:** corporate, government and large-project employers, tenders and procurement; businesses that value compliance over warmth.

**Mood board:** a well-set annual report or a broadsheet business section. Warm paper, charcoal ink, hairline rules, one cobalt pen mark. Lots of air, no ornament.

### Palette

| Role | Name | HEX | RGB | Contrast |
|---|---|---|---|---|
| Page | Warm off-white | #F7F5F0 | 247, 245, 240 | — |
| Alt surface | Stone | #ECE8E0 | 236, 232, 224 | — |
| Text, primary button | Charcoal | #1E2124 | 30, 33, 36 | 14.9:1 on page |
| Secondary text | Graphite | #4F5357 | 79, 83, 87 | 7.1:1 on page |
| Accent (links, highlight) | Cobalt | #1D4F91 | 29, 79, 145 | 7.5:1 on page |
| Rules | Hairline | #D6D0C4 | 214, 208, 196 | Decorative only |

### Typography
- **Headings:** Newsreader 500, a serif for editorial authority.
- **Body:** Source Sans 3 at 400 and 600.
- **Hero headline:** up to 4.5 rem, limited to 14 characters per line, with the highlight phrase in cobalt italic.
- **Letter spacing:** −0.01 em on headings.

### Layout
- The shared grid, with a hairline rule between sections instead of coloured blocks.
- Light hero, left-aligned.
- The path card becomes a bordered index list.
- One charcoal band for the BrightSteps Standard.

### Components
- **Navigation:** off-white bar with a charcoal underline; the current page is tinted.
- **Hero:** large serif headline, two rectangular buttons (charcoal "Request staff", outlined "Find work"), and a trust list under a rule.
- **Buttons:** 2 px corners, no shadow, no lift on hover.
- **Service cards:** white, 1 px border, a 3 px charcoal top rule and an outlined icon.
- **Forms:** 1 px graphite borders and square fields.
- **FAQ:** serif questions with square "+" markers.
- **Reviews:** dashed hairline boxes.
- **Footer:** charcoal.
- **Contact block:** stone panel.
- **CTA banner:** white, ruled, with a cobalt top edge.

### Homepage wireframe
```
[Header: logo | nav | phone | Request staff]
[Hero (light): H1 serif + lead + Request staff / Find work + trust list] [Path index: I need staff / I'm looking for work / Call]
[Who we help: text | photo]
[Services: 4 bordered cards]
[How it works: employers | job seekers, numbered rules]
[BrightSteps Standard: charcoal band, 4 features]
[Pathways: charcoal employer panel | outlined candidate panel]
[Reviews: 3 placeholder boxes]
[FAQ | contact panel]
[Service area: charcoal band + town list]
[CTA band (ruled)]  [Footer]
```

### Page notes
- **Service pages:** stone page hero with breadcrumbs, then roles and photo, three benefit cards, the Standard band, numbered steps, FAQ, related services.
- **Forms:** a bordered white form beside a stone contact panel.
- **Legal pages:** generous serif headings and the plain reading width.

### Copy tone
Measured and factual. Examples:
- "Screened, insured staff when and where you need them."
- "Reliable people. Right when you need them."

### Images
Composed and documentary, with neutral colour grading. Icons are outlined and monochrome.

### Pros and cons
- **Pros:** reads as established and trustworthy to procurement; the most timeless option; very fast.
- **Cons:** the least warm for care providers and candidates; serif type can feel formal on mobile.

**Use if** most revenue comes from corporate and government contracts.

---

## 7. Theme 2: Human & Community

**Positioning:** Warm, plain-spoken and reassuring: built for support workers, participants' families and care providers.

**Best fit:** disability and community services, candidate recruitment, NDIS-adjacent providers.

**Mood board:** natural linen, sage leaves, terracotta pots in morning light. Calm and domestic without being twee. People doing everyday things together.

### Palette

| Role | Name | HEX | RGB | Contrast |
|---|---|---|---|---|
| Page | Cream | #FFF9F2 | 255, 249, 242 | — |
| Alt surface | Sand | #F4EADF | 244, 234, 223 | — |
| Text | Warm charcoal | #2B2A28 | 43, 42, 40 | 13.7:1 on cream |
| Secondary text | Bark | #5B544D | 91, 84, 77 | 7.1:1 on cream |
| Links, candidate actions | Deep sage | #3E6A56 | 62, 106, 86 | 5.9:1 on cream; white on sage 6.2:1 |
| Employer action | Terracotta | #B04A2F | 176, 74, 47 | White on terracotta 5.4:1 |
| Inverse band | Eucalypt | #2F4F41 | 47, 79, 65 | Cream text 7.8:1 |

### Typography
- **Headings:** Lexend 600, designed for easier reading.
- **Body:** Atkinson Hyperlegible, set at 18 px for low-vision readers.
- **Line height:** 1.65.
- **Line length:** up to 68 characters.

### Layout
- Light, warm hero with a sand gradient.
- Rounded but flat cards: 14–20 px corners and no heavy shadows.
- One eucalypt band.

### Components
- **Navigation:** cream bar with a pill-shaped "Request staff" button.
- **Hero:** "Request staff" in terracotta and "Find work" in solid sage. The two buttons carry equal weight on purpose, so candidates see their path as clearly as employers do.
- **Service cards:** a different soft tint behind each category's icon.
- **Forms:** 12 px rounded fields with warm grey borders.
- **FAQ:** sage "+" markers.
- **Reviews:** dashed, warm.
- **Footer:** warm charcoal.
- **CTA banner:** sage tint with a terracotta button.

### Homepage wireframe
Same order as Theme 1. Differences:
- The hero has two equal filled buttons.
- The BrightSteps Standard band is eucalypt.
- The candidate panel is sage-tinted.

### Page notes
- **Find work and Apply:** these benefit most from this theme. Use larger type and plain-language helper text on the forms.
- **Disability page:** use photos where the participant is leading the activity.

### Copy tone
Warm, second person, short sentences. Examples:
- "Find work that fits your life."
- "We'll talk you through every step."

### Images
Real support moments, warm natural light, consent always. Icons sit in round tinted badges.

### Pros and cons
- **Pros:** the most welcoming for candidates and care clients; the best for readability.
- **Cons:** can feel too soft to mining and construction buyers; two strong action colours need discipline.

**Use if** most growth is in disability and community services, or recruiting candidates is the bottleneck.

---

## 8. Theme 3: Industrial Precision

**Positioning:** Direct, fast and unmistakable: crews on site, rosters filled, 24/7.

**Best fit:** mining, construction, warehousing and logistics clients; urgent labour-hire searches.

**Mood board:** site signage, hi-vis tape, concrete and steel, stencilled numbers, a clipboard roster. Organised rather than aggressive. No hard hats posed against sunsets.

### Palette

| Role | Name | HEX | RGB | Contrast |
|---|---|---|---|---|
| Hero, text, panels | Charcoal | #16181A | 22, 24, 26 | 17.8:1 on white |
| Alt surface | Concrete | #E6E8EA | 230, 232, 234 | — |
| Secondary text | Steel | #4B5157 | 75, 81, 87 | 8.0:1 on white |
| Action only | Safety yellow | #FFC20E | 255, 194, 14 | Charcoal on yellow 11:1. **Never used as text on white** (1.6:1) |
| Page | White | #FFFFFF | 255, 255, 255 | — |

### Typography
- **Headings:** Barlow Condensed 700, uppercase; up to 5 rem in the hero.
- **Body:** Barlow.
- **Data-style labels:** IBM Plex Mono for breadcrumbs, trust list, step numbers, rates and footer headings.

### Layout
- Square corners throughout, 2 px charcoal rules and grid-line step tables.
- Charcoal hero with a 6 px yellow base line.

### Components
- **Navigation:** 3 px charcoal underline; the current page is shown in a charcoal block.
- **Hero:** yellow "REQUEST STAFF" and an outlined "FIND WORK"; a white path card with a yellow top edge.
- **Service cards:** 2 px frame, 8 px charcoal top bar, yellow icon on a charcoal tile.
- **Steps:** a joined grid with yellow mono numbers.
- **Forms:** square fields and charcoal borders, with a yellow focus ring.
- **FAQ:** uppercase questions with yellow "+" tiles.
- **CTA banner:** solid safety yellow.
- **Footer:** near-black with yellow headings.

### Homepage wireframe
Same order as Theme 1. Differences:
- The hero is a dark block.
- The trust list is set as mono status lines.
- Steps form a ruled table.

### Page notes
- **Industrial and Emergency pages:** the strongest fit for this theme.
- **Pricing:** the rate table in mono reads like a schedule.
- **Disability pages:** these need warmer photography to balance the hard style.

### Copy tone
Short, active and specific. Examples:
- "Labour hire that keeps your site moving."
- "When a shift falls through, call us."

### Images
Crews mid-task, inductions, rosters; natural, not heroic. Icons sit on solid tiles.

### Pros and cons
- **Pros:** the clearest calls to action and the fastest to scan; instantly credible to site managers.
- **Cons:** reads as hard and masculine to disability and community clients; uppercase headings cost some readability.

**Use if** BrightSteps decides to lead with labour hire, or as a separate microsite for industrial clients.

---

## 9. Theme 4: Modern Australian Studio (recommended)

**Positioning:** Polished, contemporary and quietly local: one credible partner for the worksite and the home.

**Best fit:** the whole business. It balances industrial credibility with care-sector warmth, and gives BrightSteps a premium, design-led presence that stands apart from template recruitment sites.

**Mood board:** bone-coloured paper, deep ink, burnt ochre from New England soil, a muted eucalypt leaf. Contemporary Australian architecture and printed matter. Local character from colour and restraint, not kangaroos or flags.

### Palette

| Role | Name | HEX | RGB | Contrast |
|---|---|---|---|---|
| Page | Bone | #F4EFE6 | 244, 239, 230 | — |
| Alt surface | Deep bone | #EAE2D5 | 234, 226, 213 | — |
| Cards | Paper | #FBF8F3 | 251, 248, 243 | — |
| Text, inverse band | Deep ink | #1C2430 | 28, 36, 48 | 13.6:1 on bone |
| Secondary text | Slate | #4E5560 | 78, 85, 96 | 6.6:1 on bone |
| The single accent | Burnt ochre | #A4471F | 164, 71, 31 | 5.2:1 on bone; white on ochre 6.0:1 |
| Detail tone | Eucalypt | #56685A | 86, 104, 90 | 5.2:1 (icons) |

### Typography
- **Headings:** Fraunces 500, an optical-size serif that is crisp at display sizes. Highlight phrases are set in ochre italic.
- **H3s and body:** Instrument Sans at 400 and 600, which keeps small headings practical.
- **Hero headline:** up to 5.25 rem, limited to 13 characters per line.

### Layout
- An asymmetric 7/5 hero, with the path card dropping below the hero line.
- A 5 px ochre "horizon line" under the hero and page heroes.
- On desktop, section headings are indented by one grid column.
- Hairline cards and generous white space; deep-ink bands for emphasis.

### Components
- **Navigation:** bone bar; the "Request staff" button is ochre.
- **Hero:** serif headline, ochre "Request staff", outlined "Find work", eucalypt trust icons, and a path list with ochre icons.
- **Buttons:** 4 px corners, no shadow, colour-only hover.
- **Service cards:** paper with hairline borders and bare ochre line icons.
- **Steps:** italic serif numbers on ink rules.
- **Forms:** paper card, white fields with 1 px warm grey borders, ochre highlight when a box is ticked.
- **FAQ:** serif questions with round hairline "+" markers.
- **Reviews:** dashed paper cards.
- **CTA banner:** deep ink with an ochre button.
- **Footer:** deep ink.
- **Contact block:** deep-bone panel.

### Homepage wireframe
```
[Header: logo | nav | phone | Request staff (ochre)]
[Hero (bone, 7/5): H1 serif + ochre italic phrase + lead + buttons + trust list]  [Path card, offset below]
════ ochre horizon line ════
[Who we help: text | photo]
[Services (indented heading): 4 hairline cards]
[How it works: two columns, italic numbered rules]
[BrightSteps Standard: deep-ink band]
[Pathways: ink employer panel | bone candidate panel]
[Reviews: 3 placeholder cards]
[FAQ | contact panel]
[Service area: deep-ink band + town list]
[CTA band: deep ink, ochre button]  [Footer: deep ink]
```

### Page notes
- **Every page:** opens with a bone page hero and the ochre horizon line.
- **Service pages:** alternate text and photo, with one deep-ink band per page.
- **Pricing:** a hairline rate table.
- **Forms:** a paper card beside a deep-bone help panel.
- **404 and Thank you:** large italic serif.

### Copy tone
Confident and understated; no hype. Examples:
- "Reliable people. Right when you need them."
- "One local partner, from the worksite to the home."
- "Dependable people for community programs."

### Images
Full-width, editorial photography of real BrightSteps people across both sectors, warm and natural grade. Icons are bare ochre line icons.

### Pros and cons
- **Pros:** works for both audiences; the most distinctive (it doesn't look like a recruitment template); premium without being cold; strong local character.
- **Cons:** relies on good photography to reach its full potential; serif headlines are less "urgent" than Industrial's.

---

## 10. Comparison

| | Quiet Professional | Human & Community | Industrial Precision | Modern Australian Studio |
|---|---|---|---|---|
| Employers (industrial) | Strong | Fair | Excellent | Strong |
| Care providers | Good | Excellent | Weak | Strong |
| Candidates | Fair | Excellent | Good | Good |
| Distinctiveness | Medium | Medium | High | High |
| Readability | High | Highest | Medium (uppercase) | High |
| Photo dependence | Low | Medium | Low | High |
| Risk | Feels formal | Feels soft | Feels harsh | Needs real photos |

## 11. Recommendation for launch

**Modern Australian Studio.**

BrightSteps' advantage is breadth: one trusted local partner for both the worksite and the home. Quiet Professional and Industrial Precision speak well to one audience, and Human & Community to another. Studio is the only theme that is equally credible to a site supervisor and a support coordinator, and its restraint and colour feel local and premium rather than templated.

**Decision:** BrightSteps chose **Human & Community** as the live theme, putting disability and community services and candidate recruitment first. What this means in practice:
- "Find work" is now as prominent as "Request staff" in the hero.
- Body text is larger and set in Atkinson Hyperlegible throughout.
- For industrial clients, rely on the Industrial labour hire and Emergency pages and real photos of crews on site, which balance the softer look.

Keep the others available:
- **Modern Australian Studio:** if the business later wants one look that leans equally to both audiences.
- **Industrial Precision:** for a dedicated labour-hire landing page.

Switching takes one line in `src/config.mjs`.

## 12. Implementation

| File | Purpose |
|---|---|
| `src/config.mjs` → `theme` | Selects the live theme (`quiet`, `human`, `industrial` or `studio`) |
| `src/themes.mjs` | Theme registry: names, Google Fonts and browser colour |
| `site/assets/css/styles.css` | Shared design system. Role tokens such as `--inverse-bg`, `--hero-bg`, `--btn-radius` and `--head-weight` let themes restyle it |
| `site/assets/css/themes/*.css` | One file per theme: palette, type and shape tokens, plus a small number of component overrides |
| `src/check-contrast.mjs` | Checks every theme colour pair against WCAG AA; runs with every build |
| `previews/<theme>/` | The full site rendered in each theme (built locally, not deployed or committed) |
| `docs/themes/` | Screenshots and the visual comparison sheet (`index.html`) |

**Regenerating the screenshots:**
1. Run `node src/build.mjs`.
2. Serve the previews with `python -m http.server 8095 --directory previews`.
3. Capture each page at 1440 px and 390 px.
4. Run `node src/theme-gallery.mjs`.

**Fonts:** all are free Google Fonts under the SIL Open Font License. The logo wordmark always uses Bricolage Grotesque, and its colours are fixed in every theme.

**Unchanged in every theme:** SEO metadata, Open Graph and Twitter tags, schema, the forms and their validation, security headers, the cookie choice and the redirects. The deployment checklist is in section 10.

## 13. Accessibility and SEO checks per theme

- [x] Every text pair at least 4.5:1, and UI components and focus rings at least 3:1, checked automatically (`node src/check-contrast.mjs`)
- [x] A visible focus ring tuned to each theme's backgrounds (Industrial uses a charcoal outline plus a yellow halo)
- [x] Colour never carries meaning alone: categories have icons and text; errors have an icon and text
- [x] The same semantic HTML, landmarks, headings, labels, keyboard menu and native FAQ in all themes
- [x] Reduced-motion supported; no parallax, auto-playing media or pop-ups beyond the privacy choice
- [x] Tap targets at least 44 px; text reflows at 320 px and 200% zoom
- [ ] Once real photos are added: write alt text for each, and re-check Studio's photo-led sections
- [ ] Before launch: test the chosen theme with NVDA and VoiceOver, and run PageSpeed Insights on the live address
