import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for danielkliewer.com and the Sovereign AI project.',
};

export default function PrivacyPage() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Privacy', url: '/privacy' },
          ]}
        />
        <h1 className="font-display text-4xl mb-8">Privacy Policy</h1>
        <p className="mono text-xs text-ink-3 mb-8">Last updated: June 2026</p>

        <div className="space-y-8 text-ink-3 leading-relaxed font-bold">
          <div>
            <h2 className="font-display text-xl mb-3">What This Site Collects</h2>
            <p>
              This site uses Vercel Analytics to measure basic traffic and performance.
              Vercel Analytics is privacy-first — it does not use cookies, does not track
              users across sites, and collects only anonymized, aggregated data. No personal
              data is collected. There are no advertising cookies and no user accounts.
              The contact form is not connected to a database — messages are sent via email
              and not stored.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl mb-3">Cookies</h2>
            <p>
              This site uses no cookies. If you consent to marketing, Google AdSense may set cookies
              for personalized ads. You can change your preferences at any time via the cookie banner.
              Google&apos;s ads.txt is also served for ads.txt verification purposes.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl mb-3">External Links</h2>
            <p>
              This site contains links to external services (Amazon, GitHub, X, LinkedIn).
              These sites have their own privacy policies. I am not responsible for their practices.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl mb-3">Book Purchases</h2>
            <p>
              The book is sold through Amazon. All purchase data, payment information, and
              order fulfillment is handled entirely by Amazon. I do not have access to
              your purchase details.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl mb-3">Open Source</h2>
            <p>
              The projects linked from this site are open source. Their respective
              repositories may have their own privacy considerations depending on
              how you use them.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl mb-3">Contact</h2>
            <p>
              Questions about this policy? Reach out on{' '}
              <a href="https://x.com/kliewer_daniel" target="_blank" rel="noopener noreferrer" className="accent-green hover:text-green-dark">X</a>{' '}
              or{' '}
              <a href="https://github.com/kliewerdaniel" target="_blank" rel="noopener noreferrer" className="accent-green hover:text-green-dark">GitHub</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
