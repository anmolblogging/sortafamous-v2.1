import type { Metadata } from "next";
import { ogDefaults } from "@/lib/site";
import { Nav } from "@/components/Nav";
import { HowItWorksHero } from "@/components/HowItWorksHero";
import { Process } from "@/components/Process";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "A clear, data driven process: discovery and strategy, content creation, scheduling and publishing, then monthly tracking, optimization and reporting.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    ...ogDefaults,
    url: "/how-it-works",
    title: "How it works · Sorta Famous",
    description:
      "From first call to lasting fame, a transparent, four stage process that turns strategy into earned attention.",
  },
};

export default function HowItWorksPage() {
  return (
    <div className="bg-cream text-ink overflow-x-clip">
      <Nav />
      <main>
        <HowItWorksHero />
        <Process />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
