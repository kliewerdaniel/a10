import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import categories from '@/data/research-categories.json';
import cornerstoneSlugs from '@/data/featured-articles.json';

const contentDirectory = path.join(process.cwd(), 'content/blog');

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

  readingTime: string;
  content: string;
}

export interface ResearchCategory {
  slug: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  keywords: string[];
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
  if (!fs.existsSync(contentDirectory)) return [];

  const files = fs.readdirSync(contentDirectory).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));

  const posts = files.map((filename) => {
    const filePath = path.join(contentDirectory, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const stats = readingTime(content);
    const slug = filename.replace(/\.mdx?$/, '');
    const tags = data.tags || [];
    const title = data.title || '';
    const description = data.description || '';

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
      readingTime: stats.text.replace('min read', 'min'),
      content,
    };
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(contentDirectory, `${slug}.md`);
  const filePathMdx = path.join(contentDirectory, `${slug}.mdx`);

  const actualPath = fs.existsSync(filePath) ? filePath : fs.existsSync(filePathMdx) ? filePathMdx : null;
  if (!actualPath) return null;

  const fileContent = fs.readFileSync(actualPath, 'utf-8');
  const { data, content } = matter(fileContent);
  const stats = readingTime(content);
  const tags = data.tags || [];
  const title = data.title || '';
  const description = data.description || '';

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
    readingTime: stats.text.replace('min read', 'min'),
    content,
  };
}

export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) return [];
  const files = fs.readdirSync(contentDirectory).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  return files.map(f => f.replace(/\.mdx?$/, ''));
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
