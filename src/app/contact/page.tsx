'use client';

import { BookCTA } from '@/components/blog/BookCTA';

export default function ContactPage() {
  return (
    <>
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl mb-4">Contact</h1>
            <p className="text-ink-3 font-bold">
              Have a question about Sovereign AI, want to collaborate, or just want to say hello?
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-ink mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 bg-cream border-4 border-ink text-ink placeholder-ink-3 focus:outline-none focus:bg-surface transition-colors font-bold"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-ink mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-cream border-4 border-ink text-ink placeholder-ink-3 focus:outline-none focus:bg-surface transition-colors font-bold"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-bold text-ink mb-2">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-3 bg-cream border-4 border-ink text-ink placeholder-ink-3 focus:outline-none focus:bg-surface transition-colors font-bold"
                placeholder="What's this about?"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-bold text-ink mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="w-full px-4 py-3 bg-cream border-4 border-ink text-ink placeholder-ink-3 focus:outline-none focus:bg-surface transition-colors resize-none font-bold"
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3.5 bg-green text-cream font-bold border-4 border-ink hover:bg-green-dark transition-colors cursor-pointer"
              style={{ boxShadow: '4px 4px 0 #0F0F0F' }}
            >
              Send Message
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-ink-3 mb-4 font-bold">Or reach out directly:</p>
            <div className="flex justify-center gap-6">
              <a href="https://github.com/kliewerdaniel" target="_blank" rel="noopener noreferrer" className="accent-green hover:text-green-dark transition-colors font-bold">
                GitHub ↗
              </a>
              <a href="https://x.com/kliewer_daniel" target="_blank" rel="noopener noreferrer" className="accent-pink hover:text-pink-dark transition-colors font-bold">
                X (Twitter) ↗
              </a>
              <a href="https://www.linkedin.com/in/daniel-kliewer-42691944/" target="_blank" rel="noopener noreferrer" className="accent-orange hover:text-orange transition-colors font-bold">
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-surface">
        <div className="max-w-4xl mx-auto">
          <BookCTA />
        </div>
      </section>
    </>
  );
}
