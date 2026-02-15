'use client';

import { Category } from '@/lib/types';
import { categories } from '@/lib/mockData';
import { useStore } from '@/lib/store';
import { ChevronDown } from 'lucide-react';

export default function CategoryFilter() {
  const { selectedCategory, setSelectedCategory } = useStore();

  return (
    <section className="mb-6" id="category">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? 'bg-primary text-white'
                : 'bg-white text-text-secondary hover:bg-gray-100 border'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}
