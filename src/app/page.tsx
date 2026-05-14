import { AccordionArgument } from "@/components/AccordionArgument";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { StickyTOC } from "@/components/StickyTOC";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl py-12 pl-4 pr-5 sm:pl-6 sm:pr-9 lg:pl-5 lg:pr-14 xl:pl-6 xl:pr-18">
      <a
        href="#tldr"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:border focus:border-border focus:bg-panel focus:px-4 focus:py-2 focus:text-sm focus:text-foreground focus:shadow-[var(--shadow-elevated)]"
      >
        Skip to TLDR
      </a>
      <div className="lg:grid lg:grid-cols-[minmax(0,13.5rem)_minmax(0,1fr)] lg:gap-x-8 xl:gap-x-10">
        <StickyTOC />
        <main className="min-w-0">
          <Hero />
          <AccordionArgument />
          <Footer />
        </main>
      </div>
    </div>
  );
}
