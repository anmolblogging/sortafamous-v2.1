function resolveCmsUrl(): string {
  const raw = process.env.NEXT_PUBLIC_CMS_URL;
  const url = raw ? raw.trim().replace(/\/+$/, '') : 'https://cms.sortafamous.in';
 
  // catches the common mistake of pointing this at the public site by accident
  if (!url || url === 'https://sortafamous.in' || url === 'http://sortafamous.in') {
    return 'https://cms.sortafamous.in';
  }
  return url;
}
 
export const CMS_BASE_URL = resolveCmsUrl();
export const WP_API_BASE = `${CMS_BASE_URL}/wp-json/wp/v2`;

export function stripHtml(input?: string | null): string {
  if (!input) return '';
  return String(input)
    .replace(/<\/?[^>]+(>|$)/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .trim();
}

export interface TaxonomyTerm {
  id: number;
  name: string;
  slug: string;
  count?: number;
}
 
export interface Author {
  id: number;
  name: string;
  slug: string;
  avatarUrl?: string | null;
}
 
export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  contentHtml: string;
  excerpt: string;
  featuredImageUrl: string | null;
  publishedDate: string;
  modifiedDate: string;
  formattedDate: string;
  readTime: string;
  author: Author;
  categories: TaxonomyTerm[];
  tags: TaxonomyTerm[];
  seo?: SEOData;
}

export async function getBlogPosts(options?: {
  page?: number;
  perPage?: number;
  categoryId?: number;
  tagId?: number;
  search?: string;
}) {
  const page = options?.page ?? 1;
  const perPage = options?.perPage ?? 12;
 
  let url = `${WP_API_BASE}/posts?_embed=1&page=${page}&per_page=${perPage}&orderby=date&order=desc`;
  if (options?.categoryId) url += `&categories=${options.categoryId}`;
  if (options?.tagId) url += `&tags=${options.tagId}`;
  if (options?.search) url += `&search=${encodeURIComponent(options.search)}`;
 
  const res = await fetchCms(url).catch(() => null);
  if (!res) return { posts: [], total: 0, totalPages: 0 };
 
  const total = Number(res.headers.get('X-WP-Total') || 0);
  const totalPages = Number(res.headers.get('X-WP-TotalPages') || 1);
  const raw = await res.json();
 
  return { posts: raw.map(normalizePost), total, totalPages };
}

/**
 * The CMS is on shared hosting that answers bursts of requests with 508
 * (resource limit), so requests retry with back-off and then throw. Throwing
 * matters: a failed build or revalidation keeps serving the last good page
 * instead of caching a 404 for a real post.
 */
async function fetchCms(url: string): Promise<Response> {
  for (let attempt = 1; ; attempt++) {
    const res = await fetch(url, { next: { revalidate: 60 } }).catch(() => null);
    if (res?.ok) return res;
    if (attempt === 5) throw new Error(`CMS request failed (${res?.status ?? 'network error'}): ${url}`);
    await new Promise((r) => setTimeout(r, 1000 * 2 ** (attempt - 1)));
  }
}
 
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const res = await fetchCms(`${WP_API_BASE}/posts?_embed=1&slug=${encodeURIComponent(slug)}`);
  const raw = await res.json();
  return raw.length ? normalizePost(raw[0]) : null;
}

function formatDate(iso?: string | null): string {
  if (!iso) return '';
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(iso));
}
 
function readingTime(html: string): string {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}
 
