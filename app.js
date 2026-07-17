const STORAGE_KEY = "lead-leak-audits-v1";
const PROSPECT_STORAGE_KEY = "lead-leak-prospects-v1";

const scoreConfig = [
  ["leadCapture", "Lead capture", 25],
  ["responseSpeed", "Response speed", 20],
  ["bookingFriction", "Booking friction", 15],
  ["trustSignals", "Trust signals", 15],
  ["mobileExperience", "Mobile experience", 10],
  ["offerClarity", "Offer clarity", 10],
  ["trackingFollowup", "Tracking and follow-up", 5],
].map(([key, label, weight]) => ({ key, label, weight }));

const defaultAudit = {
  id: "demo-brightline-roofing",
  businessName: "BrightLine Roofing",
  website: "https://example.com",
  niche: "Roofing",
  location: "Charlotte, NC",
  contactName: "Owner",
  status: "Drafted",
  summary:
    "BrightLine has strong service-market fit, but the current website makes high-intent visitors call or leave without a fast quote path. The fastest revenue fix is a missed-lead recovery system: quote form, instant SMS follow-up, owner alert, and booking link.",
  scores: {
    leadCapture: 11,
    responseSpeed: 8,
    bookingFriction: 7,
    trustSignals: 10,
    mobileExperience: 7,
    offerClarity: 6,
    trackingFollowup: 1,
  },
  findings: [
    {
      category: "Lead capture",
      severity: "high",
      evidence: "Visitors are pushed toward a phone call without a visible quote request path.",
      whyItMatters:
        "High-intent homeowners often compare several contractors at once. If they cannot request a quote quickly, they move to the next option.",
      fix: "Add a short quote form that triggers an immediate text response and owner alert.",
      impact: "More estimate requests from visitors who are not ready to call.",
    },
    {
      category: "Follow-up",
      severity: "high",
      evidence: "There is no visible after-hours or missed-call recovery flow.",
      whyItMatters:
        "Roofing leads are often urgent. A slow response can lose the job before the owner sees the inquiry.",
      fix: "Install missed-call text-back and a simple booking link.",
      impact: "Faster contact with leads that would otherwise go cold.",
    },
  ],
  competitors: [
    {
      name: "Queen City Roof Pros",
      gap: "Uses a dedicated estimate page and repeats the CTA on service pages.",
    },
  ],
  updatedAt: new Date().toISOString(),
};

const defaultProspects = [
  {
    id: "prospect-summit-hvac",
    businessName: "Summit Comfort HVAC",
    website: "https://example-hvac.com",
    phone: "(555) 018-4431",
    niche: "HVAC",
    location: "Charlotte, NC",
    rating: "4.6",
    reviews: "74",
    notes: "No visible online booking. Good candidate for emergency repair lead recovery.",
    status: "Qualified",
    source: "Demo",
    createdAt: new Date().toISOString(),
  },
  {
    id: "prospect-oakline-roofing",
    businessName: "Oakline Roofing",
    website: "",
    phone: "(555) 019-1188",
    niche: "Roofing",
    location: "Raleigh, NC",
    rating: "4.3",
    reviews: "31",
    notes: "Website missing from listing. Could pitch simple quote page and missed-call follow-up.",
    status: "New",
    source: "Demo",
    createdAt: new Date().toISOString(),
  },
];

