import rss from '@astrojs/rss';
import { getPublishedPosts } from '../utils/content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();

  return rss({
    title: "Joy's Blog | le-temps.dev",
    description: '大语言模型 (LLM)、AI Agent 智能体与科研手记',
    site: context.site || 'https://le-temps.github.io',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/posts/${post.slug}/`,
      categories: [post.data.category, ...post.data.tags],
    })),
    customData: `<language>zh-CN</language>`,
  });
}
