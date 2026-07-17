const phonePattern = /(?:\+?1[\s.-]?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}/g;
const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;

export default async function handler(request, response) {
  const rawUrl = request.query.url || "";
  const targetUrl = normalizeUrl(rawUrl);

  if (!targetUrl) {
    response.status(400).json({ error: "A valid website URL is required." });
    return;
  }

  try {
    const siteResponse = await fetch(targetUrl, {
      redirect: "follow",
      headers: {
        "user-agent": "LeadLeakAuditBot/0.1 (+https://vercel.app)",
      },
      signal: AbortSignal.timeout(9000),
    });

    const html = await siteResponse.text();
    const analysis = analyzeHtml(html, siteResponse.url || targetUrl);
    response.status(200).json(analysis);
  } catch {
    response.status(502).json({ error: "Could not fetch that website." });
  }
}

function normalizeUrl(value) {
  try {
    const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
    const url = new URL(withProtocol);
    return url.href;
  } catch {
    return "";
  }
}

function analyzeHtml(html, finalUrl) {
  const text = stripHtml(html).toLowerCase();
  const links = extractLinks(html);
  const forms = (html.match(/<form\b/gi) || []).length;
  const phones = unique((html.match(phonePattern) || []).map((value) => value.trim()));
  const emails = unique(html.match(emailPattern) || []);
  const title = firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const metaDescription = firstMatch(
    html,
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i,
  );
  const buttonText = extractButtonText(html);
  const ctaText = `${buttonText} ${links.map((link) => link.text).join(" ")}`.toLowerCase();

  const signals = {
    finalUrl,
    title,
    metaDescription,
    phoneFound: phones.length > 0,
    emailFound: emails.length > 0,
    formFound: forms > 0,
    bookingFound: hasAny(`${ctaText} ${links.map((link) => link.href).join(" ")}`, [
      "book", "booking", "calendar", "calendly", "schedule", "appointment",
    ]),
    quoteFound: hasAny(ctaText, ["quote", "estimate", "consultation", "free audit"]),
    reviewFound: hasAny(text, ["review", "reviews", "testimonial", "testimonials", "stars"]),
    emergencyFound: hasAny(text, ["emergency", "24/7", "same day", "after hours"]),
    serviceAreaFound: hasAny(text, ["serving", "service area", "near me", "local", "county"]),
    weakCta: !hasAny(ctaText, ["quote", "estimate", "book", "schedule", "call", "consultation"]),
    forms,
    phones,
    emails,
  };

  return {
    signals,
    scores: scoreSignals(signals),
    findings: findingsFromSignals(signals),
  };
}

function scoreSignals(signals) {
  return {
    leadCapture: clampScore((signals.phoneFound ? 7 : 0) + (signals.formFound ? 8 : 0) + (signals.quoteFound ? 7 : 0), 25),
    responseSpeed: clampScore((signals.phoneFound ? 6 : 0) + (signals.bookingFound ? 7 : 0) + (signals.emergencyFound ? 4 : 0), 20),
    bookingFriction: clampScore((signals.bookingFound ? 10 : 0) + (signals.formFound ? 4 : 0), 15),
    trustSignals: clampScore((signals.reviewFound ? 10 : 0) + (signals.emailFound ? 2 : 0), 15),
    mobileExperience: 5,
    offerClarity: clampScore((signals.quoteFound ? 8 : 0) + (signals.serviceAreaFound ? 2 : 0), 10),
    trackingFollowup: 0,
  };
}

function findingsFromSignals(signals) {
  const findings = [];

  if (!signals.formFound && !signals.quoteFound) {
    findings.push({
      category: "Lead capture",
      severity: "high",
      evidence: "No quote/request form or clear estimate CTA was detected in the homepage HTML.",
      whyItMatters: "High-intent visitors may leave if they cannot request help without calling immediately.",
      fix: "Add a short quote request form with instant owner notification and customer confirmation.",
      impact: "More captured leads from visitors who are ready to inquire but not ready to call.",
    });
  }

  if (!signals.bookingFound) {
    findings.push({
      category: "Booking friction",
      severity: "medium",
      evidence: "No booking, scheduling, calendar, or appointment link was detected.",
      whyItMatters: "Every extra step between interest and appointment increases drop-off.",
      fix: "Add a booking or callback link near the main call-to-action.",
      impact: "Fewer lost visitors and faster conversion from interest to conversation.",
    });
  }

  if (!signals.reviewFound) {
    findings.push({
      category: "Trust",
      severity: "medium",
      evidence: "No review or testimonial language was detected on the homepage.",
      whyItMatters: "Local buyers use proof to decide whether a business feels safe to contact.",
      fix: "Place reviews or testimonials close to the quote and contact calls-to-action.",
      impact: "Higher confidence and better form completion rate.",
    });
  }

  if (signals.weakCta) {
    findings.push({
      category: "Offer clarity",
      severity: "medium",
      evidence: "The detected call-to-action language appears generic or unclear.",
      whyItMatters: "Specific CTAs like request an estimate or book a consultation outperform vague contact language.",
      fix: "Rewrite primary CTAs around the next action customers actually want to take.",
      impact: "Clearer buyer path and stronger conversion intent.",
    });
  }

  return findings.slice(0, 4);
}

function extractLinks(html) {
  return [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)].map((match) => ({
    href: match[1],
    text: stripHtml(match[2]).trim(),
  }));
}

function extractButtonText(html) {
  return [...html.matchAll(/<button\b[^>]*>([\s\S]*?)<\/button>/gi)]
    .map((match) => stripHtml(match[1]).trim())
    .join(" ");
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function firstMatch(value, pattern) {
  const match = value.match(pattern);
  return match ? stripHtml(match[1]) : "";
}

function hasAny(value, needles) {
  return needles.some((needle) => value.includes(needle));
}

function unique(values) {
  return [...new Set(values)];
}

function clampScore(value, max) {
  return Math.max(0, Math.min(max, value));
}
