# 쿠팡 가격 트래커

쿠팡 상품 가격을 추적하고 최저가를 확인하는 웹앱입니다. 쿠팡 파트너스 링크를 통해 바로 구매할 수 있습니다.

## 기능

- 🔍 상품 검색 (상품명 or 쿠팡 URL)
- 📉 가격 하락 상품 표시
- ⭐ 관심 상품 저장 (localStorage)
- 🚀 로켓배송 표시
- 🔗 쿠팡 파트너스 링크 (소유자 ID 적용)

## 시작하기

### 설치

```bash
npm install
```

### 개발

```bash
npm run dev
```

http://localhost:3000 에서 확인

### 빌드

```bash
npm run build
```

## Vercel 배포

1. GitHub에 푸시
2. Vercel에서 GitHub 연결
3. Deploy!

## 쿠팡 파트너스 설정

1. [쿠팡 파트너스](https://partners.coupang.com/) 가입
2. 설정에서 Affiliate ID 확인
3. 사이트에서 설정 아이콘 클릭 후 ID 입력

## 기술 스택

- Next.js 14
- Tailwind CSS
- Zustand (상태 관리)
- Lucide React (아이콘)
