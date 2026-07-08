'use client';

import { useEffect, useRef } from 'react';

export function ScrollReveal() {
  const revealed = useRef(new Set<Element>());

  useEffect(() => {
    const interval = setInterval(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => {
        if (!revealed.current.has(el)) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('visible');
            revealed.current.add(el);
          }
        }
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return null;
}