const nicheTemplates = [
  {
    match: ["roof", "hvac", "plumb", "electric", "tree", "remodel", "landscap", "detail"],
    summary:
      "This business appears to depend on high-intent local service leads. The audit should focus on whether visitors can request a quote quickly, whether missed calls are recovered, and whether proof is placed close to the contact path.",
    scores: { leadCapture: 9, responseSpeed: 6, bookingFriction: 5, trustSignals: 8, mobileExperience: 6, offerClarity: 6, trackingFollowup: 1 },
    findings: [
      {
        category: "Lead capture",
        severity: "high",
        evidence: "The current flow should be checked for a short quote request path, visible phone number, and service-area specific CTA.",
        whyItMatters: "Local service buyers often contact the first company that makes requesting an estimate easy.",
        fix: "Add a short quote form with owner notification and instant customer confirmation.",
        impact: "More estimate requests from visitors who are not ready to call.",
      },
      {
        category: "Follow-up",
        severity: "high",
        evidence: "The business should be checked for missed-call text-back and after-hours lead recovery.",
        whyItMatters: "Urgent service leads lose value quickly when the first response is delayed.",
        fix: "Install missed-call text-back and a simple booking or callback link.",
        impact: "Faster recovery of leads that would otherwise go cold.",
      },
    ],
  },
  {
    match: ["med spa", "spa", "dent", "orthodont", "chiro", "clinic"],
    summary:
      "This business likely depends on appointment requests and trust before booking. The audit should focus on treatment/service clarity, reviews, before-and-after proof, online booking friction, and follow-up for unbooked inquiries.",
    scores: { leadCapture: 10, responseSpeed: 7, bookingFriction: 5, trustSignals: 7, mobileExperience: 6, offerClarity: 5, trackingFollowup: 1 },
    findings: [
      {
        category: "Booking friction",
        severity: "high",
        evidence: "The booking path should be checked for unnecessary steps between service interest and appointment request.",
        whyItMatters: "Appointment-based buyers often compare providers and choose the one that feels easiest and safest to book.",
        fix: "Create a focused booking page with service proof, FAQ, and a short appointment request form.",
        impact: "More consultation requests from visitors already considering the service.",
      },
      {
        category: "Trust",
        severity: "medium",
        evidence: "Trust assets should be checked near the booking CTA, especially reviews, credentials, and service outcomes.",
        whyItMatters: "Health, beauty, and dental buyers need confidence before sharing contact information.",
        fix: "Place reviews, credentials, and relevant before-and-after proof beside booking CTAs.",
        impact: "Higher appointment form completion rate.",
      },
    ],
  },
  {
    match: ["law", "attorney", "legal"],
    summary:
      "This business likely depends on urgent, high-value consultation requests. The audit should focus on practice-area clarity, trust proof, fast contact options, and intake that makes the next step obvious.",
    scores: { leadCapture: 9, responseSpeed: 5, bookingFriction: 6, trustSignals: 7, mobileExperience: 6, offerClarity: 5, trackingFollowup: 1 },
    findings: [
      {
        category: "Offer clarity",
        severity: "high",
        evidence: "The page should be checked for a clear practice-area offer and a low-friction consultation path.",
        whyItMatters: "Legal prospects often need help quickly and may not understand which service page applies to their situation.",
        fix: "Add a practice-area intake form with urgent callback routing and clear next-step copy.",
        impact: "More qualified consultation requests.",
      },
      {
        category: "Trust",
        severity: "high",
        evidence: "The audit should verify whether reviews, case-type experience, and attorney credibility appear before the contact CTA.",
        whyItMatters: "Legal leads need confidence before describing a sensitive issue.",
        fix: "Move credibility proof close to consultation CTAs and intake forms.",
        impact: "Higher consultation conversion rate.",
      },
    ],
  },
];

const $ = (selector) => document.querySelector(selector);
const loadArray = (key, fallback) => {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "null");
    return Array.isArray(parsed) && parsed.length ? parsed : fallback;
  } catch {
    return fallback;
  }
};

let state = {
  audits: loadArray(STORAGE_KEY, [structuredClone(defaultAudit)]),
  prospects: loadArray(PROSPECT_STORAGE_KEY, structuredClone(defaultProspects)),
  selectedId: "demo-brightline-roofing",
};

const elements = {
  storageStatus: $("#storageStatus"),
  metricGrid: $("#metricGrid"),
  auditList: $("#auditList"),
  prospectNiche: $("#prospectNiche"),
  prospectLocation: $("#prospectLocation"),
  apiSearchStatus: $("#apiSearchStatus"),
  searchLinks: $("#searchLinks"),
  csvInput: $("#csvInput"),
  prospectSearch: $("#prospectSearch"),
  prospectStatusFilter: $("#prospectStatusFilter"),
  prospectList: $("#prospectList"),
  auditForm: $("#auditForm"),
  scoreInputs: $("#scoreInputs"),
  findingsEditor: $("#findingsEditor"),
  competitorsEditor: $("#competitorsEditor"),
  reportPreview: $("#reportPreview"),
  outreachCopy: $("#outreachCopy"),
  analyzeStatus: $("#analyzeStatus"),
};

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.audits));
  localStorage.setItem(PROSPECT_STORAGE_KEY, JSON.stringify(state.prospects));
  elements.storageStatus.textContent = "Saved locally";
}

