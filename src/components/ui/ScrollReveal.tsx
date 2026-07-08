'use client';

import { useEffect } from 'react';

export function ScrollReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('.reveal:not(.visible)'));

    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '200px 0px 200px 0px',
        threshold: 0.01,
      }
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  return null;
}
