'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { mockProducts, categories, formatPrice } from '@/lib/mockData';
import { Product } from '@/lib/types';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CategoryFilter from './components/CategoryFilter';
import SearchBar from './components/SearchBar';
import { TrendingDown, TrendingUp, Star, ChevronDown } from 'lucide-react';

export default function Home() {
  const { 
    products, 
    setProducts, 
    selectedCategory, 
    searchQuery,
    watchedProducts 
  } = useStore();
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Fetch products from API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.products && data.products.length > 0) {
          setProducts(data.products);
        } else {
          setProducts(mockProducts);
        }
      } catch {
        setProducts(mockProducts);
      }
    }
    fetchProducts();
  }, [setProducts]);

  // Filter products
  useEffect(() => {
    let filtered = products;
    
    // Category filter
    if (selectedCategory !== '전체') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sort by discount rate (descending)
    filtered = [...filtered].sort((a, b) => b.discountRate - a.discountRate);
    
    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery]);

  // Separate discounted and watched products
  const discountedProducts = filteredProducts.filter(p => p.discountRate >= 10);
  const watched = watchedProducts.filter(p => 
    selectedCategory === '전체' || p.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Hero Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-primary to-[#ff8a7a] rounded-2xl p-8 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              🔥 오늘의 급락 상품
            </h1>
            <p className="text-lg opacity-90 mb-6">
              평균가 대비 가장 저렴한 쿠팡 상품을 확인하세요.
              <br />
              쿠팡 파트너스 링크로 바로 구매하면 추가 보너스!
            </p>
            <div className="flex gap-4">
              <SearchBar />
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <CategoryFilter />

        {/* Watched Products */}
        {watched.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              내가 Watching한 상품
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {watched.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Discounted Products */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-accent" />
            지금 사면 굿! 할인 상품
          </h2>
          {discountedProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {discountedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-text-secondary">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>조건에 맞는 상품이 없습니다.</p>
            </div>
          )}
        </section>

        {/* All Products */}
        <section>
          <h2 className="text-xl font-bold mb-4">전체 상품</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary text-white py-8 mt-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="font-bold text-lg">Coupang Price Tracker</h3>
              <p className="text-sm opacity-70">쿠팡 가격 비교의 새로운 기준</p>
            </div>
            <div className="text-sm opacity-70">
              © 2026 Coupang Price Tracker. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
