import type { Metadata } from 'next';
import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import ReviewCard from '@/components/ui/ReviewCard';
import { dummyReviews } from '@/data/dummy-reviews';
import { Star } from 'lucide-react';

export const metadata: Metadata = {
  title: '口コミ・お客様の声｜東京 女性用風俗・女風の裏東京ロマンス',
  description:
    '裏東京ロマンスのお客様の声・口コミ。東京の女性用風俗・女風をご利用いただいた方のリアルな感想をご紹介します。',
  alternates: { canonical: 'https://ura-tokyo-romance.com/reviews' },
};

export default function ReviewsPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: dummyReviews.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Review',
        reviewBody: r.content,
        author: { '@type': 'Person', name: r.author },
        reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="pt-32 pb-20 px-5 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-4">Reviews</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-5 tracking-wide">口コミ・お客様の声</h1>
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-stone leading-relaxed">実際にご利用いただいたお客様からいただいた声です。</p>
        </div>
      </section>

      <section className="section-py px-5">
        <div className="max-w-5xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-16">
            {[
              { label: '総合評価', value: '5.0', sub: '/ 5.0' },
              { label: '満足度', value: '98%', sub: 'ご満足いただきました' },
              { label: 'リピート率', value: '85%', sub: 'の方がリピートご利用' },
            ].map((s) => (
              <div key={s.label} className="text-center p-6 md:p-10 bg-surface border border-border">
                <p className="font-display text-4xl text-cream mb-1">{s.value}</p>
                <div className="flex justify-center mb-1">
                  {s.label === '総合評価' && [1,2,3,4,5].map((i) => (
                    <Star key={i} size={12} className="text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-stone text-[10px]">{s.sub}</p>
                <p className="text-mist text-[10px] mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <SectionTitle en="Customer Reviews" ja="お客様の声" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {dummyReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          <div className="mt-12 bg-surface border border-border p-8 text-center">
            <p className="text-stone text-sm mb-2">口コミはご利用後にプロフィールページから投稿いただけます。</p>
            <p className="text-stone text-sm mb-6">実際に利用した方のリアルな声を参考に、セラピストを選んでください。</p>
            <Link href="/therapists" className="btn-secondary inline-flex">
              セラピストを探してみる
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
