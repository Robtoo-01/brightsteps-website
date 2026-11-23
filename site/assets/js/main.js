/* BrightSteps Recruitment — site behaviour. No dependencies. */
(() => {
  "use strict";
  const doc = document.documentElement;
  doc.classList.add("js");

  /* ---------- Analytics-ready event layer ----------
     Pushes events to window.dataLayer. Nothing is sent anywhere until an analytics
     script is added in loadAnalytics() and the visitor accepts the cookie notice. */
  window.dataLayer = window.dataLayer || [];
  const track = (event, data = {}) => window.dataLayer.push({ event, ...data });

  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-track]");
    if (el) track("cta_click", { cta: el.dataset.track, href: el.getAttribute("href") || "" });
  });

  /* ---------- Mobile navigation ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (toggle && nav) {
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
    };
    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
    });
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    matchMedia("(min-width: 72em)").addEventListener("change", (mq) => { if (mq.matches) setOpen(false); });
  }

  /* ---------- Reveal on scroll ---------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Cookie / privacy notice ---------- */
  const CONSENT_KEY = "bs-consent";
  // GA4 loads only after consent, and only if a measurement ID is set (analyticsId in src/config.mjs).
  const loadAnalytics = () => {
    track("analytics_consent_granted");
    const id = doc.dataset.ga;
    if (!id || window.gtag) return;
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", id, { anonymize_ip: true });
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(s);
  };
  const notice = document.getElementById("cookie-notice");
  let consent = null;
  try { consent = localStorage.getItem(CONSENT_KEY); } catch { /* storage blocked: show notice each visit */ }
  if (consent === "accepted") loadAnalytics();
  if (notice && !consent) {
    notice.hidden = false;
    notice.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-consent]");
      if (!btn) return;
      const value = btn.dataset.consent;
      try { localStorage.setItem(CONSENT_KEY, value); } catch { /* ignore */ }
      if (value === "accepted") loadAnalytics();
      notice.hidden = true;
    });
  }
  document.querySelectorAll("[data-reset-consent]").forEach((b) => b.addEventListener("click", () => {
    try { localStorage.removeItem(CONSENT_KEY); } catch { /* ignore */ }
    if (notice) { notice.hidden = false; notice.querySelector("button")?.focus(); }
  }));

  /* ---------- Accessible form validation and submission ---------- */
  const messages = {
    valueMissing: (label) => `Enter ${label.toLowerCase()}`,
    typeMismatch: (label, input) => input.type === "email" ? "Enter an email address in the format name@example.com" : `Check ${label.toLowerCase()}`,
    patternMismatch: (label, input) => input.dataset.patternMsg || `Check ${label.toLowerCase()}`,
    tooShort: (label, input) => `${label} must be at least ${input.minLength} characters`,
    rangeUnderflow: (label, input) => `${label} must be ${input.min} or more`,
    rangeOverflow: (label, input) => `${label} must be ${input.max} or less`,
  };

  const labelFor = (input) => {
    if (input.dataset.label) return input.dataset.label;
    const group = input.closest("fieldset[data-group]");
    if (group) return group.dataset.group;
    const l = input.id && document.querySelector(`label[for="${input.id}"]`);
    return l ? l.textContent.replace(/\*|\(optional\)/g, "").trim() : input.name;
  };

  const errorFor = (input) => {
    if (input.type === "checkbox" && input.dataset.group === undefined && input.required) {
      if (!input.checked) return input.dataset.requiredMsg || "Tick this box to continue";
      return "";
    }
    if (input.type === "file" && input.files[0] && input.files[0].size > Number(input.dataset.maxBytes || Infinity)) {
      return `${labelFor(input)} must be smaller than ${Math.round(input.dataset.maxBytes / 1048576)} MB`;
    }
    const v = input.validity;
    if (v.valid) return "";
    if (v.valueMissing && input.dataset.requiredMsg) return input.dataset.requiredMsg;
    for (const key of Object.keys(messages)) if (v[key]) return messages[key](labelFor(input), input);
    return input.validationMessage;
  };

  const showError = (input, msg) => {
    const box = document.getElementById(`${input.id}-error`);
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    if (box) box.textContent = msg;
  };

  // Checkbox groups that need at least one tick: <fieldset data-min-one id="x"> ... <p id="x-error">
  const groupError = (fs) => {
    const ticked = fs.querySelectorAll("input:checked").length;
    return ticked ? "" : (fs.dataset.requiredMsg || `Select at least one option`);
  };

  // Builds summary list items with DOM methods (no innerHTML), so no text is ever parsed as HTML.
  const listItem = (text, href, linkText) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = href;
    a.textContent = linkText || text;
    if (linkText) li.append(text, a, "."); else li.append(a);
    return li;
  };

  document.querySelectorAll("form[data-validate]").forEach((form) => {
    form.noValidate = true;
    const startedAt = Date.now();
    const summary = form.querySelector(".form-summary");
    const submitBtn = form.querySelector("[type=submit]");

    form.addEventListener("blur", (e) => {
      const input = e.target;
      if (input.matches("input:not([type=checkbox]):not([type=radio]), select, textarea") && input.id && input.dataset.touched !== undefined) {
        showError(input, errorFor(input));
      }
    }, true);
    form.addEventListener("input", (e) => {
      const input = e.target;
      input.dataset.touched = "";
      if (input.getAttribute("aria-invalid") === "true") showError(input, errorFor(input));
      const fs = input.closest("fieldset[data-min-one]");
      if (fs && fs.dataset.checked !== undefined) document.getElementById(`${fs.id}-error`).textContent = groupError(fs);
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      // Spam traps: bots fill the hidden honeypot field or submit within seconds of page load.
      if (form.querySelector(".hp-field input")?.value || Date.now() - startedAt < 3000) return;

      const errors = [];
      form.querySelectorAll("input, select, textarea").forEach((input) => {
        if (!input.id || input.closest(".hp-field") || input.closest("fieldset[data-min-one]") || input.type === "radio") return;
        const msg = errorFor(input);
        showError(input, msg);
        if (msg) errors.push({ id: input.id, msg });
      });
      form.querySelectorAll("fieldset[data-required-radio]").forEach((fs) => {
        const msg = fs.querySelector("input:checked") ? "" : fs.dataset.requiredMsg;
        document.getElementById(`${fs.id}-error`).textContent = msg;
        if (msg) errors.push({ id: fs.querySelector("input").id, msg });
      });
      form.querySelectorAll("fieldset[data-min-one]").forEach((fs) => {
        fs.dataset.checked = "";
        const msg = groupError(fs);
        document.getElementById(`${fs.id}-error`).textContent = msg;
        if (msg) errors.push({ id: fs.querySelector("input").id, msg });
      });

      if (errors.length) {
        // List errors in page order (groups are checked after single fields above).
        errors.sort((a, b) => document.getElementById(a.id).compareDocumentPosition(document.getElementById(b.id)) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
        summary.hidden = false;
        summary.querySelector("h2").textContent = "There is a problem";
        summary.querySelector("ul").replaceChildren(...errors.map((er) => listItem(er.msg, `#${er.id}`)));
        summary.focus();
        track("form_error", { form: form.id, errors: errors.length });
        return;
      }
      summary.hidden = true;

      const endpoint = form.getAttribute("action");
      submitBtn.setAttribute("aria-busy", "true");
      const originalLabel = submitBtn.textContent;
      submitBtn.textContent = "Sending…";
      try {
        // shortcut: with no endpoint configured the form shows success without sending; set action="https://…" before launch.
        if (endpoint && endpoint !== "#") {
          const res = await fetch(endpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
        } else {
          console.warn(`[BrightSteps] ${form.id}: no form endpoint set, submission was not sent.`);
        }
        track("form_submit", { form: form.id });
        location.assign(`thank-you.html?form=${encodeURIComponent(form.id)}`);
      } catch (err) {
        summary.hidden = false;
        summary.querySelector("h2").textContent = "Your form could not be sent";
        summary.querySelector("ul").replaceChildren(listItem("Please try again, or call ", `tel:${form.dataset.phone}`, form.dataset.phoneDisplay));
        summary.focus();
        track("form_failure", { form: form.id });
      } finally {
        submitBtn.removeAttribute("aria-busy");
        submitBtn.textContent = originalLabel;
      }
    });
  });

  /* Error summary links: focus the field, not just scroll */
  document.addEventListener("click", (e) => {
    const a = e.target.closest(".form-summary a[href^='#']");
    if (!a) return;
    const el = document.getElementById(a.getAttribute("href").slice(1));
    if (el) { e.preventDefault(); el.focus(); el.scrollIntoView({ block: "center" }); }
  });

  /* Thank-you page: show the message for the form that was sent */
  const sent = new URLSearchParams(location.search).get("form");
  document.querySelectorAll("[data-for]").forEach((el) => { el.hidden = el.dataset.for !== sent; });
  if (sent && document.querySelector(`[data-for="${CSS.escape(sent)}"]`)) document.querySelectorAll("[data-for-default]").forEach((el) => { el.hidden = true; });

  /* Current year */
  document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
