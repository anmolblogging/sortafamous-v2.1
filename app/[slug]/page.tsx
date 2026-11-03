import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/Nav';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';
import { getBlogPostBySlug, getBlogPosts, type BlogPost } from '@/lib/blogs';
import { OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/site';

/** BlogPosting + BreadcrumbList for a post, using the URLs it actually has on this site. */
function postSchema(post: BlogPost) {
  const url = `${SITE_URL}/${post.slug}`;
  const category = post.categories?.[0];
  const modified = post.modifiedDate > post.publishedDate ? post.modifiedDate : post.publishedDate;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: post.title,
        description: post.seo?.description || post.excerpt,
        url,
        mainEntityOfPage: url,
        datePublished: post.publishedDate,
        dateModified: modified,
        ...(post.featuredImageUrl && { image: post.featuredImageUrl }),
        author: { '@type': 'Person', name: post.author.name },
        publisher: { '@id': `${SITE_URL}/#organization` },
        ...(category && { articleSection: category.name }),
        ...(post.tags?.length && { keywords: post.tags.map((t) => t.name).join(', ') }),
        inLanguage: 'en-IN',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
          ...(category
            ? [{ '@type': 'ListItem', position: 3, name: category.name, item: `${SITE_URL}/category/${category.slug}` }]
            : []),
          { '@type': 'ListItem', position: category ? 4 : 3, name: post.title, item: url },
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
      },
    ],
  };
}

export async function generateStaticParams() {
  const { posts } = await getBlogPosts({ perPage: 100 });
  return posts.map((post: BlogPost) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: 'Not Found' };
 
  const seo = post.seo;
 
  return {
    title: seo?.title || post.title,
    description: seo?.description || post.excerpt,
    keywords: seo?.keywords,
    alternates: { canonical: `/${post.slug}` },
    openGraph: {
      title: seo?.ogTitle || post.title,
      description: seo?.ogDescription || post.excerpt,
      type: 'article',
      url: `/${post.slug}`,
      publishedTime: post.publishedDate,
      authors: [post.author.name],
      images: [seo?.ogImage || post.featuredImageUrl || OG_IMAGE],
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  // Other posts for the sticky sidebar, same-category posts first.
  const { posts: recent }: { posts: BlogPost[] } = await getBlogPosts({ perPage: 8 });
  const categoryIds = new Set(post.categories?.map((c) => c.id));
  const related = recent
    .filter((r) => r.slug !== post.slug)
    .sort(
      (a, b) =>
        Number(b.categories?.some((c) => categoryIds.has(c.id))) -
        Number(a.categories?.some((c) => categoryIds.has(c.id)))
    )
    .slice(0, 4);

  return (
    <div className="bg-cream text-ink overflow-x-clip min-h-screen flex flex-col">
      <Nav />
      <main className="flex-grow">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema(post)) }} />
        
        <div className="px-6 md:px-12 lg:px-16 xl:px-28">
          <div className="mx-auto grid max-w-[1480px] gap-16 pt-32 pb-16 md:pt-40 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-16 xl:gap-24">
            <article className="min-w-0 max-w-[1000px]">
              <div>
                <a
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm text-ink-soft transition hover:text-ink"
                >
                  <span aria-hidden>←</span> Back to blog
                </a>

                <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm text-ink-soft">
                  {post.categories?.length > 0 && (
                    <div className="flex gap-2">
                      {post.categories.map(c => (
                        <a key={c.id} href={`/category/${c.slug}`} className="rounded-full bg-brand/10 text-brand px-3 py-1 text-xs hover:bg-brand hover:text-cream transition-colors">
                          {c.name}
                        </a>
                      ))}
                    </div>
                  )}
                  <span>{post.formattedDate}</span>
                </div>

                <h1 className="serif mt-6 text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-[-0.02em]">
                  {post.title}
                </h1>
                <p className="mt-8 text-xl md:text-2xl text-ink-soft leading-relaxed font-light">
                  {post.excerpt}
                </p>
              </div>

              {post.featuredImageUrl && (
                <div className="mt-14 overflow-hidden rounded-[2.5rem] bg-muted shadow-sm">
                  <img
                    src={post.featuredImageUrl}
                    alt={post.title}
                    className="aspect-[16/9] w-full object-cover"
                  />
                </div>
              )}

              <div className="mt-16">
                <div 
                  className="prose prose-lg prose-ink max-w-none prose-headings:font-serif prose-headings:font-normal prose-headings:tracking-tight prose-a:text-brand prose-a:underline hover:prose-a:text-brand/80 transition-colors prose-img:rounded-2xl prose-img:shadow-sm prose-p:leading-relaxed prose-blockquote:border-l-brand prose-blockquote:bg-brand/5 prose-blockquote:py-2 prose-blockquote:px-5 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-li:marker:text-brand/60 prose-strong:text-ink prose-strong:font-medium"
                  dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
                />

                <div className="mt-16 pt-8 border-t border-ink/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    {post.author.avatarUrl ? (
                      <img src={post.author.avatarUrl} alt={post.author.name} className="w-12 h-12 rounded-full ring-2 ring-cream shadow-sm" />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center text-brand font-medium">
                        {post.author.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="text-xs text-ink-soft uppercase tracking-wider mb-1">Written by</div>
                      <div className="text-ink font-medium text-lg">{post.author.name}</div>
                    </div>
                  </div>
                  
                  {post.tags?.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm text-ink-soft mr-1">Tags:</span>
                      {post.tags.map(t => (
                        <a key={t.id} href={`/tag/${t.slug}`} className="text-sm text-ink hover:text-brand transition-colors bg-ink/5 px-3 py-1 rounded-full">
                          #{t.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>

            {/* Sticky recommendations, left on desktop, after the article on mobile */}
            <aside className="lg:order-first">
              <div className="lg:sticky lg:top-28">
                <div className="eyebrow mb-6 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Keep reading
                </div>
                <h2 className="serif text-3xl">
                  More from the <span className="serif-italic">blog</span>
                </h2>

                <ul className="mt-8 flex flex-col">
                  {related.map((r) => (
                    <li key={r.id} className="border-t border-ink/10 first:border-t-0 first:pt-0 py-5">
                      <a href={`/${r.slug}`} className="group flex gap-4">
                        <span className="block h-20 w-24 shrink-0 overflow-hidden rounded-2xl bg-muted">
                          {r.featuredImageUrl ? (
                            <img
                              src={r.featuredImageUrl}
                              alt=""
                              loading="lazy"
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <span className="block h-full w-full bg-brand/10" />
                          )}
                        </span>
                        <span className="min-w-0">
                          {r.categories?.[0] && (
                            <span className="eyebrow block text-brand">{r.categories[0].name}</span>
                          )}
                          <span className="serif mt-1 block text-lg leading-snug line-clamp-3 transition-colors group-hover:text-ink-soft">
                            {r.title}
                          </span>
                          <span className="mt-1 block text-xs text-ink-soft">{r.formattedDate}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                <a
                  href="/blog"
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink/20 px-5 py-2.5 text-sm transition-colors hover:bg-brand hover:text-cream hover:border-brand"
                >
                  View all posts <span aria-hidden>→</span>
                </a>
              </div>
            </aside>
          </div>
        </div>
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
