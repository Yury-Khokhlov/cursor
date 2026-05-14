"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "tldr", label: "TLDR" },
  { id: "love", label: "Why I believe in Cursor" },
  {
    id: "fork",
    label: "Why I think Cursor should fork the user experience",
  },
  { id: "join", label: "Why I want to join you" },
  { id: "cv", label: "My CV" },
] as const;

export function StickyTOC() {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const elements = SECTIONS.map((s) =>
      document.getElementById(s.id),
    ).filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (top?.target.id) setActiveId(top.target.id);
      },
      {
        root: null,
        rootMargin: "-42% 0px -42% 0px",
        threshold: [0, 0.05, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="What is inside" className="hidden lg:block">
      <div className="sticky top-24">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
          What is inside
        </p>
        <div className="toc-scroll mt-4 max-h-[calc(100vh-7rem)] overflow-y-auto overscroll-y-contain pr-1">
          <ul className="space-y-1 pb-2">
            {SECTIONS.map((s) => {
              const active = activeId === s.id;
              return (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`block border-l-2 py-1.5 pl-3 text-[12px] leading-snug transition-colors ${
                      active
                        ? "border-foreground font-medium text-foreground"
                        : "border-transparent text-muted hover:border-border hover:text-foreground"
                    }`}
                  >
                    {s.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
