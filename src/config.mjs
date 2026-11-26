// Single source of truth for business details. Change here, then run `node src/build.mjs`.
export const site = {
  name: "BrightSteps Recruitment",
  // Visual theme: "quiet", "human", "industrial" or "studio" (see src/themes.mjs and docs/10-website-themes.md).
  theme: "human",
  url: "https://brightstepsrecruitment.com.au",
  phone: "0424\u00a0234\u00a0925", // non-breaking spaces: the number never splits across two lines
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
  // Service area: NSW only until labour hire licences are held in QLD, VIC, SA or the ACT (report R03, 24 Nov 2026).
  // Add a state here only once BrightSteps holds that state's licence. Shown as chips and in schema.
  areas: ["New South Wales"],
  // Towns we supply workers to, all in NSW. Shown on the home page, Areas we cover, Jobs, and in schema.
  towns: {
    "New England & North West": ["Tamworth", "Armidale", "Gunnedah", "Quirindi", "Moree", "Narrabri", "Inverell", "Glen Innes", "Manilla", "Werris Creek", "Walcha", "Uralla"],
    "Hunter": ["Singleton", "Muswellbrook", "Scone", "Newcastle"],
    "Sydney": ["Sydney"],
  },
  // JOBS ON/OFF: true = the role shows on the Jobs page; false = hidden (its old Apply links still open a blank application).
  // Change true/false, then rebuild and deploy (see docs/08-content-editing-guide.md, "Turn a job on or off").
  jobs: {
    "general-labourer": true,
    "mining-labourer": true,
    "construction-labourer": true,
    "warehouse-logistics": true,
    "disability-support-worker": true,
    "community-support-worker": true,
    "transport-community-access": true,
    "cleaner-domestic-support": true,
    "support-coordinator-assistant": true,
  },
  // Reviews section on the home page. Off until there are real, consented reviews.
  showReviews: false,
  // Website developer credit shown in the footer.
  developer: { name: "Agrikip", url: "https://agrikip.com" },
  lastUpdated: "24 November 2026",
};
