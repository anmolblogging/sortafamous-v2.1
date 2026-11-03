"use client";

import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * Standard section header used across the site:
 * a small eyebrow label with a green accent dot, and a large serif heading
 * stacked directly beneath it. Pass `marker` for the optional right-side note
 * (e.g. "/ 4 / ©") and `dark` on ink-background sections.
 */
export function SectionHeader({
  eyebrow,
  title,
  marker,
  dark = false,
  className = "",
  as: Heading = "h2",
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  marker?: ReactNode;
  dark?: boolean;
  className?: string;
  /** Use "h1" when the section is the page's main heading. */
  as?: "h1" | "h2";
}) {
  return (
    <div className={`flex items-end justify-between gap-6 ${className}`}>
      <Reveal>
        <div className={`eyebrow mb-3 flex items-center gap-2 ${dark ? "text-cream/50" : ""}`}>
          <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {eyebrow}
        </div>
        <Heading className={`serif text-4xl md:text-6xl ${dark ? "text-cream" : ""}`}>{title}</Heading>
      </Reveal>
      {marker && (
        <Reveal delay={80}>
          <div className={`serif-italic text-sm shrink-0 ${dark ? "text-cream/40" : "text-ink-soft"}`}>
            {marker}
          </div>
        </Reveal>
      )}
    </div>
  );
}
