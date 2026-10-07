"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { EASE } from "./motion";
import { CAREERS_EMAIL, applyHref, jobs, type Job, type JobSection } from "@/lib/careers";

/** Top-line facts for each classified, picked from the role's meta. */
function adLine(job: Job) {
  return job.meta
    .filter((m) => m.label === "Location" || m.label === "Experience")
    .map((m) => m.value)
    .join(" · ");
}

/**
 * Careers hero, set as a newspaper "Situations Vacant" page. A PR agency's
 * world is print and placements, so the openings are run as classified ads.
 */
export function CareersHero() {
  const count = String(jobs.length).padStart(2, "0");

  return (
    <section className="relative z-10 bg-cream pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-12 lg:px-16 xl:px-28">
      <div className="mx-auto max-w-[1480px]">
        {/* Masthead */}
        <Reveal>
          <div className="border-t-[3px] border-ink pt-1">
            <div className="border-t border-ink" />
          </div>
          <div className="flex items-center justify-between gap-4 py-3 text-[0.7rem] uppercase tracking-[0.18em] text-ink-soft">
            <span>Mumbai edition</span>
            <span className="hidden sm:inline">The careers page</span>
            <span>{count} positions open</span>
          </div>
          <div className="border-t border-ink" />
        </Reveal>

        <Reveal delay={60}>
          <h1 className="serif py-6 text-center text-[clamp(3rem,11vw,10rem)] leading-[0.9] tracking-[-0.04em] md:py-8">
            Situations <span className="serif-italic">Vacant</span>
          </h1>
        </Reveal>

        <Reveal delay={100}>
          <div className="border-t border-ink" />
          <div className="border-t-[3px] border-ink mt-1" />
        </Reveal>

        <div className="mt-10 grid gap-12 md:mt-14 lg:grid-cols-12 lg:gap-0">
          {/* Lead story */}
          <div className="lg:col-span-7 lg:border-r lg:border-ink/20 lg:pr-12">
            <Reveal delay={140}>
              <div className="text-[0.7rem] uppercase tracking-[0.18em] text-brand">
                From the hiring desk
              </div>
              <h2 className="serif mt-3 text-[clamp(2.2rem,4.6vw,4rem)] leading-[1.02] tracking-[-0.02em]">
                Wanted: people who make brands famous,{" "}
                <span className="serif-italic text-brand">for the right reasons.</span>
              </h2>
              <p className="mt-4 serif-italic text-lg text-ink-soft">
                By the Sorta Famous team · Filed in Mumbai
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-8 gap-10 border-t border-ink/20 pt-8 text-ink-soft leading-relaxed md:columns-2">
                <p className="first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-ink">
                  Sorta Famous helps brands be seen, heard, and remembered for the right reasons.
                  In a crowded media environment, we work with clients to clarify their story,
                  reach the right audiences, and build reputations that last.
                </p>
                <p className="mt-4">
                  We value clear communication, thoughtful questioning, and consistent execution,
                  and we care about meaningful influence over noise or ego. If that sounds like how
                  you work, one of the notices on this page may have your name on it.
                </p>
                <p className="mt-4">
                  Applications go straight to our people team at{" "}
                  <a href={`mailto:${CAREERS_EMAIL}`} className="text-ink underline underline-offset-4 hover:text-brand break-all">
                    {CAREERS_EMAIL}
                  </a>
                  .
                </p>
              </div>
            </Reveal>
          </div>

          {/* Classifieds column */}
          <div className="relative lg:col-span-5 lg:pl-12">
            {/* rotating "now hiring" stamp */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-10 right-2 z-10 hidden h-28 w-28 -rotate-12 sm:block lg:-top-14 lg:-right-4"
            >
              <svg viewBox="0 0 100 100" className="h-full w-full animate-[spin_24s_linear_infinite] text-brand">
                <defs>
                  <path id="stamp-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
                </defs>
                <circle cx="50" cy="50" r="48" fill="var(--cream)" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="50" cy="50" r="27" fill="none" stroke="currentColor" strokeWidth="1" />
                <text fill="currentColor" fontSize="9.5" letterSpacing="2.6" fontFamily="var(--font-sans)">
                  <textPath href="#stamp-circle">NOW HIRING · NOW HIRING · NOW HIRING ·</textPath>
                </text>
              </svg>
              <span className="serif absolute inset-0 grid place-items-center text-3xl text-brand">
                {count}
              </span>
            </div>

            <Reveal delay={160}>
              <div className="text-[0.7rem] uppercase tracking-[0.18em] text-ink-soft">
                Classifieds
              </div>
            </Reveal>

            <div className="mt-4 flex flex-col gap-4">
              {jobs.map((job, i) => (
                <Reveal key={job.slug} delay={200 + i * 70}>
                  <a
                    href={`#${job.slug}`}
                    className="group block border border-ink p-5 transition-colors duration-300 hover:bg-brand hover:text-cream hover:border-brand"
                  >
                    <div className="flex items-baseline justify-between gap-4 border-b border-dashed border-current/40 pb-3">
                      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em]">
                        Wanted
                      </span>
                      <span className="text-[0.65rem] uppercase tracking-[0.18em] opacity-60">
                        No. {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="serif mt-3 text-2xl leading-tight md:text-[1.7rem]">
                      {job.title}
                    </h3>
                    <div className="mt-2 flex items-end justify-between gap-4">
                      <p className="text-sm opacity-70">{adLine(job)}</p>
                      <span className="serif-italic shrink-0 text-sm">
                        Apply within{" "}
                        <span
                          aria-hidden
                          className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ApplyButton({ job, className = "" }: { job: Job; className?: string }) {
  return (
    <a
      href={applyHref(job)}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-brand text-cream px-6 py-3.5 text-sm transition hover:opacity-90 ${className}`}
    >
      Apply now
      <span
        aria-hidden
        className="transition-transform duration-300 group-hover:translate-x-0.5"
      >
        →
      </span>
    </a>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-ink-soft leading-relaxed">
          <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Section({ section }: { section: JobSection }) {
  return (
    <div className="border-t border-border pt-8">
      <h4 className="serif text-3xl md:text-4xl">{section.title}</h4>

      {section.paras?.map((p) => (
        <p key={p} className="mt-4 max-w-3xl text-ink-soft leading-relaxed md:text-lg">
          {p}
        </p>
      ))}

      {section.items && <Bullets items={section.items} />}

      {section.after?.map((p) => (
        <p key={p} className="mt-4 max-w-3xl text-ink-soft leading-relaxed md:text-lg">
          {p}
        </p>
      ))}

      {section.groups && (
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {section.groups.map((g, i) => (
            <div key={g.title} className="rounded-3xl border border-border bg-card p-6 md:p-7">
              <div className="flex items-start justify-between gap-4">
                <h5 className="serif text-2xl leading-tight">{g.title}</h5>
                <span className="serif text-3xl leading-none text-brand/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <Bullets items={g.items} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function Openings() {
  const [open, setOpen] = useState<string | null>(null);

  // Opens a role from a link such as /careers#accountant, on load and when a
  // classified in the hero is clicked.
  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash.slice(1);
      if (jobs.some((j) => j.slug === hash)) setOpen(hash);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <section
      id="openings"
      className="relative z-20 bg-cream px-6 md:px-12 lg:px-16 xl:px-28 py-16 md:py-28 border-t border-border scroll-mt-24"
    >
      <div className="mx-auto max-w-[1480px]">
        <SectionHeader
          eyebrow="Open roles"
          title={<>Join the <span className="serif-italic">team</span></>}
          marker={`/ ${String(jobs.length).padStart(2, "0")} / ©`}
          className="mb-10 md:mb-14"
        />

        <div>
          {jobs.map((job, i) => {
            const isOpen = open === job.slug;
            return (
              <Reveal key={job.slug} delay={i * 50}>
                <article id={job.slug} className="border-t border-ink/15 scroll-mt-24">
                  <button
                    onClick={() => setOpen(isOpen ? null : job.slug)}
                    className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 py-7 text-left md:gap-8 md:py-9"
                    aria-expanded={isOpen}
                  >
                    <span className="serif text-3xl leading-none text-brand/30 md:text-5xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="eyebrow mb-2 text-brand">{job.team}</div>
                      <h3
                        className={`serif text-2xl md:text-4xl transition-colors duration-300 ${
                          isOpen ? "" : "group-hover:text-ink-soft"
                        }`}
                      >
                        {job.title}
                      </h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {job.meta.slice(0, 3).map((m) => (
                          <span
                            key={m.label}
                            className="rounded-full border border-border px-3 py-1 text-xs text-ink-soft"
                          >
                            {m.value}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink/25 transition-colors duration-300 group-hover:bg-brand group-hover:text-cream">
                      <span className="absolute h-px w-4 bg-current" />
                      <motion.span
                        className="absolute h-4 w-px bg-current"
                        animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1 }}
                        transition={{ duration: 0.3, ease: EASE }}
                      />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        // clip rather than hidden, so the role card can stay sticky
                        className="overflow-clip"
                      >
                        <div className="grid gap-10 pb-12 md:pb-16 lg:grid-cols-[320px_1fr] lg:gap-16">
                          {/* Sticky role card with the apply action */}
                          <aside className="lg:sticky lg:top-28 lg:self-start">
                            <div className="relative overflow-hidden rounded-[2rem] bg-ink-gradient p-7 text-cream">
                              <div
                                aria-hidden
                                className="pointer-events-none absolute -top-16 -right-12 h-56 w-56 rounded-full bg-accent/35 opacity-40 blur-3xl"
                              />
                              <dl className="relative space-y-4">
                                {job.meta.map((m) => (
                                  <div key={m.label}>
                                    <dt className="eyebrow text-cream/50">{m.label}</dt>
                                    <dd className="serif mt-1 text-xl">{m.value}</dd>
                                  </div>
                                ))}
                              </dl>
                              <a
                                href={applyHref(job)}
                                className="group relative mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-cream px-6 py-3.5 text-sm text-ink transition-transform duration-300 hover:-translate-y-0.5"
                              >
                                Apply now
                                <span
                                  aria-hidden
                                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                                >
                                  →
                                </span>
                              </a>
                              <p className="relative mt-4 text-center text-xs text-cream/60 break-all">
                                or email {CAREERS_EMAIL}
                              </p>
                            </div>
                          </aside>

                          <div className="flex flex-col gap-10">
                            <p className="serif-italic text-xl text-brand md:text-2xl">
                              {job.summary}
                            </p>
                            {job.sections.map((s) => (
                              <Section key={s.title} section={s} />
                            ))}
                            <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border bg-muted/40 px-7 py-6">
                              <p className="text-ink-soft max-w-xl">
                                Sound like you? Send us your CV and a few lines on why this
                                role.
                              </p>
                              <ApplyButton job={job} />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              </Reveal>
            );
          })}
          <div className="border-t border-ink/15" />
        </div>

        {/* Open application, the site's ink-panel motif */}
        <Reveal>
          <div className="relative mt-16 overflow-hidden rounded-[2rem] bg-ink-gradient p-8 text-cream md:mt-24 md:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-16 h-80 w-80 rounded-full bg-accent/35 opacity-40 blur-3xl"
            />
            <div className="relative grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end">
              <div>
                <div className="eyebrow mb-4 flex items-center gap-2 text-cream/50">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Open application
                </div>
                <h2 className="serif text-4xl md:text-6xl leading-[1.05]">
                  Don’t see your <span className="serif-italic">role?</span>
                </h2>
                <p className="mt-6 max-w-xl text-cream/70 leading-relaxed">
                  We’re always glad to hear from sharp, curious people. Send your CV and tell us
                  what you’d bring to Sorta Famous.
                </p>
              </div>
              <div className="flex lg:justify-end">
                <a
                  href={`mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent("Open application")}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3.5 text-sm text-ink transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Write to us
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
