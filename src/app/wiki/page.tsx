import type { Metadata } from 'next';
import { getAllWikiEntries } from '@/lib/wiki';
import { Card, Badge } from '@/components/ui/Card';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Wiki',
  description: 'Knowledge base for local-first AI concepts, tools, and architectures referenced in the blog and book.',
};

export default function WikiPage() {
  const entries = getAllWikiEntries();

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl mb-4">Wiki</h1>
          <p className="text-ink-3 max-w-2xl mx-auto font-bold">
            Quick references for concepts, tools, and architectures discussed in the blog and <em>Sovereign AI</em>.
          </p>
        </div>

        {entries.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-ink-3 mb-4 font-bold">Wiki content is being migrated.</p>
            <p className="text-sm text-ink-3 font-bold">Check back soon for a comprehensive knowledge base.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {entries.map((entry) => (
              <Link key={entry.slug} href={`/wiki/${entry.slug}`}>
                <Card className="h-full">
                  <h3 className="font-display text-ink mb-2">
                    {entry.title}
                  </h3>
                  <p className="text-sm text-ink-3 mb-3 line-clamp-3">{entry.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {entry.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} color="green">{tag}</Badge>
                    ))}
                  </div>
                  {entry.bookChapter && (
                    <p className="mono text-xs accent-orange mt-3">Book Ch. {entry.bookChapter}</p>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
