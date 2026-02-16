import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { Product } from '@/lib/types';

// Upstash Redis setup (free tier: 10k commands/day)
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

const PRODUCTS_KEY = 'coupang:products';

// Get all products
export async function GET() {
  try {
    const products = await redis.get<Product[]>(PRODUCTS_KEY);
    return NextResponse.json(products || []);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// Add/update product(s)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const productList = Array.isArray(body) ? body : [body];
    
    // Get existing products
    const products = await redis.get<Product[]>(PRODUCTS_KEY) || [];
    
    for (const product of productList) {
      if (!product.id) continue;
      
      // Check if product exists
      const existingIndex = products.findIndex(p => p.id === product.id);
      
      if (existingIndex >= 0) {
        // Update existing
        products[existingIndex] = {
          ...products[existingIndex],
          ...product,
          updatedAt: new Date().toISOString(),
        };
      } else {
        // Add new
        products.push({
          ...product,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }
    }
    
    await redis.set(PRODUCTS_KEY, products);
    
    return NextResponse.json({ success: true, count: products.length });
  } catch (error) {
    console.error('Error saving product:', error);
    return NextResponse.json({ error: 'Failed to save product' }, { status: 500 });
  }
}

// Delete product
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('id');
    
    if (!productId) {
      return NextResponse.json({ error: 'Product ID required' }, { status: 400 });
    }
    
    const products = await redis.get<Product[]>(PRODUCTS_KEY) || [];
    const filtered = products.filter(p => p.id !== productId);
    
    await redis.set(PRODUCTS_KEY, filtered);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
