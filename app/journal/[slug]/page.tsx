import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { pageSchema, seoDescription, seoTitle } from "@/lib/seo";
import { SITE_URL, ogDefaults } from "@/lib/site";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { articles, getArticle } from "@/lib/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article not found" };
  return {
    title: seoTitle(article.title),
    description: seoDescription(article.excerpt),
    keywords: [article.tag, `${article.tag} India`, "Sorta Famous journal"],
    alternates: { canonical: `/journal/${article.slug}` },
    openGraph: {
      ...ogDefaults,
      type: "article",
      url: `/journal/${article.slug}`,
      title: `${article.title} · Sorta Famous`,
      description: seoDescription(article.excerpt),
      images: [article.img],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <div className="bg-cream text-ink overflow-x-clip">
      <Nav />
      <main>
        <JsonLd
          data={pageSchema({
            path: `/journal/${article.slug}`,
            name: article.title,
            description: seoDescription(article.excerpt),
            crumbs: [
              { name: "Blog", path: "/blog" },
              { name: article.title, path: `/journal/${article.slug}` },
            ],
            extra: [
              {
                "@type": "Article",
                headline: article.title,
                description: article.excerpt,
                image: `${SITE_URL}${article.img}`,
                datePublished: new Date(article.date).toISOString(),
                author: { "@type": "Organization", name: article.author },
                publisher: { "@id": `${SITE_URL}/#organization` },
                mainEntityOfPage: `${SITE_URL}/journal/${article.slug}`,
              },
            ],
          })}
        />
        <article className="px-6 md:px-12 lg:px-16 xl:px-28">
          <div className="mx-auto max-w-3xl pt-32 md:pt-40">
            <a
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-ink-soft transition hover:text-ink"
            >
              <span aria-hidden>←</span> Back to blog
            </a>

            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-soft">
              <span className="rounded-full bg-ink/[0.06] px-3 py-1 text-xs">{article.tag}</span>
              <span>{article.date}</span>
              <span aria-hidden>·</span>
              <span>{article.readingTime}</span>
            </div>

            <h1 className="serif mt-5 text-[clamp(2.25rem,5vw,4rem)] leading-[1.03] tracking-[-0.02em]">
              {article.title}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-ink-soft leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-[2rem] bg-muted">
            <img
              src={article.img}
              alt={article.title}
              className="aspect-[16/8] w-full object-cover"
            />
          </div>

          <div className="mx-auto mt-14 max-w-2xl pb-8">
            {article.body.map((block, i) =>
              block.type === "h2" ? (
                <h2 key={i} className="serif text-2xl md:text-3xl leading-tight mt-12 mb-4">
                  {block.text}
                </h2>
              ) : (
                <p key={i} className="mt-5 text-base md:text-lg leading-relaxed text-ink-soft">
                  {block.text}
                </p>
              ),
            )}

            <div className="mt-12 border-t border-ink/10 pt-6 text-sm text-ink-soft">
              Written by <span className="text-ink">{article.author}</span>
            </div>
          </div>
        </article>

        <CTA />
      </main>
      <Footer />
    </div>
  );
}
