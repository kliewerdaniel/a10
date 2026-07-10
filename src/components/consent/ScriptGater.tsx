'use client';

import { useEffect, useRef } from 'react';
import { useConsent } from './ConsentProvider';

export function ScriptGater() {
  const { consent } = useConsent();
  const adsenseLoaded = useRef(false);

  // AdSense
  useEffect(() => {
    if (consent.marketing && !adsenseLoaded.current) {
      adsenseLoaded.current = true;

      const script = document.createElement('script');
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5368889366103187';
      document.head.appendChild(script);
    }
  }, [consent.marketing]);

  return null;
}
