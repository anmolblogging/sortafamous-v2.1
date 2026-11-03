import type { Metadata } from 'next';
import { ogDefaults } from '@/lib/site';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';
import { getBlogPosts, getBlogCategories } from '@/lib/blogs';
import { BlogList } from '@/components/BlogList';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Practical guides on PR, social media marketing, brand management, performance marketing and personal branding in India, from the Sorta Famous team in Mumbai.',
  alternates: { canonical: '/blog' },
  openGraph: { ...ogDefaults, url: '/blog', title: 'Blog · Sorta Famous' },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; category?: string; tag?: string }>;
}) {
  const { page, search, category, tag } = await searchParams;
  const currentPage = page ? parseInt(page, 10) : 1;
  
  const [postsRes, categories] = await Promise.all([
    getBlogPosts({
      page: currentPage,
      search: search || undefined,
      categoryId: category ? parseInt(category, 10) : undefined,
      tagId: tag ? parseInt(tag, 10) : undefined,
    }),
    getBlogCategories(),
  ]);

  const { posts, totalPages } = postsRes;

  return (
    <div className="bg-cream text-ink overflow-x-clip min-h-screen flex flex-col">
      <Nav />
      <main className="flex-grow pt-32 md:pt-40 px-6 md:px-12 lg:px-16 xl:px-28">
        <div className="mx-auto max-w-5xl">
          <h1 className="serif text-[clamp(3rem,6vw,5rem)] leading-none tracking-[-0.02em] mb-8">
            Blog
          </h1>
          
          <div className="mb-12 flex flex-col gap-6">
            {categories.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-ink mr-2">Categories:</span>
                <Link
                  href="/blog"
                  className={`px-4 py-1.5 rounded-full border text-sm transition ${
                    !category && !tag ? 'bg-ink text-cream border-ink' : 'bg-transparent border-ink/20 hover:border-ink/50 text-ink-soft'
                  }`}
                >
                  All
                </Link>
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    href={`/category/${c.slug}`}
                    className={`px-4 py-1.5 rounded-full border text-sm transition bg-transparent border-ink/20 hover:border-ink/50 text-ink-soft`}
                  >
                    {c.name} {c.count ? `(${c.count})` : ''}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <BlogList
            initialPosts={posts}
            totalPages={totalPages}
            categoryId={category ? parseInt(category, 10) : undefined}
            tagId={tag ? parseInt(tag, 10) : undefined}
            search={search || undefined}
          />
        </div>
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
