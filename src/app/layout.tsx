import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '쿠팡 가격 트래커 - 최저가 확인과 파트너스 링크',
  description: '쿠팡 상품의 가격 변동을 추적하고 최저가를 확인하세요. 쿠팡 파트너스 링크로 바로 구매可能',
  keywords: '쿠팡, 가격비교, 최저가, 가격트래커, 쿠팡파트너스',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-background">
        {children}
      </body>
    </html>
  );
}
