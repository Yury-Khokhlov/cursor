import type { ReactNode } from "react";

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mt-10 border-t border-border pt-8 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
      {children}
    </p>
  );
}

export function CVCard({ plain = false }: { plain?: boolean }) {
  const shell = plain
    ? "pb-1 pt-0 max-h-[min(70vh,36rem)] overflow-y-auto overscroll-contain pr-2 [-webkit-overflow-scrolling:touch]"
    : "max-h-[min(70vh,36rem)] overflow-y-auto overscroll-contain rounded-md border border-border bg-panel p-8 shadow-[var(--shadow-elevated)]";

  return (
    <aside className={shell}>
      <header>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Yury Khokhlov
        </h2>
        <p className="mt-2 text-[14px] text-muted">
          <a
            className="underline-offset-4 hover:text-foreground hover:underline"
            href="mailto:yury.a.khokhlov@gmail.com"
          >
            yury.a.khokhlov@gmail.com
          </a>
          <span aria-hidden className="mx-2 text-border">
            |
          </span>
          <a
            className="underline-offset-4 hover:text-foreground hover:underline"
            href="tel:+14159418096"
          >
            +1-415-941-80-96
          </a>
        </p>
      </header>

      <SectionLabel>Work experience</SectionLabel>

      <div className="mt-4 space-y-6 text-[14px] leading-relaxed text-foreground/88">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="font-semibold text-foreground">McKinsey &amp; Company</h3>
              <p className="mt-1 text-[13px] leading-snug text-muted">
                Principal Product Manager II / Senior Engagement Manager
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="font-mono text-[12px] leading-snug text-muted">
                2019 — Present
              </p>
              <p className="mt-0.5 text-[13px] leading-snug text-muted">Bay Area, CA</p>
            </div>
          </div>
          <ul className="mt-3 list-disc space-y-3 pl-5 marker:text-muted">
            <li>
              <span className="font-medium text-foreground/95">
                Lead flagship agentic AI platform deployment at McKinsey.
              </span>{" "}
              Define product strategy, roadmap, and enterprise rollout for
              McKinsey&apos;s flagship agentic AI platform, transforming workflows
              across ~40,000 users leveraging Gemini Enterprise and Vertex AI. Lead a
              14-person cross-functional team across engineering, data science, and
              design to discover, build, pilot, and scale new agentic products across
              horizontal and vertical use cases.
            </li>
            <li>
              <span className="font-medium text-foreground/95">
                Built and launched a new agentic product for a healthcare software
                company.
              </span>{" "}
              Led development and deployment of an AI agent platform on GCP for
              inpatient transfers, automating data intake from calls and driving a 25%
              productivity uplift for transfer agents while improving patient data
              quality. Delivered a production-grade agentic product and defined the
              commercial model for market launch, including product packaging, pricing
              architecture, discounting logic, and monetization guardrails.
            </li>
            <li>
              <span className="font-medium text-foreground/95">
                Led McKinsey — Google Cloud Alliance focused on agentic product
                incubation.
              </span>{" "}
              Led a joint product and client development initiative with Google Cloud,
              leveraging Vertex AI capabilities to define new agentic use cases across
              enterprise workflows. Drove customer discovery with Google Cloud account
              teams, identifying ~50 agentic opportunities for priority clients with
              $80M+ in projected value from productivity gains and AI-enabled
              decision-making.
            </li>
            <li>
              <span className="font-medium text-foreground/95">
                Led pricing and packaging redesign for an ERP vendor.
              </span>{" "}
              Defined product strategy and commercial packaging for a $1B+ ERP player
              across its Manufacturing, Distribution, and Building Supply portfolio
              with $65–125M projected steady-state ARR uplift. Rolled out new packaging
              architecture including a Core ERP offering with agentic AI capabilities
              and buying-center-aligned bundles. Developed a new hybrid pricing model
              combining subscription-based core and consumption-based AI products.
            </li>
            <li>
              <span className="font-medium text-foreground/95">
                Drove portfolio pricing, packaging, and AI roadmap changes for an EHR
                vendor.
              </span>{" "}
              Owned portfolio-level pricing, packaging and AI product strategy for an
              $800M+ EHR vendor, focusing on new agentic AI products and replacing
              white-labeled third-party solutions. Introduced three new market-aligned
              packages with a clear upsell path across EHR, Practice Management, and
              Patient Engagement. Established new tiered price levels and enablement
              materials, including margin-based pricing and discounting calculators.
            </li>
          </ul>
        </div>

        <div>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="font-semibold text-foreground">Bain &amp; Company</h3>
              <p className="mt-1 text-[13px] leading-snug text-muted">
                Associate Consultant
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="font-mono text-[12px] leading-snug text-muted">
                2017 — 2019
              </p>
              <p className="mt-0.5 text-[13px] leading-snug text-muted">
                Moscow, Russia
              </p>
            </div>
          </div>
          <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-muted">
            <li>
              Led workstreams on multiple projects in the airline sector, including
              route network design and fleet strategy for a new regional airline launch,
              and optimization of flight operations for a leading Russian air carrier.
            </li>
          </ul>
        </div>

        <div>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="font-semibold text-foreground">New Law Centre LLC</h3>
              <p className="mt-1 text-[13px] leading-snug text-muted">
                Senior Lawyer (family business)
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="font-mono text-[12px] leading-snug text-muted">
                2014 — 2017
              </p>
              <p className="mt-0.5 text-[13px] leading-snug text-muted">
                Moscow, Russia
              </p>
            </div>
          </div>
          <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-muted">
            <li>
              Began career as a corporate litigation lawyer and later built a new
              corporate bankruptcy practice within the business, leading a 5-lawyer
              team, acquiring 30+ clients, and generating ~$1M in revenue growth.
            </li>
          </ul>
        </div>
      </div>

      <SectionLabel>Education</SectionLabel>
      <ul className="mt-3 list-none space-y-3 text-[14px] leading-relaxed text-foreground/88">
        <li>
          <span className="font-semibold text-foreground">INSEAD</span>{" "}
          <span className="font-mono text-[12px] text-muted">2021 — 2022</span>
          <br />
          Master of Business Administration (with exchange at Wharton School, UPenn) —
          Singapore / France / US. Won the Wharton Innovation Competition (100+
          participants) with a new social networking app concept and subsequently solo
          developed and launched the app on the App Store and Google Play within 3
          months.
        </li>
        <li>
          <span className="font-semibold text-foreground">
            Kutafin Moscow State Law University
          </span>{" "}
          <span className="font-mono text-[12px] text-muted">2012 — 2016</span>
          <br />
          Bachelor of Civil Law · Moscow, Russia
        </li>
        <li>
          <span className="font-semibold text-foreground">
            National University of Science and Technology
          </span>{" "}
          <span className="font-mono text-[12px] text-muted">2009 — 2014</span>
          <br />
          Specialist (BS/MS) of Economics and Industrial Management · Moscow, Russia
        </li>
      </ul>

      <SectionLabel>Additional information</SectionLabel>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-[14px] leading-relaxed text-foreground/88 marker:text-muted">
        <li>
          Interests: Competitive sports (Muay Thai Vice-Champion of Russia, 2016),
          international travel (50+ countries).
        </li>
        <li>
          Work authorization: Fully authorized to work in the US (Green Card); no visa
          sponsorship required.
        </li>
      </ul>

      <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:flex-wrap sm:items-center">
        <a
          className="inline-flex w-fit items-center rounded-sm border border-border bg-background px-4 py-2 text-[14px] font-medium text-foreground transition-colors hover:border-white/20 hover:bg-white/[0.06]"
          href="/Yury-CV.pdf"
          download
        >
          Download CV (PDF)
        </a>
        <a
          className="rounded-sm text-[14px] text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
          href="https://www.linkedin.com/in/yurykhokhlov/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          className="rounded-sm text-[14px] text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
          href="mailto:yury.a.khokhlov@gmail.com"
        >
          Email
        </a>
      </div>
    </aside>
  );
}
