import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/Nav';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';
import { getBlogPosts, getBlogCategories, getBlogTags } from '@/lib/blogs';
import { BlogList } from '@/components/BlogList';

export async function generateStaticParams() {
  const tags = await getBlogTags();
  return tags.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tags = await getBlogTags();
  const currentTag = tags.find((t) => t.slug === slug);
  if (!currentTag) return { title: 'Tag Not Found' };
  
  return {
    title: `#${currentTag.name} · Blog`,
    description: `Articles tagged ${currentTag.name} from the Sorta Famous team.`,
    alternates: { canonical: `/tag/${currentTag.slug}` },
    // Tag archives are thin lists that overlap the categories; keep them out
    // of the index but let crawlers follow through to the posts.
    robots: { index: false, follow: true },
  };
}

export default async function TagPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page } = await searchParams;
  const currentPage = page ? parseInt(page, 10) : 1;
  
  const [categories, tags] = await Promise.all([
    getBlogCategories(),
    getBlogTags(),
  ]);

  const currentTag = tags.find((t) => t.slug === slug);
  if (!currentTag) notFound();

  const { posts, totalPages } = await getBlogPosts({
    page: currentPage,
    tagId: currentTag.id,
  });

  return (
    <div className="bg-cream text-ink overflow-x-clip min-h-screen flex flex-col">
      <Nav />
      <main className="flex-grow pt-32 md:pt-40 px-6 md:px-12 lg:px-16 xl:px-28">
        <div className="mx-auto max-w-5xl">
          <h1 className="serif text-[clamp(3rem,6vw,5rem)] leading-none tracking-[-0.02em] mb-8">
            #{currentTag.name}
          </h1>
          
          <div className="mb-12 flex flex-col gap-6">
            {categories.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-ink mr-2">Categories:</span>
                <Link
                  href="/blog"
                  className="px-4 py-1.5 rounded-full border text-sm transition bg-transparent border-ink/20 hover:border-ink/50 text-ink-soft"
                >
                  All
                </Link>
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/category/${c.slug}`}
                    className="px-4 py-1.5 rounded-full border text-sm transition bg-transparent border-ink/20 hover:border-ink/50 text-ink-soft"
                  >
                    {c.name} {c.count ? `(${c.count})` : ''}
                  </Link>
                ))}
              </div>
            )}
            
            {tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-ink mr-2">Tags:</span>
                {tags.map((t) => (
                  <Link
                    key={t.id}
                    href={`/tag/${t.slug}`}
                    className={`px-4 py-1.5 rounded-full border text-sm transition ${
                      currentTag.id === t.id ? 'bg-ink text-cream border-ink' : 'bg-transparent border-ink/20 hover:border-ink/50 text-ink-soft'
                    }`}
                  >
                    #{t.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <BlogList
            initialPosts={posts}
            totalPages={totalPages}
            tagId={currentTag.id}
          />
        </div>
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
