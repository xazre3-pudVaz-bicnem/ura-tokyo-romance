import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import TherapistCard from '@/components/ui/TherapistCard';
import { rankingTherapists } from '@/data/dummy-therapists';

const rankingTypes = [
  { id: 'review', label: '口コミ評価順' },
  { id: 'favorite', label: 'お気に入り順' },
  { id: 'newface', label: '新人ランキング' },
];

export default function RankingSection() {
  const top3 = rankingTherapists.slice(0, 3);

  return (
    <section className="section-py px-5">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          en="Ranking"
          ja="人気ランキング"
          description="掲載セラピストの閲覧数・お気に入り数をもとにしたランキングです。（グランドオープン後に実データで更新予定のサンプル表示）"
        />

        {/* Ranking type tabs */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {rankingTypes.map((type, i) => (
            <button
              key={type.id}
              className={`text-[10px] tracking-widest px-4 py-2 border transition-all duration-200 ${
                i === 0
                  ? 'border-gold text-gold'
                  : 'border-border text-stone hover:border-stone'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Top 3 podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {/* 2nd */}
          {top3[1] && (
            <div className="md:mt-8">
              <TherapistCard therapist={top3[1]} rank={2} />
            </div>
          )}
          {/* 1st */}
          {top3[0] && (
            <div className="md:-mt-4">
              <div className="relative">
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-gold text-base text-[10px] tracking-widest px-4 py-1">
                    BEST THERAPIST
                  </span>
                </div>
                <TherapistCard therapist={top3[0]} rank={1} />
              </div>
            </div>
          )}
          {/* 3rd */}
          {top3[2] && (
            <div className="md:mt-8">
              <TherapistCard therapist={top3[2]} rank={3} />
            </div>
          )}
        </div>

        <div className="text-center">
          <Link href="/ranking" className="btn-primary inline-flex">
            ランキングをすべて見る
          </Link>
        </div>
      </div>
    </section>
  );
}
