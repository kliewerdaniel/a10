interface Window {
  dataLayer?: unknown[][];
  gtag?: (...args: unknown[]) => void;
  _iub?: {
    cs?: {
      consentGiven?: (callback: () => void) => void;
    };
  };
}
