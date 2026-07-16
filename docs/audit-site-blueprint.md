# Local Business Audit Site Blueprint

## Goal

Build a private audit-generation platform that helps sell conversion systems to local service businesses.

The site should not behave like a generic SEO scanner. Its purpose is to create credible, specific, business-focused audit pages that make one target company see where it is losing leads and give them a low-risk path to let us fix it.

## Primary User

The primary user is the operator creating audits, not the audited business.

The business owner is the secondary user. They only see the finished report and the call to action.

## Core Offer

> I reviewed your site and found specific places where leads may be leaking. I made a private audit page showing the issues and the fix. I can install the fix as a trial, and you only keep it if it produces value.

## Ideal Customer Profiles

Prioritize service businesses where one extra customer is worth enough to justify a monthly fee.

- Roofing
- HVAC
- Plumbing
- Electrical
- Tree removal
- Landscaping
- Med spas
- Dentists
- Lawyers
- Remodeling contractors
- Auto detailing
- Wedding photographers

Avoid early outreach to businesses where purchase value is low or owners are overwhelmed by commodity marketing pitches.

- Restaurants
- Tiny retail shops
- Cafes
- Hobby businesses
- Low-ticket consumer stores

## Product Positioning

Do not sell websites.

Sell one measurable improvement:

- More booked estimates
- Faster response to leads
- Fewer missed calls
- More completed quote requests
- More review requests
- Better intake before appointments
- Follow-up on leads that would otherwise go cold

## MVP Workflow

1. Add a new business audit from an internal form.
2. Enter business details, website URL, niche, phone, location, and competitors.
3. Score the business across conversion-focused categories.
4. Add evidence for each issue.
5. Generate a private audit page.
6. Generate outreach copy that links to the audit.
7. Send manually from email, LinkedIn, or contact form.
8. Track status: drafted, sent, opened, replied, trial, won, lost.

## Report Sections

Each public audit should include:

1. Executive summary
2. Conversion score
3. Lead capture issues
4. Trust issues
5. Follow-up issues
6. Competitor gap
7. Recommended system
8. Low-risk trial offer
9. Call to action

## Scoring Model

Use a 100-point score weighted toward revenue leakage, not technical perfection.

- Lead capture: 25 points
- Response speed: 20 points
- Booking friction: 15 points
- Trust signals: 15 points
- Mobile experience: 10 points
- Offer clarity: 10 points
- Tracking and follow-up: 5 points

Scores should be explainable. The report should never show a number without evidence.

## Issue Severity

Each finding should have:

- Category
- Severity: high, medium, low
- Evidence
- Why it matters
- Recommended fix
- Estimated business impact

## Recommended Fix Library

Initial reusable recommendations:

- Install missed-call text-back
- Add quote request form
- Add booking page
- Add service-area landing page
- Add review request automation
- Add before-and-after gallery
- Add follow-up sequence for unbooked leads
- Add call tracking
- Add form-to-SMS owner alert
- Add simple CRM pipeline

## Outreach Strategy

Send fewer, better messages.

For each niche batch:

- 10 highly personalized audits
- 3 expected replies
- 1 expected trial

If 10 audits get zero replies, revise the list or message.

If replies happen but trials do not, reduce risk in the offer.

If trials happen but customers do not pay, the system is not producing enough value.

## Suggested First Product

Start with the missed-lead recovery package:

- Website audit page
- Quote/contact form
- SMS/email alert to owner
- Instant SMS response to prospect
- Calendar booking link
- Lead dashboard
- Weekly lead report

## Pricing Hypothesis

Trial:

- Free 14-day install
- Business keeps it only if it captures a real opportunity or saves measurable admin time

Paid:

- $500-$1,500 setup
- $150-$500 per month

Premium:

- $2,000-$5,000 setup
- $500-$1,500 per month
- Includes analytics, automations, landing pages, lead tracking, and reporting

## Technical Architecture

Phase 1 can be local-first, but the code should be structured so it can move to a hosted app.

Core entities:

- Business
- Audit
- Finding
- Recommendation
- Competitor
- Outreach message
- Status event

Public pages:

- Audit report by slug

Internal pages:

- Dashboard
- New audit
- Edit audit
- Outreach copy
- Status tracking

Future integrations:

- PageSpeed Insights
- Google Business Profile data
- Twilio SMS
- Resend email
- Supabase database and auth
- Screenshot capture
- CRM export

## Quality Bar

The tool is successful only if it improves outreach quality.

Do not measure success by feature count.

Measure:

- Audits created per week
- Reply rate
- Trial rate
- Close rate
- Monthly recurring revenue
- Which findings produce the most replies

## First Build Milestone

Build a polished local MVP with sample data and manual audit creation:

- Internal dashboard
- Create/edit audit form
- Report rendering
- Scoring display
- Findings and recommendations
- Outreach copy generator
- Status tracking
- Local persistence

This gives us something usable without waiting for external APIs.
