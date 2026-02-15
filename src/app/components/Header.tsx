'use client';

import { Search, Settings } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function Header() {
  const { affiliateId, setAffiliateId } = useStore();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏷️</span>
            <span className="font-bold text-xl text-secondary">
              쿠팡 <span className="text-primary">가격트래커</span>
            </span>
          </a>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-text-secondary hover:text-primary transition-colors">
              홈
            </a>
            <a href="#discount" className="text-text-secondary hover:text-primary transition-colors">
              급락 상품
            </a>
            <a href="#category" className="text-text-secondary hover:text-primary transition-colors">
              카테고리
            </a>
          </nav>

          {/* Settings */}
          <div className="relative">
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Settings className="w-5 h-5 text-text-secondary" />
            </button>
            
            {showSettings && (
              <div className="absolute right-0 top-12 bg-white rounded-xl shadow-lg p-4 w-64 border">
                <label className="block text-sm font-medium mb-2">
                  쿠팡 파트너스 ID
                </label>
                <input
                  type="text"
                  value={affiliateId}
                  onChange={(e) => setAffiliateId(e.target.value)}
                  placeholder="파트너스 ID 입력"
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-xs text-text-secondary mt-2">
                  쿠팡 파트너스 ID를 입력하면<br />
                  구매 시 수수료를 받을 수 있어요.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

import { useState } from 'react';
