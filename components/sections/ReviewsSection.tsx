import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import ReviewCard from '@/components/ui/ReviewCard';
import { dummyReviews } from '@/data/dummy-reviews';

export default function ReviewsSection() {
  const reviews = dummyReviews.slice(0, 3);

  return (
    <section className="section-py px-5 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10">
          <SectionTitle
            en="Reviews"
            ja="口コミ機能"
            align="left"
            className="mb-0"
            description="グランドオープン後、実際に利用した方の口コミが蓄積されます。"
          />
          <Link href="/reviews" className="text-gold text-xs tracking-widest hover:text-gold/80 transition-colors mt-6 md:mt-0 flex items-center gap-2">
            口コミ詳細 <span>→</span>
          </Link>
        </div>

        {/* Pre-launch notice */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            { label: 'グランドオープン', value: '2026.8.1', sub: '口コミ機能公開予定' },
            { label: '先行登録', value: '受付中', sub: 'セラピスト登録を募集しています' },
            { label: '口コミ掲載', value: '準備中', sub: 'オープン後に実際の声を公開' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-5 md:p-8 bg-elevated border border-border">
              <p className="font-display text-2xl md:text-3xl text-cream mb-1">{stat.value}</p>
              <p className="text-gold text-[9px] tracking-widest">{stat.sub}</p>
              <p className="text-stone text-[10px] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Sample reviews with label */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-mist text-[10px] tracking-widest border border-border/50 px-3 py-1">サンプル口コミ（グランドオープン後に実際の声を掲載予定）</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 opacity-60">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <Link href="/register" className="btn-primary inline-flex mr-4">
            セラピスト登録はこちら
          </Link>
          <Link href="/reviews" className="btn-secondary inline-flex">
            口コミについて詳しく
          </Link>
        </div>
      </div>
    </section>
  );
}
