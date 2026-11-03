"use client";

import { Megaphone, Gem, Share2, Target, UserRound, type LucideIcon } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { EASE } from "./motion";
import { motion } from "framer-motion";

type Offering = { name: string; desc: string };

type Pillar = {
  n: string;
  Icon: LucideIcon;
  t: string;
  d: string;
  img: string;
  feel: string; // one warm, human line
  items: Offering[];
};

const pillars: Pillar[] = [
  {
    n: "01",
    Icon: Megaphone,
    t: "Public Relations (PR)",
    d: "Public relations that builds reputation, earns media attention, and strengthens your public image across digital and traditional platforms.",
    img: "/images/services/public-relations.webp",
    feel: "So the right people say your name in the right rooms.",
    items: [
      { name: "Strategic PR solutions", desc: "Long term strategy that protects brand value, not just short term buzz." },
      { name: "Media relations & press coverage", desc: "Attention from trusted news outlets, trade press and online publications." },
      { name: "Press release writing & distribution", desc: "Concise, compelling releases for launches, milestones and partnerships." },
      { name: "Online PR & digital reputation", desc: "Monitoring and managing the articles and stories written about you." },
      { name: "Thought leadership & positioning", desc: "Expert articles, interviews and opinion pieces that build trust over time." },
    ],
  },
  {
    n: "02",
    Icon: Share2,
    t: "Social Media Marketing",
    d: "A clear plan, stories that make sense, and constant optimisation, social that connects with customers and grows your business.",
    img: "/images/services/social-media-marketing.webp",
    feel: "So the scroll stops, and the following becomes a community.",
    items: [
      { name: "Strategic social planning", desc: "Goals, audience and competitor research to find the right platforms." },
      { name: "Content & brand storytelling", desc: "Brand appropriate content and real stories that engage your audience." },
      { name: "Account management", desc: "Publishing, quick replies to comments and messages, and daily monitoring." },
      { name: "Paid social advertising", desc: "Targeted campaigns optimised for reach, discovery and ROI." },
      { name: "Analytics & optimisation", desc: "Reach, engagement and conversion tracking that guides the strategy." },
    ],
  },
  {
    n: "03",
    Icon: Gem,
    t: "Brand Management",
    d: "Building, keeping and growing strong brands, rooted in clarity, consistency and long term business value.",
    img: "/images/services/brand-management.webp",
    feel: "So people feel something the moment they meet you.",
    items: [
      { name: "Brand endorsement", desc: "Partnering with trusted creators, celebrities and industry voices to amplify your brand with authenticity." },
      { name: "Brand planning & positioning", desc: "Research led, content driven strategy that makes your business stand out." },
      { name: "Identity & consistency", desc: "Visual features, messaging rules and standards, uniform across every touchpoint." },
      { name: "Digital brand management", desc: "A consistent brand across websites, social, content and online ads." },
      { name: "Reputation & brand trust", desc: "Tracking how people talk and feel about you to protect your image." },
      { name: "Communication & storytelling", desc: "Real brand stories that connect with people on an emotional level." },
    ],
  },
  {
    n: "04",
    Icon: Target,
    t: "Performance Marketing",
    d: "Data-driven marketing campaigns focused on generating qualified leads, increasing sales, and maximizing returns on every advertising dollar.",
    img: "/images/services/performance-marketing.webp",
    feel: "Reach the right audience, increase conversions, and maximize every ad spend.",
    items: [
      { name: "Performance marketing strategy", desc: "Growth-focused strategies built around your business goals, audience, and measurable KPIs." },
      { name: "Paid search (Google Ads)", desc: "Reach high-intent customers through optimized search, shopping, display and YouTube campaigns." },
      { name: "Paid social advertising", desc: "High-performing campaigns across Meta, LinkedIn, TikTok and other platforms to drive conversions." },
      { name: "Campaign management & optimization", desc: "Continuous testing, audience refinement and bid optimization to reduce acquisition costs." },
      { name: "Conversion tracking & reporting", desc: "Accurate tracking, insightful reporting and data-driven recommendations to maximize ROI." },
    ],
  },
  {
    n: "05",
    Icon: UserRound,
    t: "Personal Branding",
    d: "Strategic personal branding focused on building credibility, growing influence, and creating meaningful opportunities across digital platforms.",
    img: "/images/services/personal-branding.webp",
    feel: "Build trust, attract opportunities, and stand out as an industry leader.",
    items: [
      { name: "Personal brand strategy", desc: "A clear brand identity, positioning, messaging and growth roadmap aligned with your goals." },
      { name: "Content strategy & creation", desc: "Impactful content that showcases your expertise, builds credibility and engages your audience." },
      { name: "LinkedIn & profile optimization", desc: "Optimised professional profiles that enhance visibility and attract the right opportunities." },
      { name: "Thought leadership & authority", desc: "Position yourself as an expert through consistent, value-driven content and storytelling." },
      { name: "Reputation & performance tracking", desc: "Monitor your online presence, manage perception and measure growth with actionable insight." },
    ],
  },
];

