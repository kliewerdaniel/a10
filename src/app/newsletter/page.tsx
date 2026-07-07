import type { Metadata } from 'next';
import Link from 'next/link';
import { NewsletterSignup } from '@/components/newsletter/NewsletterSignup';

export const metadata: Metadata = {
  title: 'Sovereign AI Newsletter — Architectures for Intelligence You Own',
  description: 'Weekly insights on sovereign AI architecture, local-first systems, and the engineering of intelligence you actually own. Join 5,000+ architects building the future of AI.',
  openGraph: {
    title: 'Sovereign AI Newsletter',
    description: 'Weekly insights on sovereign AI architecture, local-first systems, and the engineering of intelligence you actually own.',
    type: 'website',
  },
};

export default function NewsletterPage() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-6xl mb-6">
            Architectures for Intelligence You Own
          </h1>
          <p className="text-xl md:text-2xl text-ink-3 mb-8 max-w-2xl mx-auto">
            Weekly insights on sovereign AI architecture, local-first systems, and the engineering of intelligence you actually own.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-ink-3 mb-12">
            <span className="px-4 py-2 border-4 border-ink bg-cream">
              📧 Weekly Digest
            </span>
            <span className="px-4 py-2 border-4 border-ink bg-cream">
              📖 Exclusive Content
            </span>
            <span className="px-4 py-2 border-4 border-ink bg-cream">
              🛠️ Working Code
            </span>
            <span className="px-4 py-2 border-4 border-ink bg-cream">
              🎯 Actionable Insights
            </span>
          </div>
        </div>

        {/* What You'll Get */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 border-4 border-ink bg-cream">
            <h3 className="font-display text-2xl mb-4">🔥 This Week's Featured Post</h3>
            <p className="text-ink-3 mb-4">
              The complete sovereign AI architecture guide with working code, performance benchmarks, and implementation patterns.
            </p>
            <Link 
              href="/blog/sovereign-ai-architecture-complete-guide" 
              className="text-green-dark font-bold hover:underline"
            >
              Read the full guide →
            </Link>
          </div>
          
          <div className="p-8 border-4 border-ink bg-cream">
            <h3 className="font-display text-2xl mb-4">📚 Recent Posts</h3>
            <ul className="space-y-3 text-ink-3">
              <li>• Your First Local AI (5 min read)</li>
              <li>• Getting Started with Sovereign AI (7 min read)</li>
              <li>• Performance Benchmarks (5 min read)</li>
              <li>• The Sovereign Loop (10 min read)</li>
            </ul>
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center mb-16">
          <div className="inline-block px-8 py-4 border-4 border-ink bg-cream">
            <p className="text-2xl font-bold text-ink mb-2">5,000+</p>
            <p className="text-ink-3">AI architects receiving weekly insights</p>
          </div>
        </div>

        {/* Signup Form */}
        <NewsletterSignup />

        {/* Privacy Note */}
        <div className="text-center mt-12">
          <p className="text-sm text-ink-3">
            🔒 No spam. Unsubscribe anytime. Your privacy is respected.
          </p>
        </div>

        {/* Back to Blog */}
        <div className="text-center mt-16">
          <Link 
            href="/blog" 
            className="text-green-dark font-bold hover:underline"
          >
            ← Back to all posts
          </Link>
        </div>
      </div>
    </section>
  );
}
