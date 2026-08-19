import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

/**
 * Get all published posts sorted by date descending.
 */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/**
 * Get featured posts.
 */
export async function getFeaturedPosts(): Promise<Post[]> {
  const posts = await getPublishedPosts();
  return posts.filter((p) => p.data.featured);
}

/**
 * Get all unique tags with their post counts.
 */
export async function getTagsWithCount(): Promise<{ tag: string; count: number }[]> {
  const posts = await getPublishedPosts();
  const tagMap = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    }
  }

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Get all unique categories with their post counts.
 */
export async function getCategoriesWithCount(): Promise<{ category: string; count: number }[]> {
  const posts = await getPublishedPosts();
  const catMap = new Map<string, number>();

  for (const post of posts) {
    const cat = post.data.category;
    catMap.set(cat, (catMap.get(cat) || 0) + 1);
  }

  return Array.from(catMap.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Group posts by Year for Archive timeline.
 */
export async function getArchiveByYear(): Promise<{ year: number; posts: Post[] }[]> {
  const posts = await getPublishedPosts();
  const yearMap = new Map<number, Post[]>();

  for (const post of posts) {
    const year = post.data.date.getFullYear();
    if (!yearMap.has(year)) {
      yearMap.set(year, []);
    }
    yearMap.get(year)!.push(post);
  }

  return Array.from(yearMap.entries())
    .map(([year, posts]) => ({ year, posts }))
    .sort((a, b) => b.year - a.year);
}
