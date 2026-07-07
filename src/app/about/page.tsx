import type { Metadata } from 'next';
import { AboutContent } from '@/components/about/AboutContent';
import { JsonLd } from '@/components/seo/JsonLd';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const metadata: Metadata = {
  title: 'About Daniel Kliewer',
  description: 'Daniel Kliewer investigates architectures for computational sovereignty — local-first AI, cognitive memory systems, graph-based reasoning, and autonomous agents.',
};

const baseUrl = 'https://danielkliewer.com';

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Daniel Kliewer',
  url: baseUrl,
  image: `${baseUrl}/images/profile.jpeg`,
  jobTitle: 'AI Engineer & Researcher',
  description: 'Investigating architectures for computational sovereignty — local-first AI, cognitive memory systems, graph-based reasoning, and autonomous agents.',
  sameAs: [
    'https://github.com/kliewerdaniel',
    'https://x.com/kliewer_daniel',
    'https://www.linkedin.com/in/daniel-kliewer-42691944/',
  ],
  knowsAbout: [
    'Local-First AI',
    'Cognitive Memory Systems',
    'Knowledge Graphs',
    'Autonomous AI Agents',
    'Computational Sovereignty',
    'RAG Pipelines',
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
