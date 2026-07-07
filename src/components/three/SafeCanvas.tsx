'use client';

import { Component, type ReactNode, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export class ThreeErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('Three.js error caught:', error.message);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

function checkWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

export function SafeCanvas({ fallback, children, ...props }: { fallback?: ReactNode } & React.ComponentProps<typeof Canvas>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(checkWebGL());
  }, []);

  if (!mounted) {
    return <>{fallback}</>;
  }

  return (
    <ThreeErrorBoundary fallback={fallback}>
      <Canvas {...props}>{children}</Canvas>
    </ThreeErrorBoundary>
  );
}
