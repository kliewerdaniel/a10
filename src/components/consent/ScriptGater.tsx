'use client';

import { useEffect, useRef } from 'react';
import { useConsent } from './ConsentProvider';

export function ScriptGater() {
  const { consent } = useConsent();
  const ga4Loaded = useRef(false);
  const adsenseLoaded = useRef(false);

  // GA4
  useEffect(() => {
    if (consent.analytics && !ga4Loaded.current) {
      ga4Loaded.current = true;

      // Initialize dataLayer and gtag
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: unknown[]) {
        window.dataLayer!.push(args);
      }
      gtag('js', new Date());
      gtag('config', 'G-02N9FT7XP5', { debug_mode: true });

      // Load gtag.js
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-02N9FT7XP5';
      document.head.appendChild(script);

      console.log('[Consent] GA4 loaded');
    }
  }, [consent.analytics]);

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
