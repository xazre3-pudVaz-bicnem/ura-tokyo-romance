import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'コラム｜東京 女風マッチング 裏東京ロマンス',
  description:
    '東京の女性用風俗・女風に関するコラム。初めての女風利用ガイド・セラピストの探し方・料金の仕組み・女風マッチングの使い方など掲載。',
  openGraph: {
    title: 'コラム｜裏東京ロマンス',
    description: '東京の女性用風俗・女風に関するコラム。初めての方向けガイドや料金・マッチングの使い方を解説。',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: 'https://uratokyoromance.com/blog' },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
