'use client';

export function NewsletterForm() {
  return (
    <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="your@email.com"
        className="flex-1 px-4 py-3 bg-[var(--color-paper-2)] border border-[var(--color-rule)] text-[var(--color-ink)] placeholder-[var(--color-ink-3)] focus:outline-none focus:border-[var(--color-ink)] transition-colors"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-[var(--color-green)] text-[var(--color-paper)] font-medium border border-[var(--color-green)] hover:opacity-80 transition-colors cursor-pointer"
      >
        Subscribe
      </button>
    </form>
  );
}
