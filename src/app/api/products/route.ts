'use strict';

import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [productsJson, lastUpdate] = await Promise.all([
      redis.get('lowchart:products'),
      redis.get('lowchart:lastUpdate'),
    ]);
    
    if (!productsJson) {
      return Response.json({
        products: [],
        lastUpdate: null,
      });
    }
    
    const products = JSON.parse(productsJson as string);
    
    // Transform to match Product type
    const transformedProducts = products.map((p: any) => ({
      id: p.id,
      name: p.name,
      image: `https://via.placeholder.com/200x200?text=${encodeURIComponent(p.name.substring(0, 10))}`,
      currentPrice: p.currentPrice,
      averagePrice: Math.floor(p.currentPrice / (1 - (p.discountRate / 100))),
      lowestPrice: p.currentPrice,
      highestPrice: Math.floor(p.currentPrice / (1 - (p.discountRate / 100))),
      discountRate: p.discountRate,
      changeRate: -p.discountRate,
      isLowest: true,
      isRocket: true,
      category: '전체',
      coupangUrl: p.coupangUrl || `https://www.coupang.com/vp/product/show?productId=${p.id}`,
      lastUpdated: p.lastUpdated,
    }));
    
    return Response.json({
      products: transformedProducts,
      lastUpdate,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return Response.json({
      products: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
