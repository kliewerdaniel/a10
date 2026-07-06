'use client';

import Script from 'next/script';

export function Analytics() {
  // Add your Google Analytics ID or Plausible domain here
  const GA_MEASUREMENT_ID = 'G-02N9FT7XP5'; // Replace with your ID
  const PLAUSIBLE_DOMAIN = ''; // Or add your Plausible domain

  return (
    <>
      {/* Google Analytics */}
      {GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-02N9FT7XP5' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {/* Plausible Analytics (privacy-focused alternative) */}
      {PLAUSIBLE_DOMAIN && (
        <Script
          defer
          data-domain={PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/script.js"
        />
      )}
    </>
  );
}
