'use client';

import { useEffect } from 'react';

const GA_MEASUREMENT_ID = 'G-02N9FT7XP5';

function initGtag() {
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  }
  window.gtag = gtag;

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  script.onload = () => {
    window.gtag!('js', new Date());
    window.gtag!('config', GA_MEASUREMENT_ID, {
      page_path: window.location.pathname,
    });
  };
}

export function GoogleAnalytics() {
  useEffect(() => {
    if (window.gtag) return;

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    }
    window.gtag = gtag;

    gtag('consent', 'default', {
      analytics_storage: 'denied',
    });

    initGtag();

    function onConsentUpdate() {
      window.gtag?.('consent', 'update', {
        analytics_storage: 'granted',
      });
    }

    if (window._iub?.cs?.consentGiven) {
      window._iub.cs.consentGiven(onConsentUpdate);
    } else {
      const banner = document.querySelector('.iubenda-cs-container');
      if (banner) {
        const observer = new MutationObserver(() => {
          if (!document.querySelector('.iubenda-cs-container[style*="display: none"]')) {
            return;
          }
          onConsentUpdate();
          observer.disconnect();
        });
        observer.observe(banner, { attributes: true, subtree: true });
      }
    }
  }, []);

  return null;
}
