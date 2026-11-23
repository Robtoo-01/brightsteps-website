// Single source of truth for business details. Change here, then run `node src/build.mjs`.
export const site = {
  name: "BrightSteps Recruitment",
  url: "https://brightstepsrecruitment.com.au",
  phone: "0424 234 925",
  phoneIntl: "+61424234925",
  // Owner decision (23 Nov 2026): use the brightstepsrecruitment domain for email, matching the website.
  email: "info@brightstepsrecruitment.com.au",
  abn: "71 374 775 561",
  street: "6A Edinburgh Avenue",
  locality: "West Tamworth",
  region: "NSW",
  postcode: "2340",
  country: "AU",
  director: "Edwin Ngetich",
  // Add real profile URLs to show icons in the footer, e.g. { name: "LinkedIn", url: "https://www.linkedin.com/company/..." }
  social: [],
  // Form endpoints (Formspree, Netlify Forms, Basin, your own API...). "#" = demo mode, nothing is sent.
  // GA4 measurement ID, e.g. "G-ABC123XYZ". Empty = no analytics. Loads only after cookie consent.
  analyticsId: "",
  forms: { requestStaff: "#", apply: "#", contact: "#" },
  // Towns listed in the service area section. Confirm coverage with the business before launch.
  areas: ["Tamworth", "West Tamworth", "Gunnedah", "Quirindi", "Manilla", "Werris Creek", "Armidale", "Narrabri", "Moree", "Inverell", "Scone", "Muswellbrook"],
  lastUpdated: "23 November 2026",
};
