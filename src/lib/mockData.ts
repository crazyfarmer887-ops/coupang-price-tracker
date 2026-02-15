import { Product, PriceHistory, Category } from './types';

// 쿠팡 파트너스 링크 생성 (affiliateId 포함)
export const generatePartnerLink = (productId: string, affiliateId: string): string => {
  const baseUrl = `https://link.coupang.com/a/${productId}`;
  return affiliateId ? `${baseUrl}?a=${affiliateId}` : baseUrl;
};

// Mock 상품 데이터
export const mockProducts: Product[] = [
  {
    id: '1',
    name: '웨이크비 콜드브루 원액 액상 더치 커피 수프리모, 30개, 1개입, 30ml',
    image: 'https://thumbnail8.coupangcdn.com/b5f97f79db794935a17297d5b00d3f5b.jpg',
    currentPrice: 8330,
    averagePrice: 10884,
    lowestPrice: 7800,
    highestPrice: 12900,
    discountRate: 24,
    changeRate: -5,
    isLowest: true,
    isRocket: true,
    category: '식품',
    partnerLink: 'https://link.coupang.com/a/1',
    lastUpdated: '2026-02-15',
  },
  {
    id: '2',
    name: '풀물관 24시 깔끔 즉석우동 2인분, 321.2g, 3개, 321.2g × 3개',
    image: 'https://thumbnail8.coupangcdn.com/b5f97f79db794935a17297d5b00d3f5b.jpg',
    currentPrice: 8940,
    averagePrice: 12362,
    lowestPrice: 8500,
    highestPrice: 14500,
    discountRate: 28,
    changeRate: -3,
    isLowest: false,
    isRocket: true,
    category: '식품',
    partnerLink: 'https://link.coupang.com/a/2',
    lastUpdated: '2026-02-15',
  },
  {
    id: '3',
    name: '켈로그 콘푸로스트바 12p, 420g, 1세트, 420g × 1세트',
    image: 'https://thumbnail8.coupangcdn.com/b5f97f79db794935a17297d5b00d3f5b.jpg',
    currentPrice: 7780,
    averagePrice: 9053,
    lowestPrice: 7500,
    highestPrice: 10500,
    discountRate: 15,
    changeRate: 2,
    isLowest: false,
    isRocket: true,
    category: '식품',
    partnerLink: 'https://link.coupang.com/a/3',
    lastUpdated: '2026-02-15',
  },
  {
    id: '4',
    name: '오스람 에버 LED 120W 거실등, 화이트 + 하얀빛',
    image: 'https://thumbnail8.coupangcdn.com/b5f97f79db794935a17297d5b00d3f5b.jpg',
    currentPrice: 63090,
    averagePrice: 76010,
    lowestPrice: 58000,
    highestPrice: 89000,
    discountRate: 17,
    changeRate: -8,
    isLowest: true,
    isRocket: true,
    category: '가전/디지털',
    partnerLink: 'https://link.coupang.com/a/4',
    lastUpdated: '2026-02-15',
  },
  {
    id: '5',
    name: '이니스프리 그린티 씨드 히알루론산 세럼 80ml + 10ml 세트',
    image: 'https://thumbnail8.coupangcdn.com/b5f97f79db794935a17297d5b00d3f5b.jpg',
    currentPrice: 14640,
    averagePrice: 16800,
    lowestPrice: 14000,
    highestPrice: 19500,
    discountRate: 13,
    changeRate: -2,
    isLowest: false,
    isRocket: true,
    category: '뷰티',
    partnerLink: 'https://link.coupang.com/a/5',
    lastUpdated: '2026-02-15',
  },
  {
    id: '6',
    name: '팸퍼스 2026 엔젤브리즈 소프트 팬티형 기저귀 남여공용, 168매, 4단계',
    image: 'https://thumbnail8.coupangcdn.com/b5f97f79db794935a17297d5b00d3f5b.jpg',
    currentPrice: 56200,
    averagePrice: 69400,
    lowestPrice: 54000,
    highestPrice: 78000,
    discountRate: 19,
    changeRate: -10,
    isLowest: false,
    isRocket: true,
    category: '출산/유아',
    partnerLink: 'https://link.coupang.com/a/6',
    lastUpdated: '2026-02-15',
  },
  {
    id: '7',
    name: '어반티 남녀공용 스포츠 기능성 드라이 라운드 반팔 티셔츠 3장 세트, 3L(110)',
    image: 'https://thumbnail8.coupangcdn.com/b5f97f79db794935a17297d5b00d3f5b.jpg',
    currentPrice: 18810,
    averagePrice: 23826,
    lowestPrice: 17500,
    highestPrice: 28900,
    discountRate: 22,
    changeRate: -4,
    isLowest: false,
    isRocket: true,
    category: '패션의류',
    partnerLink: 'https://link.coupang.com/a/7',
    lastUpdated: '2026-02-15',
  },
  {
    id: '8',
    name: '코멧 시그니처 아기물티슈 엠보싱 캡형 저자극 더마테스트 인증, 55g, 100매, 10개',
    image: 'https://thumbnail8.coupangcdn.com/b5f97f79db794935a17297d5b00d3f5b.jpg',
    currentPrice: 9690,
    averagePrice: 11670,
    lowestPrice: 9200,
    highestPrice: 13500,
    discountRate: 17,
    changeRate: -6,
    isLowest: true,
    isRocket: true,
    category: '출산/유아',
    partnerLink: 'https://link.coupang.com/a/8',
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
    // https://www.coupang.com/vp/products/12345678...
    const match = url.match(/products\/(\d+)/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
};