export function ServicePillars() {
  return (
    <section
      id="practices"
      className="relative z-20 bg-cream py-16 md:py-28 px-6 md:px-12 lg:px-16 xl:px-28 border-t border-border overflow-hidden scroll-mt-24"
    >
      <div className="mx-auto max-w-[1480px]">
        <SectionHeader
          eyebrow="What we offer"
          title={<>Five practices, <span className="serif-italic">one system</span></>}
          marker="/ 05 / ©"
          className="mb-16 md:mb-24"
        />

        <div className="flex flex-col gap-20 md:gap-36">
          {pillars.map((p, i) => {
            const flipped = i % 2 === 1;
            return (
              <Reveal key={p.t}>
                <div className="group/row grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  {/* Media side */}
                  <div className={flipped ? "lg:order-2" : ""}>
                    <div className="relative">
                      {/* soft accent halo behind the frame */}
                      <div
                        aria-hidden
                        className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-brand/10 opacity-0 blur-2xl transition-opacity duration-700 group-hover/row:opacity-100"
                      />
                      <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-brand/15 bg-muted">
                        <img
                          src={p.img}
                          alt={p.t}
                          loading="lazy"
                          className="h-full w-full object-cover grayscale transition-all duration-[900ms] ease-out group-hover/row:grayscale-0 group-hover/row:scale-[1.04]"
                        />
                        {/* icon plate */}
                        <div className="absolute left-5 top-5 flex items-center gap-3">
                          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand text-cream shadow-lg backdrop-blur-sm">
                            <p.Icon className="h-5 w-5" strokeWidth={1.6} />
                          </span>
                        </div>
                        <span className="absolute bottom-4 right-5 serif text-6xl md:text-7xl leading-none text-cream/90 drop-shadow-lg">
                          {p.n}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Text side */}
                  <div className={flipped ? "lg:order-1" : ""}>
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-accent" />
                      <span className="eyebrow text-brand">
                        Practice {p.n}
                      </span>
                    </div>

                    <h3 className="serif text-4xl md:text-5xl mt-4">{p.t}</h3>

                    <p className="serif-italic text-xl md:text-2xl mt-3 text-brand">
                      {p.feel}
                    </p>

                    <p className="text-ink-soft mt-5 leading-relaxed max-w-xl">{p.d}</p>

                    <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                      {p.items.map((it, j) => (
                        <motion.li
                          key={it.name}
                          className="flex gap-3"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                          transition={{ delay: j * 0.05, duration: 0.6, ease: EASE }}
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          <div>
                            <div className="text-sm font-medium text-ink">{it.name}</div>
                            <div className="text-sm text-ink-soft leading-snug mt-0.5">{it.desc}</div>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
