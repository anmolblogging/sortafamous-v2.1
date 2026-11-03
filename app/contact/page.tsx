import type { Metadata } from "next";
import { ogDefaults } from "@/lib/site";
import { pageSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Nav } from "@/components/Nav";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const DESCRIPTION =
  "Talk to Sorta Famous, a PR and marketing agency in Andheri West, Mumbai. Book a free 30-minute consult by form, email, phone or WhatsApp.";

export const metadata: Metadata = {
  title: "Contact Us · PR Agency in Andheri, Mumbai",
  description: DESCRIPTION,
  keywords: ["contact Sorta Famous", "PR agency Andheri", "PR agency Mumbai contact", "marketing agency Andheri West", "free marketing consultation"],
  alternates: { canonical: "/contact" },
  openGraph: {
    ...ogDefaults,
    url: "/contact",
    title: "Contact Sorta Famous · PR Agency in Mumbai",
    description: DESCRIPTION,
  },
};

export default function ContactPage() {
  return (
    <div className="bg-cream text-ink overflow-x-clip">
      <Nav />
      <main className="pt-16 md:pt-20">
        <JsonLd data={pageSchema({ type: "ContactPage", path: "/contact", name: "Contact Sorta Famous", description: DESCRIPTION, crumbs: [{ name: "Contact", path: "/contact" }] })} />
        <Contact isPage />
      </main>
      <Footer />
    </div>
  );
}
