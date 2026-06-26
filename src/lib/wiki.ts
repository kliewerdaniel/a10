import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const wikiDirectory = path.join(process.cwd(), 'content/wiki');

export interface WikiEntry {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  relatedPosts: string[];
  relatedWiki: string[];
  bookChapter: number | null;
  content: string;
}

export function getAllWikiEntries(): WikiEntry[] {
  if (!fs.existsSync(wikiDirectory)) return [];

  const files = fs.readdirSync(wikiDirectory).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));

  return files.map((filename) => {
    const filePath = path.join(wikiDirectory, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    return {
      slug: filename.replace(/\.mdx?$/, ''),
      title: data.title || '',
      description: data.description || '',
      tags: data.tags || [],
      relatedPosts: data.related_posts || [],
      relatedWiki: data.related_wiki || [],
      bookChapter: data.book_chapter || null,
      content,
    };
  }).sort((a, b) => a.title.localeCompare(b.title));
}

export function getWikiEntry(slug: string): WikiEntry | null {
  const filePath = path.join(wikiDirectory, `${slug}.md`);
  const filePathMdx = path.join(wikiDirectory, `${slug}.mdx`);

  const actualPath = fs.existsSync(filePath) ? filePath : fs.existsSync(filePathMdx) ? filePathMdx : null;
  if (!actualPath) return null;

  const fileContent = fs.readFileSync(actualPath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || '',
    description: data.description || '',
    tags: data.tags || [],
    relatedPosts: data.related_posts || [],
    relatedWiki: data.related_wiki || [],
    bookChapter: data.book_chapter || null,
    content,
  };
}

export function getAllWikiSlugs(): string[] {
  if (!fs.existsSync(wikiDirectory)) return [];
  const files = fs.readdirSync(wikiDirectory).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  return files.map(f => f.replace(/\.mdx?$/, ''));
}
