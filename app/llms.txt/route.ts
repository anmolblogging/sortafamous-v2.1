import { getBlogPosts, type BlogPost } from "@/lib/blogs";
import { cases } from "@/lib/cases";
import { BUSINESS, SITE_URL } from "@/lib/site";

// llms.txt (https://llmstxt.org): a plain-markdown map of the site for AI crawlers.
export const revalidate = 3600;

export async function GET() {
  const { posts } = await getBlogPosts({ perPage: 100 });
  const a = BUSINESS.address;

  const body = `# Sorta Famous

> ${BUSINESS.description}

Sorta Famous works with founders, startups, celebrities and modern brands across India. It offers monthly retainers as well as one-time, project-based services.

- Email: ${BUSINESS.email}
- Phone: ${BUSINESS.phone}
- Address: ${a.streetAddress}, ${a.addressLocality}, ${a.addressRegion} ${a.postalCode}, India

## Main pages

- [Home](${SITE_URL}/): Overview of services, process, selected work and FAQs
- [Services](${SITE_URL}/services): Public relations, social media marketing, brand management, performance marketing, personal branding and project-based services
- [About](${SITE_URL}/about): Who Sorta Famous is and how the team works
- [How it works](${SITE_URL}/how-it-works): The engagement process, from discovery to monthly reporting
- [Contact](${SITE_URL}/contact): Enquiry form, email, phone and office address
- [Careers](${SITE_URL}/careers): Open roles

## Selected work

${cases
  .filter((c) => !c.hidden)
  .map((c) => `- [${c.client}: ${c.t}](${SITE_URL}/work/${c.slug}): ${c.summary}`)
  .join("\n")}

## Blog

${posts.map((p: BlogPost) => `- [${p.title}](${SITE_URL}/${p.slug}): ${p.seo?.description || p.excerpt}`).join("\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
