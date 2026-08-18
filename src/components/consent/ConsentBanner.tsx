'use client';

import { useState } from 'react';
import { useConsent, ConsentState } from './ConsentProvider';

export function ConsentBanner() {
  const { consent, hasInteracted, setConsent } = useConsent();
  const [showDetails, setShowDetails] = useState(false);
  const [custom, setCustom] = useState<ConsentState>(consent);

  if (hasInteracted) return null;

  const handleSave = () => {
    setConsent({ ...custom, necessary: true, hasInteracted: true });
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center sm:items-center">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative z-10 w-full max-w-2xl mx-4 mb-4 sm:mb-0 bg-[var(--color-card-bg)] border border-[var(--color-rule)] rounded-2xl p-6 shadow-2xl">
        <h2 className="text-lg font-display font-bold text-[var(--color-ink)] mb-3">
          Cookie Preferences
        </h2>
        <p className="text-sm text-[var(--color-ink-3)] mb-4 leading-relaxed">
          We use cookies to improve your experience and analyze site traffic.
          You can choose which categories to allow.
        </p>

        {showDetails && (
          <div className="space-y-3 mb-4">
            <label className="flex items-start gap-3 p-3 rounded-lg bg-[var(--color-paper-2)] cursor-not-allowed">
              <input
                type="checkbox"
                checked
                disabled
                className="mt-0.5 h-4 w-4 rounded border-[var(--color-rule)] text-[var(--color-green)] accent-[var(--color-green)]"
              />
              <div>
                <span className="text-sm font-medium text-[var(--color-ink)]">Necessary</span>
                <p className="text-xs text-[var(--color-ink-3)]">Required for the site to function. Cannot be disabled.</p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg bg-[var(--color-paper-2)] cursor-pointer hover:bg-[var(--color-paper-3)] transition-colors">
              <input
                type="checkbox"
                checked={custom.analytics}
                onChange={(e) => setCustom({ ...custom, analytics: e.target.checked })}
                className="mt-0.5 h-4 w-4 rounded border-[var(--color-rule)] text-[var(--color-green)] accent-[var(--color-green)]"
              />
              <div>
                <span className="text-sm font-medium text-[var(--color-ink)]">Analytics</span>
                <p className="text-xs text-[var(--color-ink-3)]">Help us understand how visitors interact with the site.</p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg bg-[var(--color-paper-2)] cursor-pointer hover:bg-[var(--color-paper-3)] transition-colors">
              <input
                type="checkbox"
                checked={custom.marketing}
                onChange={(e) => setCustom({ ...custom, marketing: e.target.checked })}
                className="mt-0.5 h-4 w-4 rounded border-[var(--color-rule)] text-[var(--color-green)] accent-[var(--color-green)]"
              />
              <div>
                <span className="text-sm font-medium text-[var(--color-ink)]">Marketing</span>
                <p className="text-xs text-[var(--color-ink-3)]">Used to deliver relevant ads and track campaign performance.</p>
              </div>
            </label>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setConsent({ necessary: true, analytics: false, marketing: false, hasInteracted: true })}
            className="px-4 py-2 text-sm font-medium text-[var(--color-ink-3)] hover:text-[var(--color-ink)] border border-[var(--color-rule)] rounded-lg hover:bg-[var(--color-paper-2)] transition-colors"
          >
            Reject All
          </button>
          <button
            onClick={() => {
              setCustom({ necessary: true, analytics: true, marketing: true, hasInteracted: true });
              setConsent({ necessary: true, analytics: true, marketing: true, hasInteracted: true });
            }}
            className="px-4 py-2 text-sm font-medium text-[var(--color-paper)] bg-[var(--color-green)] border border-[var(--color-green)] rounded-lg hover:bg-[var(--color-green-dark)] transition-colors"
          >
            Accept All
          </button>
          {showDetails ? (
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-[var(--color-green)] border border-[var(--color-green)] rounded-lg hover:bg-[var(--color-green)]/10 transition-colors"
            >
              Save Preferences
            </button>
          ) : (
            <button
              onClick={() => setShowDetails(true)}
              className="px-4 py-2 text-sm font-medium text-[var(--color-green)] border border-[var(--color-green)] rounded-lg hover:bg-[var(--color-green)]/10 transition-colors"
            >
              Customize
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
