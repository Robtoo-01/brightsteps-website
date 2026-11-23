# 10. Deployment guide

This guide takes the site from this folder to https://brightstepsrecruitment.com.au. It assumes Netlify, because Netlify reads the `_redirects` and `_headers` files in `site/` with no extra setup and includes a form service. Cloudflare Pages reads the same files; differences are noted.

## Before you start

- An account with the domain registrar for brightstepsrecruitment.com.au (where the domain is renewed).
- Node.js 18 or later on the computer that builds the site. Run `node -v` to check.
- About an hour, plus time for DNS changes to spread (usually under 2 hours, sometimes up to 48).

## 1. Build the site

```powershell
node src/build.mjs
```

The build must end with "Self-checks passed". The `site/` folder is the complete website.

## 2. Create the Netlify site

1. Sign up at netlify.com. Turn on two-factor authentication under **User settings → Security**.
2. Choose **Add new site → Deploy manually** and drag the `site/` folder onto the page.
3. Netlify gives the site a temporary address such as `random-name.netlify.app`. Open it and check a few pages.

To update the site later, rebuild and drag `site/` onto **Deploys** again. Optional: put the project in a GitHub repository and connect it, so every push deploys automatically. Set the publish directory to `site` and the build command to `node src/build.mjs`.

## 3. Connect the forms

Choose one option and follow its steps.

**Netlify Forms (simplest on Netlify)**

1. In `src/forms.mjs`, add `data-netlify="true"` to the `<form` tag.
2. In `src/config.mjs`, set each `forms` value to the page path: `requestStaff: "/request-staff.html"`, `apply: "/apply.html"`, `contact: "/contact.html"`.
3. Rebuild and redeploy. Under **Forms**, enable form detection, then add email notifications to the BrightSteps inbox.

**Formspree (works with any host)**

1. Create three forms at formspree.io and copy each endpoint (`https://formspree.io/f/xxxx`).
2. Paste them into `forms` in `src/config.mjs`. The build adds formspree.io to the security policy automatically.
3. Rebuild and redeploy. Check the plan supports file uploads, which the resume field needs.

Then test each form from a phone and a computer, and confirm the email arrives.

## 4. Point the domain at Netlify

1. In Netlify, go to **Domain management → Add domain** and enter `brightstepsrecruitment.com.au`. Add `www` as well.
2. At your registrar's DNS settings, add the records Netlify shows. Usually that is an `A` record for the root pointing to Netlify's load balancer IP, and a `CNAME` for `www` pointing to your `*.netlify.app` address.
3. **Do not change or delete the MX records.** They deliver your email. Changing website hosting does not move email.
4. Set the root (without www) as the primary domain. Netlify redirects www to it.

Cloudflare Pages: add the domain under **Custom domains**. If the domain's DNS is already on Cloudflare, the records are created for you.

## 5. Turn on HTTPS

Netlify issues a free certificate once DNS resolves. Then turn on **Force HTTPS**. The `_headers` file adds HSTS, which tells browsers to always use HTTPS.

Only add the site to the HSTS preload list once you are sure every subdomain supports HTTPS. Preloading is hard to undo.

## 6. Check after launch

- [ ] https://brightstepsrecruitment.com.au loads with a padlock, and http:// redirects to https://
- [ ] The old URLs `/about-us`, `/pricing-schedule-8` and `/products` redirect to the new pages
- [ ] A made-up URL shows the BrightSteps 404 page
- [ ] All three forms deliver email and land on the thank-you page
- [ ] securityheaders.com gives an A grade or better
- [ ] PageSpeed Insights scores 90+ on mobile and desktop
- [ ] Google Rich Results Test finds EmploymentAgency, BreadcrumbList and FAQPage
- [ ] Submit `https://brightstepsrecruitment.com.au/sitemap.xml` in Google Search Console and Bing Webmaster Tools
- [ ] Update the website link on the Google Business Profile, Facebook, LinkedIn and directories

## Rolling back

Netlify keeps every deploy. Under **Deploys**, open an earlier one and choose **Publish deploy** to restore it instantly.

## Accounts to record (keep these in a password manager)

| Account | Used for | Owner | 2FA on? |
|---|---|---|---|
| Domain registrar | Domain renewal and DNS | | |
| Netlify / Cloudflare | Hosting | | |
| Form service | Form submissions | | |
| Google (Analytics, Search Console, Business Profile) | Analytics and local SEO | | |
| Email provider | info@ mailbox | | |
