import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

// This endpoint will be called by cron-job.org
// It fetches prices from Coupang and updates the DB

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

const PRODUCTS_KEY = 'coupang:products';

interface PriceHistory {
  price: number;
  timestamp: string;
}

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  isRocket?: boolean;
  category?: string;
  url: string;
  priceHistory: PriceHistory[];
  createdAt: string;
  updatedAt: string;
}

// Simulated price fetch (replace with real Coupang scraping)
async function fetchCoupangPrice(url: string): Promise<Product | null> {
  // In production, use puppeteer or cheerio to scrape Coupang
  // For now, simulate price changes
  const basePrice = Math.random() * 100000 + 10000;
  const productId = Buffer.from(url).toString('base64').slice(0, 16);
  
  return {
    id: productId,
    name: 'Sample Product from Coupang',
    image: 'https://image10.coupangcdn.com/image/cmall/2024/06/07/18/29/e4f5e2c7-23a2-4cf3-9acd-2bc5e6b7d87e.jpg',
    price: Math.floor(basePrice),
    originalPrice: Math.floor(basePrice * 1.2),
    discount: Math.floor(Math.random() * 30),
    rating: 4.5,
    reviewCount: Math.floor(Math.random() * 1000),
    isRocket: Math.random() > 0.5,
    category: 'electronics',
    url: url,
    priceHistory: [
      { price: Math.floor(basePrice), timestamp: new Date().toISOString() }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// Demo URLs for testing (replace with actual coupang URLs)
const DEMO_URLS = [
  'https://www.coupang.com/vp/search?q=무선키보드',
  'https://www.coupang.com/vp/search?q=마우스',
  'https://www.coupang.com/vp/search?q=모니터',
];

export async function POST(request: NextRequest) {
  try {
    let urls: string[] = [];
    
    try {
      const body = await request.json();
      urls = body.urls || DEMO_URLS;
    } catch {
      urls = DEMO_URLS;
    }
    
    const results: Product[] = [];
    
    for (const url of urls) {
      const product = await fetchCoupangPrice(url);
      if (product) {
        // Get existing products
        const products = await redis.get<Product[]>(PRODUCTS_KEY) || [];
        
        // Check if product exists, update price history
        const existingIndex = products.findIndex(p => p.id === product.id);
        
        if (existingIndex >= 0) {
          // Add to price history
          products[existingIndex].priceHistory.push({
            price: product.price,
            timestamp: new Date().toISOString(),
          });
          products[existingIndex].price = product.price;
          products[existingIndex].updatedAt = new Date().toISOString();
        } else {
          // Add new product
          products.push(product);
        }
        
        await redis.set(PRODUCTS_KEY, products);
        results.push(product);
      }
    }
    
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      fetched: results.length,
      products: results,
    });
  } catch (error) {
    console.error('Error fetching prices:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prices' },
      { status: 500 }
    );
  }
}

// GET endpoint for cron-job.org to call
export async function GET() {
  return POST(new NextRequest('http://localhost/api/cron'));
}
