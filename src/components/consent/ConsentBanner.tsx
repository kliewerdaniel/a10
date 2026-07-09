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
      <div className="relative z-10 w-full max-w-2xl mx-4 mb-4 sm:mb-0 bg-card border border-border rounded-2xl p-6 shadow-2xl">
        <h2 className="text-lg font-display font-bold text-foreground mb-3">
          Cookie Preferences
        </h2>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          We use cookies to improve your experience and analyze site traffic. 
          You can choose which categories to allow.
        </p>

        {showDetails && (
          <div className="space-y-3 mb-4">
            <label className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 cursor-not-allowed">
              <input
                type="checkbox"
                checked
                disabled
                className="mt-0.5 h-4 w-4 rounded border-border text-primary accent-primary"
              />
              <div>
                <span className="text-sm font-medium text-foreground">Necessary</span>
                <p className="text-xs text-muted-foreground">Required for the site to function. Cannot be disabled.</p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted transition-colors">
              <input
                type="checkbox"
                checked={custom.analytics}
                onChange={(e) => setCustom({ ...custom, analytics: e.target.checked })}
                className="mt-0.5 h-4 w-4 rounded border-border text-primary accent-primary"
              />
              <div>
                <span className="text-sm font-medium text-foreground">Analytics</span>
                <p className="text-xs text-muted-foreground">Help us understand how visitors interact with the site.</p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 cursor-pointer hover:bg-muted transition-colors">
              <input
                type="checkbox"
                checked={custom.marketing}
                onChange={(e) => setCustom({ ...custom, marketing: e.target.checked })}
                className="mt-0.5 h-4 w-4 rounded border-border text-primary accent-primary"
              />
              <div>
                <span className="text-sm font-medium text-foreground">Marketing</span>
                <p className="text-xs text-muted-foreground">Used to deliver relevant ads and track campaign performance.</p>
              </div>
            </label>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setConsent({ necessary: true, analytics: false, marketing: false, hasInteracted: true })}
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-muted transition-colors"
          >
            Reject All
          </button>
          <button
            onClick={() => {
              setCustom({ necessary: true, analytics: true, marketing: true, hasInteracted: true });
              setConsent({ necessary: true, analytics: true, marketing: true, hasInteracted: true });
            }}
            className="px-4 py-2 text-sm font-medium text-foreground bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Accept All
          </button>
          {showDetails ? (
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/10 transition-colors"
            >
              Save Preferences
            </button>
          ) : (
            <button
              onClick={() => setShowDetails(true)}
              className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/10 transition-colors"
            >
              Customize
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
