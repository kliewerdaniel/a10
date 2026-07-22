import { NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/lib/blog';

// llms-full.txt — the complete, plain-text corpus of every blog post, for direct
// consumption by LLMs. Generated from the live blog so it always reflects the
// current state of the site, including the most recent posts.
export const dynamic = 'force-static';

export async function GET() {
  const baseUrl = 'https://www.danielkliewer.com';
  const posts = getAllBlogPosts();

  const parts: string[] = [];
  parts.push('# danielkliewer.com — full blog corpus');
  parts.push('');
  parts.push(`Source: ${baseUrl}/llms.txt`);
  parts.push('');

  for (const post of posts) {
    const url = `${baseUrl}/blog/${post.slug}`;
    parts.push(`## ${post.title}`);
    parts.push('');
    parts.push(`URL: ${url}`);
    parts.push(`Date: ${post.date}`);
    parts.push(`Author: ${post.author}`);
    if (post.tags && post.tags.length) parts.push(`Tags: ${post.tags.join(', ')}`);
    parts.push('');
    parts.push(post.description);
    parts.push('');
    parts.push(post.content.trim());
    parts.push('');
    parts.push('---');
    parts.push('');
  }

  return new NextResponse(parts.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
