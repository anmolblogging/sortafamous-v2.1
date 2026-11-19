import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * Instant updates from WordPress.
 *
 * WordPress calls this link whenever a post, page or property is published,
 * edited, unpublished or deleted. The whole site's cached pages are then marked
 * out of date, so the very next visitor gets fresh content from WordPress.
 *
 * Protected by the REVALIDATE_SECRET environment variable (set in Vercel).
 * WordPress sends it in the "x-revalidate-secret" header (or ?secret=...).
 */
export const dynamic = "force-dynamic";

function handle(req: NextRequest) {
  const expected = process.env.REVALIDATE_SECRET;
  const given =
    req.headers.get("x-revalidate-secret") ??
    req.nextUrl.searchParams.get("secret");

  if (!expected || given !== expected) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true, revalidated: new Date().toISOString() });
}

export const POST = handle;
export const GET = handle;
