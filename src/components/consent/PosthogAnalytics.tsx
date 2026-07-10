'use client';

import { useEffect, useRef } from 'react';
import { useConsent } from './ConsentProvider';

export function PosthogAnalytics() {
  const { consent } = useConsent();
  const initialized = useRef(false);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN || process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

    if (!key) return;

    if (!initialized.current) {
      initialized.current = true;

      import('posthog-js').then(({ default: posthog }) => {
        posthog.init(key, {
          api_host: host,
          person_profiles: 'identified_only',
          opt_out_capturing_by_default: true,
          defaults: '2026-05-30',
        });
      });
    }

    if (consent.analytics) {
      import('posthog-js').then(({ default: posthog }) => {
        posthog.opt_in_capturing();
      });
    } else {
      import('posthog-js').then(({ default: posthog }) => {
        posthog.opt_out_capturing();
        posthog.reset();
      });
    }
  }, [consent.analytics]);

  return null;
}
