import type { Metadata } from 'next';
import { AboutContent } from '@/components/about/AboutContent';

export const metadata: Metadata = {
  title: 'About Daniel Kliewer',
  description: 'Daniel Kliewer investigates architectures for computational sovereignty — local-first AI, cognitive memory systems, graph-based reasoning, and autonomous agents.',
};

export default function AboutPage() {
  return <AboutContent />;
}
