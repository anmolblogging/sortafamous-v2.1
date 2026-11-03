import type { Metadata } from "next";
import { ogDefaults } from "@/lib/site";
import { pageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Nav } from "@/components/Nav";
import { AboutHero } from "@/components/AboutHero";
import { AboutManifesto } from "@/components/AboutManifesto";
// import { AboutPrinciples } from "@/components/AboutPrinciples"; // hidden for now
import { AboutValues } from "@/components/AboutValues";
import { AboutNote } from "@/components/AboutNote";
// import { AboutPhilosophy } from "@/components/AboutPhilosophy"; // hidden for now
// import { Team } from "@/components/Team"; // hidden for now
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const DESCRIPTION =
  "Sorta Famous is a Mumbai PR and marketing agency helping founders and brands shape perception, build authority and earn visibility that lasts.";

export const metadata: Metadata = {
  title: "About Us · PR & Marketing Agency in Mumbai",
  description: DESCRIPTION,
  keywords: ["about Sorta Famous", "PR agency Mumbai", "marketing agency Mumbai", "brand reputation agency", "PR and marketing studio India"],
  alternates: { canonical: "/about" },
  openGraph: {
    ...ogDefaults,
    url: "/about",
    title: "About Sorta Famous · PR & Marketing Agency in Mumbai",
    description: DESCRIPTION,
  },
};

export default function AboutPage() {
  return (
    <div className="bg-cream text-ink overflow-x-clip">
      <Nav />
      <main>
        <JsonLd data={pageSchema({ type: "AboutPage", path: "/about", name: "About Sorta Famous", description: DESCRIPTION, crumbs: [{ name: "About", path: "/about" }] })} />
        <AboutHero />
        {/* Values take the slot the "By the numbers" stats used to hold */}
        <AboutValues />
        <AboutManifesto />
        <AboutNote />
        {/* <AboutPrinciples /> hidden for now */}
        {/* <AboutPhilosophy /> hidden for now */}
        {/* <Team /> hidden for now */}
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
