// Single source of truth for business details. Change here, then run `node src/build.mjs`.
export const site = {
  name: "BrightSteps Recruitment",
  // Visual theme: "quiet", "human", "industrial" or "studio" (see src/themes.mjs and docs/10-website-themes.md).
  theme: "human",
  url: "https://brightstepsrecruitment.com.au",
  phone: "0424 234 925",
  phoneIntl: "+61424234925",
  // Owner decision (23 Nov 2026): use the brightstepsrecruitment domain for email, matching the website.
  email: "info@brightstepsrecruitment.com.au",
  abn: "71 374 775 561",
  street: "6A Edinburgh Avenue",
  locality: "Tamworth",
  region: "NSW",
  postcode: "2340",
  country: "AU",
  director: "Edwin Ngetich",
  // Add real profile URLs to show icons in the footer, e.g. { name: "LinkedIn", url: "https://www.linkedin.com/company/..." }
  social: [],
  // Form endpoints (Formspree, Netlify Forms, Basin, your own API...). "#" = demo mode, nothing is sent.
  // GA4 measurement ID, e.g. "G-ABC123XYZ". Empty = no analytics. Loads only after cookie consent.
  analyticsId: "",
  // Netlify Forms: the site is hosted on Netlify, so forms post there (enable form detection in the Netlify dashboard).
  // Set to false and fill `forms` below to use another service.
  netlifyForms: true,
  forms: { requestStaff: "#", apply: "#", contact: "#" },
  // Service area: based in Tamworth, serving clients across Australia (owner, 23 Nov 2026). Shown as chips and in schema.
  areas: ["New South Wales", "Queensland", "Victoria", "Australian Capital Territory", "South Australia", "Western Australia", "Tasmania", "Northern Territory"],
  // Reviews section on the home page. Off until there are real, consented reviews.
  showReviews: false,
  // Website developer credit shown in the footer.
  developer: { name: "Agrikip", url: "https://agrikip.com" },
  lastUpdated: "23 November 2026",
};
