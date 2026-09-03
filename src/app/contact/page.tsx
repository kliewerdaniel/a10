import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Reach out to Daniel Kliewer — for interviews, speaking, research collaboration, or questions about the Sovereign Agent Fleet.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'Contact', url: '/contact' },
          ]}
        />
        <h1 className="font-display text-4xl mb-8">Contact</h1>
        <div className="space-y-6 text-ink-3 leading-relaxed">
          <p>
            For interviews, speaking engagements, research collaboration, or questions
            about the Sovereign Agent Fleet:
          </p>
          <div className="space-y-3">
            <p>
              <span className="font-mono text-xs tracking-[0.14em] uppercase text-ink-3">Email</span><br />
              <a href="mailto:danielkliewer@gmail.com" className="accent-green hover:text-green-dark text-lg">
                danielkliewer@gmail.com
              </a>
            </p>
            <p>
              <span className="font-mono text-xs tracking-[0.14em] uppercase text-ink-3">X / Twitter</span><br />
              <a href="https://x.com/kliewer_daniel" target="_blank" rel="noopener noreferrer" className="accent-green hover:text-green-dark text-lg">
                @kliewer_daniel
              </a>
            </p>
            <p>
              <span className="font-mono text-xs tracking-[0.14em] uppercase text-ink-3">GitHub</span><br />
              <a href="https://github.com/kliewerdaniel" target="_blank" rel="noopener noreferrer" className="accent-green hover:text-green-dark text-lg">
                github.com/kliewerdaniel
              </a>
            </p>
            <p>
              <span className="font-mono text-xs tracking-[0.14em] uppercase text-ink-3">LinkedIn</span><br />
              <a href="https://www.linkedin.com/in/daniel-kliewer-42691944/" target="_blank" rel="noopener noreferrer" className="accent-green hover:text-green-dark text-lg">
                daniel-kliewer
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
