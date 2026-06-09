import type { Metadata } from 'next';
import Link from 'next/link';
import { Trophy, ArrowLeft } from 'lucide-react';
import { dummyTherapists } from '@/data/dummy-therapists';
import TherapistCard from '@/components/ui/TherapistCard';

export const metadata: Metadata = {
  title: '総合人気ランキング｜裏東京ロマンス',
  description: '裏東京ロマンスの総合人気ランキング。お気に入り数・口コミ・閲覧数を総合評価した自動ランキングです。',
  keywords: ['女風 人気ランキング', '女風 セラピスト 人気', '東京 女風 ランキング'],
  alternates: { canonical: 'https://uratokyoromance.com/ranking/popular' },
};

const ranked = [...dummyTherapists]
  .filter((t) => t.showInRanking)
  .sort((a, b) => b.rankScore - a.rankScore);

const RANK_TABS = [
  { href: '/ranking/popular', label: '総合人気' },
  { href: '/ranking/new', label: '新人' },
  { href: '/ranking/favorites', label: 'お気に入り' },
  { href: '/ranking/reviews', label: '口コミ' },
];

export default function PopularRankingPage() {
  return (
    <>
      <section className="pt-32 pb-12 px-5 bg-surface border-b border-border">
        <div className="max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-mist text-[10px] tracking-widest mb-5">
            <Link href="/" className="hover:text-cream">ホーム</Link>
            <span>/</span>
            <Link href="/ranking" className="hover:text-cream">ランキング</Link>
            <span>/</span>
            <span className="text-cream">総合人気</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <Trophy size={24} className="text-gold" strokeWidth={1} />
            <h1 className="font-display text-4xl text-cream tracking-wide">総合人気ランキング</h1>
          </div>
          <p className="text-stone text-sm">お気に入り数・口コミ評価・閲覧数を独自スコアで集計。自動更新されます。</p>

          {/* Tab nav */}
          <div className="flex gap-3 mt-6 border-b border-border">
            {RANK_TABS.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`pb-2.5 text-xs transition-colors border-b-2 -mb-px ${
                  tab.href === '/ranking/popular'
                    ? 'border-gold text-gold'
                    : 'border-transparent text-stone hover:text-cream'
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py px-5">
        <div className="max-w-5xl mx-auto">
          {/* Top 3 podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {ranked.slice(0, 3).map((t, i) => (
              <TherapistCard key={t.id} therapist={t} rank={i + 1} />
            ))}
          </div>

          {/* Rest of ranking as list */}
          <div className="bg-surface border border-border divide-y divide-border/50 mb-8">
            {ranked.slice(3).map((t, i) => (
              <Link key={t.id} href={`/therapists/${t.slug}`} className="flex items-center gap-5 px-6 py-4 hover:bg-elevated transition-colors group">
                <span className="text-stone text-sm font-display w-8 text-center flex-shrink-0">{i + 4}</span>
                {t.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={t.image} alt={t.name} className="w-10 h-14 object-cover object-top flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-cream text-sm group-hover:text-gold transition-colors">{t.name}</p>
                  <p className="text-mist text-[10px] mt-0.5">{t.age}歳 / {t.areas.slice(0, 2).join('・')}</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {t.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-[9px] border border-border text-mist px-1.5 py-0.5">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-gold text-sm font-display">{t.rankScore}pt</p>
                  <p className="text-mist text-[10px]">スコア</p>
                </div>
              </Link>
            ))}
          </div>

          <p className="text-mist text-[10px] text-center">
            ランキングはお気に入り数・閲覧数・口コミ数を自動集計して算出しています。
            毎日更新されます。
          </p>
        </div>
      </section>
    </>
  );
}
