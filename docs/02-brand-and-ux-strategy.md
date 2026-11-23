# 2. Brand and UX strategy

## Positioning

**One local partner for the people work depends on, from the worksite to the home.**

BrightSteps is unusual: one agency staffs both industrial sites and disability and community services. The brand has to read as tough and dependable to a site supervisor and as caring and respectful to a support coordinator. The shared value that bridges both is *reliability with dignity*, which echoes the existing mission: "workers who promote dignity, safety, and professionalism."

Brand line: **Reliable people. Right when you need them.**

## Audiences and their main question

| Audience | Their question | Where the site answers it |
|---|---|---|
| Site, project and operations managers | "Can you get me screened, insured workers on site quickly?" | Industrial and Emergency pages, Request Staff form, phone number in the header |
| Disability and community providers | "Are your workers safe, checked and a good fit for our participants?" | Disability and Community pages, The BrightSteps Standard, FAQ |
| Procurement and finance | "What does it cost and how is it billed?" | Pricing page, published indicative rates, invoicing process |
| Job seekers and support workers | "Is there work for me, and what happens after I apply?" | Find Work page, Apply form, candidate FAQ |

## UX principles

1. **Two front doors.** Every page offers an employer path (Request Staff) and a candidate path (Find Work). The header holds both, and the phone number is always one tap away on mobile.
2. **Proof before promises.** Trust indicators sit next to calls to action and use only claims the business already makes: police checked and WWCC verified, insured, 24/7 support, locally owned.
3. **Short forms that respect people.** Only the questions needed to call someone back. An error summary, inline messages, and no CAPTCHA (a hidden honeypot field catches bots).
4. **No dead ends.** Each page ends with a next step. There is a custom 404 page.
5. **Calm motion.** Only subtle hover and reveal effects, all switched off for people who set "reduce motion".

## Conversion actions by page

| Page type | Primary CTA | Secondary CTA |
|---|---|---|
| Home, Services, service pages, Employers, Pricing | Request Staff | Call 0424 234 925 |
| Find Work | Apply for Work | Contact us |
| About, News, legal pages | Contact Us | Request Staff / Find Work |

---

# 3. Logo concept and brand system

## Rationale: "Rising Stride"

Three rounded bars rise from a shared baseline and lean forward, like a stride in motion. A sunrise dot sits above the tallest bar.

- **Forward lean:** momentum and fast mobilisation, without a literal arrow.
- **Rising heights:** growth and progress for people and businesses. The bars read as a chart or as three people side by side, without a clip-art figure.
- **Rounded ends:** warmth and approachability for care work. The solid geometry still feels industrial.
- **Sunrise dot:** the "Bright" in BrightSteps, and a nod to 24/7 support: someone is there at first light.

The wordmark sets "Bright" in navy and "Steps" in teal, so the name reads in two parts even at small sizes. "RECRUITMENT" sits beneath in tracked capitals.

## Files

| Version | File | Use |
|---|---|---|
| Primary horizontal | `site/assets/img/logo-horizontal.svg` | Website header, letterhead, email signature |
| Stacked | `site/assets/img/logo-stacked.svg` | Square spaces, signage, uniforms |
| Mark only | `site/assets/img/mark.svg` | Small spaces, watermark, app icon |
| Favicon | `site/favicon.svg` | Browser tab. Mark reversed on a navy tile |
| Social avatar | `site/assets/img/social-avatar.svg` | Facebook, LinkedIn, Google Business Profile |

The wordmark SVGs use live text. Before print or wide distribution, convert the text to outlines in a vector editor (Figma, Illustrator or Inkscape), so it renders the same where the fonts are not installed. Also export PNG versions at 512, 192, 180 (Apple touch icon) and 32 pixels.

## Colour versions

