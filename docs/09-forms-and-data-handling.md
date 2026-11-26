# 12. Forms and data handling procedure

How BrightSteps handles what people send through the website. It puts the commitments in the privacy policy into daily practice. Staff who read website enquiries should follow it.

## What each form collects

| Form | Page | Collects | Goes to |
|---|---|---|---|
| Request staff | `request-staff.html` | Name, organisation, work email, phone, type of work, worker numbers, roles, start date, duration, location, shift times, notes, contact preference | Form service, then email notification to the info@ inbox |
| Apply for work | `apply.html` | Name, email, mobile, suburb, postcode, work types, availability, right to work (yes/no), checks and licences held, experience, optional resume (PDF or Word, under 5 MB) | Same |
| Contact | `contact.html` | Name, email, optional phone, enquiry type, message | Same |

Every form requires the person to confirm they have read the privacy policy. The forms ask people **not** to include health or criminal history details. Collect those separately and securely, only when a role requires them.

## Responding

| Enquiry | Target |
|---|---|
| Request staff marked "Urgent / emergency cover" | Call back as soon as possible. Check the form service's mobile or SMS alerts are on |
| Other staffing requests | Same business day |
| Job applications | Acknowledge within 2 business days |
| General enquiries | Within 1 business day |

These are internal targets, not public promises. If you decide to publish a response time on the website, set one you can always meet.

## Storage and access

- Submissions are stored in the form service account and arrive by email. Only staff who need them should have access to either.
- Turn on two-factor authentication for the form service and the mailbox.
- Move candidate details into your recruitment records (spreadsheet, CRM or applicant tracking system), then delete them from the form service and the email inbox. Do this monthly at least.
- Never forward resumes or candidate details to a client without the candidate's agreement for that role.
- Don't download submissions to personal devices or USB drives.

## Retention (from the privacy policy)

| Record | Keep for |
|---|---|
| Candidate records | Up to 2 years after last contact, or delete sooner on request |
| Employee records | 7 years after employment ends |
| Financial records | 7 years |
| Client enquiries that didn't proceed | Delete after 2 years |

Set a calendar reminder each quarter to delete records past their retention date, including in the form service and the mailbox.

## Requests from individuals

- **Access or correction:** confirm the person's identity, then provide or correct their information within 30 days.
- **Deletion:** delete their information from the form service, mailbox and records, unless the law requires you to keep it (for example tax or employment records). Tell them what was deleted and what was kept, and why.
- **Complaint:** acknowledge within 7 business days and respond within 30 days, as the privacy policy promises. If they remain unhappy, give them the OAIC's details.

## If something goes wrong (data breach)

Examples: a mailbox is hacked, a resume is emailed to the wrong person, or a form service account is accessed by someone else.

1. **Contain:** change passwords, revoke access, and ask any wrong recipient to delete the information.
2. **Assess:** what information was involved, how many people are affected, and whether serious harm is likely (identity documents, health or criminal history information raise the risk).
3. **Notify:** if serious harm is likely, notify the affected people and the OAIC as soon as practicable (oaic.gov.au, "Report a data breach"). This is required under the Notifiable Data Breaches scheme.
4. **Review:** record what happened and what you changed to prevent it happening again.

## Spam

The forms block most bots with a hidden honeypot field, a minimum fill time and the form service's spam filter. If spam still gets through, turn on the service's stricter filter or reCAPTCHA option. Avoid image CAPTCHAs: they block people with disability.

## Job applications inbox (added 26 Nov 2026)

Job applications from the Jobs page and the Apply page use the Netlify form `apply-form`. The role a person clicked on the Jobs page arrives in the `a-role` field.

The inbox address is set in Netlify, not in the website code, so it never appears on the site:

1. Netlify dashboard → the BrightSteps site → **Site configuration → Notifications → Emails and webhooks → Form submission notifications**.
2. **Add notification → Email notification**.
3. Event: *New form submission*. Form: **apply-form**. Email: the applications inbox.
4. Save. Submit a test application from `/jobs` and check that it arrives.

Staffing requests (`request-staff-form`) and contact messages (`contact-form`) keep their existing notifications.
