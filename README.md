# 쿠팡 가격 트래커

쿠팡 상품 가격을 추적하고 최저가를 확인하는 웹앱입니다. 쿠팡 파트너스 링크를 통해 바로 구매할 수 있습니다.

## 기능

- 🔍 상품 검색 (상품명 or 쿠팡 URL)
- 📉 가격 하락 상품 표시
- ⭐ 관심 상품 저장 (localStorage)
- 🚀 로켓배송 표시
- 🔗 쿠팡 파트너스 링크 (소유자 ID 적용)
- 📊 가격 추적 히스토리 (DB 저장)

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

1. **GitHub에 푸시**
   ```bash
   cd coupang-price-tracker
   git add .
   git commit -m "Add price tracking API"
   git push origin main
   ```

2. **Vercel에서 배포**
   - https://vercel.com 접속
   - "New Project" → GitHub repo 선택
   - Environment Variables 추가:
     - `UPSTASH_REDIS_REST_URL` (Upstash에서获取)
     - `UPSTASH_REDIS_REST_TOKEN` (Upstash에서获取)
   - Deploy!

## Upstash Redis 설정 (무료)

1. https://upstash.com 접속
2. GitHub 로그인
3. "Create Redis" → Free Tier 선택
4. URL과 Token 복사 → Vercel 환경변수에 추가

## cron-job.org 설정 (무료)

1. https://cron-job.org 접속
2. "Create Cronjob"
3. 설정:
   - **URL**: `https://<your-vercel-app>.vercel.app/api/cron`
   - **Schedule**: `*/5 * * * *` (5분마다)
   - **Method**: GET
4. Activate!

## 가격 추적原理

```
cron-job.org (무료)
    ↓ 5분마다 호출
Vercel API Route
    ↓ 가격 조회
Upstash Redis (무료 - 10k commands/day)
    ↓ 데이터 저장
프론트엔드에서 조회
```

## 환경 변수

| 변수 | 설명 | 필수 |
|------|------|------|
| UPSTASH_REDIS_REST_URL | Upstash Redis URL | Yes |
| UPSTASH_REDIS_REST_TOKEN | Upstash Redis Token | Yes |

## 기술 스택

- Next.js 14
- Tailwind CSS
- Zustand (상태 관리)
- Lucide React (아이콘)
- Upstash Redis (무료 DB)

## 개발자

- 실제 쿠팡 스크래핑 추가: puppeteer 또는 cheerio 사용
- 가격 알림: Telegram/Discord webhook
