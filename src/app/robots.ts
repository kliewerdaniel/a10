import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';
export const revalidate = false;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Baseline policy for all automated agents.
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
      // Explicit allow-list for recognized AI training/answer engines.
      // These ensure text parsers are never blanket-blocked.
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
    ],
    sitemap: 'https://www.danielkliewer.com/sitemap.xml',
    // Machine-readable feed so agents can pull full post text directly.
    host: 'https://www.danielkliewer.com',
  };
}
