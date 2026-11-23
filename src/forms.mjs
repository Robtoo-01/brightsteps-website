import { site } from "./config.mjs";

// Only optional fields are marked; required is the default (screen readers announce `required`).
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
  else if (type === "file") control = `<div class="dropzone">${`<input type="file" ${common}>`}<span class="dropzone-text" aria-hidden="true"><strong>Choose a file</strong> or drag it here</span></div>`;
  else control = `<input type="${type}" ${common}>`;
  return `<div class="field${full ? " field--full" : ""}">
  <label for="${id}">${label}${required ? "" : ` ${opt}`}</label>
  ${hint ? `<p class="hint" id="${id}-hint">${hint}</p>` : ""}
  ${control}
  <p class="field-error" id="${id}-error" aria-live="polite"></p>
</div>`;
}

// Checkbox or radio group shown as tiles. minOne: at least one checkbox; requiredRadio: one radio must be chosen.
export function choices(id, legend, items, { type = "checkbox", minOne = false, requiredRadio = false, hint = "", cols = 2, requiredMsg = "" } = {}) {
  const req = minOne || requiredRadio;
  const flag = minOne ? " data-min-one" : requiredRadio ? " data-required-radio" : "";
  return `<fieldset class="field field--full" id="${id}"${flag}${requiredMsg ? ` data-required-msg="${requiredMsg}"` : ""} aria-describedby="${hint ? `${id}-hint ` : ""}${id}-error">
  <legend class="label">${legend}${req ? "" : ` ${opt}`}</legend>
  ${hint ? `<p class="hint" id="${id}-hint">${hint}</p>` : ""}
  <div class="choice-group${cols === 2 ? " choice-group--2" : ""}">
    ${items.map((it, i) => `<label class="choice choice--${type}"><input type="${type}" id="${id}-${i}" name="${id}${type === "checkbox" ? "[]" : ""}" value="${it}"> <span>${it}</span></label>`).join("\n    ")}
  </div>
  <p class="field-error" id="${id}-error" aria-live="polite"></p>
</fieldset>`;
}

export function consent(id = "consent") {
  return `<div class="field consent">
  <label class="choice choice--checkbox" for="${id}"><input type="checkbox" id="${id}" name="${id}" value="yes" required aria-describedby="${id}-error" data-required-msg="Confirm you have read the privacy policy"> <span>I have read the <a href="privacy.html" target="_blank" rel="noopener">privacy policy (opens in a new tab)</a> and agree to BrightSteps contacting me about this enquiry.</span></label>
  <p class="field-error" id="${id}-error" aria-live="polite"></p>
</div>`;
}

// Wraps fields in an accessible form. Each top-level `<fieldset><legend>N. Title</legend>` in `body`
// becomes a step: with JavaScript one step shows at a time (progress tracker, Back/Continue);
// without it, every step shows and the form submits normally.
export function form({ id, endpoint, submit, body, time = "" }) {
  const titles = [];
  let n = 0;
  const stepped = body.replace(/<fieldset><legend>(?:\d+\.\s*)?([^<]+)<\/legend>/g, (_, title) => {
    titles.push(title.trim());
    n += 1;
    return `<fieldset class="form-step" data-step="${n}"><legend class="step-title"><span class="step-count">Step ${n} of §TOTAL§</span>${title.trim()}</legend>`;
  }).replaceAll("§TOTAL§", String(titles.length));
  // Content after the last step (consent, contact preference) shows with the final step.
  const splitAt = lastStepEnd(stepped);
  const steps = stepped.slice(0, splitAt);
  const final = stepped.slice(splitAt);
  const multi = titles.length > 1;

  const netlify = site.netlifyForms ? ` data-netlify="true" netlify-honeypot="website" name="${id}"` : ` name="${id}"`;
  const action = site.netlifyForms ? `thank-you.html?form=${id}` : endpoint;

  return `<div class="form-wrap">
<form class="form${multi ? " form--steps" : ""}" id="${id}" action="${action}" method="post" data-validate data-phone="${site.phoneIntl}" data-phone-display="${site.phone}" enctype="multipart/form-data"${netlify}>
  <div class="form-head">
    ${time ? `<p class="form-meta">${time}</p>` : ""}
    ${multi ? `<ol class="stepper" aria-label="Form progress">${titles.map((t, i) => `<li data-step-label="${i + 1}"${i === 0 ? ' aria-current="step"' : ""}><span class="stepper-num" aria-hidden="true">${i + 1}</span><span class="stepper-text">${t}</span></li>`).join("")}</ol>
    <div class="form-progress" aria-hidden="true"><span style="width:${Math.round(100 / titles.length)}%"></span></div>` : ""}
    <p class="hint">All fields are required unless marked (optional).</p>
  </div>
  <div class="form-summary" tabindex="-1" role="alert" hidden><h2>There is a problem</h2><ul></ul></div>
  ${steps}
  <div class="form-final">
    ${final}
  </div>
  <div class="hp-field" aria-hidden="true"><label for="${id}-website">Leave this field empty</label><input type="text" id="${id}-website" name="website" tabindex="-1" autocomplete="off"></div>
  <input type="hidden" name="form-name" value="${id}">
  <div class="form-actions">
    ${multi ? `<button class="btn btn--ghost" type="button" data-step-back hidden>Back</button>
    <button class="btn btn--primary" type="button" data-step-next hidden>Continue</button>` : ""}
    <button class="btn btn--primary" type="submit" data-track="${id}-submit">${submit}</button>
  </div>
</form>
</div>`;
}

// Index just after the closing tag of the last top-level step fieldset.
function lastStepEnd(html) {
  const start = html.lastIndexOf('<fieldset class="form-step"');
  if (start === -1) return 0;
  let depth = 0;
  const re = /<fieldset\b|<\/fieldset>/g;
  re.lastIndex = start;
  for (let m; (m = re.exec(html));) {
    depth += m[0] === "</fieldset>" ? -1 : 1;
    if (depth === 0) return m.index + m[0].length;
  }
  return html.length;
}
