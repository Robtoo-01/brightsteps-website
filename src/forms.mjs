import { site } from "./config.mjs";
import { tel } from "./layout.mjs";

const reqMark = `<span class="req" aria-hidden="true">*</span>`;
const opt = `<span class="optional">(optional)</span>`;

// Text-like input, select or textarea with label, hint and error slot wired by aria-describedby.
export function field(id, label, { type = "text", required = false, hint = "", full = false, options, attrs = "", requiredMsg = "" } = {}) {
  const describedBy = [hint && `${id}-hint`, `${id}-error`].filter(Boolean).join(" ");
  // Length caps limit abuse; the form service must still validate and escape on its side.
  if (!/maxlength/.test(attrs) && ["text", "email", "tel", "textarea"].includes(type)) attrs += ` maxlength="${type === "textarea" ? 4000 : 254}"`;
  const common = `id="${id}" name="${id}" aria-describedby="${describedBy}"${required ? " required" : ""}${requiredMsg ? ` data-required-msg="${requiredMsg}"` : ""} ${attrs}`;
  let control;
  if (type === "select") control = `<select ${common}><option value="">Please choose</option>${options.map((o) => `<option>${o}</option>`).join("")}</select>`;
  else if (type === "textarea") control = `<textarea ${common}></textarea>`;
  else control = `<input type="${type}" ${common}>`;
  return `<div class="field${full ? " field--full" : ""}">
  <label for="${id}">${label} ${required ? reqMark : opt}</label>
  ${hint ? `<p class="hint" id="${id}-hint">${hint}</p>` : ""}
  ${control}
  <p class="field-error" id="${id}-error" aria-live="polite"></p>
</div>`;
}

// Checkbox or radio group. minOne: at least one checkbox; requiredRadio: one radio must be chosen.
export function choices(id, legend, items, { type = "checkbox", minOne = false, requiredRadio = false, hint = "", cols = 2, requiredMsg = "" } = {}) {
  const req = minOne || requiredRadio;
  const flag = minOne ? " data-min-one" : requiredRadio ? " data-required-radio" : "";
  return `<fieldset class="field field--full" id="${id}"${flag}${requiredMsg ? ` data-required-msg="${requiredMsg}"` : ""} aria-describedby="${hint ? `${id}-hint ` : ""}${id}-error">
  <legend class="label">${legend} ${req ? reqMark : opt}</legend>
  ${hint ? `<p class="hint" id="${id}-hint">${hint}</p>` : ""}
  <div class="choice-group${cols === 2 ? " choice-group--2" : ""}">
    ${items.map((it, i) => `<label class="choice"><input type="${type}" id="${id}-${i}" name="${id}${type === "checkbox" ? "[]" : ""}" value="${it}"> <span>${it}</span></label>`).join("\n    ")}
  </div>
  <p class="field-error" id="${id}-error" aria-live="polite"></p>
</fieldset>`;
}

export function consent(id = "consent") {
  return `<div class="field consent">
  <label class="choice" for="${id}"><input type="checkbox" id="${id}" name="${id}" value="yes" required aria-describedby="${id}-error" data-required-msg="Confirm you have read the privacy policy"> <span>I have read the <a href="privacy.html" target="_blank" rel="noopener">privacy policy (opens in a new tab)</a> and agree to BrightSteps contacting me about this enquiry. ${reqMark}</span></label>
  <p class="field-error" id="${id}-error" aria-live="polite"></p>
</div>`;
}

// Wraps fields in an accessible form with error summary, honeypot and success message.
export function form({ id, endpoint, submit, body }) {
  return `<div class="form-wrap">
<form class="form" id="${id}" action="${endpoint}" method="post" data-validate data-phone="${site.phoneIntl}" data-phone-display="${site.phone}" enctype="multipart/form-data">
  <div class="form-summary" tabindex="-1" role="alert" hidden><h2>There is a problem</h2><ul></ul></div>
  <p class="hint">Fields marked <span class="req">*</span> are required.</p>
  ${body}
  <div class="hp-field" aria-hidden="true"><label for="${id}-website">Leave this field empty</label><input type="text" id="${id}-website" name="website" tabindex="-1" autocomplete="off"></div>
  <input type="hidden" name="form-name" value="${id}"><!-- "form-name" is what Netlify Forms expects; other services ignore it -->
  <button class="btn btn--primary btn--block" type="submit" data-track="${id}-submit">${submit}</button>
</form>
</div>`;
}
