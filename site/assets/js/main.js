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

  /* ---------- Accessible form validation, steps and submission ---------- */
  const messages = {
    valueMissing: (label) => `Enter ${label.toLowerCase()}`,
    typeMismatch: (label, input) => input.type === "email" ? "Enter an email address in the format name@example.com" : `Check ${label.toLowerCase()}`,
    patternMismatch: (label, input) => input.dataset.patternMsg || `Check ${label.toLowerCase()}`,
    tooShort: (label, input) => `${label} must be at least ${input.minLength} characters`,
    rangeUnderflow: (label, input) => input.type === "date" ? "Choose today or a later date" : `${label} must be ${input.min} or more`,
    rangeOverflow: (label, input) => `${label} must be ${input.max} or less`,
  };

  const labelFor = (input) => {
    if (input.dataset.label) return input.dataset.label;
    const l = input.id && document.querySelector(`label[for="${input.id}"]`);
    return l ? l.textContent.replace(/\(optional\)/g, "").trim() : input.name;
  };

  const errorFor = (input) => {
    if (input.type === "checkbox" && input.required) return input.checked ? "" : (input.dataset.requiredMsg || "Tick this box to continue");
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
  const groupError = (fs) => (fs.querySelector("input:checked") ? "" : (fs.dataset.requiredMsg || "Select at least one option"));

  // Builds summary list items with DOM methods (no innerHTML), so no text is ever parsed as HTML.
  const listItem = (text, href, linkText) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = href;
    a.textContent = linkText || text;
    if (linkText) li.append(text, a, "."); else li.append(a);
    return li;
  };

  // Validates every field inside `scope` (a step or the whole form); returns [{id, msg}] in page order.
  const validate = (scope) => {
    const errors = [];
    scope.querySelectorAll("input, select, textarea").forEach((input) => {
      if (!input.id || input.type === "hidden" || input.closest(".hp-field") || input.closest("fieldset[data-min-one]") || input.type === "radio") return;
      const msg = errorFor(input);
      showError(input, msg);
      if (msg) errors.push({ id: input.id, msg });
    });
    scope.querySelectorAll("fieldset[data-required-radio]").forEach((fs) => {
      const msg = fs.querySelector("input:checked") ? "" : fs.dataset.requiredMsg;
      document.getElementById(`${fs.id}-error`).textContent = msg;
      if (msg) errors.push({ id: fs.querySelector("input").id, msg });
    });
    scope.querySelectorAll("fieldset[data-min-one]").forEach((fs) => {
      fs.dataset.checked = "";
      const msg = groupError(fs);
      document.getElementById(`${fs.id}-error`).textContent = msg;
      if (msg) errors.push({ id: fs.querySelector("input").id, msg });
    });
    return errors.sort((a, b) => document.getElementById(a.id).compareDocumentPosition(document.getElementById(b.id)) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
  };

  // Earliest start date is today (local time).
  document.querySelectorAll('input[type="date"]').forEach((d) => {
    const t = new Date();
    d.min = new Date(t.getTime() - t.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  });

  // Show the chosen file name in upload drop zones.
  document.querySelectorAll(".dropzone input[type=file]").forEach((input) => {
    const text = input.parentElement.querySelector(".dropzone-text");
    const original = text.innerHTML;
    input.addEventListener("change", () => {
      const f = input.files[0];
      if (f) { text.textContent = `Selected: ${f.name}`; input.parentElement.classList.add("has-file"); }
      else { text.innerHTML = original; input.parentElement.classList.remove("has-file"); }
    });
  });

  document.querySelectorAll("form[data-validate]").forEach((form) => {
    form.noValidate = true;
    const startedAt = Date.now();
    const summary = form.querySelector(".form-summary");
    const submitBtn = form.querySelector("[type=submit]");
    const steps = [...form.querySelectorAll(".form-step")];
    const multi = form.classList.contains("form--steps") && steps.length > 1;
    const final = form.querySelector(".form-final");
    const back = form.querySelector("[data-step-back]");
    const next = form.querySelector("[data-step-next]");
    const bar = form.querySelector(".form-progress span");
    const labels = [...form.querySelectorAll("[data-step-label]")];
    let current = 0;

    const showSummary = (heading, items) => {
      summary.hidden = false;
      summary.querySelector("h2").textContent = heading;
      summary.querySelector("ul").replaceChildren(...items);
      summary.focus();
    };

    const goTo = (i, focus = true) => {
      current = i;
      const last = i === steps.length - 1;
      steps.forEach((s, n) => { s.hidden = n !== i; });
      final.hidden = !last;
      back.hidden = i === 0;
      next.hidden = last;
      submitBtn.hidden = !last;
      bar.style.width = `${Math.round(((i + 1) / steps.length) * 100)}%`;
      labels.forEach((l, n) => {
        l.classList.toggle("is-done", n < i);
        if (n === i) l.setAttribute("aria-current", "step"); else l.removeAttribute("aria-current");
      });
      summary.hidden = true;
      if (focus) {
        const title = steps[i].querySelector(".step-title");
        title.tabIndex = -1;
        title.focus({ preventScroll: true });
        form.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      }
      track("form_step", { form: form.id, step: i + 1 });
    };

    if (multi) {
      form.classList.add("is-stepped");
      goTo(0, false);
      next.addEventListener("click", () => {
        const errors = validate(steps[current]);
        if (errors.length) {
          showSummary("Please check this step", errors.map((er) => listItem(er.msg, `#${er.id}`)));
          track("form_error", { form: form.id, step: current + 1, errors: errors.length });
          return;
        }
        goTo(current + 1);
      });
      back.addEventListener("click", () => goTo(current - 1));
    }

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
      const fs = input.closest("fieldset[data-min-one], fieldset[data-required-radio]");
      if (fs && (fs.dataset.checked !== undefined || fs.matches("[data-required-radio]"))) {
        const box = document.getElementById(`${fs.id}-error`);
        if (box.textContent) box.textContent = fs.matches("[data-min-one]") ? groupError(fs) : "";
      }
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      // Spam traps: bots fill the hidden honeypot field or submit within seconds of page load.
      if (form.querySelector(".hp-field input")?.value || Date.now() - startedAt < 3000) return;

      // On the last step, check every step; jump back to the first step with a problem.
      const errors = validate(form);
      if (errors.length) {
        if (multi) {
          const first = steps.findIndex((s) => s.contains(document.getElementById(errors[0].id)));
          if (first !== -1 && first !== current) goTo(first, false);
        }
        showSummary("There is a problem", errors.map((er) => listItem(er.msg, `#${er.id}`)));
        track("form_error", { form: form.id, errors: errors.length });
        return;
      }
      summary.hidden = true;

      const action = form.getAttribute("action");
      const isNetlify = form.hasAttribute("data-netlify");
      // shortcut: on localhost (and with no endpoint) forms show success without sending, so the site can be tested offline.
      const demo = !action || action === "#" || (isNetlify && /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname));
      submitBtn.setAttribute("aria-busy", "true");
      const originalLabel = submitBtn.textContent;
      submitBtn.textContent = "Sending…";
      try {
        if (demo) {
          console.warn(`[BrightSteps] ${form.id}: demo mode, submission was not sent.`);
        } else {
          const res = await fetch(isNetlify ? "/" : action, { method: "POST", body: new FormData(form), headers: isNetlify ? {} : { Accept: "application/json" } });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
        }
        track("form_submit", { form: form.id });
        location.assign(`thank-you.html?form=${encodeURIComponent(form.id)}`);
      } catch (err) {
        showSummary("Your form could not be sent", [listItem("Please try again, or call ", `tel:${form.dataset.phone}`, form.dataset.phoneDisplay)]);
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
