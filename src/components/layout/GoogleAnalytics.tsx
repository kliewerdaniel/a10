'use client';

import { useEffect } from 'react';

const GA_MEASUREMENT_ID = 'G-02N9FT7XP5';

export function GoogleAnalytics() {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    if (!window.gtag) {
      function gtag(...args: unknown[]) {
        window.dataLayer!.push(args);
      }
      window.gtag = gtag;
    }

    window.gtag!('js', new Date());
    window.gtag!('config', GA_MEASUREMENT_ID, {
      page_path: window.location.pathname,
    });
  }, []);

  return null;
}
