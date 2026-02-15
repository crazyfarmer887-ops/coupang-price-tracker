# 쿠팡 가격 트래커 - 사양서

## 프로젝트 개요
- **이름:** Coupang Price Tracker
- **유형:** 웹앱 (Next.js + Tailwind CSS)
- **기능:** 쿠팡 상품 가격 추적 및 최저가 확인 + 파트너스 링크
- **배포:** Vercel (무료)

## UI/UX 사양

### 레이아웃
- **헤더:** 로고 + 검색바 + 카테고리 메뉴
- **메인:** 상품 그리드 (3열 데스크톱, 2열 태블릿, 1열 모바일)
- **상품 카드:** 이미지, 제목, 현재가, 평균가, 할인율, 구매하기 버튼

### 색상 팔레트
- **Primary:** #FF6F61 ( Coral - 친근한 따뜻함)
- **Secondary:** #2D3436 ( 다크 그레이)
- **Accent:** #00B894 ( 민트 - 할인율 표시)
- **Background:** #F8F9FA
- **Card:** #FFFFFF
- **Text Primary:** #2D3436
- **Text Secondary:** #636E72

### 타이포그래피
- **Font:** Pretendard (가독성), Heading: Bold, Body: Regular
- **크기:**
  - H1: 2rem (32px)
  - H2: 1.5rem (24px)
  - Body: 1rem (16px)
  - Small: 0.875rem (14px)

### 반응형
- Mobile: < 640px (1열)
- Tablet: 640px - 1024px (2열)
- Desktop: > 1024px (3열)

## 기능 사양

### 1. 상품 검색
- 쿠팡 상품 URL 또는 상품명 검색
- 검색 결과에서 상품 선택
- 선택한 상품 저장 (localStorage)

### 2. 가격 비교
- 현재 가격 표시
- 평균가 대비 할인율 (퍼센트)
- 가격 변동 추이 (최저/최고)
- 역대 최저가 여부

### 3. 쿠팡 파트너스 링크
- 상품별 "쿠팡에서 보기" 버튼
- 클릭 시 쿠팡 파트너스 링크로 이동
- aff_id: 자동으로 포함 (사용자 설정 가능)

### 4. 카테고리 필터
- 전체, 식품, 생활용품, 가전/디지털, 뷰티, 패션의류, 가구/인테리어

### 5. 관심 상품列表
- localStorage에 저장
- 추가/삭제 가능
- 가격 알림 표시 (퍼센트)

## 페이지 구조

```
/
├── 헤더 (검색 + 카테고리)
├── 히어로 (가격 하락 상품 소개)
├── 카테고리별 상품列表
├── 관심 상품 (있다면)
└── 푸터

/product/[id]
└── 상품 상세 페이지 (가격 그래프, 유사 상품)
```

## 데이터 구조

```typescript
interface Product {
  id: string;
  name: string;
  image: string;
  currentPrice: number;
  averagePrice: number;
  lowestPrice: number;
  highestPrice: number;
  discountRate: number;
  isLowest: boolean;
  category: string;
  partnerLink: string;
  lastUpdated: Date;
}
```

## 기술 스택
- Next.js 14 (App Router)
- Tailwind CSS
- Zustand (상태 관리)
- Recharts (가격 그래프)
- Vercel (호스팅)

## 참고 (폴센트 + 올타임프라이스)
- ✅ 가격 하락 퍼센트 (아이콘 + 텍스트)
- ✅ 평균가 대비 현재가
- ✅ 역대 최저가 표시
- ✅ 카테고리별 필터
- ✅ 로켓배송 표시
- ✅ 쿠팡 파트너스 링크 (새 기능)
