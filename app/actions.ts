'use server';

import { getBlogPosts } from '@/lib/blogs';

export async function loadMorePosts(page: number, categoryId?: number, tagId?: number, search?: string) {
  try {
    const { posts } = await getBlogPosts({
      page,
      categoryId,
      tagId,
      search,
    });
    return { posts };
  } catch {
    // CMS unreachable: show no extra posts rather than an error.
    return { posts: [] };
  }
}
