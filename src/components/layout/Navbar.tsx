import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b-4 border-ink bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="font-display text-lg hover:text-pink-dark transition-colors"
            >
              Sovereign AI
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="text-sm font-bold hover:text-pink-dark transition-colors px-3 py-2">
                Home
              </Link>
              <Link href="/blog" className="text-sm font-bold hover:text-pink-dark transition-colors px-3 py-2">
                Research
              </Link>
              <Link href="/projects" className="text-sm font-bold hover:text-pink-dark transition-colors px-3 py-2">
                Projects
              </Link>
              <Link href="/about" className="text-sm font-bold hover:text-pink-dark transition-colors px-3 py-2">
                About
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <Link
              href="/book"
              className="text-sm font-bold bg-pink text-white px-4 py-2 hover:bg-pink-dark transition-colors shadow-brutalist"
            >
              Get the Book
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
