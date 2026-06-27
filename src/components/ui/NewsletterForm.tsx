'use client';

export function NewsletterForm() {
  return (
    <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="your@email.com"
        className="flex-1 px-4 py-3 bg-cream border-4 border-ink text-ink placeholder-ink-3 focus:outline-none focus:bg-surface transition-colors font-bold"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-green text-cream font-bold border-4 border-ink hover:bg-green-dark transition-colors cursor-pointer shadow-brutalist-sm"
      >
        Subscribe
      </button>
    </form>
  );
}
