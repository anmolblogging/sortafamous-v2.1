import { SITE_URL } from "@/lib/site";

// Served as a route rather than app/robots.ts because the metadata API has no
// field for Content-Signal. Per contentsignals.org the signal belongs inside
// the User-Agent group it applies to.
const body = `# Content Signals - AI & Search Usage Preferences
# https://contentsignals.org/
User-Agent: *
Content-Signal: ai-train=no, search=yes, ai-input=yes
Allow: /
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
`;

export function GET() {
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
