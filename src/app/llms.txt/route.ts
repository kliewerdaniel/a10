import { NextResponse } from 'next/server';
import { getAllBlogPosts } from '@/lib/blog';

// llms.txt — the index convention (https://llmstxt.org) that lets AI agents
// discover and pull this site's content directly. Generated from the live blog
// index so it always covers the most recent posts without manual editing.
export const dynamic = 'force-static';

export async function GET() {
  const baseUrl = 'https://www.danielkliewer.com';
  const posts = getAllBlogPosts();

  const lines: string[] = [];
  lines.push('# danielkliewer.com');
  lines.push('');
  lines.push('> Daniel Kliewer writes on Sovereign AI, local-first intelligence,');
  lines.push('> research compilers, and the architecture of human flourishing.');
  lines.push('> This file is an index for LLMs; the full text of every post is in');
  lines.push('> llms-full.txt.');
  lines.push('');
  lines.push(`- [Blog index](${baseUrl}/blog)`);
  lines.push(`- [Research / archive](${baseUrl}/research)`);
  lines.push(`- [About](${baseUrl}/about)`);
  lines.push(`- [The book: Sovereign AI](${baseUrl}/book)`);
  lines.push('');
  lines.push('## Blog posts (newest first)');
  lines.push('');
  for (const post of posts) {
    const url = `${baseUrl}/blog/${post.slug}`;
    const tags = post.tags && post.tags.length ? ` #${post.tags.slice(0, 4).join(' #')}` : '';
    lines.push(`- [${post.title}](${url}): ${post.description}${tags}`);
  }
  lines.push('');
  lines.push('## Full content');
  lines.push('');
  lines.push(`- [llms-full.txt](${baseUrl}/llms-full.txt) — complete text of every post`);
  lines.push('');

  return new NextResponse(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
