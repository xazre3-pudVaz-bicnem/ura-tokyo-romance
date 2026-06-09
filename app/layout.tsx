import type { Metadata } from 'next';
import { Cormorant_Garamond, Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import CompareBar from '@/components/ui/CompareBar';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const noto = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://uratokyoromance.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: '東京 女風マッチング｜裏東京ロマンス｜2026年8月1日グランドオープン',
    template: '%s｜裏東京ロマンス',
  },
  description:
    '裏東京ロマンスは、東京で女性用風俗・女風を利用したい女性と、個人で活動したいセラピストをつなぐマッチングプラットフォームです。本人確認済みセラピスト掲載。2026年8月1日グランドオープン。',
  keywords: [
    '東京 女性用風俗',
    '東京 女風',
    '女風 マッチング',
    '女性用風俗 マッチング',
    '東京 女風 セラピスト',
    '女風 セラピスト 登録',
    '女性向け風俗 東京',
    '裏東京ロマンス',
    '女風マッチングサイト',
  ],
  authors: [{ name: '裏東京ロマンス' }],
  creator: '裏東京ロマンス',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: siteUrl,
    siteName: '裏東京ロマンス',
    title: '東京 女風マッチング｜裏東京ロマンス｜2026年8月1日グランドオープン',
    description:
      '裏東京ロマンスは、東京で女性用風俗・女風を利用したい女性と、個人で活動したいセラピストをつなぐマッチングプラットフォームです。',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '裏東京ロマンス - 東京 女風マッチングプラットフォーム',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '東京 女風マッチング｜裏東京ロマンス',
    description: '東京で女風セラピストを探す・比較する・相談する。本人確認済みセラピスト掲載。2026年8月1日グランドオープン。',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '裏東京ロマンス',
  description: '東京で女性用風俗・女風を利用したい女性と、個人で活動したいセラピストをつなぐマッチングプラットフォーム',
  url: siteUrl,
  sameAs: ['https://www.instagram.com/ura_tokyo_romance/'],
  areaServed: {
    '@type': 'City',
    name: '東京',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${cormorant.variable} ${noto.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="bg-base text-cream font-sans antialiased">
        <Header />
        <main className="pb-safe">{children}</main>
        <Footer />
        <CompareBar />
        <MobileBottomNav />
      </body>
    </html>
  );
}
