'use client';

import { useEffect } from 'react';

export function ScrollReveal() {
  useEffect(() => {
    document.querySelectorAll('.reveal').forEach((node) => {
      node.classList.add('visible');
    });
  }, []);

  return null;
}
