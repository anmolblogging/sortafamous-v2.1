"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { Magnetic } from "./motion";
import { EASE } from "./motion";

const services = [
  {
    t: "Public Relations (PR)",
    course: "Public relations",
    img: "/images/services/public-relations.webp",
    items: ["Media relations", "Press releases", "Online PR", "Thought leadership"],
    feel: "So the right people say your name in the right rooms.",
    body:
      "Strategy and storytelling that puts your brand in the rooms, and the publications, that move the needle.",
  },
  {
    t: "Social Media Marketing",
    course: "Paid & organic",
    img: "/images/services/social-media-marketing.webp",
    items: ["Strategy", "Content", "Community", "Paid social"],
    feel: "So the scroll stops, and the following becomes a community.",
    body:
      "A clear plan, stories that make sense and constant optimisation, social that connects with customers and grows your business.",
  },
  {
    t: "Brand Management",
    course: "Brand",
    img: "/images/services/brand-management.webp",
    items: ["Positioning", "Identity", "Digital brand", "Reputation"],
    feel: "So people feel something the moment they meet you.",
    body:
      "Building, keeping and growing strong brands, rooted in clarity, consistency and long term business value.",
  },
  {
    t: "Performance Marketing",
    course: "Performance",
    img: "/images/services/performance-marketing.webp",
    items: ["Paid search", "Paid social", "Optimisation", "Reporting"],
    feel: "Reach the right audience, increase conversions, and maximize every ad spend.",
    body:
      "Data-driven campaigns built to generate qualified leads, grow sales and maximise returns on every advertising dollar.",
  },
  {
    t: "Personal Branding",
    course: "Personal brand",
    img: "/images/services/personal-branding.webp",
    items: ["Positioning", "LinkedIn", "Thought leadership", "Reputation"],
    feel: "Build trust, attract opportunities, and stand out as an industry leader.",
    body:
      "Strategic personal branding focused on building credibility, growing influence and creating meaningful opportunities across digital platforms.",
  },
];

