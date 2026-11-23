// WCAG 2.2 contrast check for every theme's colour pairs. Run: node src/check-contrast.mjs (also run by the build).
// min 4.5 = body text, 3 = large text and UI components (borders, icons, focus).
const lum = (hex) => {
  const [r, g, b] = hex.match(/\w\w/g).map((h) => parseInt(h, 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
export const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };

// [foreground, background, minimum, what it is]
export const pairs = {
  quiet: [
    ["#1E2124", "#F7F5F0", 4.5, "body text on page"], ["#4F5357", "#F7F5F0", 4.5, "secondary text on page"], ["#4F5357", "#F0EDE6", 4.5, "secondary text on stone"],
    ["#1D4F91", "#F7F5F0", 4.5, "cobalt links on page"], ["#1D4F91", "#FFFFFF", 4.5, "cobalt links on white"], ["#FFFFFF", "#1E2124", 4.5, "primary button"],
    ["#E9E6E0", "#1E2124", 4.5, "text on charcoal band"], ["#C7C3BB", "#1E2124", 4.5, "muted text on charcoal"], ["#A9C2E6", "#1E2124", 4.5, "links on charcoal"],
    ["#C7C3BB", "#17191B", 4.5, "footer text"], ["#A19C93", "#17191B", 4.5, "footer small label"], ["#6B6F73", "#FFFFFF", 3, "input border"], ["#1D4F91", "#F7F5F0", 3, "focus ring"], ["#A9C2E6", "#17191B", 4.5, "footer headings"], ["#FFFFFF", "#1E2124", 4.5, "skip link / selection"],
  ],
  human: [
    ["#2B2A28", "#FFF9F2", 4.5, "body text on cream"], ["#5B544D", "#FFF9F2", 4.5, "secondary text on cream"], ["#5B544D", "#F4EADF", 4.5, "secondary text on sand"],
    ["#3E6A56", "#FFF9F2", 4.5, "sage links on cream"], ["#FFFFFF", "#B04A2F", 4.5, "terracotta button"], ["#FFFFFF", "#3E6A56", 4.5, "sage button (Find work)"],
    ["#F2EEE6", "#2F4F41", 4.5, "text on eucalypt band"], ["#DCE6DE", "#2F4F41", 4.5, "muted text on eucalypt"], ["#F2C9B9", "#2F4F41", 4.5, "links on eucalypt"],
    ["#D8D1C7", "#2B2A28", 4.5, "footer text"], ["#B3AA9F", "#2B2A28", 4.5, "footer small label"], ["#7A4E12", "#F3E7D5", 3, "industrial icon"],
    ["#B04A2F", "#F7E4DC", 3, "community icon"], ["#5B3F82", "#ECE6F2", 3, "emergency icon"], ["#3E6A56", "#E7F0EA", 4.5, "sage text on tint"], ["#7A7067", "#FFFFFF", 3, "input border"], ["#F2C9B9", "#2B2A28", 4.5, "footer headings"],
  ],
  industrial: [
    ["#16181A", "#FFFFFF", 4.5, "body text"], ["#4B5157", "#FFFFFF", 4.5, "secondary text"], ["#4B5157", "#E6E8EA", 4.5, "secondary text on concrete"],
    ["#16181A", "#FFC20E", 4.5, "yellow button text"], ["#FFC20E", "#16181A", 4.5, "yellow on charcoal"], ["#E6E8EA", "#16181A", 4.5, "text on charcoal"],
    ["#C3C8CD", "#16181A", 4.5, "muted on charcoal"], ["#C3C8CD", "#0E0F10", 4.5, "footer text"], ["#9AA1A8", "#0E0F10", 4.5, "footer small label"],
    ["#16181A", "#FFF3CC", 4.5, "text on hover tint"], ["#8D949A", "#FFFFFF", 3, "choice border"], ["#16181A", "#FFFFFF", 3, "focus ring on light"], ["#FFC20E", "#0E0F10", 4.5, "footer headings"],
  ],
  studio: [
    ["#1C2430", "#F4EFE6", 4.5, "body text on bone"], ["#4E5560", "#F4EFE6", 4.5, "secondary text on bone"], ["#4E5560", "#EDE6DA", 4.5, "secondary on deep bone"],
    ["#4E5560", "#FBF8F3", 4.5, "secondary on card"], ["#A4471F", "#F4EFE6", 4.5, "ochre links on bone"], ["#A4471F", "#FBF8F3", 4.5, "ochre on card"],
    ["#FFFFFF", "#A4471F", 4.5, "ochre button"], ["#E8E2D7", "#1C2430", 4.5, "text on ink band"], ["#C9C2B6", "#1C2430", 4.5, "muted on ink"],
    ["#E9B999", "#1C2430", 4.5, "links on ink"], ["#C9C2B6", "#141A23", 4.5, "footer text"], ["#9E978B", "#141A23", 4.5, "footer small label"],
    ["#56685A", "#F4EFE6", 3, "eucalypt icons"], ["#6E6A62", "#FFFFFF", 3, "input border"], ["#1C2430", "#F4EFE6", 3, "focus ring"], ["#E9B999", "#141A23", 4.5, "footer headings"],
  ],
};

export function checkThemes() {
  const failures = [];
  for (const [theme, list] of Object.entries(pairs)) {
    for (const [fg, bg, min, what] of list) {
      const r = ratio(fg, bg);
      if (r < min) failures.push(`${theme}: ${what} ${fg} on ${bg} = ${r.toFixed(2)}:1 (needs ${min}:1)`);
    }
  }
  return failures;
}

if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, "/")}`) {
  console.assert(Math.abs(ratio("#000000", "#FFFFFF") - 21) < 0.01, "formula self-check");
  for (const [theme, list] of Object.entries(pairs)) {
    console.log(`\n${theme}`);
    for (const [fg, bg, min, what] of list) { const r = ratio(fg, bg); console.log(`  ${r >= min ? "pass" : "FAIL"}  ${r.toFixed(2).padStart(5)}:1  ${what}`); }
  }
  const f = checkThemes();
  console.log(f.length ? `\n${f.length} failure(s)` : "\nAll pairs pass WCAG AA.");
  process.exitCode = f.length ? 1 : 0;
}
