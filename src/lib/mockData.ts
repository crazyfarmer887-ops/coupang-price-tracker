import { Product, PriceHistory, Category } from './types';

// Mock 상품 데이터 (실제 쿠팡 상품)
export const mockProducts: Product[] = [
  {
    id: '1',
    name: '웨이크비 콜드브루 원액 액상 더치 커피 수프리모, 30개입',
    image: 'https://static.coupangcdn.com/image/vendor_inventory/1d1f6d7feaea40008ac1792849005731.jpg',
    currentPrice: 8330,
    averagePrice: 10884,
    lowestPrice: 7800,
    highestPrice: 12900,
    discountRate: 24,
    changeRate: -5,
    isLowest: true,
    isRocket: true,
    category: '식품',
    coupangUrl: 'https://www.coupang.com/vp/products/7423134581',
    lastUpdated: '2026-02-15',
  },
  {
    id: '2',
    name: '풀물관 24시 깔끔 즉석우동 2인분, 3개입',
    image: 'https://static.coupangcdn.com/image/vendor_inventory/47f8678e739c45449c4acd64d166508e.jpg',
    currentPrice: 8940,
    averagePrice: 12362,
    lowestPrice: 8500,
    highestPrice: 14500,
    discountRate: 28,
    changeRate: -3,
    isLowest: false,
    isRocket: true,
    category: '식품',
    coupangUrl: 'https://www.coupang.com/vp/products/835876481',
    lastUpdated: '2026-02-15',
  },
  {
    id: '3',
    name: '켈로그 콘푸로스트바 12팩, 420g',
    image: 'https://static.coupangcdn.com/image/vendor_inventory/94cce6b13f2c437bb405115c4ed2bce1.jpg',
    currentPrice: 7780,
    averagePrice: 9053,
    lowestPrice: 7500,
    highestPrice: 10500,
    discountRate: 15,
    changeRate: 2,
    isLowest: false,
    isRocket: true,
    category: '식품',
    coupangUrl: 'https://www.coupang.com/vp/products/136531348',
    lastUpdated: '2026-02-15',
  },
  {
    id: '4',
    name: '오스람 에버 LED 120W 거실등',
    image: 'https://static.coupangcdn.com/image/vendor_inventory/1ce6a2be0bdc4f5eb8f19714571e6d97.jpg',
    currentPrice: 63090,
    averagePrice: 76010,
    lowestPrice: 58000,
    highestPrice: 89000,
    discountRate: 17,
    changeRate: -8,
    isLowest: true,
    isRocket: true,
    category: '가전/디지털',
    coupangUrl: 'https://www.coupang.com/vp/products/4848772947',
    lastUpdated: '2026-02-15',
  },
  {
    id: '5',
    name: '이니스프리 그린티 씨드 히알루론산 세럼 80ml + 10ml 세트',
    image: 'https://static.coupangcdn.com/image/vendor_inventory/84ed8b98e4f84f7d92cf143b3a4e3170.jpg',
    currentPrice: 14640,
    averagePrice: 16800,
    lowestPrice: 14000,
    highestPrice: 19500,
    discountRate: 13,
    changeRate: -2,
    isLowest: false,
    isRocket: true,
    category: '뷰티',
    coupangUrl: 'https://www.coupang.com/vp/products/164324384',
    lastUpdated: '2026-02-15',
  },
  {
    id: '6',
    name: '팸퍼스 2026 엔젤브리즈 소프트 팬티형 기저귀 4단계, 168매',
    image: 'https://static.coupangcdn.com/image/vendor_inventory/4d6dd3a0b6b94fbe82a0c4cd3e1e3f62.jpg',
    currentPrice: 56200,
    averagePrice: 69400,
    lowestPrice: 54000,
    highestPrice: 78000,
    discountRate: 19,
    changeRate: -10,
    isLowest: false,
    isRocket: true,
    category: '출산/유아',
    coupangUrl: 'https://www.coupang.com/vp/products/7211352793',
    lastUpdated: '2026-02-15',
  },
  {
    id: '7',
    name: '어반티 스포츠 기능성 드라이 라운드 반팔 티셔츠 3장 세트, 3L',
    image: 'https://static.coupangcdn.com/image/vendor_inventory/7f0b0e1c8d5b4eb8b6c5d4e3f2a1b0c9.jpg',
    currentPrice: 18810,
    averagePrice: 23826,
    lowestPrice: 17500,
    highestPrice: 28900,
    discountRate: 22,
    changeRate: -4,
    isLowest: false,
    isRocket: true,
    category: '패션의류',
    coupangUrl: 'https://www.coupang.com/vp/products/1234567890',
    lastUpdated: '2026-02-15',
  },
  {
    id: '8',
    name: '코멧 시그니처 아기물티슈 엠보싱 캡형, 100매 10개입',
    image: 'https://static.coupangcdn.com/image/vendor_inventory/a1b2c3d4e5f678901234567890123456.jpg',
    currentPrice: 9690,
    averagePrice: 11670,
    lowestPrice: 9200,
    highestPrice: 13500,
    discountRate: 17,
    changeRate: -6,
    isLowest: true,
    isRocket: true,
    category: '출산/유아',
    coupangUrl: 'https://www.coupang.com/vp/products/2345678901',
    lastUpdated: '2026-02-15',
  },
];

// 가격 변동 히스토리 (그래프용)
export const mockPriceHistory: PriceHistory[] = [
  { date: '02-09', price: 10800 },
  { date: '02-10', price: 10200 },
  { date: '02-11', price: 9800 },
  { date: '02-12', price: 9500 },
  { date: '02-13', price: 9200 },
  { date: '02-14', price: 8900 },
  { date: '02-15', price: 8330 },
];

// 카테고리 목록
export const categories: Category[] = [
  '전체',
  '식품',
  '생활용품',
  '가전/디지털',
  '뷰티',
  '패션의류',
  '가구/인테리어',
];

// 가격 형식화
export const formatPrice = (price: number): string => {
  return price.toLocaleString('ko-KR') + '원';
};

// 쿠팡 상품 URL 파싱
export const parseCoupangUrl = (url: string): string | null => {
  try {
    const match = url.match(/products\/(\d+)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
};
