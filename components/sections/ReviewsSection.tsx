import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import ReviewCard from '@/components/ui/ReviewCard';
import { dummyReviews } from '@/data/dummy-reviews';

export default function ReviewsSection() {
  const reviews = dummyReviews.slice(0, 3);

  return (
    <section className="section-py px-5 bg-surface">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
          <SectionTitle
            en="Reviews"
            ja="お客様の声"
            align="left"
            className="mb-0"
            description="ご利用いただいたお客様からいただいた声です。"
          />
          <Link href="/reviews" className="text-gold text-xs tracking-widest hover:text-gold-light transition-colors mt-6 md:mt-0 flex items-center gap-2">
            口コミをすべて見る <span>→</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {[
            { label: '総合評価', value: '5.0', sub: '/ 5.0' },
            { label: '満足度', value: '98%', sub: 'ご満足いただきました' },
            { label: 'リピート率', value: '85%', sub: 'の方がリピートご利用' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-5 md:p-8 bg-elevated border border-border">
              <p className="font-display text-3xl md:text-4xl text-cream mb-1">{stat.value}</p>
              <p className="text-gold text-[9px] tracking-widest">{stat.sub}</p>
              <p className="text-stone text-[10px] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/reviews" className="btn-secondary inline-flex">
            すべての口コミを見る
          </Link>
        </div>
      </div>
    </section>
  );
}
