import type { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/blog';

const baseUrl = 'https://danielkliewer.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllBlogPosts();
  const staticPages = [
    '',
    '/about',
    '/book',
    '/research',
    '/blog',
    '/projects',
    '/press',
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: page === '' ? 1.0 : 0.8,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
