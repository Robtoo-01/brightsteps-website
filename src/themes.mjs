// Theme registry. Pick the live theme with `theme` in src/config.mjs.
// Each theme = Google Fonts it needs + a stylesheet in site/assets/css/themes/ that overrides the base tokens.
// Bricolage Grotesque 800 always loads: it is the logo wordmark font and stays the same in every theme.
export const themes = {
  quiet: {
    name: "Quiet Professional",
    fonts: "family=Newsreader:opsz,wght@6..72,500;6..72,600&family=Source+Sans+3:wght@400;600;700",
    themeColor: "#F7F5F0",
  },
  human: {
    name: "Human & Community",
    fonts: "family=Lexend:wght@500;600&family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400",
    localFonts: "assets/css/fonts.css", // self-hosted copies of the fonts above plus the wordmark (F5)
    themeColor: "#FFF9F2",
  },
  industrial: {
    name: "Industrial Precision",
    fonts: "family=Barlow+Condensed:wght@600;700&family=Barlow:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500",
    themeColor: "#16181A",
  },
  studio: {
    name: "Modern Australian Studio",
    fonts: "family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Instrument+Sans:wght@400;500;600;700",
    themeColor: "#F4EFE6",
  },
};

// Themes with localFonts load their own copies; the rest still use Google Fonts (preview themes only).
export const fontsHref = (key) => themes[key].localFonts ||
  `https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,800&${themes[key].fonts}&display=swap`;