function activeAudit() {
  return state.audits.find((audit) => audit.id === state.selectedId) || state.audits[0];
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function slugify(value) {
  return String(value).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function calculateScore(audit) {
  return scoreConfig.reduce((sum, item) => {
    return sum + Math.max(0, Math.min(item.weight, Number(audit.scores?.[item.key] || 0)));
  }, 0);
}

function setView(view) {
  document.querySelectorAll(".view").forEach((node) => {
    node.classList.toggle("is-visible", node.id === `${view}View`);
  });
  document.querySelectorAll("[data-view-button]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.viewButton === view);
  });
  render();
}

function render() {
  renderMetrics();
  renderAuditList();
  renderProspectSearchLinks();
  renderProspectList();
  renderEditor(activeAudit());
  renderReport(activeAudit());
  renderOutreach(activeAudit());
}

function renderMetrics() {
  const total = state.audits.length;
  const average = total
    ? Math.round(state.audits.reduce((sum, audit) => sum + calculateScore(audit), 0) / total)
    : 0;
  const metrics = [
    ["Audits", total],
    ["Prospects", state.prospects.length],
    ["Sent", state.audits.filter((audit) => audit.status !== "Drafted").length],
    ["Trials", state.audits.filter((audit) => audit.status === "Trial").length],
    ["Avg. score", average],
  ];
  elements.metricGrid.innerHTML = metrics
    .map(([label, value]) => `<div class="metric"><span>${label}</span><strong>${value}</strong></div>`)
    .join("");
}

function renderAuditList() {
  elements.auditList.innerHTML = state.audits
    .map((audit) => {
      const highIssues = audit.findings.filter((finding) => finding.severity === "high").length;
      const readiness = calculateAuditReadiness(audit);
      return `<article class="audit-card">
        <div>
          <h3>${escapeHtml(audit.businessName || "Unnamed audit")}</h3>
          <p>${escapeHtml(audit.summary || "No summary yet.")}</p>
          <div class="audit-meta">
            <span class="pill ${readiness.ready ? "low" : "medium"}">${readiness.score}/100 ready</span>
            <span class="pill">${escapeHtml(audit.niche || "No niche")}</span>
            <span class="pill">${escapeHtml(audit.location || "No location")}</span>
            <span class="pill">Score ${calculateScore(audit)}/100</span>
            <span class="pill high">${highIssues} high issues</span>
            <span class="pill">${escapeHtml(audit.status)}</span>
          </div>
          <div class="score-reasons">
            ${readiness.items.slice(0, 4).map((item) => `<span>${item.done ? "OK" : "Missing"}: ${escapeHtml(item.label)}</span>`).join("")}
          </div>
        </div>
        <div class="card-actions">
          <button class="secondary-button" data-edit="${audit.id}">Edit</button>
          <button class="secondary-button" data-preview="${audit.id}">Preview</button>
        </div>
      </article>`;
    })
    .join("");
}

function renderProspectSearchLinks() {
  const niche = elements.prospectNiche.value.trim() || "roofers";
  const locationValue = elements.prospectLocation.value.trim() || "Charlotte NC";
  const query = encodeURIComponent(`${niche} in ${locationValue}`);
  elements.searchLinks.innerHTML = `
    <a href="https://www.google.com/maps/search/${query}" target="_blank" rel="noreferrer">Google Maps search</a>
    <a href="https://www.google.com/search?q=${query}" target="_blank" rel="noreferrer">Google search</a>
    <a href="https://www.yelp.com/search?find_desc=${encodeURIComponent(niche)}&find_loc=${encodeURIComponent(locationValue)}" target="_blank" rel="noreferrer">Yelp search</a>`;
}

function renderProspectList() {
  const query = elements.prospectSearch.value.trim().toLowerCase();
  const status = elements.prospectStatusFilter.value;
  const prospects = state.prospects.filter((prospect) => {
    const haystack = Object.values(prospect).join(" ").toLowerCase();
    return (!query || haystack.includes(query)) && (!status || prospect.status === status);
  }).sort((a, b) => calculateProspectScore(b).score - calculateProspectScore(a).score);
  elements.prospectList.innerHTML = prospects.length
    ? prospects.map(prospectTemplate).join("")
    : `<div class="empty-state">No prospects match this filter. Import a CSV or adjust the search.</div>`;
}

function prospectTemplate(prospect) {
  const priority = calculateProspectScore(prospect);
  const rating =
    prospect.rating || prospect.reviews
      ? `${prospect.rating || ""}${prospect.reviews ? ` (${prospect.reviews} reviews)` : ""}`
      : "Unknown";
  return `<article class="prospect-card">
    <div>
      <div class="prospect-title">
        <h3>${escapeHtml(prospect.businessName || "Unnamed business")}</h3>
        <span class="pill priority">${priority.score}/100 priority</span>
        <span class="pill">${escapeHtml(prospect.status || "New")}</span>
      </div>
      <div class="prospect-details">
        <span><strong>Niche:</strong> ${escapeHtml(prospect.niche || "Unknown")}</span>
        <span><strong>Location:</strong> ${escapeHtml(prospect.location || "Unknown")}</span>
        <span><strong>Website:</strong> ${escapeHtml(prospect.website || "Missing")}</span>
        <span><strong>Phone:</strong> ${escapeHtml(prospect.phone || "Missing")}</span>
        <span><strong>Rating:</strong> ${escapeHtml(rating)}</span>
        <span><strong>Source:</strong> ${escapeHtml(prospect.source || "Imported")}</span>
      </div>
      <p>${escapeHtml(prospect.notes || "No notes yet.")}</p>
      <div class="score-reasons">
        ${priority.reasons.map((reason) => `<span>${escapeHtml(reason)}</span>`).join("")}
      </div>
    </div>
    <div class="prospect-actions">
      <button class="secondary-button" data-prospect-status="${prospect.id}" data-status="Qualified">Qualify</button>
      <button class="secondary-button" data-prospect-audit="${prospect.id}">Create audit</button>
      <button class="danger-button" data-prospect-status="${prospect.id}" data-status="Skipped">Skip</button>
    </div>
  </article>`;
}

function calculateProspectScore(prospect) {
  const niche = String(prospect.niche || "").toLowerCase();
  const notes = String(prospect.notes || "").toLowerCase();
  const website = String(prospect.website || "").trim();
  const phone = String(prospect.phone || "").trim();
  const reviews = Number(String(prospect.reviews || "").replace(/[^0-9.]/g, ""));
  const rating = Number(String(prospect.rating || "").replace(/[^0-9.]/g, ""));
  const highValueNiches = [
    "roof", "hvac", "plumb", "electric", "tree", "remodel", "med spa", "dent",
    "law", "attorney", "landscap", "detail", "floor", "window", "solar",
  ];
  const reasons = [];
  let score = 0;

  if (highValueNiches.some((value) => niche.includes(value))) {
    score += 25;
    reasons.push("high-value niche");
  }
  if (!website) {
    score += 20;
    reasons.push("missing website");
  } else {
    score += 8;
    reasons.push("website to audit");
  }
  if (phone) {
    score += 12;
    reasons.push("phone-led business");
  }
  if (Number.isFinite(reviews) && reviews > 0 && reviews < 75) {
    score += 14;
    reasons.push("review count leaves room");
  } else if (reviews >= 75) {
    score += 7;
    reasons.push("enough proof to convert");
  }
  if (rating >= 4.2) {
    score += 10;
    reasons.push("credible rating");
  }
  if (/(no booking|booking|form|missed|quote|lead|contact|website missing|after-hours)/.test(notes)) {
    score += 15;
    reasons.push("visible lead-flow issue");
  }
  if (prospect.status === "Qualified") {
    score += 8;
    reasons.push("manually qualified");
  }
  if (prospect.status === "Audited" || prospect.status === "Skipped") {
    score -= 35;
    reasons.push(prospect.status.toLowerCase());
  }

  return {
    score: Math.max(0, Math.min(100, score)),
    reasons: reasons.length ? reasons.slice(0, 4) : ["needs review"],
  };
}

function renderEditor(audit) {
  if (!audit) return;
  const template = templateForNiche(audit.niche);
  setValue("auditId", audit.id);
  setValue("businessName", audit.businessName);
  setValue("website", audit.website);
  setValue("niche", audit.niche);
  setValue("location", audit.location);
  setValue("contactName", audit.contactName);
  setValue("status", audit.status);
  setValue("summary", audit.summary);
  elements.scoreInputs.innerHTML = scoreConfig
    .map((item) => `<label class="score-row"><span>${item.label} (${item.weight})</span><input type="number" min="0" max="${item.weight}" value="${Number(audit.scores?.[item.key] || 0)}" data-score="${item.key}" /></label>`)
    .join("");
  elements.findingsEditor.innerHTML = `${template.summary ? `<div class="template-note">Template applied for ${escapeHtml(audit.niche || "this niche")}. Replace generic evidence with details from the business website before sending.</div>` : ""}${audit.findings.map(findingEditorTemplate).join("")}`;
  elements.competitorsEditor.innerHTML = audit.competitors.map(competitorEditorTemplate).join("");
}

function findingEditorTemplate(finding, index) {
  return `<div class="finding-editor" data-finding-index="${index}">
    <label>Category<input value="${escapeHtml(finding.category)}" data-finding-field="category" /></label>
    <label>Severity<select data-finding-field="severity">${["high", "medium", "low"].map((severity) => `<option ${finding.severity === severity ? "selected" : ""}>${severity}</option>`).join("")}</select></label>
    <label>Impact<input value="${escapeHtml(finding.impact)}" data-finding-field="impact" /></label>
    <button class="danger-button" type="button" data-remove-finding="${index}">Remove</button>
    <label>Evidence<textarea rows="3" data-finding-field="evidence">${escapeHtml(finding.evidence)}</textarea></label>
    <label>Why it matters<textarea rows="3" data-finding-field="whyItMatters">${escapeHtml(finding.whyItMatters)}</textarea></label>
    <label>Recommended fix<textarea rows="3" data-finding-field="fix">${escapeHtml(finding.fix)}</textarea></label>
  </div>`;
}

function competitorEditorTemplate(competitor, index) {
  return `<div class="competitor-editor" data-competitor-index="${index}">
    <label>Competitor<input value="${escapeHtml(competitor.name)}" data-competitor-field="name" /></label>
    <label>Gap<input value="${escapeHtml(competitor.gap)}" data-competitor-field="gap" /></label>
    <button class="danger-button" type="button" data-remove-competitor="${index}">Remove</button>
  </div>`;
}

function renderReport(audit) {
  if (!audit) return;
  const findings = audit.findings.filter((finding) => [finding.category, finding.evidence, finding.whyItMatters, finding.fix, finding.impact].some(Boolean));
  const competitors = audit.competitors.filter((competitor) => [competitor.name, competitor.gap].some(Boolean));
  const topFix = findings.find((finding) => finding.fix)?.fix || "Install a focused lead recovery system.";
  const readiness = calculateAuditReadiness(audit);
  elements.reportPreview.innerHTML = `<div class="report-hero">
    <div>
      <p class="eyebrow">Private audit for ${escapeHtml(audit.businessName)}</p>
      <h2>${escapeHtml(audit.niche || "Local service")} lead leak review</h2>
      <p>${escapeHtml(audit.summary)}</p>
      <div class="audit-meta"><span class="pill">${escapeHtml(audit.location || "Location not set")}</span><span class="pill">${escapeHtml(audit.website || "Website not set")}</span><span class="pill">${escapeHtml(audit.status)}</span></div>
      <div class="readiness-panel">
        <strong>${readiness.ready ? "Ready to send" : "Not ready yet"}: ${readiness.score}/100</strong>
        <div class="score-reasons">
          ${readiness.items.map((item) => `<span>${item.done ? "OK" : "Missing"}: ${escapeHtml(item.label)}</span>`).join("")}
        </div>
      </div>
    </div>
    <div class="score-dial" aria-label="Conversion score ${calculateScore(audit)} out of 100"><div><strong>${calculateScore(audit)}</strong><span>/100</span></div></div>
  </div>
  <section class="report-section"><h3>What is likely costing you leads</h3><div class="finding-list">${findings.length ? findings.map(findingReportTemplate).join("") : `<div class="empty-state">Add evidence-backed findings before sending this report.</div>`}</div></section>
  <section class="report-section"><h3>Competitor gap</h3><div class="report-grid">${competitors.length ? competitors.map((competitor) => `<div class="finding-card"><strong>${escapeHtml(competitor.name || "Competitor")}</strong><p>${escapeHtml(competitor.gap || "Gap not described yet.")}</p></div>`).join("") : `<div class="empty-state">Add at least one competitor gap before sending this report.</div>`}</div></section>
  <section class="report-section recommendation"><h3>Recommended first fix</h3><p>${escapeHtml(topFix)}</p><p>I can install the first version as a 14-day trial. Keep it only if it captures a qualified lead or saves measurable admin time.</p><p><strong>Private report link:</strong> ${escapeHtml(reportLink(audit))}</p></section>`;
}

function findingReportTemplate(finding) {
  return `<div class="finding-card"><div class="finding-head"><h3>${escapeHtml(finding.category)}</h3><span class="pill ${escapeHtml(finding.severity)}">${escapeHtml(finding.severity)}</span></div><p><strong>Evidence:</strong> ${escapeHtml(finding.evidence)}</p><p><strong>Why it matters:</strong> ${escapeHtml(finding.whyItMatters)}</p><p><strong>Fix:</strong> ${escapeHtml(finding.fix)}</p><p><strong>Likely impact:</strong> ${escapeHtml(finding.impact)}</p></div>`;
}

function calculateAuditReadiness(audit) {
  const completeFindings = audit.findings.filter((finding) =>
    [finding.category, finding.evidence, finding.whyItMatters, finding.fix, finding.impact].every((value) => String(value || "").trim().length > 0),
  );
  const hasHighIssue = completeFindings.some((finding) => finding.severity === "high");
  const hasCompetitorGap = audit.competitors.some((competitor) => competitor.name?.trim() && competitor.gap?.trim());
  const hasSpecificFix = completeFindings.some((finding) => /\b(add|install|create|send|track|book|form|text|sms|call|quote|follow)/i.test(finding.fix || ""));
  const items = [
    { label: "business name", done: Boolean(audit.businessName?.trim()), weight: 10 },
    { label: "niche and location", done: Boolean(audit.niche?.trim() && audit.location?.trim()), weight: 10 },
    { label: "executive summary", done: String(audit.summary || "").trim().length >= 80, weight: 15 },
    { label: "evidence-backed finding", done: completeFindings.length >= 1, weight: 20 },
    { label: "high-severity issue", done: hasHighIssue, weight: 10 },
    { label: "specific first fix", done: hasSpecificFix, weight: 15 },
    { label: "competitor gap", done: hasCompetitorGap, weight: 10 },
    { label: "outreach message", done: Boolean(audit.businessName?.trim() && (completeFindings.length || audit.summary?.trim())), weight: 10 },
  ];
  const score = items.reduce((sum, item) => sum + (item.done ? item.weight : 0), 0);
  return { score, ready: score >= 80, items };
}

function renderOutreach(audit) {
  if (!audit) return;
  const firstIssue = audit.findings.find((finding) => finding.evidence || finding.whyItMatters);
  elements.outreachCopy.value = `Subject: Quick lead-flow audit for ${audit.businessName}

Hi ${audit.contactName || "there"},

I reviewed ${audit.businessName}'s website and made a short private audit showing where the current lead flow may be losing quote requests.

The biggest issue I saw: ${firstIssue?.evidence || "the site creates avoidable friction before a visitor can become a lead"}

Why it matters: ${firstIssue?.whyItMatters || "local service buyers usually compare multiple companies and go with the one that responds fastest."}

I mocked up the fix here:
${reportLink(audit)}

If useful, I can install the first version as a 14-day trial. You would only keep it if it captures a qualified opportunity or saves measurable admin time.

Best,
`;
}

function collectFormAudit() {
  const scores = {};
  document.querySelectorAll("[data-score]").forEach((input) => {
    const config = scoreConfig.find((item) => item.key === input.dataset.score);
    scores[input.dataset.score] = Math.max(0, Math.min(config.weight, Number(input.value || 0)));
  });
  return {
    id: getValue("auditId") || `audit-${Date.now()}`,
    businessName: getValue("businessName"),
    website: getValue("website"),
    niche: getValue("niche"),
    location: getValue("location"),
    contactName: getValue("contactName"),
    status: getValue("status"),
    summary: getValue("summary"),
    scores,
    findings: [...document.querySelectorAll("[data-finding-index]")].map(collectFinding),
    competitors: [...document.querySelectorAll("[data-competitor-index]")].map(collectCompetitor),
    updatedAt: new Date().toISOString(),
  };
}

function collectFinding(node) {
  const finding = {};
  node.querySelectorAll("[data-finding-field]").forEach((input) => {
    finding[input.dataset.findingField] = input.value.trim();
  });
  return finding;
}

function collectCompetitor(node) {
  const competitor = {};
  node.querySelectorAll("[data-competitor-field]").forEach((input) => {
    competitor[input.dataset.competitorField] = input.value.trim();
  });
  return competitor;
}

function saveAudit() {
  const audit = collectFormAudit();
  if (!audit.businessName.trim()) return alert("Business name is required.");
  const index = state.audits.findIndex((item) => item.id === audit.id);
  if (index >= 0) state.audits[index] = audit;
  else state.audits.unshift(audit);
  state.selectedId = audit.id;
  persist();
  setView("report");
}

function buildAuditDraft(overrides = {}) {
  const template = templateForNiche(overrides.niche);
  return {
    id: `audit-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    businessName: overrides.businessName || "",
    website: overrides.website || "",
    niche: overrides.niche || "",
    location: overrides.location || "",
    contactName: overrides.contactName || "",
    status: "Drafted",
    summary: overrides.summary || template.summary || "",
    scores: template.scores || Object.fromEntries(scoreConfig.map((item) => [item.key, 0])),
    findings: structuredClone(template.findings || [
      { category: "Lead capture", severity: "high", evidence: "", whyItMatters: "", fix: "", impact: "" },
      { category: "Follow-up", severity: "high", evidence: "", whyItMatters: "", fix: "", impact: "" },
    ]),
    competitors: [{ name: "", gap: "" }],
    updatedAt: new Date().toISOString(),
  };
}

function templateForNiche(niche = "") {
  const value = niche.toLowerCase();
  return nicheTemplates.find((template) => template.match.some((keyword) => value.includes(keyword))) || {};
}

function createNewAudit() {
  const audit = buildAuditDraft();
  state.audits.unshift(audit);
  state.selectedId = audit.id;
  persist();
  setView("editor");
}

function createAuditFromProspect(id) {
  const prospect = state.prospects.find((item) => item.id === id);
  if (!prospect) return;
  const audit = buildAuditDraft({
    businessName: prospect.businessName,
    website: prospect.website,
    niche: prospect.niche,
    location: prospect.location,
    contactName: "Owner",
  });
  state.audits.unshift(audit);
  prospect.status = "Audited";
  state.selectedId = audit.id;
  persist();
  setView("editor");
}

function importCsvProspects() {
  const rows = parseCsv(elements.csvInput.value.trim());
  if (!rows.length) return alert("Paste CSV rows before importing.");
  const [headerRow, ...dataRows] = rows;
  const headers = headerRow.map((header) => String(header || "").toLowerCase().replace(/[^a-z0-9_]+/g, ""));
  const imported = dataRows.map((row) => prospectFromCsvRow(headers, row)).filter((prospect) => prospect.businessName);
  const added = mergeProspects(imported);
  elements.csvInput.value = "";
  elements.storageStatus.textContent = `Imported ${added} prospects`;
}

async function searchPlacesProspects() {
  const niche = elements.prospectNiche.value.trim();
  const locationValue = elements.prospectLocation.value.trim();
  if (!niche || !locationValue) {
    elements.apiSearchStatus.textContent = "Enter both niche and location first.";
    return;
  }
  elements.apiSearchStatus.textContent = "Searching...";
  try {
    const response = await fetch(`/api/places-search?${new URLSearchParams({ niche, location: locationValue })}`);
    const payload = await response.json();
    if (!response.ok) {
      elements.apiSearchStatus.textContent = payload.error || "Search failed.";
      return;
    }
    const added = mergeProspects(payload.prospects || []);
    elements.apiSearchStatus.textContent = `Added ${added} new prospects.`;
  } catch {
    elements.apiSearchStatus.textContent = "Local search endpoint is not available.";
  }
}

async function analyzeCurrentWebsite() {
  const audit = collectFormAudit();
  if (!audit.website) {
    elements.analyzeStatus.textContent = "Add a website URL first.";
    return;
  }

  elements.analyzeStatus.textContent = "Analyzing website...";

  try {
    const response = await fetch(`/api/analyze-site?${new URLSearchParams({ url: audit.website })}`);
    const payload = await response.json();

    if (!response.ok) {
      elements.analyzeStatus.textContent = payload.error || "Analysis failed.";
      return;
    }

    audit.scores = payload.scores || audit.scores;
    audit.findings = payload.findings?.length ? payload.findings : audit.findings;
    audit.summary = analysisSummary(audit, payload.signals);
    audit.updatedAt = new Date().toISOString();

    const index = state.audits.findIndex((item) => item.id === audit.id);
    if (index >= 0) state.audits[index] = audit;
    else state.audits.unshift(audit);
    state.selectedId = audit.id;
    persist();
    render();
    setView("editor");
    elements.analyzeStatus.textContent = `Analyzed ${new URL(payload.signals.finalUrl).hostname}`;
  } catch {
    elements.analyzeStatus.textContent = "Analyzer endpoint is not available.";
  }
}

function analysisSummary(audit, signals) {
  const found = [];
  const missing = [];
  if (signals.phoneFound) found.push("phone number");
  else missing.push("phone number");
  if (signals.formFound) found.push("contact form");
  else missing.push("contact form");
  if (signals.bookingFound) found.push("booking path");
  else missing.push("booking path");
  if (signals.reviewFound) found.push("trust proof");
  else missing.push("trust proof");

  return `${audit.businessName || "This business"} was analyzed from its homepage. Detected: ${found.join(", ") || "limited lead-capture signals"}. Missing or weak: ${missing.join(", ") || "no major basics from the homepage scan"}. The recommended first fix should focus on the highest-friction gap found in the lead path.`;
}

function mergeProspects(imported) {
  const existing = new Set(state.prospects.map(prospectKey));
  const unique = imported.filter((prospect) => {
    const key = prospectKey(prospect);
    if (existing.has(key)) return false;
    existing.add(key);
    return true;
  });
  state.prospects = [...unique, ...state.prospects];
  persist();
  render();
  return unique.length;
}

function prospectFromCsvRow(headers, row) {
  const record = Object.fromEntries(headers.map((header, index) => [header, row[index]?.trim() || ""]));
  return {
    id: `prospect-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    businessName:
      record.business || record.businessname || record.company || record.companyname || record.name || "",
    website: record.website || record.url || record.site || "",
    phone: record.phone || record.telephone || record.number || "",
    niche: record.niche || record.category || record.industry || record.type || "",
    location: record.location || record.city || record.address || "",
    rating: record.rating || record.stars || "",
    reviews: record.reviews || record.reviewcount || record.review_count || "",
    notes: record.notes || record.note || "",
    status: "New",
    source: "CSV",
    createdAt: new Date().toISOString(),
  };
}

function parseCsv(input) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const next = input[index + 1];
    if (char === '"' && quoted && next === '"') {
      field += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(field);
      field = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(field);
      if (row.some((value) => value.trim())) rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }
  row.push(field);
  if (row.some((value) => value.trim())) rows.push(row);
  return rows;
}