export function Services() {
  const [open, setOpen] = useState(-1);
  const [hover, setHover] = useState(-1);
  const listRef = useRef<HTMLDivElement>(null);

  // Cursor-following preview (desktop). Track pointer within the list, spring to it.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 220, damping: 26, mass: 0.6 });
  const py = useSpring(my, { stiffness: 220, damping: 26, mass: 0.6 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = listRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  }

  // Suppress the floating cursor-preview while a service is expanded, so the
  // opened detail view isn't covered by the hover image.
  const active = hover >= 0 && open === -1 ? services[hover] : null;

  return (
    <section
      id="services"
      className="relative z-[60] -mt-8 rounded-t-[2.5rem] bg-cream py-16 md:py-24 px-6 md:px-12 lg:px-16 xl:px-28 overflow-hidden"
    >
      {/* faint glow in the top-right, appears while a service is hovered */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -top-16 right-0 h-96 w-96 rounded-full bg-brand/10 blur-3xl transition-opacity duration-700 ${active ? "opacity-50" : "opacity-0"}`}
      />

      <div className="relative mx-auto max-w-[1480px]">
        <div className="flex items-end justify-between mb-6">
          <Reveal>
            <div className="eyebrow mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> What we offer
            </div>
            <h2 className="serif text-4xl md:text-6xl">
              Our <span className="serif-italic">services</span>
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="serif-italic text-sm text-ink-soft">/ 5 / ©</div>
          </Reveal>
        </div>
        <Reveal>
          <p className="max-w-2xl text-ink-soft text-lg mb-8">
            Full funnel marketing, brand and PR built to make your brand impossible
            to ignore. From startups to founders, we build visibility, trust and
            influence that lasts.
            <span className="hidden lg:inline"> Hover any service to explore it.</span>
          </p>
        </Reveal>

        {/* Interactive list + cursor-following preview */}
        <div
          ref={listRef}
          onMouseMove={onMove}
          className="relative mt-2"
        >
          {/* floating preview, desktop only */}
          <AnimatePresence>
            {active && (
              <motion.div
                key={active.t}
                className="pointer-events-none absolute z-20 hidden lg:block"
                style={{ left: px, top: py }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <div
                  className="relative -translate-x-1/2 -translate-y-1/2"
                  style={{ transform: "translate(-50%, -50%) rotate(-5deg)" }}
                >
                  <div className="h-64 w-[22rem] overflow-hidden rounded-2xl border-4 border-brand shadow-2xl">
                    <img
                      src={active.img}
                      alt={active.t}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-cream">
                      <span className="serif-italic text-lg">{active.course}</span>
                      <span className="eyebrow text-cream/80">View →</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {services.map((s, i) => {
            const isOpen = open === i;
            const isHot = hover === i;
            return (
              <Reveal key={s.t} delay={i * 60}>
                <div
                  className={`relative border-t border-ink/15 transition-colors duration-500 ${isHot ? "bg-brand/[0.05]" : "bg-transparent"}`}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover((h) => (h === i ? -1 : h))}
                >
                  {/* The panel image only mounts once the row is opened, so on
                      touch (no hover to warm it) the fetch starts on tap and the
                      frame sits empty. This decoy loads the same URL as the row
                      nears the viewport, so the real one is a cache hit. */}
                  <img
                    src={s.img}
                    alt={`${s.t} at Sorta Famous`}
                    aria-hidden
                    loading="lazy"
                    decoding="async"
                    className="pointer-events-none absolute h-px w-px opacity-0"
                  />

                  {/* accent rail that grows on hover / open */}
                  <motion.span
                    aria-hidden
                    className="absolute left-0 top-0 bottom-0 w-[3px] origin-top bg-brand"
                    initial={false}
                    animate={{ scaleY: isHot || isOpen ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  />

                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="w-full py-7 md:py-8 pl-4 md:pl-6 pr-1 flex items-center gap-5 text-left group"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`serif-italic text-sm w-8 shrink-0 transition-colors duration-300 ${isHot || isOpen ? "text-brand" : ""}`}
                    >
                      0{i + 1}
                    </span>
                    <span className="hidden sm:block eyebrow shrink-0 w-28 opacity-70">
                      {s.course}
                    </span>
                    <h3
                      className={`serif text-3xl md:text-5xl flex-1 transition-colors duration-300 ${isHot && !isOpen ? "text-brand" : ""}`}
                    >
                      {s.t}
                    </h3>
                    <motion.div
                      className="hidden lg:flex flex-nowrap gap-2 justify-end"
                      initial={false}
                      animate={{ opacity: isOpen ? 0 : 1 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      style={{ pointerEvents: isOpen ? "none" : undefined }}
                      aria-hidden={isOpen}
                    >
                      {s.items.map((it) => (
                        <span key={it} className="pill whitespace-nowrap">
                          {it}
                        </span>
                      ))}
                    </motion.div>
                    <span
                      className={`relative h-11 w-11 shrink-0 rounded-full border grid place-items-center transition-colors duration-300 ${
                        isHot || isOpen
                          ? "border-brand bg-brand text-cream"
                          : "border-ink/25 bg-transparent"
                      }`}
                    >
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
                        className="overflow-hidden"
                      >
                        <div className="grid md:grid-cols-[1.4fr_1fr] gap-8 pb-10 pl-4 md:pl-[4rem] pr-4">
                          <div className="flex flex-col justify-between gap-6">
                            <div>
                              <p className="serif-italic text-2xl md:text-3xl leading-snug text-brand">
                                {s.feel}
                              </p>
                              <p className="mt-4 text-ink-soft text-lg md:text-xl leading-relaxed max-w-xl">
                                {s.body}
                              </p>
                            </div>

                            <div>
                              <div className="flex flex-wrap gap-2 mb-6">
                                {s.items.map((it, j) => (
                                  <motion.span
                                    key={it}
                                    className="pill"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 + j * 0.06, ease: EASE }}
                                  >
                                    {it}
                                  </motion.span>
                                ))}
                              </div>

                              <div className="flex items-end justify-end gap-6 flex-wrap">
                                <Magnetic>
                                  <a
                                    href="/services"
                                    className="inline-flex items-center gap-2 rounded-pill border border-ink/20 px-5 py-2.5 text-sm transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-cream"
                                  >
                                    Start a project <span aria-hidden>↗</span>
                                  </a>
                                </Magnetic>
                              </div>
                            </div>
                          </div>

                          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-muted border-2 border-brand/15">
                            <img
                              src={s.img}
                              alt={s.t}
                              loading="lazy"
                              className="h-full w-full object-cover"
                            />
                            <span className="absolute top-3 left-3 rounded-pill bg-brand px-3 py-1 text-xs text-cream backdrop-blur-sm">
                              {s.course}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
          <div className="border-t border-ink/15" />
        </div>

        {/* capabilities strip — all deliverables, always drifting */}
        <Reveal delay={120}>
          <div className="relative mt-12 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="flex shrink-0 items-center gap-3 pr-3 animate-marquee">
              {services
                .flatMap((s) => s.items)
                .concat(services.flatMap((s) => s.items))
                .map((it, k) => (
                  <span
                    key={k}
                    className="inline-flex items-center gap-2 whitespace-nowrap rounded-pill border border-ink/15 px-4 py-2 text-sm text-ink-soft"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {it}
                  </span>
                ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
