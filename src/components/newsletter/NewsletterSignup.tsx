'use client';

import { useState, FormEvent } from 'react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Welcome to Sovereign AI Weekly! Check your inbox for a confirmation.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Subscription failed. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-6 py-4 border-4 border-ink bg-cream text-ink font-bold text-lg placeholder:text-ink-3 focus:outline-none focus:border-green transition-colors"
            disabled={status === 'loading'}
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full px-6 py-4 bg-green text-cream font-bold text-lg border-4 border-ink hover:bg-green-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe to Sovereign AI Weekly'}
        </button>
      </form>

      {message && (
        <div
          className={`mt-4 p-4 border-4 border-ink text-center font-bold ${
            status === 'success' ? 'bg-green text-cream' : 'bg-red-500 text-cream'
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
