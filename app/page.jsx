"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [auditResult, setAuditResult] = useState(
    "Enter a URL to see the kind of fixes RankPilot will prioritize."
  );
  const [contactResult, setContactResult] = useState(
    "Share a few details and our team will get back to you."
  );

  useEffect(() => {
    const setHeaderState = () => {
      setIsScrolled(window.scrollY > 12);
    };

    const counters = document.querySelectorAll("[data-count]");
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const counter = entry.target;
          const target = Number(counter.dataset.count);
          const duration = 1100;
          const startedAt = performance.now();

          const update = (now) => {
            const progress = Math.min((now - startedAt) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.round(target * eased);

            if (progress < 1) {
              requestAnimationFrame(update);
            }
          };

          requestAnimationFrame(update);
          observer.unobserve(counter);
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));
    setHeaderState();
    window.addEventListener("scroll", setHeaderState, { passive: true });

    return () => {
      window.removeEventListener("scroll", setHeaderState);
      counterObserver.disconnect();
    };
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const handleAuditSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const website = formData.get("website").toString().trim();

    setAuditResult(
      `Preview queued for ${website}. Example output: 12 technical fixes, 3 keyword gaps, and 4 AI visibility opportunities to review.`
    );
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name").toString().trim();

    setContactResult(
      `Thanks, ${name}. We received your details and will reply at the email address provided.`
    );
    event.currentTarget.reset();
  };

  return (
    <>
      <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`} data-header>
        <a className="brand" href="#home" aria-label="RankPilot AI home" onClick={closeMenu}>
          <span className="brand-mark">R</span>
          <span>RankPilot AI</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span></span>
          <span></span>
        </button>

        <nav className={`nav ${isMenuOpen ? "is-open" : ""}`} data-nav>
          <a href="#features" onClick={closeMenu}>
            Outcomes
          </a>
          <a href="#use-cases" onClick={closeMenu}>
            Who it helps
          </a>
          <a href="#pricing" onClick={closeMenu}>
            Pricing
          </a>
          <a href="#contact" onClick={closeMenu}>
            Demo
          </a>
        </nav>

        <div className="header-actions">
          <a href="#pricing">See pricing</a>
          <a className="button ghost small" href="#contact">
            Request a demo
          </a>
          <a className="button primary small" href="#home">
            Run free audit
          </a>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">AI SEO audits for freelancers, agencies, and local teams</p>
            <h1>
              Find the SEO fixes and AI search gaps costing your business leads.
            </h1>
            <p className="hero-copy">
              Run a free website audit in seconds. Get technical fixes, keyword
              gaps, content priorities, and AI visibility signals before you
              commit to a plan.
            </p>

            <form className="audit-form" onSubmit={handleAuditSubmit}>
              <label htmlFor="website">Start with your free audit</label>
              <div>
                <input
                  id="website"
                  name="website"
                  type="url"
                  placeholder="https://yourwebsite.com"
                  required
                />
                <button className="button primary" type="submit">
                  Run free audit
                </button>
              </div>
              <p>{auditResult}</p>
            </form>

            <div className="assurance-list" aria-label="Free audit assurances">
              <span>No credit card</span>
              <span>Works with any public website</span>
              <span>Google and AI search checks</span>
            </div>
          </div>

          <div className="hero-product" aria-label="RankPilot dashboard preview">
            <div className="product-topbar">
              <span></span>
              <span></span>
              <span></span>
              <strong>Free audit preview</strong>
            </div>
            <div className="score-panel">
              <p>SEO Health</p>
              <strong>
                <span data-count="87">0</span>%
              </strong>
              <small>12 fixes ranked by impact</small>
            </div>
            <div className="insight-list">
              <article>
                <span className="status high"></span>
                <div>
                  <strong>12 technical fixes</strong>
                  <p>Missing titles, weak snippets, slow pages, and crawl gaps.</p>
                </div>
              </article>
              <article>
                <span className="status mid"></span>
                <div>
                  <strong>4 AI visibility gaps</strong>
                  <p>Competitors appear in answers where your brand is absent.</p>
                </div>
              </article>
              <article>
                <span className="status low"></span>
                <div>
                  <strong>3 keyword opportunities</strong>
                  <p>Commercial phrases with local intent and realistic difficulty.</p>
                </div>
              </article>
            </div>
            <div className="keyword-card">
              <span>Recommended first action</span>
              <strong>Rewrite service page title and add FAQ schema</strong>
              <p>Estimated impact: higher click-throughs and better AI answer readiness.</p>
            </div>
            <div className="illustration-loop" aria-hidden="true">
              <span className="road"></span>
              <span className="screen"></span>
              <span className="pin one"></span>
              <span className="pin two"></span>
              <span className="pin three"></span>
            </div>
          </div>
        </section>

        <section className="section trust-strip" aria-label="Product outcomes">
          <article>
            <strong>
              <span data-count="60">0</span>
            </strong>
            <span>seconds to first audit preview</span>
          </article>
          <article>
            <strong>
              <span data-count="42">0</span>
            </strong>
            <span>checks across technical and content SEO</span>
          </article>
          <article>
            <strong>
              <span data-count="7">0</span>
            </strong>
            <span>AI visibility signals tracked</span>
          </article>
        </section>

        <section className="logo-band" aria-label="Built for growth teams">
          <h2>Built for the people who need SEO wins without SEO busywork.</h2>
          <div>
            <span>Freelancers</span>
            <span>Small agencies</span>
            <span>Local businesses</span>
            <span>Content teams</span>
          </div>
        </section>

        <section className="section split" id="features">
          <div>
            <p className="eyebrow">One platform, one weekly growth list</p>
            <h2>Know what to fix first, what to write next, and where AI search is ignoring you.</h2>
          </div>
          <p>
            RankPilot AI turns scattered SEO checks into a ranked action plan
            that a founder, freelancer, or account manager can actually ship.
          </p>
        </section>

        <section className="feature-grid" aria-label="AI SEO software features">
          <article className="feature-card featured">
            <span>Website SEO Audit</span>
            <h3>Find the fixes most likely to move rankings and clicks.</h3>
            <p>
              Scan metadata, headings, links, speed, mobile readiness, duplicate
              content, image alt text, crawl gaps, and internal linking.
            </p>
          </article>
          <article className="feature-card">
            <span>AI Keyword Research</span>
            <h3>Spot keyword gaps your competitors are already using.</h3>
            <p>
              Find high-intent, long-tail, local, and competitor-gap phrases with
              intent, difficulty, and suggested page types.
            </p>
          </article>
          <article className="feature-card">
            <span>Content Optimization</span>
            <h3>Rewrite pages so search engines and AI systems understand them.</h3>
            <p>
              Score content for readability, keyword usage, topic coverage,
              headings, FAQs, internal links, CTA strength, and AI answer
              readiness.
            </p>
          </article>
          <article className="feature-card dark">
            <span>AI Search Visibility</span>
            <h3>See whether AI search recommends you or your competitors.</h3>
            <p>
              Track brand mentions, competitor mentions, cited pages, answer
              accuracy, and the fixes needed to become easier to cite.
            </p>
          </article>
          <article className="feature-card">
            <span>Competitor Analysis</span>
            <h3>Turn competitor pages into practical next steps.</h3>
            <p>
              Compare top keywords, best pages, backlink strengths, content gaps,
              blog topics, and pages referenced by AI tools.
            </p>
          </article>
          <article className="feature-card">
            <span>Reports</span>
            <h3>Send client-ready reports without spreadsheet work.</h3>
            <p>
              Create branded PDF reports, monthly summaries, keyword movement
              reports, website health reports, and AI visibility reports.
            </p>
          </article>
        </section>

        <section className="section sample-audit" aria-label="Sample audit results">
          <div>
            <p className="eyebrow">What the free audit shows</p>
            <h2>A plain-English action list, not another wall of SEO data.</h2>
            <p>
              Every result is grouped by impact, effort, and the conversion path
              it supports, so you know what to fix before opening another tool.
            </p>
          </div>
          <div className="audit-output" aria-label="Example SEO audit output">
            <article>
              <span className="priority urgent">High impact</span>
              <h3>Homepage title misses the service keyword</h3>
              <p>Rewrite the title around "AI SEO audit tool" and keep it under 60 characters.</p>
            </article>
            <article>
              <span className="priority">Medium effort</span>
              <h3>AI answers cite two competitor guides</h3>
              <p>Add a comparison section and FAQ schema to make the page easier to reference.</p>
            </article>
            <article>
              <span className="priority quick">Quick win</span>
              <h3>Three service pages have weak meta descriptions</h3>
              <p>Replace generic snippets with outcome-led copy and a clear visitor action.</p>
            </article>
          </div>
        </section>

        <section className="section workflow">
          <p className="eyebrow">How it works</p>
          <h2>From website URL to prioritized SEO work.</h2>
          <div className="timeline">
            <article>
              <span>01</span>
              <h3>Audit</h3>
              <p>Scan your site for technical, content, local, and schema issues.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Prioritize</h3>
              <p>Rank each finding by impact, effort, and how close it sits to revenue.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Fix</h3>
              <p>Generate editable briefs, page updates, FAQs, titles, snippets, and schema.</p>
            </article>
            <article>
              <span>04</span>
              <h3>Report</h3>
              <p>Track progress and share client-ready reports without manual spreadsheet work.</p>
            </article>
          </div>
        </section>

        <section className="section use-cases" id="use-cases">
          <div className="section-heading">
            <p className="eyebrow">Built for practical growth</p>
            <h2>Useful whether you sell SEO or need more leads from your own site.</h2>
          </div>
          <div className="use-case-grid">
            <article>
              <h3>Local businesses</h3>
              <p>
                Find local search gaps, weak service pages, missing schema, and
                "near me" opportunities without hiring a full SEO team.
              </p>
            </article>
            <article>
              <h3>Small agencies</h3>
              <p>
                Automate audits, content briefs, competitor research, and
                white-label client reports across multiple websites.
              </p>
            </article>
            <article>
              <h3>Freelancers</h3>
              <p>
                Add SEO services to your packages without becoming a technical SEO
                expert or drowning in manual checks.
              </p>
            </article>
          </div>
        </section>

        <section className="section builder">
          <div>
            <p className="eyebrow">Content and schema builder</p>
            <h2>Make every page easier for search systems to understand.</h2>
            <p>
              Create SEO-guided content briefs, blog outlines, landing page copy,
              FAQ sections, product descriptions, local SEO pages, comparison
              pages, and structured data for FAQ, Article, LocalBusiness, Product,
              Review, Service, and Organization schema.
            </p>
          </div>
          <div className="code-card" aria-label="Schema preview">
            <pre>{`{
  "@type": "LocalBusiness",
  "serviceArea": "Johannesburg",
  "knowsAbout": ["SEO", "AI search", "content"]
}`}</pre>
          </div>
        </section>

        <section className="section pricing" id="pricing">
          <div className="section-heading">
            <p className="eyebrow">Pricing</p>
            <h2>Start with a free audit. Upgrade when you want the full weekly action plan.</h2>
          </div>
          <div className="pricing-grid">
            <article>
              <span>Free</span>
              <strong>$0</strong>
              <p>1 audit preview, 5 keyword ideas, 3 priority fixes, and a basic SEO score.</p>
              <a className="button ghost" href="#home">
                Run free audit
              </a>
            </article>
            <article className="popular">
              <span>Starter</span>
              <strong>$19/mo</strong>
              <p>Best for freelancers: 1 website, weekly audits, keyword research, and task lists.</p>
              <a className="button primary" href="#contact">
                Start Starter
              </a>
            </article>
            <article>
              <span>Pro</span>
              <strong>$49/mo</strong>
              <p>Best for small teams: 5 websites, competitor tracking, AI visibility, and reports.</p>
              <a className="button ghost" href="#contact">
                Go Pro
              </a>
            </article>
            <article>
              <span>Agency</span>
              <strong>Custom</strong>
              <p>Best for client work: white-label reports, multiple clients, team access, and exports.</p>
              <a className="button ghost" href="#contact">
                Talk to sales
              </a>
            </article>
          </div>
        </section>

        <section className="section objection-panel" aria-label="Common objections">
          <div>
            <p className="eyebrow">Questions before you try it</p>
            <h2>Built to reduce risk before asking for money.</h2>
          </div>
          <div className="objection-grid">
            <article>
              <h3>Do I need technical SEO knowledge?</h3>
              <p>No. RankPilot explains what to change, why it matters, and which page to update first.</p>
            </article>
            <article>
              <h3>Will this replace my SEO tool?</h3>
              <p>It can for basic audits. Agencies can also use it as a faster triage layer before deeper tools.</p>
            </article>
            <article>
              <h3>What happens after the free audit?</h3>
              <p>You get a preview of the most useful fixes. Paid plans unlock ongoing tracking and reporting.</p>
            </article>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="contact-copy">
            <p className="eyebrow">Contact us</p>
            <h2>Want help turning the audit into a growth plan?</h2>
            <p>
              Send your details and we will help you choose the right audit,
              reporting, or AI visibility workflow for your business.
            </p>
            <div className="contact-details" aria-label="Contact information">
              <a href="mailto:hello@rankpilot.ai">hello@rankpilot.ai</a>
              <span>Monday to Friday, 9:00-17:00</span>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleContactSubmit}>
            <div>
              <label htmlFor="contact-name">Name</label>
              <input id="contact-name" name="name" type="text" placeholder="Your name" required />
            </div>
            <div>
              <label htmlFor="contact-email">Email address</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="contact-company">Company</label>
              <input
                id="contact-company"
                name="company"
                type="text"
                placeholder="Company name"
              />
            </div>
            <div>
              <label htmlFor="contact-message">How can we help?</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Tell us what you want to improve."
                rows="5"
                required
              ></textarea>
            </div>
            <button className="button primary" type="submit">
              Send details
            </button>
            <p>{contactResult}</p>
          </form>
        </section>

        <section className="pre-footer-cta">
          <div>
            <h2>Know what to fix first</h2>
            <p>Run the free audit and get your first prioritized SEO action list.</p>
          </div>
          <div>
            <a className="button dark" href="#home">
              Run free audit
            </a>
            <a className="button ghost" href="#contact">
              Request a demo
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <a className="brand" href="#home" aria-label="RankPilot AI home">
            <span className="brand-mark">R</span>
            <span>RankPilot AI</span>
          </a>
        </div>
        <div className="footer-grid">
          <div>
            <h3>Resources</h3>
            <a href="#pricing">Pricing</a>
            <a href="#home">Free audit</a>
            <a href="#contact">Request a demo</a>
          </div>
          <div>
            <h3>Company</h3>
            <a href="#contact">About us</a>
            <a href="#contact">Contact</a>
            <a href="#contact">Privacy policy</a>
            <a href="#contact">Terms of service</a>
          </div>
        </div>
        <p className="copyright">Copyright 2026 RankPilot AI. All rights reserved.</p>
      </footer>
    </>
  );
}
