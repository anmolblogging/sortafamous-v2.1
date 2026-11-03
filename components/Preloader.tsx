"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** sessionStorage key; also read by the inline script in app/layout.tsx. */
export const INTRO_SEEN_KEY = "sf:intro-seen";

/**
 * Brand intro shown once per visit. It sits over the page rather than holding
 * it back: the hero underneath is server-rendered and painted at full opacity
 * straight away, so search engines and Core Web Vitals see the real content.
 * Repeat views in the same session, and visitors who prefer reduced motion,
 * skip it (CSS hides it before paint, see globals.css).
 */
export function Preloader() {
  const [done, setDone] = useState(false);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSkip(true);
      return;
    }
    // lock scroll while the intro plays
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setDone(true), 1900);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  if (skip) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="sf-preloader fixed inset-0 z-[200] bg-cream flex flex-col items-center justify-center gap-7 px-6"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE }}
          onAnimationComplete={() => {
            document.body.style.overflow = "";
          }}
        >
          <motion.img
            src="/logo-480.webp"
            width={480}
            height={188}
            alt="Sorta Famous"
            className="h-14 md:h-20 w-auto select-none"
            draggable={false}
            initial={{ opacity: 0, scale: 0.92, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: EASE }}
          />

          {/* progress line */}
          <div className="h-px w-44 max-w-[60vw] overflow-hidden bg-ink/15">
            <motion.div
              className="h-full bg-accent"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: EASE, delay: 0.15 }}
            />
          </div>

          <motion.span
            className="eyebrow text-ink-soft"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            360° Marketing &amp; PR
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
