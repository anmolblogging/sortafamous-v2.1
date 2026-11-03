import type { Metadata } from "next";
import { ogDefaults } from "@/lib/site";
import { Preloader } from "@/components/Preloader";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
// import { OurClients } from "@/components/OurClients"; // hidden for now
// import { Clients } from "@/components/Clients"; // hidden for now, minimal homepage
// import { Bento } from "@/components/Bento"; // hidden for now
import { Services } from "@/components/Services";
import { ProjectServicesPreview } from "@/components/ProjectServicesPreview";
import { ServiceLeadPopup } from "@/components/ServiceLeadPopup";
// import { Craft } from "@/components/Craft"; // hidden for now
import { Process } from "@/components/Process";
import { Work } from "@/components/Work";
// import { Team } from "@/components/Team"; // hidden for now
// import { Testimonials } from "@/components/Testimonials"; // hidden for now
// import { BrandQuote } from "@/components/BrandQuote"; // removed per brief (avatar scatter section)
// import { Pricing } from "@/components/Pricing"; // hidden for now
// import { Journal } from "@/components/Journal"; // hidden for now, minimal homepage
import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: { absolute: "Sorta Famous · PR & 360° Marketing Agency in Mumbai, India" },
  description: "PR and 360° marketing agency in Mumbai. Public relations, social media, branding and performance marketing that earns visibility beyond the news cycle.",
  alternates: { canonical: "/" },
  openGraph: {
    ...ogDefaults,
    url: "/",
    title: "Sorta Famous · 360° Marketing & PR Agency",
    description: "Visibility that lasts longer than the news cycle, no clout chasing, just status with substance.",
  },
};

export default function Home() {
  return (
    <div className="bg-cream text-ink overflow-x-clip">
      <Preloader />
      <Nav />
      <main>
        <Hero />
        {/* Wrapper makes following sections scroll OVER the sticky hero like a blanket */}
        <div className="relative z-10 bg-cream">
          {/* <OurClients /> hidden for now */}
          <About />
          {/* <Clients /> hidden for now, minimal homepage */}
          {/* <Bento /> hidden for now */}
          <Services />
          {/* Teaser for the one-time, project-based offering */}
          <ProjectServicesPreview />
          {/* Lead capture, fires once per session at the Services/Process seam */}
          <ServiceLeadPopup />
          {/* <Craft /> hidden for now */}
          <Process />
          <Work />
          {/* <Team /> hidden for now */}
          {/* <Testimonials /> hidden for now */}
          {/* <BrandQuote /> removed per brief */}
          {/* <Pricing /> hidden for now */}
          {/* <Journal /> hidden for now, minimal homepage */}
          <CTA />
          <FAQ />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
