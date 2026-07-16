import type { Metadata } from 'next';
import { AboutContent } from '@/components/about/AboutContent';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const metadata: Metadata = {
  title: {
    default: 'About Daniel Kliewer | Reducing the Cost of Understanding',
    template: '%s',
  },
  description: 'Computer scientist and AI researcher working to reduce the cost of understanding human knowledge — through knowledge compilation, compile-time AI, local-first cognitive tools, and semantic infrastructure. Austin-based author of "Sovereign AI".',
  alternates: {
    canonical: '/about',
  },
};

const baseUrl = 'https://www.danielkliewer.com';

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Daniel Kliewer',
  url: `${baseUrl}/about`,
  image: `${baseUrl}/images/profile.jpeg`,
  jobTitle: 'AI Researcher',
  description: 'Researcher working to reduce the cost of understanding human knowledge through knowledge compilation, compile-time AI, and local-first cognitive tools.',
  sameAs: [
    'https://github.com/kliewerdaniel',
    'https://x.com/kliewer_daniel',
    'https://www.linkedin.com/in/daniel-kliewer-42691944/',
  ],
  knowsAbout: [
    'Knowledge Compilation',
    'Compile-Time AI',
    'Knowledge Representation',
    'Cognitive Memory Systems',
    'Semantic Infrastructure',
    'Local-First AI',
    'Human-Centered AI',
  ],
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personSchema} />
      <div className="px-4 pt-8">
        <Breadcrumbs
          items={[
            { name: 'Home', url: '/' },
            { name: 'About', url: '/about' },
          ]}
        />
      </div>
      <AboutContent />
    </>
  );
}
