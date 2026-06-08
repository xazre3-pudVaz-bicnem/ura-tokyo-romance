import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import SearchSection from '@/components/sections/SearchSection';
import TodaysTherapists from '@/components/sections/TodaysTherapists';
import NewFaceSection from '@/components/sections/NewFaceSection';
import RankingSection from '@/components/sections/RankingSection';
import ServicesSection from '@/components/sections/ServicesSection';
import FirstVisitCTA from '@/components/sections/FirstVisitCTA';
import SafetySection from '@/components/sections/SafetySection';
import PricingSection from '@/components/sections/PricingSection';
import BookingFlow from '@/components/sections/BookingFlow';
import ReviewsSection from '@/components/sections/ReviewsSection';
import BlogSection from '@/components/sections/BlogSection';
import RecruitCTA from '@/components/sections/RecruitCTA';
import FaqSection from '@/components/sections/FaqSection';

export const metadata: Metadata = {
  title: '東京 女風マッチング｜女性用風俗 セラピスト検索・比較・相談 裏東京ロマンス',
  keywords: [
    '東京 女風 マッチング', '東京 女性用風俗 マッチング', '女風 セラピスト 検索',
    '東京 女風', '女性用風俗 東京', '女風 比較', '女風 相談',
  ],
  description:
    '裏東京ロマンスは、東京で女性用風俗・女風を利用したい女性と、個人で活動したいセラピストをつなぐマッチングプラットフォームです。本人確認済みセラピストのみ掲載。2026年8月1日グランドオープン。',
  openGraph: {
    title: '東京 女風マッチング｜裏東京ロマンス',
    description: '本人確認済みの東京女風セラピストを検索・比較・相談できるマッチングプラットフォーム。2026年8月1日グランドオープン。',
    locale: 'ja_JP',
    type: 'website',
  },
  alternates: {
    canonical: 'https://ura-tokyo-romance.com',
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <SearchSection />
      <TodaysTherapists />
      <NewFaceSection />
      <RankingSection />
      <ServicesSection />
      <FirstVisitCTA />
      <SafetySection />
      <PricingSection />
      <BookingFlow />
      <ReviewsSection />
      <BlogSection />
      <RecruitCTA />
      <FaqSection />
    </>
  );
}
