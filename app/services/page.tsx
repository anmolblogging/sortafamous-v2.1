import type { Metadata } from "next";
import { ogDefaults } from "@/lib/site";
import { Nav } from "@/components/Nav";
import { ServicesHero } from "@/components/ServicesHero";
import { ServicePillars } from "@/components/ServicePillars";
import { ProjectServices } from "@/components/ProjectServices";
// import { ServicePlans } from "@/components/ServicePlans"; // hidden for now
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Services",
  description:
    "360° marketing across PR, Social Media Marketing and Brand Management, from press placements to paid social and founder brand.",
  alternates: { canonical: "/services" },
  openGraph: {
    ...ogDefaults,
    url: "/services",
    title: "Services · Sorta Famous",
    description:
      "Five connected practices, one cohesive system, PR, social, brand, performance marketing and personal branding. We craft stories that make brands matter.",
  },
};

export default function ServicesPage() {
  return (
    <div className="bg-cream text-ink overflow-x-clip">
      <Nav />
      <main>
        <ServicesHero />
        <ServicePillars />
        <ProjectServices />
        {/* <ServicePlans /> hidden for now */}
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
