import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const contentDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  description: string;
  tags: string[];
  image: string;
  bookReference: boolean;
  wikiReferences: string[];
  readingTime: string;
  content: string;
}

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(contentDirectory)) return [];

  const files = fs.readdirSync(contentDirectory).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));

  const posts = files.map((filename) => {
    const filePath = path.join(contentDirectory, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const stats = readingTime(content);

    return {
      slug: filename.replace(/\.mdx?$/, ''),
      title: data.title || '',
      date: data.date || '',
      author: data.author || 'Daniel Kliewer',
      description: data.description || '',
      tags: data.tags || [],
      image: data.image || '/images/placeholder.png',
      bookReference: data.book_reference || false,
      wikiReferences: data.wiki_references || [],
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

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    author: data.author || 'Daniel Kliewer',
    description: data.description || '',
    tags: data.tags || [],
    image: data.image || '/images/placeholder.png',
    bookReference: data.book_reference || false,
    wikiReferences: data.wiki_references || [],
    readingTime: stats.text.replace('min read', 'min'),
    content,
  };
}

export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) return [];
  const files = fs.readdirSync(contentDirectory).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  return files.map(f => f.replace(/\.mdx?$/, ''));
}
