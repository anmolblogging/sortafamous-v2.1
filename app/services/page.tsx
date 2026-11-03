import type { Metadata } from "next";
import { SITE_URL, ogDefaults } from "@/lib/site";
import { pageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Nav } from "@/components/Nav";
import { ServicesHero } from "@/components/ServicesHero";
import { ServicePillars } from "@/components/ServicePillars";
import { ProjectServices } from "@/components/ProjectServices";
// import { ServicePlans } from "@/components/ServicePlans"; // hidden for now
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const SERVICES = [
  ["Public Relations (PR)", "Media relations, press releases, online PR and thought leadership."],
  ["Social Media Marketing", "Social strategy, content, community management and paid social."],
  ["Brand Management", "Positioning, identity, digital brand and reputation."],
  ["Performance Marketing", "Paid search and paid social campaigns, optimisation and reporting."],
  ["Personal Branding", "Positioning, LinkedIn and thought leadership for founders and public figures."],
];

const SERVICES_SCHEMA = SERVICES.map(([name, description]) => ({
  "@type": "Service",
  name,
  description,
  serviceType: name,
  provider: { "@id": `${SITE_URL}/#organization` },
  areaServed: { "@type": "Country", name: "India" },
}));

const DESCRIPTION =
  "PR, social media marketing, brand management, performance marketing and personal branding services in Mumbai, on retainer or as one-time projects.";

export const metadata: Metadata = {
  title: "PR & Marketing Services in Mumbai",
  description: DESCRIPTION,
  keywords: ["PR services Mumbai", "public relations services", "social media marketing services", "brand management services", "performance marketing services", "personal branding services", "project based marketing services"],
  alternates: { canonical: "/services" },
  openGraph: {
    ...ogDefaults,
    url: "/services",
    title: "PR & Marketing Services · Sorta Famous",
    description: DESCRIPTION,
  },
};

export default function ServicesPage() {
  return (
    <div className="bg-cream text-ink overflow-x-clip">
      <Nav />
      <main>
        <JsonLd data={pageSchema({ path: "/services", name: "PR & Marketing Services in Mumbai", description: DESCRIPTION, crumbs: [{ name: "Services", path: "/services" }], extra: SERVICES_SCHEMA })} />
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
