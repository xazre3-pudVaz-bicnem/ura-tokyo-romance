import type { Metadata } from 'next';
import SectionTitle from '@/components/ui/SectionTitle';
import TherapistCard from '@/components/ui/TherapistCard';
import { rankingTherapists } from '@/data/dummy-therapists';

export const metadata: Metadata = {
  title: 'セラピストランキング｜東京 女性用風俗・女風の裏東京ロマンス',
  description:
    '裏東京ロマンスのセラピストランキング。東京の女性用風俗・女風で特に人気の高いセラピストをご紹介します。',
  alternates: { canonical: 'https://ura-tokyo-romance.com/ranking' },
};

export default function RankingPage() {
  return (
    <>
      <section className="pt-32 pb-20 px-5 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-4">Ranking</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-5 tracking-wide">人気ランキング</h1>
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-stone leading-relaxed">
            お客様から特にご支持をいただいているセラピストのランキングです。
          </p>
        </div>
      </section>

      <section className="section-py px-5">
        <div className="max-w-6xl mx-auto">
          <SectionTitle en="Review Ranking" ja="口コミ高評価ランキング" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
            {rankingTherapists.slice(0, 3).map((t, i) => (
              <div key={t.id} className={i === 0 ? 'md:-mt-4 relative' : 'md:mt-8'}>
                {i === 0 && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center z-10">
                    <span className="bg-gold text-base text-[9px] tracking-widest px-4 py-0.5">No.1</span>
                  </div>
                )}
                <TherapistCard therapist={t} rank={i + 1} />
              </div>
            ))}
          </div>

          <SectionTitle en="Favorite Ranking" ja="お気に入りランキング" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-16">
            {rankingTherapists.slice(0, 4).map((t, i) => (
              <TherapistCard key={t.id} therapist={t} rank={i + 1} />
            ))}
          </div>

          <SectionTitle en="New Face Ranking" ja="新人ランキング" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {rankingTherapists.filter((t) => t.isNew).slice(0, 4).map((t, i) => (
              <TherapistCard key={t.id} therapist={t} rank={i + 1} badge="NEW" />
            ))}
            {rankingTherapists.filter((t) => t.isNew).length === 0 && (
              <div className="col-span-4 text-stone text-sm text-center py-12">新人ランキングは準備中です</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
