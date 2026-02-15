'use client';

import { Search, X } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useStore();

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="상품명 또는 쿠팡 URL을 입력하세요"
        className="w-full px-4 py-3 pl-10 pr-10 rounded-lg border-0 bg-white/20 text-white placeholder-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
      {searchQuery && (
        <button
          onClick={() => setSearchQuery('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/20"
        >
          <X className="w-4 h-4 text-white/70" />
        </button>
      )}
    </div>
  );
}
