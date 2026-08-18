import type { MetadataRoute } from 'next';
import { getAllBlogPosts, getCategories } from '@/lib/blog';

const baseUrl = 'https://www.danielkliewer.com';
const POSTS_PER_PAGE = 20;

export const dynamic = 'force-static';
export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllBlogPosts();
  const categories = getCategories();

  const staticPages = [
    '',
    '/about',
    '/book',
    '/fleet',
    '/press',
    '/privacy',
    '/terms',
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

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/research/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.lastmod),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...researchRoutes, ...categoryRoutes, ...postRoutes];
}