export function normalizePost(item: any): BlogPost {
  const title = stripHtml(item.title?.rendered || `Post ${item.id}`);
  // The page title is the only H1, so headings typed as H1 in the CMS become H2.
  let contentHtml = (item.content?.rendered || '').replace(/<(\/?)h1(\s|>)/gi, '<$1h2$2');
  const excerptSource = stripHtml(item.excerpt?.rendered || contentHtml);
  const excerpt = excerptSource.slice(0, 160) + (excerptSource.length > 160 ? '…' : '');
  
  // Transform <p><strong>Question?</strong> Answer</p> into stylish FAQ cards
  contentHtml = contentHtml.replace(/<p[^>]*>\s*<strong>(.*?\?\s*)<\/strong>\s*(.*?)<\/p>/gi, (match: string, q: string, a: string) => {
    return `<div class="faq-card bg-brand/5 p-6 rounded-[1.5rem] my-6 border border-brand/10">
      <h3 class="font-serif text-xl md:text-2xl text-brand mb-3 mt-0 leading-tight">${q.trim()}</h3>
      <p class="text-ink-soft mb-0 m-0">${a.trim()}</p>
    </div>`;
  });
 
  let featuredImageUrl: string | null = item._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
  if (!featuredImageUrl) {
    const imgMatch = contentHtml.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (imgMatch) featuredImageUrl = imgMatch[1];
  }
 
  const rawAuthor = item._embedded?.author?.[0];
  const author: Author = {
    id: rawAuthor?.id ?? item.author ?? 1,
    name: rawAuthor?.name ? stripHtml(rawAuthor.name) : 'Editorial Team',
    slug: rawAuthor?.slug || 'team',
    avatarUrl: rawAuthor?.avatar_urls?.['96'] || null,
  };
 
  const categories: TaxonomyTerm[] = [];
  const tags: TaxonomyTerm[] = [];
  (item._embedded?.['wp:term'] || []).flat().forEach((term: any) => {
    if (!term?.name) return;
    const entry = { id: term.id, name: stripHtml(term.name), slug: term.slug, count: term.count };
    if (term.taxonomy === 'category') categories.push(entry);
    if (term.taxonomy === 'post_tag') tags.push(entry);
  });
 
  return {
    id: item.id,
    slug: item.slug,
    title,
    contentHtml,
    excerpt,
    featuredImageUrl,
    publishedDate: item.date_gmt ? `${item.date_gmt}Z` : item.date,
    modifiedDate: item.modified_gmt ? `${item.modified_gmt}Z` : item.modified || item.date,
    formattedDate: formatDate(item.date),
    readTime: readingTime(contentHtml),
    author,
    categories,
    tags,
    seo: extractSeo(item, title, excerpt),
  };
}

export async function getBlogCategories(): Promise<TaxonomyTerm[]> {
  const res = await fetch(`${WP_API_BASE}/categories?per_page=100&hide_empty=true`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return [];
  const raw = await res.json();
  return raw
    .map((c: any) => ({ id: c.id, name: stripHtml(c.name), slug: c.slug, count: c.count }))
    .filter((c: TaxonomyTerm) => c.name.toLowerCase() !== 'uncategorized');
}

export async function getBlogTags(): Promise<TaxonomyTerm[]> {
  const res = await fetch(`${WP_API_BASE}/tags?per_page=100&hide_empty=true`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return [];
  const raw = await res.json();
  return raw.map((t: any) => ({ id: t.id, name: stripHtml(t.name), slug: t.slug, count: t.count }));
}

export function categoriesFromPosts(posts: BlogPost[]): TaxonomyTerm[] {
  const counts = new Map<string, TaxonomyTerm>();
  posts.forEach((post) => {
    post.categories.forEach((c) => {
      const key = c.slug.toLowerCase();
      const existing = counts.get(key);
      existing ? (existing.count = (existing.count ?? 0) + 1) : counts.set(key, { ...c, count: 1 });
    });
  });
  return [...counts.values()].sort((a, b) => (b.count ?? 0) - (a.count ?? 0));
}

const SITE_NAME_SUFFIX = /\s*[-|–·]\s*(Sorta Famous|CMS|cms\.sortafamous\.in)\s*$/i;

// Canonical URLs and structured data are built on the site from the post slug
// (see app/[slug]/page.tsx). The CMS versions use the WordPress permalink
// structure, /category/slug/, which does not exist on sortafamous.in.
export function extractSeo(item: any, fallbackTitle = '', fallbackDesc = ''): SEOData {
  const head = item?.aioseo_head_json || {};
  const meta = item?.aioseo_meta_data || {};
 
  let title = stripHtml(head.title || meta.title || fallbackTitle);
  // AIOSEO appends the WordPress site name to some titles; the layout's title
  // template already adds "· Sorta Famous".
  title = title.replace(SITE_NAME_SUFFIX, '');
 
  const description = stripHtml(head.description || meta.description || fallbackDesc).slice(0, 160);
 
  return {
    title,
    description,
    keywords: typeof head.keywords === 'string' && head.keywords ? head.keywords : undefined,
    ogTitle: stripHtml(head['og:title'] || title).replace(SITE_NAME_SUFFIX, ''),
    ogDescription: head['og:description'] || description,
    ogImage: head['og:image'],
  };
}
