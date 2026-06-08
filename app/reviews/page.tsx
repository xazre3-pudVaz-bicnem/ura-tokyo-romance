import type { Metadata } from 'next';
import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import ReviewCard from '@/components/ui/ReviewCard';
import { dummyReviews } from '@/data/dummy-reviews';

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
          {/* Pre-launch notice */}
          <div className="bg-elevated border border-gold/20 p-8 mb-16 text-center">
            <p className="text-gold text-[10px] tracking-[0.3em] mb-3">口コミ機能 準備中</p>
            <p className="text-cream text-lg font-display mb-3">2026年8月1日グランドオープン後に公開予定</p>
            <p className="text-stone text-sm leading-relaxed">
              実際に裏東京ロマンスを利用した方の口コミを掲載します。<br />
              セラピストのプロフィールページから利用後に投稿いただけます。
            </p>
          </div>

          <SectionTitle en="Sample Reviews" ja="サンプル口コミ" />

          <div className="mb-6 p-4 bg-elevated border border-border">
            <p className="text-mist text-xs text-center">以下はサンプル口コミです。グランドオープン（2026年8月1日）後に実際の利用者の声が蓄積されます。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 opacity-60">
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
