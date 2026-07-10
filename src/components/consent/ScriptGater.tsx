'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useConsent } from './ConsentProvider';

const GA_MEASUREMENT_ID = 'G-02N9FT7XP5';

export function ScriptGater() {
  const { consent } = useConsent();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ga4Loaded = useRef(false);
  const adsenseLoaded = useRef(false);

  // GA4: Load script on consent
  useEffect(() => {
    if (consent.analytics && !ga4Loaded.current) {
      ga4Loaded.current = true;

      window.dataLayer = window.dataLayer || [];
      function gtag(...args: unknown[]) {
        window.dataLayer!.push(args);
      }
      gtag('js', new Date());
      gtag('config', GA_MEASUREMENT_ID);

      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);
    }
  }, [consent.analytics]);

  // GA4: Track route changes
  useEffect(() => {
    if (!consent.analytics || !ga4Loaded.current) return;

    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    window.gtag?.('config', GA_MEASUREMENT_ID, { page_path: url });
  }, [pathname, searchParams, consent.analytics]);

  // AdSense
  useEffect(() => {
    if (consent.marketing && !adsenseLoaded.current) {
      adsenseLoaded.current = true;

      const script = document.createElement('script');
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5368889366103187';
      document.head.appendChild(script);

      console.log('[Consent] AdSense loaded');
    }
  }, [consent.marketing]);

  return null;
}
