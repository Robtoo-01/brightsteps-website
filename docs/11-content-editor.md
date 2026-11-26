# 11. Content editor (Pages CMS)

The manager edits **jobs, news, rates and towns** at **app.pagescms.org**, with no code and no GitHub account. Every save goes to GitHub, Netlify rebuilds the site, and the change is live in about a minute.

| What | Where it's stored |
|---|---|
| Jobs (show/hide, towns, wording, order) | `content/jobs/*.json` |
| News posts | `content/news/*.json` |
| Rates on the pricing page and service pages | `content/settings/rates.json` |
| Areas we cover (regions and towns) | `content/settings/areas.json` |
| What the editor shows and its rules | `.pages.yml` |

## Part A: one-off setup (IT manager, about 20 minutes)

1. **Push this project to the GitHub repository** (the whole folder, including `.pages.yml`, `netlify.toml` and `content/`).
2. **Make Netlify build from GitHub.** In Netlify: the BrightSteps site → **Site configuration → Build & deploy → Continuous deployment → Link repository**, and choose the repository and branch. `netlify.toml` already sets the build command (`node src/build.mjs`) and publish folder (`site`). Check that the first automatic deploy goes green and the live site looks right.
3. **Connect Pages CMS.** Go to app.pagescms.org, **sign in with GitHub**, and install the Pages CMS GitHub App on the account that owns the repository, giving it access to **this repository only**.
4. **Open the repository in Pages CMS.** You should see Jobs, News, Rates and Areas we cover in the sidebar.
5. **Invite the manager** as a collaborator with their work email. They sign in with that email and a 6-digit code; they don't need a GitHub account. Collaborators can edit content but can't change `.pages.yml` or invite others.
6. **Test it together:** the manager unticks one job, saves, and you both check `/jobs` on the live site about a minute later. Then tick it again.

Safety net: if an edit breaks a rule (for example, a news summary that's too short or a job with no towns), the Netlify build stops with a plain message in the deploy log and **the live site stays as it was**. Fix it in Pages CMS and save again.

Developers can still edit everything else (page layouts, service pages, legal pages) in `src/` as before. Run `npm test` before pushing.

## Part B: manager's guide

**Sign in:** go to app.pagescms.org, enter your work email, and type in the 6-digit code that's emailed to you. Open the BrightSteps repository.

**Hide or show a job:** Jobs → pick the job → untick (or tick) **Show on website** → **Save**. Live in about a minute.

**Add a job:** Jobs → **Add an entry** → fill in the title, type of work, towns (one per line) and short description → tick **Show on website** → **Save**.

**Change the order of jobs:** set **Position on the Jobs page**. Lower numbers come first (10, 20, 30...).

**Post news:** News → **Add an entry** → title (up to 57 characters), date, label, summary (110–160 characters; this is what Google shows) and the article → **Save**. The newest post appears first.

**Change a rate:** Rates → change **Hourly rate** for that role → **Save**. The pricing page, the service pages and the home page all update together. Leave the rate empty to show "Get a quote" instead of a price.

**Add or remove a town:** Areas we cover → open the region → add or remove the town → **Save**.

**Rules of thumb**
- Hide a job rather than deleting it if you might need it again.
- Only post jobs and news that are real and current.
- If a change doesn't appear after 5 minutes, ask the IT manager to check the Netlify deploy log.
