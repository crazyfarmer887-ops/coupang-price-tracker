export interface Product {
  id: string;
  name: string;
  image: string;
  currentPrice: number;
  averagePrice: number;
  lowestPrice: number;
  highestPrice: number;
  discountRate: number;
  changeRate: number;
  isLowest: boolean;
  isRocket: boolean;
  category: string;
  partnerLink: string;
  lastUpdated: string;
}

export interface PriceHistory {
  date: string;
  price: number;
}

export type Category = 
  | '전체'
  | '식품'
  | '생활용품'
  | '가전/디지털'
  | '뷰티'
  | '패션의류'
  | '가구/인테리어';
