// Lint for the site script (browser) and the build scripts and tests (Node). Run: npm run lint
import js from "@eslint/js";
import globals from "globals";

export default [
  { ignores: ["node_modules/", "previews/", "docs/"] },
  js.configs.recommended,
  { files: ["site/assets/js/**/*.js"], languageOptions: { sourceType: "script", globals: globals.browser } },
  { files: ["src/**/*.mjs", "tests/**/*.mjs", "eslint.config.mjs"], languageOptions: { sourceType: "module", globals: globals.node } },
  { files: ["src/**/*.cjs"], languageOptions: { sourceType: "commonjs", globals: globals.node } },
];
