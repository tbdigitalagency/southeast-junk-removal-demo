(function () {
  const config = window.siteConfig;
  const root = document.documentElement;

  Object.entries(config.colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });

  document.title = `${config.businessName} | Free Junk Removal Quotes`;
  document
    .querySelector('meta[name="description"]')
    .setAttribute("content", `${config.tagline} Serving ${config.city} and nearby areas.`);

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: config.businessName,
    description: config.tagline,
    telephone: config.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: config.city,
      addressRegion: config.addressRegion
    },
    areaServed: config.serviceAreas,
    makesOffer: config.services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description
      }
    }))
  };

  document.querySelector("[data-local-business-schema]").textContent = JSON.stringify(schema);

  document.querySelectorAll("[data-business-name]").forEach((node) => {
    node.textContent = config.businessName;
  });
  document.querySelectorAll("[data-city]").forEach((node) => {
    node.textContent = config.city;
  });
  document.querySelectorAll("[data-phone-link]").forEach((node) => {
    node.setAttribute("href", `tel:${config.phoneHref}`);
  });
  document.querySelectorAll("[data-phone-text]").forEach((node) => {
    node.textContent = config.phone;
  });
  document.querySelector("[data-year]").textContent = new Date().getFullYear();

  const services = document.querySelector("[data-services]");
  services.innerHTML = config.services
    .map(
      (service) => `
        <article class="service-card">
          <span class="card-icon" aria-hidden="true">${service.title.charAt(0)}</span>
          <h3>${service.title}</h3>
          <p>${service.description}</p>
        </article>
      `
    )
    .join("");

  const steps = document.querySelector("[data-steps]");
  steps.innerHTML = config.steps
    .map(
      (step, index) => `
        <article class="step-card">
          <span class="step-number">${index + 1}</span>
          <span class="step-icon" aria-hidden="true">${step.icon}</span>
          <h3>${step.title}</h3>
          <p>${step.description}</p>
        </article>
      `
    )
    .join("");

  const serviceAreas = document.querySelector("[data-service-areas]");
  serviceAreas.innerHTML = config.serviceAreas.map((area) => `<span>${area}</span>`).join("");

  const trustBadges = document.querySelector("[data-trust-badges]");
  if (trustBadges) {
    trustBadges.innerHTML = config.trustBadges.map((badge) => `<span>${badge}</span>`).join("");
  }

  const proofStats = document.querySelector("[data-proof-stats]");
  if (proofStats) {
    proofStats.innerHTML = config.proofStats
      .map(
        (stat) => `
          <article>
            <strong>${stat.value}</strong>
            <span>${stat.label}</span>
          </article>
        `
      )
      .join("");
  }

  const localProof = document.querySelector("[data-local-proof]");
  localProof.innerHTML = config.localProof
    .map(
      (proof) => `
        <article class="local-proof-card">
          <span class="proof-check" aria-hidden="true">✓</span>
          <h3>${proof.title}</h3>
          <p>${proof.description}</p>
        </article>
      `
    )
    .join("");

  const testimonials = document.querySelector("[data-testimonials]");
  testimonials.innerHTML = config.testimonials
    .map(
      (testimonial) => `
        <figure class="testimonial-card">
          <blockquote>${testimonial.quote}</blockquote>
          <figcaption>
            <strong>${testimonial.name}</strong>
            <span>${testimonial.detail}</span>
          </figcaption>
        </figure>
      `
    )
    .join("");

  const disposalNotes = document.querySelector("[data-disposal-notes]");
  disposalNotes.innerHTML = config.disposalNotes.map((note) => `<li>${note}</li>`).join("");

  const faqs = document.querySelector("[data-faqs]");
  faqs.innerHTML = config.faqs
    .map(
      (faq) => `
        <details>
          <summary>${faq.question}</summary>
          <p>${faq.answer}</p>
        </details>
      `
    )
    .join("");

  const form = document.querySelector("[data-quote-form]");
  const status = document.querySelector("[data-form-status]");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = data.get("name");
    status.textContent = `Thanks, ${name}. This demo form is ready to connect to a CRM, email service, or form endpoint. For now, call ${config.phone} to finish the quote.`;
    form.reset();
  });
})();
