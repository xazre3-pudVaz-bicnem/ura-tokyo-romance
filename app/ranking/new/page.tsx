import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { dummyTherapists } from '@/data/dummy-therapists';
import TherapistCard from '@/components/ui/TherapistCard';

export const metadata: Metadata = {
  title: '新人ランキング｜裏東京ロマンス',
  description: '裏東京ロマンスの新人セラピストランキング。最近デビューした注目のセラピストをご紹介。',
  alternates: { canonical: 'https://uratokyoromance.com/ranking/new' },
};

const newFace = [...dummyTherapists]
  .filter((t) => t.isNew)
  .sort((a, b) => b.weeklyViewCount - a.weeklyViewCount);

const RANK_TABS = [
  { href: '/ranking/popular', label: '総合人気' },
  { href: '/ranking/new', label: '新人' },
  { href: '/ranking/favorites', label: 'お気に入り' },
  { href: '/ranking/reviews', label: '口コミ' },
];

export default function NewRankingPage() {
  return (
    <>
      <section className="pt-32 pb-12 px-5 bg-surface border-b border-border">
        <div className="max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-mist text-[10px] tracking-widest mb-5">
            <Link href="/" className="hover:text-cream">ホーム</Link>
            <span>/</span>
            <Link href="/ranking" className="hover:text-cream">ランキング</Link>
            <span>/</span>
            <span className="text-cream">新人</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <Sparkles size={24} className="text-gold" strokeWidth={1} />
            <h1 className="font-display text-4xl text-cream tracking-wide">新人ランキング</h1>
          </div>
          <p className="text-stone text-sm">最近デビューしたばかりのセラピスト。今が最初のチャンス。</p>

          <div className="flex gap-3 mt-6 border-b border-border">
            {RANK_TABS.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`pb-2.5 text-xs transition-colors border-b-2 -mb-px ${
                  tab.href === '/ranking/new' ? 'border-gold text-gold' : 'border-transparent text-stone hover:text-cream'
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
          {newFace.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
                {newFace.slice(0, 4).map((t, i) => (
                  <TherapistCard key={t.id} therapist={t} badge="NEW" />
                ))}
              </div>
              {newFace.length > 4 && (
                <div className="bg-surface border border-border divide-y divide-border/50">
                  {newFace.slice(4).map((t, i) => (
                    <Link key={t.id} href={`/therapists/${t.slug}`} className="flex items-center gap-4 px-5 py-4 hover:bg-elevated group">
                      <span className="text-stone text-sm w-6">{i + 5}</span>
                      {t.image && <img src={t.image} alt={t.name} className="w-9 h-12 object-cover object-top" />}
                      <div className="flex-1">
                        <p className="text-cream text-sm group-hover:text-gold">{t.name}</p>
                        <p className="text-mist text-[10px]">{t.areas.slice(0, 2).join('・')}</p>
                      </div>
                      <span className="text-[10px] border border-gold/30 text-gold px-2 py-0.5">NEW</span>
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="card-luxury p-10 text-center">
              <p className="text-stone text-sm">現在新人セラピストのランキングはありません</p>
              <Link href="/ranking/popular" className="btn-secondary mt-4 inline-flex">人気ランキングを見る</Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