- **Full colour:** navy bars, teal tallest bar, amber dot, on white or Sand.
- **Reversed:** white bars, light teal (#7FD1C9) tallest bar, amber dot, on Navy.
- **Black:** all elements #000 on light backgrounds.
- **White:** all elements #FFF on dark or photographic backgrounds.
- **Single colour:** all elements Navy or Teal. The dot stays solid, so the shape still reads.

## Palette

| Name | Role | HEX | RGB | Contrast notes |
|---|---|---|---|---|
| Ridge Navy | Primary, text, header | #0F2A44 | 15, 42, 68 | 14.6:1 on white. AAA for all text |
| Eucalypt Teal | Brand, links, disability category | #0B6E69 | 11, 110, 105 | 6.1:1 on white. AA for all text, AAA for large text |
| Sunrise Amber | CTA buttons, highlights, industrial category | #F5A524 | 245, 165, 36 | Use with Navy text only (7.2:1). **Never** white text on amber (2.0:1) |
| Clay | Community category accent | #B4432E | 180, 67, 46 | 5.5:1 on white. AA for all text |
| Dusk Plum | Emergency category accent | #6B3FA0 | 107, 63, 160 | 7.4:1 on white |
| Slate | Secondary text | #4A5868 | 74, 88, 104 | 7.3:1 on white |
| Sand | Section background | #F6F4EF | 246, 244, 239 | Navy and Slate text both pass AA on Sand |
| Light Teal | Reversed accent | #7FD1C9 | 127, 209, 201 | 8.9:1 on Navy |

Rule: colour is never the only way to tell categories apart. Each service also has an icon and a text label.

## Typography (free Google Fonts)

- **Headings:** Bricolage Grotesque, 700–800. Distinctive and confident, with slightly condensed letterforms that suit bold headlines.
- **Body and UI:** Atkinson Hyperlegible, 400 and 700. Designed by the Braille Institute for low-vision readers. A fitting choice for a disability-sector brand, and it remains highly legible on site-office monitors.
- **Fallback:** system UI fonts. Text stays readable while the web fonts load (`font-display: swap`).

Type scale (fluid): body 1.0625rem; H3 1.25–1.5rem; H2 1.75–2.5rem; H1 2.25–3.75rem. Line height 1.6 for body text, 1.1 for headings. Lines run to at most 68 characters.

## Logo usage rules

1. Keep clear space around the logo equal to the height of the sunrise dot on every side.
2. Minimum size: 120 px wide (horizontal), 24 px (mark only). Below 24 px, use the favicon tile.
3. Never stretch, rotate, recolour outside the approved versions, add shadows or outlines, or change the forward lean.
4. Never place the full-colour logo on amber, on busy photos, or on mid-tone backgrounds. Use the white version on a dark overlay.
5. Never rebuild the wordmark in another typeface.
6. The mark may appear alone only once the full logo has already been shown nearby (on the same page, uniform or vehicle).

## AI image-generator prompt (for final logo exploration)

> Minimal modern vector logo for "BrightSteps Recruitment", an Australian staffing agency serving both industrial labour hire and disability support. Mark: three rounded, pill-shaped vertical bars of increasing height rising left to right, all leaning forward about 14 degrees like a stride in motion, with a small solid circle floating above the tallest bar like a rising sun. Colours: deep navy #0F2A44 for the first two bars, eucalyptus teal #0B6E69 for the tallest bar, warm amber #F5A524 for the circle. Wordmark to the right in a bold contemporary grotesque sans serif: "Bright" in navy, "Steps" in teal, with "RECRUITMENT" in small, widely tracked capitals beneath in slate grey #4A5868. Flat design, no gradients, no shadows, no human figures, no staircase, generous white space, crisp geometric edges, works at favicon size, white background, centred, professional brand identity sheet.

Variations to request: "stacked layout, mark centred above wordmark"; "mark only, reversed white on navy rounded-square tile"; "single-colour black version". Rebuild the chosen result as clean vectors. AI tools produce raster images and may distort lettering, so do not use their output as the final file.

## Imagery direction

- Real people from your own workforce and local clients (with written consent), photographed in natural light in Tamworth and the region: site inductions, hi-vis teams at work, support workers alongside participants in everyday settings.
- Show participants as active and in control, never as passive recipients of care. Ask for consent and preferred representation. Avoid faces of NDIS participants unless they have given explicit consent.
- Avoid handshake shots, people in headsets smiling at the camera, and staged boardroom imagery.
- Until photography exists, the site uses clearly labelled photo placeholders with a shot brief. Never replace them with stock photos presented as your own team.
- Alt text: describe what matters to the reader ("Support worker and participant shopping together at a local market"), not "image of…". Decorative graphics use `alt=""`.
