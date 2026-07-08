'use client';

import { useEffect } from 'react';

export function ScrollReveal() {
  useEffect(() => {
    function reveal() {
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          el.classList.add('visible');
        }
      });
    }

    reveal();

    window.addEventListener('scroll', reveal, { passive: true });
    window.addEventListener('resize', reveal, { passive: true });

    const interval = setInterval(reveal, 300);

    return () => {
      window.removeEventListener('scroll', reveal);
      window.removeEventListener('resize', reveal);
      clearInterval(interval);
    };
  }, []);

  return null;
}
