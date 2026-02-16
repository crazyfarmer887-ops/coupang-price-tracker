import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, Category } from './types';

interface AppState {
  // Products
  products: Product[];
  watchedProducts: Product[];
  selectedCategory: Category;
  searchQuery: string;
  
  // Actions
  setProducts: (products: Product[]) => void;
  addWatchedProduct: (product: Product) => void;
  removeWatchedProduct: (productId: string) => void;
  setSelectedCategory: (category: Category) => void;
  setSearchQuery: (query: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      products: [],
      watchedProducts: [],
      selectedCategory: '전체',
      searchQuery: '',

      // Actions
      setProducts: (products) => set({ products }),
      
      addWatchedProduct: (product) => {
        const { watchedProducts } = get();
        if (!watchedProducts.find(p => p.id === product.id)) {
          set({ watchedProducts: [...watchedProducts, product] });
        }
      },
      
      removeWatchedProduct: (productId) => {
        const { watchedProducts } = get();
        set({ watchedProducts: watchedProducts.filter(p => p.id !== productId) });
      },
      
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: 'coupang-price-tracker',
    }
  )
);
