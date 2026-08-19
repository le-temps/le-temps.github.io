import { getPublishedPosts, getCategoriesWithCount, getTagsWithCount } from '../utils/content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const siteUrl = context.site ? context.site.href.replace(/\/$/, '') : 'https://le-temps.github.io';
  const posts = await getPublishedPosts();
  const categories = await getCategoriesWithCount();
  const tags = await getTagsWithCount();

  const staticPages = [
    '',
    '/blog',
    '/archive',
    '/about',
  ];

  const staticUrls = staticPages.map((page) => `
  <url>
    <loc>${siteUrl}${page}</loc>
    <changefreq>daily</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('');

  const postUrls = posts.map((post) => `
  <url>
    <loc>${siteUrl}/blog/${post.slug}</loc>
    <lastmod>${post.data.date.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`).join('');

  const categoryUrls = categories.map((cat) => `
  <url>
    <loc>${siteUrl}/category/${encodeURIComponent(cat.category)}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`).join('');

  const tagUrls = tags.map((t) => `
  <url>
    <loc>${siteUrl}/tags/${encodeURIComponent(t.tag)}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`).join('');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${postUrls}
${categoryUrls}
${tagUrls}
</urlset>`;

  return new Response(sitemapXml.trim(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
