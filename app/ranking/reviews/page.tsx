import type { Metadata } from 'next';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { dummyTherapists } from '@/data/dummy-therapists';
import TherapistCard from '@/components/ui/TherapistCard';

export const metadata: Metadata = {
  title: '口コミランキング｜裏東京ロマンス',
  description: '裏東京ロマンスの口コミランキング。口コミ評価が高いセラピスト一覧。グランドオープン後に実際の口コミが反映されます。',
  alternates: { canonical: 'https://uratokyoromance.com/ranking/reviews' },
};

const ranked = [...dummyTherapists]
  .filter((t) => t.reviewCount > 0)
  .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);

const RANK_TABS = [
  { href: '/ranking/popular', label: '総合人気' },
  { href: '/ranking/new', label: '新人' },
  { href: '/ranking/favorites', label: 'お気に入り' },
  { href: '/ranking/reviews', label: '口コミ' },
];

export default function ReviewsRankingPage() {
  return (
    <>
      <section className="pt-32 pb-12 px-5 bg-surface border-b border-border">
        <div className="max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-mist text-[10px] tracking-widest mb-5">
            <Link href="/" className="hover:text-cream">ホーム</Link>
            <span>/</span>
            <Link href="/ranking" className="hover:text-cream">ランキング</Link>
            <span>/</span>
            <span className="text-cream">口コミ</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <Star size={24} className="text-gold fill-gold" strokeWidth={1} />
            <h1 className="font-display text-4xl text-cream tracking-wide">口コミランキング</h1>
          </div>
          <p className="text-stone text-sm">実際に利用した方の評価が高いセラピスト。グランドオープン後に実際の口コミが反映されます。</p>
          <div className="flex gap-3 mt-6 border-b border-border">
            {RANK_TABS.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`pb-2.5 text-xs transition-colors border-b-2 -mb-px ${
                  tab.href === '/ranking/reviews' ? 'border-gold text-gold' : 'border-transparent text-stone hover:text-cream'
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
          <div className="bg-gold/5 border border-gold/20 p-4 mb-6">
            <p className="text-gold text-[10px]">口コミ機能はグランドオープン（2026年8月1日）後に提供開始します。現在表示されている評価はサンプルです。</p>
          </div>

          {ranked.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
                {ranked.slice(0, 4).map((t, i) => (
                  <TherapistCard key={t.id} therapist={t} rank={i + 1} />
                ))}
              </div>
              <div className="bg-surface border border-border divide-y divide-border/50">
                {ranked.slice(4).map((t, i) => (
                  <Link key={t.id} href={`/therapists/${t.slug}`} className="flex items-center gap-5 px-6 py-4 hover:bg-elevated transition-colors group">
                    <span className="text-stone text-sm font-display w-8">{i + 5}</span>
                    {t.image && <img src={t.image} alt={t.name} className="w-10 h-14 object-cover object-top flex-shrink-0" />}
                    <div className="flex-1 min-w-0">
                      <p className="text-cream text-sm group-hover:text-gold">{t.name}</p>
                      <p className="text-mist text-[10px]">{t.areas.slice(0, 2).join('・')}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        {[1,2,3,4,5].map((s) => (
                          <Star key={s} size={10} className={s <= Math.round(t.rating) ? 'text-gold fill-gold' : 'text-border'} />
                        ))}
                      </div>
                      <p className="text-mist text-[10px]">{t.reviewCount}件</p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="card-luxury p-10 text-center">
              <p className="text-stone text-sm">グランドオープン後に口コミが集まり次第、ランキングが表示されます</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
