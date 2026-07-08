'use client';

import { useEffect } from 'react';

export function ScrollReveal() {
  useEffect(() => {
    const interval = setInterval(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('visible');
        }
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return null;
}
