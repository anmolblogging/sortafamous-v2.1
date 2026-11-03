import type { Metadata } from "next";
import { ogDefaults } from "@/lib/site";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { cases, getCase } from "@/lib/cases";

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCase(slug);
  if (!study) return { title: "Case not found" };
  return {
    title: `${study.client} · ${study.t}`,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      ...ogDefaults,
      url: `/work/${study.slug}`,
      title: `${study.client} · Sorta Famous`,
      description: study.summary,
      images: [study.cover],
    },
  };
}

/** Splits the scope into its opening sentence and the sentences after it. */
function splitScope(text: string) {
  const sentences = text.match(/[^.!?]+[.!?]+/g)?.map((s) => s.trim()) ?? [text];
  return { lead: sentences[0], points: sentences.slice(1) };
}

/**
 * Case page: a green intro panel in the same gradient as the cover artwork,
 * the scope of work, then the coverage artwork itself.
 */
export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCase(slug);
  if (!study) notFound();
  const scope = study.scope ? splitScope(study.scope) : null;

  return (
    <div className="bg-cream text-ink overflow-x-clip">
      <Nav />
      <main className="px-6 md:px-12 lg:px-16 xl:px-28">
        <div className="mx-auto max-w-[1480px] pt-32 pb-20 md:pt-40 md:pb-28">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm text-ink-soft transition hover:text-ink"
          >
            <span aria-hidden>←</span> Back to selected work
          </Link>

          {/* Intro panel, the site's ink-panel motif */}
          <Reveal>
            <header className="relative mt-8 overflow-hidden rounded-[2rem] bg-ink-gradient p-8 text-cream md:p-14">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-20 -right-16 h-80 w-80 rounded-full bg-accent/35 opacity-40 blur-3xl"
              />
              <div className="relative grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end">
                <div>
                  <div className="eyebrow mb-4 flex items-center gap-2 text-cream/50">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Case{" "}
                    {study.n} · {study.outlet}
                  </div>
                  <h1 className="serif text-5xl leading-[1.02] md:text-7xl">
                    {study.client}
                  </h1>
                  <p className="serif-italic mt-4 text-xl text-cream/80 md:text-2xl">
                    {study.t}
                  </p>
                  <p className="mt-6 max-w-xl leading-relaxed text-cream/70">
                    {study.d}.
                  </p>
                </div>

                <div className="flex flex-col gap-6 lg:items-end">
                  <div className="flex flex-wrap gap-3 lg:justify-end">
                    {study.services.map((service) => (
                      <span
                        key={service}
                        className="inline-flex items-center rounded-pill border border-cream/20 bg-cream/5 px-4 py-2 text-sm text-cream/80"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  {study.instagram && (
                    <a
                      href={study.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 self-start rounded-pill bg-cream px-5 py-3 text-sm text-ink transition-transform duration-300 hover:-translate-y-0.5 lg:self-end"
                    >
                      {/* lucide v1 dropped brand glyphs, same path as the footer */}
                      <svg
                        aria-hidden
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.8}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <rect x="2" y="2" width="20" height="20" rx="5" />
                        <circle cx="12" cy="12" r="4" />
                        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                      </svg>
                      @{study.instagram.replace(/\/+$/, "").split("/").pop()}
                      <span
                        aria-hidden
                        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      >
                        ↗
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </header>
          </Reveal>

          {scope && (
            <section className="mt-16 md:mt-28">
              <SectionHeader
                eyebrow="What we handle"
                title={
                  <>
                    Scope of <span className="serif-italic">work</span>
                  </>
                }
                marker={`/ ${study.n} / ©`}
                className="mb-10 md:mb-14"
              />

              <div className="grid gap-10 border-t border-border pt-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16 md:pt-14">
                <Reveal>
                  <p className="serif text-3xl leading-[1.2] md:text-[2.6rem]">
                    {scope.lead}
                  </p>
                </Reveal>

                <ol className="flex flex-col">
                  {scope.points.map((point, i) => (
                    <Reveal key={point} delay={i * 80}>
                      <li className="flex gap-6 border-b border-border py-6 first:pt-0 last:border-b-0">
                        <span className="serif w-12 shrink-0 text-4xl leading-none text-brand/30">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="leading-relaxed text-ink-soft md:text-lg">
                          {point}
                        </p>
                      </li>
                    </Reveal>
                  ))}
                </ol>
              </div>
            </section>
          )}

          <section className="mt-16 md:mt-28">
            <SectionHeader
              eyebrow="In practice"
              title={
                <>
                  The <span className="serif-italic">coverage</span>
                </>
              }
              className="mb-10 md:mb-14"
            />

            <div className="overflow-hidden rounded-[2rem] bg-muted">
              <img
                src={study.inside}
                alt={study.insideCaption}
                className="w-full"
              />
            </div>

            {study.extra?.map((piece) => (
              <div
                key={piece.src}
                className="mt-8 overflow-hidden rounded-[2rem] bg-muted"
              >
                <img src={piece.src} alt={piece.caption} className="w-full" />
              </div>
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
