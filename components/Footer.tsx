import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { Clock } from "./Clock";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How it works" },
];
const company = [
  { href: "/#work", label: "Selected work" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

// lucide v1 dropped brand glyphs, so these are inline paths.
const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/sortafamous.in/",
    filled: false,
    path: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/sortaa-famous/",
    filled: false,
    path: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-9h4v1.5" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
];

export function Footer() {
  return (
    <footer className="relative z-[150] bg-ink-gradient text-cream overflow-hidden">
      <div className="mx-auto max-w-[1480px] px-6 md:px-12 lg:px-16 xl:px-28 pt-16 md:pt-24">
        {/* top row */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pb-8 border-b border-cream/15">
          <Clock dark />
          <div className="text-sm text-cream/60">Sorta Famous® · 2026</div>
        </div>

        {/* middle, nav columns + closing CTA */}
        <div className="grid md:grid-cols-2 gap-12 py-14 md:py-16">
          <div className="max-w-md">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="eyebrow mb-5 text-cream/60">Navigation</div>
                <ul className="space-y-3 text-cream/60">
                  {nav.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="hover:text-cream transition">{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="eyebrow mb-5 text-cream/60">Company</div>
                <ul className="space-y-3 text-cream/60">
                  {company.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="hover:text-cream transition">{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* social buttons */}
            <div className="mt-12">
              <div className="eyebrow mb-5 text-cream/60">Follow</div>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-11 w-11 grid place-items-center rounded-full border border-cream/20 text-cream/60 hover:text-ink hover:bg-cream hover:border-cream transition"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill={s.filled ? "currentColor" : "none"}
                      stroke={s.filled ? "none" : "currentColor"}
                      strokeWidth={1.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      {s.path}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 md:pl-8 lg:pl-16">
            <h2 className="serif text-[clamp(2rem,4vw,3.2rem)] leading-[1.05]">
              Let&apos;s get you <span className="serif-italic text-accent">Sorta Famous.</span>
            </h2>

            <div className="space-y-4 text-cream/70 text-sm">
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                <a href="mailto:hellothere@sortafamous.in" className="hover:text-cream transition">
                  hellothere@sortafamous.in
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                <a href="tel:+918814999939" className="hover:text-cream transition">
                  +91 8814 999 939
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                <a
                  href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Sorta Famous, Patel Commercial Premises, 203, Off New Link Rd, opp. T-Series, above HDFC bank, Veera Desai Industrial Estate, Andheri West, Mumbai, Maharashtra 400053")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cream transition leading-relaxed text-left"
                >
                  Sorta Famous, Patel Commercial Premises, 203, Off New Link Rd, opp. T-Series, above HDFC bank, Veera Desai Industrial Estate, Andheri West, Mumbai, Maharashtra 400053
                </a>
              </div>
            </div>

            <div className="w-full h-44 rounded-2xl overflow-hidden border border-cream/10 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
              <iframe
                title="Sorta Famous Location Map"
                src={"https://maps.google.com/maps?q=" + encodeURIComponent("Sorta Famous, Patel Commercial Premises, 203, Off New Link Rd, opp. T-Series, above HDFC bank, Veera Desai Industrial Estate, Andheri West, Mumbai, Maharashtra 400053") + "&t=&z=15&ie=UTF8&iwloc=&output=embed"}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* bottom bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-t border-cream/15 text-xs text-cream/60">
          <div>© 2026 Sorta Famous · All rights reserved</div>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-cream transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-cream transition">Terms of Use</Link>
          </div>
        </div>
      </div>

      {/* giant wordmark embossed into the dark background */}
      <div className="relative mt-6 select-none pointer-events-none">
        <div className="relative serif text-cream/[0.05] leading-[0.78] text-center whitespace-nowrap text-[19vw]">
          Sorta&nbsp;Famous
        </div>
      </div>
    </footer>
  );
}
