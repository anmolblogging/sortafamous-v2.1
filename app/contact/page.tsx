import type { Metadata } from "next";
import { ogDefaults } from "@/lib/site";
import { Nav } from "@/components/Nav";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Let's talk. Tell us your goals and we'll send back a quick win snapshot, no commitment. Reach Sorta Famous by email, phone, or the form. Based in Andheri West, Mumbai.",
  alternates: { canonical: "/contact" },
  openGraph: {
    ...ogDefaults,
    url: "/contact",
    title: "Contact · Sorta Famous",
    description:
      "Let's build a reputation people remember. Get in touch with the Sorta Famous team.",
  },
};

export default function ContactPage() {
  return (
    <div className="bg-cream text-ink overflow-x-clip">
      <Nav />
      <main className="pt-16 md:pt-20">
        <Contact isPage />
      </main>
      <Footer />
    </div>
  );
}