function prospectKey(prospect) {
  return [prospect.businessName, prospect.website, prospect.phone]
    .map((value) => String(value || "").toLowerCase().trim())
    .join("|");
}

function reportLink(audit) {
  return `${location.origin}${location.pathname}#audit/${slugify(audit.businessName || audit.id)}`;
}

function setValue(id, value = "") {
  $(`#${id}`).value = value || "";
}

function getValue(id) {
  return $(`#${id}`).value.trim();
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    elements.storageStatus.textContent = "Copied";
    setTimeout(() => {
      elements.storageStatus.textContent = "Saved locally";
    }, 1400);
  });
}

function exportData() {
  const payload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    audits: state.audits,
    prospects: state.prospects,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `lead-leak-backup-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
  elements.storageStatus.textContent = "Exported backup";
}

function importData(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    try {
      const payload = JSON.parse(reader.result);
      if (!Array.isArray(payload.audits) || !Array.isArray(payload.prospects)) {
        throw new Error("Invalid backup shape");
      }
      state.audits = payload.audits;
      state.prospects = payload.prospects;
      state.selectedId = state.audits[0]?.id || defaultAudit.id;
      persist();
      render();
      elements.storageStatus.textContent = "Imported backup";
    } catch {
      alert("That file does not look like a Lead Leak backup.");
    }
  });
  reader.readAsText(file);
}

document.querySelectorAll("[data-view-button]").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.viewButton));
});
$("#newAuditButton").addEventListener("click", createNewAudit);
$("#createAuditNavButton").addEventListener("click", createNewAudit);
$("#saveAuditButton").addEventListener("click", saveAudit);
$("#importCsvButton").addEventListener("click", importCsvProspects);
$("#apiSearchButton").addEventListener("click", searchPlacesProspects);
$("#analyzeWebsiteButton").addEventListener("click", analyzeCurrentWebsite);
elements.prospectNiche.addEventListener("input", renderProspectSearchLinks);
elements.prospectLocation.addEventListener("input", renderProspectSearchLinks);
elements.prospectSearch.addEventListener("input", renderProspectList);
elements.prospectStatusFilter.addEventListener("change", renderProspectList);
elements.auditForm.addEventListener("input", () => {
  elements.storageStatus.textContent = "Unsaved changes";
});
$("#addFindingButton").addEventListener("click", () => {
  const audit = collectFormAudit();
  audit.findings.push({ category: "Lead capture", severity: "medium", evidence: "", whyItMatters: "", fix: "", impact: "" });
  renderEditor(audit);
});
$("#addCompetitorButton").addEventListener("click", () => {
  const audit = collectFormAudit();
  audit.competitors.push({ name: "", gap: "" });
  renderEditor(audit);
});
$("#resetDemoButton").addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(PROSPECT_STORAGE_KEY);
  state.audits = [structuredClone(defaultAudit)];
  state.prospects = structuredClone(defaultProspects);
  state.selectedId = defaultAudit.id;
  persist();
  render();
});
$("#copyReportLinkButton").addEventListener("click", () => copyText(reportLink(activeAudit())));
$("#copyOutreachButton").addEventListener("click", () => copyText(elements.outreachCopy.value));
$("#exportDataButton").addEventListener("click", exportData);
$("#importDataInput").addEventListener("change", (event) => importData(event.target.files[0]));

document.addEventListener("click", (event) => {
  const data = event.target.dataset || {};
  if (data.edit) {
    state.selectedId = data.edit;
    setView("editor");
  }
  if (data.preview) {
    state.selectedId = data.preview;
    setView("report");
  }
  if (data.removeFinding) {
    const audit = collectFormAudit();
    audit.findings.splice(Number(data.removeFinding), 1);
    renderEditor(audit);
  }
  if (data.removeCompetitor) {
    const audit = collectFormAudit();
    audit.competitors.splice(Number(data.removeCompetitor), 1);
    renderEditor(audit);
  }
  if (data.prospectAudit) createAuditFromProspect(data.prospectAudit);
  if (data.prospectStatus) {
    const prospect = state.prospects.find((item) => item.id === data.prospectStatus);
    if (prospect) {
      prospect.status = data.status || prospect.status;
      persist();
      renderProspectList();
    }
  }
});

render();
