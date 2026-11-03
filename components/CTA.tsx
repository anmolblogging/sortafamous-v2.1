"use client";

import { Reveal } from "./Reveal";
import { Magnetic, Parallax } from "./motion";

export function CTA() {
  return (
    <section className="relative z-[130] px-6 md:px-12 lg:px-16 xl:px-28 py-16 md:py-28">
      <div className="mx-auto max-w-[1480px]">
        <div className="relative rounded-[2rem] overflow-hidden bg-ink-gradient text-cream p-10 md:p-16">
          {/* atmospheric landscape backdrop */}
          <Parallax amount={40} className="absolute inset-0">
            <img
              src="/images/art/cta1.jpg"
              alt="Classical landscape painting of riverside ruins under a wide sky"
              loading="lazy"
              className="h-[120%] w-full object-cover opacity-30"
            />
          </Parallax>
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-ink/60" />

          <div className="relative">
            <Reveal>
              <h2 className="serif text-[clamp(2.5rem,7vw,6rem)] leading-[1] tracking-[-0.02em] max-w-4xl">
                Boost your brand.<br />
                <span className="serif-italic">Dominate</span> social media.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-cream/70 mt-8 max-w-xl">
                Build influence, engage your audience, and drive real results with our strategic social media
                solutions. From content to campaigns, we&apos;ve got you covered.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <Magnetic strength={0.4} className="mt-10">
                <a href="/contact" className="inline-flex items-center gap-2 rounded-full bg-cream text-ink px-7 py-4 text-sm hover:opacity-90 transition">
                  Discover more <span aria-hidden>→</span>
                </a>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
