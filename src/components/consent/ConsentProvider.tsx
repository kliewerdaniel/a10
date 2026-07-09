'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export interface ConsentState {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  hasInteracted: boolean;
}

interface ConsentContextType {
  consent: ConsentState;
  setConsent: (consent: ConsentState) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  hasInteracted: boolean;
}

const CONSENT_KEY = 'cookie_consent';

const defaultConsent: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  hasInteracted: false,
};

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<ConsentState>(defaultConsent);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setConsentState({ ...defaultConsent, ...parsed, hasInteracted: true });
      }
    } catch {
      // ignore parse errors
    }
    setLoaded(true);
  }, []);

  const setConsent = useCallback((newConsent: ConsentState) => {
    setConsentState(newConsent);
    localStorage.setItem(CONSENT_KEY, JSON.stringify(newConsent));
    // Dispatch event so script gater can react
    window.dispatchEvent(new CustomEvent('consent-updated', { detail: newConsent }));
  }, []);

  const acceptAll = useCallback(() => {
    setConsent({ necessary: true, analytics: true, marketing: true, hasInteracted: true });
  }, [setConsent]);

  const rejectAll = useCallback(() => {
    setConsent({ necessary: true, analytics: false, marketing: false, hasInteracted: true });
  }, [setConsent]);

  if (!loaded) return null;

  return (
    <ConsentContext.Provider value={{ consent, setConsent, acceptAll, rejectAll, hasInteracted: consent.hasInteracted }}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error('useConsent must be used within ConsentProvider');
  return ctx;
}
