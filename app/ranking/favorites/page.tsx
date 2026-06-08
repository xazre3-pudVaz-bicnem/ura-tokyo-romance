import type { Metadata } from 'next';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { dummyTherapists } from '@/data/dummy-therapists';
import TherapistCard from '@/components/ui/TherapistCard';

export const metadata: Metadata = {
  title: 'お気に入りランキング｜裏東京ロマンス',
  description: '裏東京ロマンスのお気に入りランキング。多くの女性にお気に入り登録されているセラピスト一覧。',
  alternates: { canonical: 'https://ura-tokyo-romance.com/ranking/favorites' },
};

const ranked = [...dummyTherapists].sort((a, b) => b.favoriteCount - a.favoriteCount);

const RANK_TABS = [
  { href: '/ranking/popular', label: '総合人気' },
  { href: '/ranking/new', label: '新人' },
  { href: '/ranking/favorites', label: 'お気に入り' },
  { href: '/ranking/reviews', label: '口コミ' },
];

export default function FavoritesRankingPage() {
  return (
    <>
      <section className="pt-32 pb-12 px-5 bg-surface border-b border-border">
        <div className="max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-mist text-[10px] tracking-widest mb-5">
            <Link href="/" className="hover:text-cream">ホーム</Link>
            <span>/</span>
            <Link href="/ranking" className="hover:text-cream">ランキング</Link>
            <span>/</span>
            <span className="text-cream">お気に入り</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <Heart size={24} className="text-wine" strokeWidth={1} />
            <h1 className="font-display text-4xl text-cream tracking-wide">お気に入りランキング</h1>
          </div>
          <p className="text-stone text-sm">多くの方にお気に入り登録されているセラピスト。リピートされ続ける理由があります。</p>
          <div className="flex gap-3 mt-6 border-b border-border">
            {RANK_TABS.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`pb-2.5 text-xs transition-colors border-b-2 -mb-px ${
                  tab.href === '/ranking/favorites' ? 'border-gold text-gold' : 'border-transparent text-stone hover:text-cream'
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
                <div className="flex items-center gap-1.5 text-wine text-sm">
                  <Heart size={13} className="fill-wine" />
                  {t.favoriteCount}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
