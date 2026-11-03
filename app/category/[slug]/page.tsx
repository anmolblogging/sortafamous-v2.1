import type { Metadata } from 'next';
import { ogDefaults } from '@/lib/site';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/Nav';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';
import { getBlogPosts, getBlogCategories, getBlogTags } from '@/lib/blogs';
import { BlogList } from '@/components/BlogList';

export async function generateStaticParams() {
  const categories = await getBlogCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getBlogCategories();
  const currentCategory = categories.find((c) => c.slug === slug);
  if (!currentCategory) return { title: 'Category Not Found' };
  
  return {
    title: `${currentCategory.name} · Blog`,
    description: `${currentCategory.name} guides and articles for founders, brands and businesses in India, from the Sorta Famous team in Mumbai.`,
    alternates: { canonical: `/category/${currentCategory.slug}` },
    openGraph: { ...ogDefaults, url: `/category/${currentCategory.slug}`, title: `${currentCategory.name} · Sorta Famous Blog` },
  };
}

export default async function CategoryPage({
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

  const currentCategory = categories.find((c) => c.slug === slug);
  if (!currentCategory) notFound();

  const { posts, totalPages } = await getBlogPosts({
    page: currentPage,
    categoryId: currentCategory.id,
  });

  return (
    <div className="bg-cream text-ink overflow-x-clip min-h-screen flex flex-col">
      <Nav />
      <main className="flex-grow pt-32 md:pt-40 px-6 md:px-12 lg:px-16 xl:px-28">
        <div className="mx-auto max-w-5xl">
          <h1 className="serif text-[clamp(3rem,6vw,5rem)] leading-none tracking-[-0.02em] mb-8">
            {currentCategory.name}
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
                    className={`px-4 py-1.5 rounded-full border text-sm transition ${
                      currentCategory.id === c.id ? 'bg-ink text-cream border-ink' : 'bg-transparent border-ink/20 hover:border-ink/50 text-ink-soft'
                    }`}
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
                    className="px-4 py-1.5 rounded-full border text-sm transition bg-transparent border-ink/20 hover:border-ink/50 text-ink-soft"
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
            categoryId={currentCategory.id}
          />
        </div>
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
