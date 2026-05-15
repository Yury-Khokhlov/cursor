"use client";

import {
  useCallback,
  useId,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";
import { CVCard } from "@/components/CVCard";
import { SectionVoiceOver, sectionAudioSrc } from "@/components/SectionVoiceOver";
import { TLDR } from "@/components/TLDR";

/** Must match `panels` order and ids for hash / TOC navigation. */
const ACCORDION_SECTION_IDS = ["tldr", "love", "fork", "join", "cv"] as const;

type Panel = {
  id: string;
  title: string;
  body: ReactNode;
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={`mt-0.5 shrink-0 text-muted transition-transform duration-300 ${
        open ? "rotate-180" : "rotate-0"
      }`}
      aria-hidden
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AccordionArgument() {
  const baseId = useId();

  /** TLDR (index 0) open on first visit; hash can override. */
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  }, []);

  useLayoutEffect(() => {
    function syncOpenPanelFromHash() {
      const raw = window.location.hash.replace(/^#/, "");
      if (!raw) {
        setOpenIndex(0);
        return;
      }
      const idx = ACCORDION_SECTION_IDS.findIndex((id) => id === raw);
      setOpenIndex(idx >= 0 ? idx : 0);
    }

    syncOpenPanelFromHash();
    window.addEventListener("hashchange", syncOpenPanelFromHash);
    return () =>
      window.removeEventListener("hashchange", syncOpenPanelFromHash);
  }, []);

  const panels: Panel[] = [
    {
      id: "tldr",
      title: "TLDR",
      body: (
        <div className="pb-2 pr-1 pt-1">
          <TLDR />
        </div>
      ),
    },
    {
      id: "love",
      title: "Why I believe in Cursor",
      body: (
        <div className="space-y-5 pb-2 text-[15px] leading-relaxed text-foreground/85">
          <p>
            Cursor first unlocked something very specific for me: it let someone
            without a CS background work alongside engineers in the trenches on real
            product development and improvement. That felt surreal and instantly made
            me a super-powered IC.
          </p>
          <p>
            But I quickly realized the bigger unlock was not coding itself. Because my
            background is more business-oriented, I started using Cursor as a new
            operating layer for my day-to-day work as a management consultant:
            navigating across our scattered data sources and creating adaptive knowledge
            bases, running analyses, structuring ideas, and communicating with clients
            in more visual and effective ways.
          </p>
          <p>
            I have also seen the adoption curve up close across my clients and my own
            company. At McKinsey, thousands of colleagues adopted Cursor within a few
            months and immediately started innovating on their new operating system. I
            was also lucky to start teaching new colleagues how to use Cursor in their
            own workflows, and the same pattern keeps showing up: the demand outside
            engineering is real, but the experience still assumes a technical user.
          </p>
          <p>
            That is why I think Cursor is more important than a coding tool. It changes
            the relationship between a person and their work. And that relationship
            can extend across almost every white-collar job.
          </p>
        </div>
      ),
    },
    {
      id: "fork",
      title: "Why I think Cursor should fork the user experience",
      body: (
        <div className="space-y-5 pb-2 text-[15px] leading-relaxed text-foreground/85">
          <p>
            Cursor&apos;s focus on developers is not a limitation. It is one of the
            reasons the product is so strong.
          </p>
          <p>
            But I believe Cursor should eventually fork the experience for a much
            larger audience: non-technical professionals who work with complex
            information every day, but do not live in repositories, branches,
            terminals, PRs, or file trees.
          </p>
          <p>
            The market is already moving in this direction. AI coding tools are
            becoming agentic work systems, not just autocomplete. Cursor is part of
            that shift: it now runs agents across desktop, web, mobile, Slack, and
            Microsoft Teams. The direction is clear: coding is becoming more
            accessible, and agents are becoming more central to work itself.
          </p>
          <p>
            But accessibility is not only about letting more people write code. It is
            also about removing the need to think like an engineer before the product
            becomes useful.
          </p>
          <p>
            The current experience is still cognitively engineered around software
            development. I use it and love it, but I also feel the friction clearly. For
            a consultant, analyst, operator, lawyer, or executive, the VS Code-shaped
            interface asks them to translate their work into engineering concepts before
            they can fully benefit from the product.
          </p>
          <p>
            Even the approval loops feel engineering-native. Constant code approvals
            make sense when the output is software and the risk is production code. But
            for many non-engineering workflows, that same pattern can feel less relevant
            or cognitively noisy. A consultant or analyst needs traceability and
            control, but not necessarily through the mental model of approving code
            changes.
          </p>
          <p>That is the opportunity: remove the translation layer.</p>
          <p>
            Cursor&apos;s underlying power is already relevant far beyond engineering.
            But for non-technical users, the experience still has to feel native to their
            work, not adapted from someone else&apos;s. It should map to projects,
            analyses, decisions, workflows, and deliverables, not only to repositories,
            branches, terminals, PRs, and commits.
          </p>
          <p>
            The broader enterprise market is moving toward task-specific agents,
            human-agent teams, and workflow orchestration. The winning product will not
            just be the best place to write code. It may become the best place to turn
            intent, context, and judgment into finished work.
          </p>
          <p>
            The next fork should not be &ldquo;Cursor for people who cannot
            code.&rdquo; It should be Cursor for people whose work is not code, but is
            still complex, contextual, and high-leverage.
          </p>
          <p>
            Non-technical users do not need a simpler Cursor. They need a
            Cursor-shaped environment for their own work.
          </p>
        </div>
      ),
    },
    {
      id: "join",
      title: "Why I want to join you",
      body: (
        <div className="space-y-5 pb-2 text-[15px] leading-relaxed text-foreground/85">
          <p>
            I want to join Cursor because I believe the company is building one of the
            defining work products of the next decade.
          </p>
          <p>
            I am excited by the developer product. I am even more excited by the
            frontier after it: bringing the same seriousness, speed, taste, and agency
            to people who do not think of themselves as technical, but whose work is
            full of complexity.
          </p>
          <p>
            What I bring is a broad combination of skills and experience that can be
            beneficial to Cursor&apos;s team:
          </p>
          <ul className="list-disc space-y-2 pl-5 marker:text-muted">
            <li>
              I use Cursor daily in both technical and non-technical workflows
            </li>
            <li>
              I have helped scale agentic AI products inside large organizations
            </li>
            <li>
              I understand how non-engineering teams actually work, buy, adopt, and
              change behavior
            </li>
            <li>
              I can translate messy user needs into product, growth, and enterprise
              opportunities
            </li>
            <li>
              I can operate across product, strategy, GTM, partnerships, user research,
              and special projects
            </li>
          </ul>
          <p>
            I do not want to join Cursor because it is popular.{" "}
            <strong className="font-semibold text-foreground">
              I want to join because I believe Cursor is becoming one of the places
              where the future of work will be defined, and I want to help shape that
              future.
            </strong>
          </p>
        </div>
      ),
    },
    {
      id: "cv",
      title: "My CV",
      body: (
        <div className="pb-2 pr-1 pt-1">
          <CVCard plain />
        </div>
      ),
    },
  ];

  return (
    <div className="mt-6 pt-2">
      <div className="divide-y divide-border border-b border-border">
        {panels.map((panel, index) => {
          const open = openIndex === index;
          const headerId = `${baseId}-header-${index}`;
          const panelId = `${baseId}-panel-${index}`;

          return (
            <div key={panel.id} id={panel.id} className="scroll-mt-28">
              <h3 className="m-0">
                <div className="flex w-full items-center gap-3 rounded-sm py-5 transition-colors hover:bg-white/[0.04]">
                  <button
                    type="button"
                    id={headerId}
                    className="min-w-0 flex-1 text-left text-[19px] font-medium text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/35"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                  >
                    {panel.title}
                  </button>
                  {panel.id !== "cv" ? (
                    <SectionVoiceOver
                      sectionId={panel.id}
                      label={panel.title}
                      src={sectionAudioSrc(panel.id)}
                      className="shrink-0"
                    />
                  ) : null}
                  <button
                    type="button"
                    className="shrink-0 rounded-sm p-0.5 text-muted transition-colors hover:bg-white/[0.06] hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/35"
                    aria-controls={panelId}
                    aria-label={open ? `Collapse: ${panel.title}` : `Expand: ${panel.title}`}
                    onClick={() => toggle(index)}
                  >
                    <Chevron open={open} />
                  </button>
                </div>
              </h3>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                  open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="min-h-0 overflow-hidden">
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={headerId}
                    aria-hidden={!open}
                    className="border-t border-border/80 pr-1 pt-2"
                  >
                    {panel.body}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-10 max-w-prose text-[15px] leading-relaxed text-foreground/88">
        Thank you for reading. I would value the chance to speak with the Cursor team.
      </p>
    </div>
  );
}
