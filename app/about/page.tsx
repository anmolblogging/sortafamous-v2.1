import type { Metadata } from "next";
import { ogDefaults } from "@/lib/site";
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

export const metadata: Metadata = {
  title: "About us",
  description:
    "At Sorta Famous, fame is earned, not accidental. A modern PR, marketing and SEO studio helping brands shape perception, build authority, and create visibility that lasts.",
  alternates: { canonical: "/about" },
  openGraph: {
    ...ogDefaults,
    url: "/about",
    title: "About us · Sorta Famous",
    description:
      "Creating meaningful visibility for modern brands, strategy over shortcuts, visibility with substance, reputation that lasts.",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-cream text-ink overflow-x-clip">
      <Nav />
      <main>
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
