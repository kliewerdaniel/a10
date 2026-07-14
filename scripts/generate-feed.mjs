#!/usr/bin/env node
/**
 * generate-feed.mjs
 * ------------------
 * Builds a full-text RSS 2.0 feed for danielkliewer.com from the Markdown
 * sources in content/blog. Each <item> carries:
 *   - <description> : a short plain-text excerpt (no HTML)
 *   - <content:encoded> : the FULL post body rendered to sanitized HTML
 *
 * This gives AI agents / crawlers a JS-free, complete-text channel so they
 * never have to execute client-side JavaScript to read a post.
 *
 * Runs as an npm `prebuild` hook so the feed is always regenerated before
 * `next build` copies public/ -> out/. Output is written to both:
 *   - public/feed.xml   (source, copied into the export at build)
 *   - public/rss.xml    (alias for legacy/feed-reader compatibility)
 */

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, 'content', 'blog');
const PUBLIC_DIR = path.join(ROOT, 'public');
const BASE_URL = 'https://www.danielkliewer.com';

// --- date helpers ---------------------------------------------------------
function toIsoDate(dateStr) {
  if (!dateStr || typeof dateStr !== 'string') return '';
  if (/^\d{4}-\d{2}-\d{2}/.test(dateStr)) return dateStr.slice(0, 10);
  const m = dateStr.match(/^(\d{2})-(\d{2})-(\d{4})/); // MM-DD-YYYY
  if (m) return `${m[3]}-${m[1]}-${m[2]}`;
  return '';
}

function rfc822Date(dateStr) {
  const iso = toIsoDate(dateStr);
  if (!iso) return new Date().toUTCString();
  const d = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(d.getTime()) ? new Date().toUTCString() : d.toUTCString();
}

// --- markdown -> html -----------------------------------------------------
const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSanitize)
  .use(rehypeStringify);

async function mdToHtml(md) {
  const file = await processor.process(md || '');
  return String(file);
}

function plainExcerpt(md, max = 600) {
  const text = (md || '')
    .replace(/```[\s\S]*?```/g, ' ') // fenced code
    .replace(/`[^`]*`/g, ' ') // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links -> text
    .replace(/[#>*_~\-]/g, ' ') // md punctuation
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > max ? `${text.slice(0, max).trim()}…` : text;
}

// --- xml escaping ---------------------------------------------------------
function esc(s = '') {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// --- main -----------------------------------------------------------------
async function main() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.warn('[feed] content/blog not found, skipping feed generation.');
    return;
  }

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));

  const posts = [];
  for (const file of files) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');
    const { data, content } = matter(raw);
    const slug = file.replace(/\.mdx?$/, '');
    posts.push({ slug, data, content });
  }

  posts.sort((a, b) => {
    const da = toIsoDate(b.data.date);
    const db = toIsoDate(a.data.date);
    return da.localeCompare(db);
  });

  const items = await Promise.all(
    posts.map(async (p) => {
      const { data, content, slug } = p;
      const url = `${BASE_URL}/blog/${slug}`;
      const canonical = data.canonical || data.canonical_url || url;
      const html = await mdToHtml(content);
      const excerpt = plainExcerpt(content);
      const categories = (data.tags || []).map((t) => `      <category>${esc(t)}</category>`).join('\n');

      return `    <item>
      <title>${esc(data.title || slug)}</title>
      <link>${esc(url)}</link>
      <guid isPermaLink="true">${esc(canonical)}</guid>
      <pubDate>${rfc822Date(data.date)}</pubDate>
      <dc:creator>${esc(data.author || 'Daniel Kliewer')}</dc:creator>
${categories}
      <description>${esc(excerpt)}</description>
      <content:encoded><![CDATA[${html}]]></content:encoded>
    </item>`;
    })
  );

  const latest = posts[0] ? rfc822Date(posts[0].data.date) : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Daniel Kliewer — Sovereign AI Research</title>
    <link>${BASE_URL}</link>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Chronological essays and field notes on sovereign AI, local-first architecture, agent systems, and knowledge infrastructure.</description>
    <language>en-us</language>
    <lastBuildDate>${latest}</lastBuildDate>
    <generator>generate-feed.mjs</generator>
${items.join('\n')}
  </channel>
</rss>
`;

  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  fs.writeFileSync(path.join(PUBLIC_DIR, 'feed.xml'), xml, 'utf-8');
  fs.writeFileSync(path.join(PUBLIC_DIR, 'rss.xml'), xml, 'utf-8');
  console.log(`[feed] wrote feed.xml + rss.xml (${posts.length} posts).`);

  // Per-post plain-text mirrors. These are REAL static files on disk (copied
  // into the static export at build), so a no-JS crawler that requests
  // /blog-txt/<slug>.txt gets the complete article as raw text — no
  // JavaScript, no client hydration required.
  //
  // NOTE: we deliberately use a dedicated `blog-txt/` directory. Next.js's
  // html export already writes RSC flight payloads named `out/blog/<slug>.txt`,
  // so writing our mirrors to `blog/<slug>.txt` would collide and be
  // overwritten by Next's internal files. `blog-txt/` is collision-free.
  const txtDir = path.join(PUBLIC_DIR, 'blog-txt');
  if (fs.existsSync(txtDir)) {
    for (const f of fs.readdirSync(txtDir)) {
      if (f.endsWith('.txt')) fs.rmSync(path.join(txtDir, f), { force: true });
    }
  } else {
    fs.mkdirSync(txtDir, { recursive: true });
  }
  let txtCount = 0;
  for (const p of posts) {
    const { data, content, slug } = p;
    const header = [
      data.title || slug,
      '',
      `Author: ${data.author || 'Daniel Kliewer'}`,
      `Date: ${toIsoDate(data.date)}`,
      data.tags && data.tags.length ? `Tags: ${data.tags.join(', ')}` : '',
      data.description ? `Description: ${data.description}` : '',
      '',
      '---',
      '',
    ]
      .filter((l) => l !== '')
      .join('\n');
    fs.writeFileSync(path.join(txtDir, `${slug}.txt`), `${header}${content}\n`, 'utf-8');
    txtCount += 1;
  }
  console.log(`[feed] wrote ${txtCount} plain-text post mirrors to public/blog-txt/*.txt`);
}

main().catch((err) => {
  console.error('[feed] generation failed:', err);
  process.exit(1);
});
