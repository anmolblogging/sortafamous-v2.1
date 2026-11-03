import { SITE_NAME, SITE_URL } from "@/lib/site";

const SUFFIX = ` · ${SITE_NAME}`;
const MAX_TITLE = 60;
const MAX_DESCRIPTION = 160;

/**
 * Keeps the rendered <title> within 60 characters: uses the layout's
 * "· Sorta Famous" template when it fits, and drops it when it doesn't.
 */
export function seoTitle(title: string): string | { absolute: string } {
  if (title.length + SUFFIX.length <= MAX_TITLE) return title;
  if (title.length <= MAX_TITLE) return { absolute: title };
  // Still too long: keep the part before a colon, else cut at a word.
  const head = title.split(":")[0].trim();
  if (head.length <= MAX_TITLE && head.length >= 20) return seoTitle(head);
  const cut = title.slice(0, MAX_TITLE + 1);
  return { absolute: cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:·\-\s]+$/, "") };
}

/** Trims a description to 160 characters at a word boundary. */
export function seoDescription(text: string): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= MAX_DESCRIPTION) return clean;
  const cut = clean.slice(0, MAX_DESCRIPTION - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\s]+$/, "")}…`;
}

type Crumb = { name: string; path: string };

/** BreadcrumbList for a page, always starting at Home. */
export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "" }, ...crumbs].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}

/**
 * Standard page graph: the page itself (WebPage, AboutPage, ContactPage…)
 * linked to the site organisation, plus its breadcrumb trail. Extra nodes
 * (Service, ItemList…) can be appended with `extra`.
 */
export function pageSchema({
  type = "WebPage",
  path,
  name,
  description,
  crumbs,
  extra = [],
}: {
  type?: string;
  path: string;
  name: string;
  description: string;
  crumbs: Crumb[];
  extra?: object[];
}) {
  const url = `${SITE_URL}${path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": type,
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: "en-IN",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
      },
      breadcrumbSchema(crumbs),
      ...extra,
    ],
  };
}

export const websiteSchema = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: "en-IN",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

/** ItemList of blog posts for listing pages (blog, categories). */
export function postListSchema(posts: { slug: string; title: string }[]) {
  return {
    "@type": "ItemList",
    itemListElement: posts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/${p.slug}`,
      name: p.title,
    })),
  };
}
