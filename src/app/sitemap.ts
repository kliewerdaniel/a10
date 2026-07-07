import type { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/lib/blog';

const baseUrl = 'https://danielkliewer.com';
const POSTS_PER_PAGE = 20;

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllBlogPosts();
  const staticPages = [
    '',
    '/about',
    '/book',
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

  const archivePosts = posts.slice(6);
  const totalPages = Math.ceil(archivePosts.length / POSTS_PER_PAGE);

  const researchRoutes: MetadataRoute.Sitemap = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  ).map((page) => ({
    url: page === 1 ? `${baseUrl}/research` : `${baseUrl}/research?page=${page}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page === 1 ? 0.8 : 0.6,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...researchRoutes, ...postRoutes];
}
