'use client';

import { useState } from 'react';
import { Search, Settings, Star, ExternalLink, TrendingDown, Rocket } from 'lucide-react';
import { Product } from '@/lib/types';
import { useStore } from '@/lib/store';
import { formatPrice, generatePartnerLink } from '@/lib/mockData';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { affiliateId, watchedProducts, addWatchedProduct, removeWatchedProduct } = useStore();
  const isWatched = watchedProducts.some(p => p.id === product.id);
  
  const partnerLink = generatePartnerLink(product.id, affiliateId);
  
  const handleWatchToggle = () => {
    if (isWatched) {
      removeWatchedProduct(product.id);
    } else {
      addWatchedProduct(product);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border">
      {/* Image */}
      <div className="relative aspect-square bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x300?text=No+Image';
          }}
        />
        
        {/* Discount Badge */}
        {product.discountRate >= 10 && (
          <div className="absolute top-2 left-2 bg-accent text-white px-2 py-1 rounded-full text-sm font-bold">
            -{product.discountRate}%
          </div>
        )}
        
        {/* Watch Button */}
        <button
          onClick={handleWatchToggle}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
        >
          <Star 
            className={`w-4 h-4 ${isWatched ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`} 
          />
        </button>
        
        {/* Rocket Delivery */}
        {product.isRocket && (
          <div className="absolute bottom-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Rocket className="w-3 h-3" />
            로켓배송
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-medium text-sm line-clamp-2 mb-3 h-10">
          {product.name}
        </h3>
        
        {/* Prices */}
        <div className="mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-secondary">
              {formatPrice(product.currentPrice)}
            </span>
            {product.changeRate !== 0 && (
              <span className={`text-sm ${product.changeRate < 0 ? 'text-accent' : 'text-red-500'} flex items-center`}>
                {product.changeRate < 0 ? <TrendingDown className="w-3 h-3" /> : null}
                {Math.abs(product.changeRate)}%
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <span>평균 {formatPrice(product.averagePrice)}</span>
            {product.isLowest && (
              <span className="text-accent text-xs font-medium">역대최저</span>
            )}
          </div>
        </div>
        
        {/* Price Range */}
        <div className="text-xs text-text-secondary mb-3">
          최근 7일 최저 {formatPrice(product.lowestPrice)} / 최고 {formatPrice(product.highestPrice)}
        </div>
        
        {/* Actions */}
        <div className="flex gap-2">
          <a
            href={partnerLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-primary text-white text-center py-2.5 rounded-lg font-medium hover:bg-[#ff8577] transition-colors flex items-center justify-center gap-2"
          >
            쿠팡에서 보기
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
