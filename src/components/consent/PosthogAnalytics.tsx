'use client';

import { useEffect, useRef } from 'react';
import { useConsent } from './ConsentProvider';

export function PosthogAnalytics() {
  const { consent } = useConsent();
  const initialized = useRef(false);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

    if (!key) return;

    if (consent.analytics && !initialized.current) {
      initialized.current = true;

      import('posthog-js').then(({ default: posthog }) => {
        posthog.init(key, {
          api_host: host,
          person_profiles: 'identified_only',
          loaded: (ph) => {
            if (process.env.NODE_ENV !== 'production') {
              ph.opt_out_capturing();
            }
          },
        });
      });
    }

    if (!consent.analytics && initialized.current) {
      import('posthog-js').then(({ default: posthog }) => {
        posthog.reset();
        posthog.opt_out_capturing();
        initialized.current = false;
      });
    }
  }, [consent.analytics]);

  return null;
}
