'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏷️</span>
            <span className="font-bold text-xl text-secondary">
              쿠팡 <span className="text-primary">가격트래커</span>
            </span>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-text-secondary hover:text-primary transition-colors">
              홈
            </Link>
            <Link href="#discount" className="text-text-secondary hover:text-primary transition-colors">
              급락 상품
            </Link>
            <Link href="#category" className="text-text-secondary hover:text-primary transition-colors">
              카테고리
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
