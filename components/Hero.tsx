"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Magnetic } from "./motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const rise = {
  hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE, delay: 0.1 + i * 0.11 },
  }),
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Desktop-only: statue rises more as you scroll. Mobile keeps the gentle drift.
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  // Gentle parallax on desktop only; on mobile the statue sits in normal flow
  // below the copy, so no vertical drift (it would leave a gap).
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", isDesktop ? "-32%" : "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-cream lg:sticky lg:top-0 lg:h-[100svh] lg:min-h-0"
    >
      <motion.div
        style={{ opacity }}
        className="relative lg:absolute lg:inset-0 px-6 md:px-12 lg:px-16 xl:px-28 pt-24 pb-8 lg:pt-24 lg:pb-16"
      >
        <div className="mx-auto max-w-[1480px] lg:h-full relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 lg:h-full lg:items-end">
            <div className="relative z-10 order-1 lg:order-none lg:pb-[7vh]">
              <motion.span
                custom={0}
                variants={rise}
                initial="hidden"
                animate="show"
                className="pill mb-5 lg:mb-8 inline-flex"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                360° Marketing &amp; PR · India
              </motion.span>
              <motion.h1
                custom={1}
                variants={rise}
                initial="hidden"
                animate="show"
                className="serif text-[clamp(2.5rem,6vw,5.75rem)] leading-[0.95] tracking-[-0.03em]"
              >
                Fame is earned.
                <br />
                We <span className="serif-italic">manage</span> the rest.
              </motion.h1>
              <motion.p
                custom={2}
                variants={rise}
                initial="hidden"
                animate="show"
                className="mt-6 max-w-md text-ink-soft leading-relaxed"
              >
                Insight-led 360° Marketing Agency across brand, social, content, and PR. Visibility that lasts longer than the news cycle—no clout chasing, just status with substance.
              </motion.p>
              <motion.div
                custom={3}
                variants={rise}
                initial="hidden"
                animate="show"
                className="mt-6 lg:mt-8 flex flex-wrap items-center gap-4"
              >
                <Magnetic strength={0.4}>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-brand text-cream px-6 py-3.5 text-sm hover:opacity-90 transition"
                  >
                    Let&apos;s get Sorta Famous
                  </a>
                </Magnetic>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 text-sm px-3 py-3.5 hover:translate-x-1 transition"
                >
                  See what we do <span aria-hidden>→</span>
                </a>
              </motion.div>
            </div>

            <motion.div
              style={{ y: imgY }}
              className="relative z-0 mt-2 h-[46vh] order-last lg:mt-0 lg:h-full"
            >
              {/* solid circle backdrop behind the bust, desktop only, image sits on top */}
              <div
                aria-hidden
                className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[46%] aspect-square w-[92%] rounded-full bg-[#e4ddce]"
              />
              {/* box defines the drawable area so the statue's base lands on the
                  same baseline as the left column (7vh above the grid bottom) */}
              <div className="absolute inset-0 lg:top-[6vh] lg:bottom-[7vh]">
                <motion.img
                  src="/hero-bust.webp"
                  width={900}
                  height={1350}
                  alt="Classical marble bust wearing headphones and sunglasses, wrapped in Sorta Famous ribbons"
                  className="h-full w-full object-contain object-bottom"
                  fetchPriority="high"
                  initial={{ opacity: 0, scale: 1.06, filter: "blur(16px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-ink-soft hidden lg:flex flex-col items-center gap-2"
      >
        <span className="eyebrow">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          aria-hidden
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
