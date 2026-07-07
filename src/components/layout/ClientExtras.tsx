'use client';

import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { CanonicalUrl } from '@/components/seo/CanonicalUrl';

export function ClientExtras() {
  return (
    <>
      <CanonicalUrl />
      <ScrollToTop />
    </>
  );
}
