'use client';

import { useEffect } from 'react';

const GA_MEASUREMENT_ID = 'G-02N9FT7XP5';

export function GoogleAnalytics() {
  useEffect(() => {
    console.log('[GA4] GoogleAnalytics useEffect running');
    console.log('[GA4] window.gtag exists:', !!window.gtag);
    console.log('[GA4] window.dataLayer:', window.dataLayer?.length, 'entries');

    window.dataLayer = window.dataLayer || [];
    if (!window.gtag) {
      function gtag(...args: unknown[]) {
        window.dataLayer!.push(args);
      }
      window.gtag = gtag;
    }

    console.log('[GA4] calling gtag js');
    window.gtag!('js', new Date());
    console.log('[GA4] calling gtag config');
    window.gtag!('config', GA_MEASUREMENT_ID, {
      page_path: window.location.pathname,
    });
    console.log('[GA4] dataLayer now has', window.dataLayer.length, 'entries');
  }, []);

  return null;
}
