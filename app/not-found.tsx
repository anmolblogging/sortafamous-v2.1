import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page not found",
};

const links = [
  { href: "/services", label: "Our services" },
  { href: "/blog", label: "The blog" },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <div className="bg-cream text-ink overflow-x-clip min-h-screen flex flex-col">
      <Nav />
      <main className="flex-grow px-6 md:px-12 lg:px-16 xl:px-28 pt-36 pb-24 md:pt-48 md:pb-32">
        <div className="mx-auto max-w-[1480px]">
          <div className="eyebrow mb-4 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Error 404
          </div>
          <h1 className="serif text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-[-0.03em]">
            Not so <span className="serif-italic">famous</span>, this page.
          </h1>
          <p className="mt-8 max-w-xl text-lg text-ink-soft leading-relaxed">
            The page you&apos;re looking for has moved or never existed. Try one of these instead.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-brand text-cream px-6 py-3.5 text-sm hover:opacity-90 transition"
            >
              Back to home <span aria-hidden>→</span>
            </Link>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="inline-flex items-center rounded-full border border-ink/20 px-6 py-3.5 text-sm transition-colors hover:bg-brand hover:text-cream hover:border-brand"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
