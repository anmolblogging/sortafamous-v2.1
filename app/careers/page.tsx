import type { Metadata } from "next";
import { ogDefaults } from "@/lib/site";
import { pageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Nav } from "@/components/Nav";
import { CareersHero, Openings } from "@/components/Careers";
import { Footer } from "@/components/Footer";

const DESCRIPTION =
  "Open roles at Sorta Famous, a Mumbai PR and communications agency: Executive Assistant to Founder, Business Development and Accounts.";

export const metadata: Metadata = {
  title: "Careers at a Mumbai PR & Marketing Agency",
  description: DESCRIPTION,
  keywords: ["PR agency jobs Mumbai", "marketing jobs Mumbai", "Sorta Famous careers", "communications agency jobs"],
  alternates: { canonical: "/careers" },
  openGraph: {
    ...ogDefaults,
    url: "/careers",
    title: "Careers · Sorta Famous",
    description: DESCRIPTION,
  },
};

export default function CareersPage() {
  return (
    <div className="bg-cream text-ink overflow-x-clip">
      <Nav />
      <main>
        <JsonLd data={pageSchema({ path: "/careers", name: "Careers at Sorta Famous", description: DESCRIPTION, crumbs: [{ name: "Careers", path: "/careers" }] })} />
        <CareersHero />
        <Openings />
      </main>
      <Footer />
    </div>
  );
}
