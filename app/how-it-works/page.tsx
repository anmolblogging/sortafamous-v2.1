import type { Metadata } from "next";
import { ogDefaults } from "@/lib/site";
import { pageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Nav } from "@/components/Nav";
import { HowItWorksHero } from "@/components/HowItWorksHero";
import { Process } from "@/components/Process";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const DESCRIPTION =
  "A clear, data driven process: discovery and strategy, content creation, scheduling and publishing, then monthly tracking, optimization and reporting.";

export const metadata: Metadata = {
  title: "How Our PR & Marketing Process Works",
  description: DESCRIPTION,
  keywords: ["PR process", "marketing agency process", "how a PR agency works", "social media marketing process", "monthly marketing reporting"],
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    ...ogDefaults,
    url: "/how-it-works",
    title: "How It Works · Sorta Famous",
    description: DESCRIPTION,
  },
};

export default function HowItWorksPage() {
  return (
    <div className="bg-cream text-ink overflow-x-clip">
      <Nav />
      <main>
        <JsonLd data={pageSchema({ path: "/how-it-works", name: "How Our PR & Marketing Process Works", description: DESCRIPTION, crumbs: [{ name: "How it works", path: "/how-it-works" }] })} />
        <HowItWorksHero />
        <Process />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
