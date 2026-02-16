'use strict';

import { Redis } from '@upstash/redis';
import * as cheerio from 'cheerio';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const response = await fetch('https://www.lowchart.com/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    const products: any[] = [];
    
    // Parse product items from the page
    $('a[href^="/"]').each((_, el) => {
      const href = $(el).attr('href');
      if (!href || !href.match(/^\/\d+/)) return;
      
      const parent = $(el).parent();
      const text = parent.text().trim();
      
      // Extract discount percentage
      const discountMatch = text.match(/(\d+)%/);
      const discountRate = discountMatch ? parseInt(discountMatch[1]) : 0;
      
      // Extract prices
      const priceMatch = text.match(/[\d,]+원/g);
      const currentPrice = priceMatch ? parseInt(priceMatch[0].replace(/,/g, '')) : 0;
      
      // Extract product name (usually contains Korean text)
      const nameMatch = text.match(/[가-힣][가-힣\s\d]+/);
      const name = nameMatch ? nameMatch[0].trim() : 'Unknown Product';
      
      // Extract coupang product ID from href
      const productId = href.match(/\/(\d+)/)?.[1] || '';
      
      if (productId && currentPrice > 0) {
        products.push({
          id: productId,
          name: name.substring(0, 100),
          currentPrice,
          discountRate,
          coupangUrl: `https://www.coupang.com/vp/product/show?productId=${productId}`,
          lastUpdated: new Date().toISOString(),
        });
      }
    });
    
    // Deduplicate by ID
    const uniqueProducts = products.reduce<any[]>((acc, product) => {
      if (!acc.find((p: any) => p.id === product.id)) {
        acc.push(product);
      }
      return acc;
    }, []);
    
    // Save to Redis with timestamp
    const timestamp = new Date().toISOString();
    await redis.set('lowchart:lastUpdate', timestamp);
    await redis.set('lowchart:products', JSON.stringify(uniqueProducts));
    
    return Response.json({
      success: true,
      count: uniqueProducts.length,
      timestamp,
      products: uniqueProducts.slice(0, 10), // Preview first 10
    });
  } catch (error) {
    console.error('Error fetching lowchart:', error);
    return Response.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
