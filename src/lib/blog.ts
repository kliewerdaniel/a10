import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import categories from '@/data/research-categories.json';
import cornerstoneSlugs from '@/data/featured-articles.json';
import { getArtifactIndexMap, type ArtifactStatus } from '@/lib/artifacts';

const contentDirectory = path.join(process.cwd(), 'content/blog');

let cachedPosts: BlogPost[] | null = null;
let cachedSlugs: string[] | null = null;
let cachedCategoryCounts: Record<string, number> | null = null;

const POST_CACHE_KEY = Symbol('posts');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  lastmod: string;
  author: string;
  description: string;
  tags: string[];
  image: string;
  bookReference: boolean;
  featured: boolean;
  category: string;
  canonicalUrl: string | null;

  readingTime: string;
  content: string;

  /** Epistemic status from the knowledge-compiler artifact index (if present). */
  status: ArtifactStatus;
  /** Controlled-vocab topics from the artifact index (if present). */
  topics: string[];
  /** Build-time content hash (sha256:...) from the artifact index. */
  contentHash: string | null;
}

export interface ResearchCategory {
  slug: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  keywords: string[];
}

function parsePost(filename: string): BlogPost {
  const filePath = path.join(contentDirectory, filename);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const stats = readingTime(content);
  const slug = filename.replace(/\.mdx?$/, '');
  const tags = data.tags || [];
  const title = data.title || '';
  const description = data.description || '';

  // Merge compiler artifact metadata (status / topics / hash) when available.
  // Build-time only; absent for posts the compiler hasn't indexed (graceful).
  const artifact = getArtifactIndexMap().get(slug);

  return {
    slug,
    title,
    date: data.date || '',
    lastmod: data.lastmod || data.date || '',
    author: data.author || 'Daniel Kliewer',
    description,
    tags,
    image: data.image || '/images/placeholder.png',
    bookReference: data.book_reference || false,
    featured: data.featured || false,
    category: data.category || assignCategory(title, description, slug, tags),
    canonicalUrl: data.canonical_url || null,
    readingTime: stats.text.replace('min read', 'min'),
    content,
    status: (artifact?.status as ArtifactStatus) || 'observed',
    topics: artifact?.topics || [],
    contentHash: artifact?.content_hash || null,
  };
}

function loadPosts(): BlogPost[] {
  if (cachedPosts) return cachedPosts;

  if (!fs.existsSync(contentDirectory)) {
    cachedPosts = [];
    cachedSlugs = [];
    return cachedPosts;
  }

  const files = fs.readdirSync(contentDirectory).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  const posts = files.map(parsePost);
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  cachedPosts = posts;
  cachedSlugs = posts.map(p => p.slug);
  return cachedPosts;
}

export function invalidatePostCache() {
  cachedPosts = null;
  cachedSlugs = null;
  cachedCategoryCounts = null;
}

function assignCategory(title: string, description: string, slug: string, tags: string[]): string {
  const haystack = `${title} ${description} ${slug} ${tags.join(' ')}`.toLowerCase();

  for (const cat of categories as ResearchCategory[]) {
    for (const keyword of cat.keywords) {
      if (haystack.includes(keyword)) {
        return cat.slug;
      }
    }
  }

  return 'architecture';
}

export function getAllBlogPosts(): BlogPost[] {
  return loadPosts();
}

export function getBlogPost(slug: string): BlogPost | null {
  const posts = loadPosts();
  const post = posts.find(p => p.slug === slug);
  if (!post) {
    const filePath = path.join(contentDirectory, `${slug}.md`);
    const filePathMdx = path.join(contentDirectory, `${slug}.mdx`);
    const actualPath = fs.existsSync(filePath) ? filePath : fs.existsSync(filePathMdx) ? filePathMdx : null;
    if (!actualPath) return null;

    const parsed = parsePost(path.basename(actualPath));
    return parsed;
  }
  return post;
}

export function getAllBlogSlugs(): string[] {
  if (cachedSlugs) return cachedSlugs;

  if (!fs.existsSync(contentDirectory)) {
    cachedSlugs = [];
    return cachedSlugs;
  }

  const files = fs.readdirSync(contentDirectory).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  cachedSlugs = files.map(f => f.replace(/\.mdx?$/, ''));
  return cachedSlugs;
}

export function getFeaturedPosts(): BlogPost[] {
  return getAllBlogPosts().filter(p => p.featured);
}

export function getCornerstonePosts(): BlogPost[] {
  const allPosts = getAllBlogPosts();
  const posts = cornerstoneSlugs
    .map(slug => allPosts.find(p => p.slug === slug))
    .filter(Boolean) as BlogPost[];
  return posts.length > 0 ? posts : getFeaturedPosts();
}

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return getAllBlogPosts().filter(p => p.category === categorySlug);
}

export function getCategories(): ResearchCategory[] {
  return categories as ResearchCategory[];
}

export function getCategoryBySlug(slug: string): ResearchCategory | undefined {
  return (categories as ResearchCategory[]).find(c => c.slug === slug);
}

export function getCategoryArticleCounts(): Record<string, number> {
  if (cachedCategoryCounts) return cachedCategoryCounts;

  const counts: Record<string, number> = {};
  const posts = getAllBlogPosts();
  for (const post of posts) {
    counts[post.category] = (counts[post.category] || 0) + 1;
  }

  cachedCategoryCounts = counts;
  return counts;
}
