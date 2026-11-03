"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "./Reveal";
import { EASE } from "./motion";
import { SectionHeader } from "./SectionHeader";

const faqs = [
  {
    q: "What kind of projects do you take on?",
    a: "We work with founders, startups and modern brands who want earned attention that lasts, from full scale PR campaigns and media relations to founder brand building and always on social strategy.",
  },
  {
    q: "How does a typical engagement begin?",
    a: "It starts with a discovery call to understand your goals, audience and current positioning. From there we map a strategy, agree on scope and milestones, and move into execution, usually within the first two weeks.",
  },
  {
    q: "What is your pricing model?",
    a: "Most partnerships run as a monthly retainer scoped to your goals, with project based options for launches and standalone campaigns. We share a clear proposal after our first call, no surprises.",
  },
  {
    q: "Need support for a specific requirement without committing to a long-term retainer?",
    a: "We offer one time, project-based services that are cost effective, goal-oriented, and tailored to your business needs.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function FAQ() {
  const [open, setOpen] = useState(-1);

  return (
    <section
      id="faq"
      className="relative z-[135] bg-cream px-6 md:px-12 lg:px-16 xl:px-28 py-16 md:py-28 border-t border-border"
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="mx-auto max-w-[1480px]">
        <SectionHeader
          eyebrow="Questions"
          title={<>Frequently asked <span className="serif-italic">questions</span></>}
          className="mb-6"
        />

        <div className="mt-6">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 50}>
                <div className="border-t border-ink/15">
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="w-full py-7 md:py-8 flex items-center gap-5 text-left group"
                    aria-expanded={isOpen}
                  >
                    <h3 className={`serif text-2xl md:text-4xl flex-1 transition-colors duration-300 ${isOpen ? "" : "group-hover:text-ink-soft"}`}>
                      {f.q}
                    </h3>
                    <span className="relative h-11 w-11 shrink-0 rounded-full border border-ink/25 grid place-items-center group-hover:bg-brand group-hover:text-cream transition-colors duration-300">
                      <span className="absolute h-px w-4 bg-current" />
                      <motion.span
                        className="absolute h-4 w-px bg-current"
                        animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1 }}
                        transition={{ duration: 0.3, ease: EASE }}
                      />
                    </span>
                  </button>

                  {/* Answers stay in the HTML while collapsed so search engines and AI crawlers can read them. */}
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="overflow-hidden"
                    inert={!isOpen}
                  >
                    <p className="text-ink-soft text-lg md:text-xl leading-relaxed max-w-3xl pb-8 md:pb-10 pr-16">
                      {f.a}
                    </p>
                  </motion.div>
                </div>
              </Reveal>
            );
          })}
          <div className="border-t border-ink/15" />
        </div>
      </div>
    </section>
  );
}
