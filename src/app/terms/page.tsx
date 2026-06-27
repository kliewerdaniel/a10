import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of use for danielkliewer.com and the Sovereign AI project.',
};

export default function TermsPage() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl mb-8">Terms of Use</h1>
        <p className="mono text-xs text-ink-3 mb-8">Last updated: June 2026</p>

        <div className="space-y-8 text-ink-3 leading-relaxed font-bold">
          <div>
            <h2 className="font-display text-xl mb-3">Site Content</h2>
            <p>
              The content on this site — blog posts, project descriptions, and code examples — is
              provided for informational purposes. Everything I write reflects my own experience
              and opinions. Your results will vary.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl mb-3">The Book</h2>
            <p>
              <em>Sovereign AI: Building Local-First Intelligent Systems</em> is sold through Amazon.
              The content is provided as-is. I am not responsible for issues arising from
              following the instructions in the book. Use your judgment.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl mb-3">Open Source Projects</h2>
            <p>
              The code linked from this site is open source and available on GitHub.
              Each project has its own license. Use them at your own risk.
              I provide no warranty or support guarantee.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl mb-3">No Professional Advice</h2>
            <p>
              Nothing on this site constitutes legal, financial, or professional advice.
              I am a software engineer, not a lawyer. Consult appropriate professionals
              for decisions that matter.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl mb-3">Links</h2>
            <p>
              This site links to third-party services. I have no control over their
              content or practices. Access them at your own discretion.
            </p>
          </div>

          <div>
            <h2 className="font-display text-xl mb-3">Changes</h2>
            <p>
              I may update these terms at any time. The &quot;Last updated&quot; date at the top
              reflects the most recent revision.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
