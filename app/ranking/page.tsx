import type { Metadata } from 'next';
import Link from 'next/link';
import { Trophy, TrendingUp, Star, Heart, Eye, Sparkles, Users } from 'lucide-react';
import { dummyTherapists } from '@/data/dummy-therapists';
import TherapistCard from '@/components/ui/TherapistCard';

export const metadata: Metadata = {
  title: 'セラピストランキング【2026年最新版】｜裏東京ロマンス',
  description: '裏東京ロマンスのセラピストランキング。人気・新人・お気に入り・口コミ・閲覧数などのランキングをリアルタイムで更新中。東京の女風セラピストを選ぶ参考に。',
  keywords: ['女風 ランキング', 'セラピスト ランキング', '女風 人気', '東京 女風 人気セラピスト'],
  alternates: { canonical: 'https://uratokyoromance.com/ranking' },
};

const RANKING_CATEGORIES = [
  { href: '/ranking/popular', label: '総合人気', icon: Trophy, desc: 'お気に入り・口コミ・閲覧数を総合評価' },
  { href: '/ranking/new', label: '新人', icon: Sparkles, desc: '最近デビューした注目のセラピスト' },
  { href: '/ranking/favorites', label: 'お気に入り', icon: Heart, desc: 'お気に入り登録数が多いセラピスト' },
  { href: '/ranking/reviews', label: '口コミ', icon: Star, desc: '口コミ評価が高いセラピスト' },
];

// Auto ranking: sort by rankScore
const popularRanking = [...dummyTherapists]
  .filter((t) => t.showInRanking)
  .sort((a, b) => b.rankScore - a.rankScore)
  .slice(0, 3);

const weeklyRanking = [...dummyTherapists]
  .filter((t) => t.showInRanking)
  .sort((a, b) => b.weeklyViewCount - a.weeklyViewCount)
  .slice(0, 3);

const risingRanking = [...dummyTherapists]
  .sort((a, b) => b.weeklyViewCount / (b.viewCount || 1) - a.weeklyViewCount / (a.viewCount || 1))
  .slice(0, 3);

export default function RankingPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-5 bg-surface border-b border-border">
        <div className="max-w-5xl mx-auto">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-4">Ranking</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-4 tracking-wide">ランキング</h1>
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-6" />
          <p className="text-stone leading-relaxed max-w-2xl">
            閲覧数・お気に入り数・口コミ評価をもとに自動生成されるランキングです。
            リアルタイムで更新されます。
          </p>

          {/* Category grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
            {RANKING_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link key={cat.href} href={cat.href} className="card-luxury p-5 group hover:border-gold/30 transition-colors">
                  <Icon size={18} className="text-gold mb-2" strokeWidth={1.5} />
                  <p className="text-cream text-sm mb-1">{cat.label}</p>
                  <p className="text-mist text-[10px] leading-relaxed">{cat.desc}</p>
                  <div className="mt-3 text-gold text-[10px] tracking-widest group-hover:tracking-[0.2em] transition-all">
                    見る →
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-py px-5">
        <div className="max-w-5xl mx-auto space-y-16">

          {/* Popular top 3 */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Trophy size={18} className="text-gold" strokeWidth={1.5} />
                <h2 className="font-display text-2xl text-cream">総合人気ランキング</h2>
              </div>
              <Link href="/ranking/popular" className="text-gold text-[10px] tracking-widest hover:underline">全て見る →</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {popularRanking.map((t, i) => (
                <TherapistCard key={t.id} therapist={t} rank={i + 1} />
              ))}
            </div>
          </div>

          {/* Weekly trending */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp size={18} className="text-gold" strokeWidth={1.5} />
                <h2 className="font-display text-2xl text-cream">今週の閲覧ランキング</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {weeklyRanking.map((t, i) => (
                <TherapistCard key={t.id} therapist={t} rank={i + 1} />
              ))}
            </div>
          </div>

          {/* Rising */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-gold" strokeWidth={1.5} />
                <h2 className="font-display text-2xl text-cream">急上昇ランキング</h2>
              </div>
            </div>
            <div className="bg-surface border border-border divide-y divide-border/50">
              {risingRanking.map((t, i) => (
                <Link key={t.id} href={`/therapists/${t.slug}`} className="flex items-center gap-5 px-6 py-4 hover:bg-elevated transition-colors group">
                  <div className="text-gold font-display text-2xl w-8 flex-shrink-0">{i + 1}</div>
                  {t.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={t.image} alt={t.name} className="w-10 h-14 object-cover object-top flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-cream text-sm group-hover:text-gold transition-colors">{t.name}</p>
                    <p className="text-mist text-[10px]">{t.areas.slice(0, 2).join('・')}</p>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-400 text-xs">
                    <TrendingUp size={12} />
                    今週 +{t.weeklyViewCount}回
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: '総閲覧数（今月）', value: dummyTherapists.reduce((s, t) => s + t.monthlyViewCount, 0).toLocaleString(), icon: Eye },
              { label: 'お気に入り合計', value: dummyTherapists.reduce((s, t) => s + t.favoriteCount, 0).toLocaleString(), icon: Heart },
              { label: '登録セラピスト', value: dummyTherapists.length, icon: Users },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="card-luxury p-5 text-center">
                  <Icon size={18} className="text-gold mx-auto mb-2" strokeWidth={1.5} />
                  <p className="font-display text-2xl text-cream">{s.value}</p>
                  <p className="text-mist text-[10px] mt-1">{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
