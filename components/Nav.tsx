"use client";

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Clock } from "./Clock";
import { EASE } from "./motion";

function Logo() {
  return (
    <a href="/" aria-label="Sorta Famous, home" className="inline-flex items-center">
      <img
        src="/new-logo-final.png"
        alt="Sorta Famous"
        className="h-7 md:h-9 w-auto select-none"
        draggable={false}
      />
    </a>
  );
}

const links = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

/** Kept out of the main row, grouped under a small "Legal" dropdown. */
const legal = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
];

export function Nav() {
  const { scrollYProgress, scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();
  // Home stays permanently pinned; subpages hide on scroll down, reveal on scroll up.
  const isHome = pathname === "/";
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
    if (isHome) {
      setNavHidden(false);
    } else {
      const goingDown = y > lastY.current;
      setNavHidden(goingDown && y > 80);
    }
    lastY.current = y;
  });

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      animate={{ y: navHidden && !open ? "-100%" : 0 }}
      transition={{ duration: 0.35, ease: EASE }}
      className="fixed top-0 inset-x-0 z-50"
    >
      {/* scroll progress bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="absolute top-0 inset-x-0 h-0.5 bg-accent origin-left z-[60]"
      />
      <div
        className={`relative z-50 transition-colors duration-500 ${
          scrolled || open ? "bg-cream/80 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1480px] px-6 md:px-12 lg:px-16 xl:px-28 py-4 grid grid-cols-[1fr_auto_1fr] items-center">
          <div className="justify-self-start">
            <div className="hidden md:block">
              <Logo />
            </div>
          </div>
          <div className="justify-self-center">
            <div className="md:hidden">
              <Logo />
            </div>
          </div>
          <div className="justify-self-end flex items-center gap-3">
            <nav className="hidden xl:flex items-center gap-6 text-sm text-ink-soft mr-2 whitespace-nowrap">
              {links.map((l) => (
                <a key={l.href} href={l.href} className="hover:text-ink transition">
                  {l.label}
                </a>
              ))}
              {/* Legal dropdown, opens on hover and on keyboard focus */}
              <div className="group relative">
                <button
                  type="button"
                  aria-haspopup="true"
                  className="inline-flex items-center gap-1 hover:text-ink transition group-focus-within:text-ink"
                >
                  Legal
                  <svg
                    aria-hidden
                    viewBox="0 0 12 12"
                    className="h-3 w-3 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path d="M3 4.5 6 7.5 9 4.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className="invisible absolute right-0 top-full pt-3 opacity-0 translate-y-1 transition-all duration-300 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0">
                  <div className="min-w-[190px] rounded-2xl border border-border bg-cream p-2 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.25)]">
                    {legal.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        className="block rounded-xl px-4 py-2.5 text-ink-soft transition-colors hover:bg-brand/10 hover:text-ink"
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </nav>
            <a href="/contact" className="hidden sm:inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-brand text-cream px-5 py-2.5 text-sm hover:opacity-90 transition">
              Get Started
            </a>
            {/* hamburger / close */}
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="h-10 w-10 grid place-items-center rounded-full bg-brand text-cream xl:hidden"
            >
              <span className="relative block h-4 w-4">
                <motion.span
                  className="absolute left-0 top-[5px] block h-px w-4 bg-cream"
                  animate={open ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                />
                <motion.span
                  className="absolute left-0 top-[10px] block h-px w-4 bg-cream"
                  animate={open ? { rotate: -45, y: -2 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 top-0 z-40 bg-cream xl:hidden flex flex-col"
          >
            <div className="h-[72px] shrink-0" />
            <nav className="flex-1 flex flex-col justify-center px-6 gap-1">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.08 + i * 0.07 }}
                  className="serif text-5xl sm:text-6xl py-3 border-b border-ink/10 flex items-baseline justify-between active:opacity-60"
                >
                  {l.label}
                  <span className="serif-italic text-sm text-ink-soft">0{i + 1}</span>
                </motion.a>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.35 }}
              className="px-6 pb-10 space-y-5"
            >
              <a
                href="/contact"
                onClick={() => setOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand text-cream px-6 py-4 text-sm active:opacity-80"
              >
                Let&apos;s get Sorta Famous <span aria-hidden>→</span>
              </a>
              <div className="flex flex-col gap-3 items-start text-sm text-ink-soft">
                <Clock />
                <a href="mailto:hellothere@sortafamous.in" className="underline break-all">hellothere@sortafamous.in</a>
                <div className="flex gap-5 text-xs">
                  {legal.map((l) => (
                    <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="hover:text-ink transition">
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
