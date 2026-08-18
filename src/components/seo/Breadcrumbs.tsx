import Link from 'next/link';
import { JsonLd } from './JsonLd';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const baseUrl = 'https://www.danielkliewer.com';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: index < items.length - 1 ? `${baseUrl}${item.url}` : undefined,
    })),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-sm font-serif">
          {items.map((item, index) => (
            <li key={item.url} className="flex items-center gap-2">
              {index > 0 && <span className="text-[var(--color-ink-3)]">/</span>}
              {index < items.length - 1 ? (
                <Link
                  href={item.url}
                  className="text-[var(--color-ink-3)] hover:text-[var(--color-green)] transition-colors"
                >
                  {item.name}
                </Link>
              ) : (
                <span className="text-[var(--color-ink)]">{item.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
