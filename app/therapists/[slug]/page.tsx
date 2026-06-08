import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Clock, Star, Heart, ShieldCheck, MessageCircle, Flag, Instagram, Check } from 'lucide-react';
import { dummyTherapists, BADGE_LABELS } from '@/data/dummy-therapists';
import TherapistCard from '@/components/ui/TherapistCard';
import FavoriteButton from '@/components/ui/FavoriteButton';
import CompareButton from '@/components/ui/CompareButton';
import HistoryTracker from '@/components/ui/HistoryTracker';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const therapist = dummyTherapists.find((t) => t.slug === slug);
  if (!therapist) return { title: 'Not Found' };

  return {
    title: `${therapist.name}のプロフィール｜東京 女風セラピスト｜裏東京ロマンス`,
    description: `${therapist.name}（${therapist.age}歳）のプロフィール。対応エリア：${therapist.areas.join('・')}。${therapist.intro.slice(0, 80)}。東京の女風マッチングプラットフォーム 裏東京ロマンス。`,
    alternates: { canonical: `https://ura-tokyo-romance.com/therapists/${slug}` },
  };
}

export function generateStaticParams() {
  return dummyTherapists.map((t) => ({ slug: t.slug }));
}

export default async function TherapistDetailPage({ params }: Props) {
  const { slug } = await params;
  const therapist = dummyTherapists.find((t) => t.slug === slug);
  if (!therapist) notFound();

  const relatedTherapists = dummyTherapists
    .filter((t) => t.slug !== slug && t.areas.some((a) => therapist.areas.includes(a)))
    .slice(0, 4);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: therapist.name,
    description: therapist.intro,
    knowsAbout: therapist.tags,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <HistoryTracker slug={therapist.slug} name={therapist.name} />

      {/* Profile header */}
      <section className="pt-32 pb-12 px-5 bg-surface border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Photo */}
            <div className="md:w-2/5 lg:w-1/3">
              <div className="relative aspect-[3/4] img-placeholder min-h-[300px]">
                {therapist.isNew && (
                  <div className="absolute top-3 left-3 border border-gold text-gold text-[10px] tracking-widest px-3 py-1">
                    NEW
                  </div>
                )}
                {therapist.verifiedId && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-base/80 backdrop-blur-sm px-2 py-1 rounded-full">
                    <ShieldCheck size={11} className="text-gold" />
                    <span className="text-[10px] text-gold">本人確認済</span>
                  </div>
                )}
                {therapist.consultAvailable && (
                  <div className="absolute top-10 right-3 flex items-center gap-1 bg-wine/80 backdrop-blur-sm px-2 py-1 rounded-full">
                    <span className="text-[10px] text-cream">即日相談可</span>
                  </div>
                )}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-5xl font-display text-stone/30">{therapist.name[0]}</span>
                  <span className="text-[10px] text-stone/30 tracking-widest">PHOTO</span>
                </div>
              </div>

              {/* Sub photos placeholder */}
              <div className="grid grid-cols-3 gap-2 mt-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-square img-placeholder">
                    <span className="text-[10px] text-stone/20 tracking-widest">SUB {i}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="md:flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-gold text-[10px] tracking-[0.3em] mb-2">Therapist Profile</p>
                  <h1 className="font-display text-4xl text-cream tracking-wide">{therapist.name}</h1>
                </div>
                <div className="flex items-center gap-2">
                  <CompareButton slug={therapist.slug} name={therapist.name} />
                  <FavoriteButton slug={therapist.slug} name={therapist.name} />
                </div>
              </div>

              {/* Badges */}
              {therapist.badges && therapist.badges.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {therapist.badges.map((badge) => (
                    <span key={badge} className="flex items-center gap-1 text-[10px] text-gold border border-gold/30 px-2 py-0.5">
                      <Check size={9} />
                      {BADGE_LABELS[badge] ?? badge}
                    </span>
                  ))}
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {therapist.tags.map((tag) => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="text-center p-3 bg-elevated border border-border">
                  <p className="text-stone text-[10px] tracking-wider mb-1">年齢</p>
                  <p className="text-cream text-xl font-display">{therapist.age}<span className="text-stone text-xs">歳</span></p>
                </div>
                <div className="text-center p-3 bg-elevated border border-border">
                  <p className="text-stone text-[10px] tracking-wider mb-1">身長</p>
                  <p className="text-cream text-xl font-display">{therapist.height}<span className="text-stone text-xs">cm</span></p>
                </div>
                <div className="text-center p-3 bg-elevated border border-border">
                  <p className="text-stone text-[10px] tracking-wider mb-1">口コミ</p>
                  <p className="text-cream text-xl font-display flex items-center justify-center gap-1">
                    <Star size={13} className="text-gold fill-gold" />
                    <span className="text-base">{therapist.reviewCount}</span>
                  </p>
                </div>
              </div>

              {/* Area */}
              <div className="flex items-start gap-2 mb-3">
                <MapPin size={14} className="text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gold text-[10px] tracking-wider mb-1">対応エリア</p>
                  <p className="text-stone text-sm">{therapist.areas.join('・')}</p>
                </div>
              </div>

              {/* Schedule */}
              {therapist.scheduleNote && (
                <div className="flex items-center gap-2 mb-6">
                  <Clock size={14} className="text-gold flex-shrink-0" />
                  <div>
                    <p className="text-gold text-[10px] tracking-wider mb-1">出勤予定</p>
                    <p className="text-stone text-sm">{therapist.scheduleNote}</p>
                  </div>
                </div>
              )}

              {/* Plans */}
              <div className="mb-6">
                <p className="text-gold text-[10px] tracking-widest mb-3">料金目安</p>
                <div className="grid grid-cols-2 gap-2">
                  {therapist.plans.map((plan) => (
                    <div key={plan.name} className="flex items-center justify-between bg-elevated border border-border px-3 py-2">
                      <span className="text-stone text-xs">{plan.name}</span>
                      <span className="text-cream text-sm">¥{plan.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <p className="text-mist text-[10px] mt-2">
                  ※交通費は別途実費。指名料は各セラピストのプロフィールをご確認ください。
                </p>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={`/therapists/${therapist.slug}/consult`} className="btn-primary flex items-center gap-2">
                  <MessageCircle size={15} />
                  {therapist.name}に相談する
                </Link>
                {therapist.instagram && (
                  <a href={therapist.instagram} target="_blank" rel="noopener noreferrer" className="btn-secondary flex items-center gap-2">
                    <Instagram size={15} />
                    Instagram
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile details */}
      <section className="section-py px-5">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Self intro */}
          <div className="card-luxury p-8">
            <p className="text-gold text-[10px] tracking-widest mb-4">自己紹介</p>
            <p className="text-stone text-sm leading-relaxed">{therapist.intro}</p>
          </div>

          {/* Recommended */}
          <div className="card-luxury p-8">
            <p className="text-gold text-[10px] tracking-widest mb-4">おすすめポイント</p>
            <p className="text-stone text-sm leading-relaxed">{therapist.recommended}</p>
          </div>

          {/* Message to user */}
          {therapist.messageToUser && (
            <div className="card-luxury p-8 border-l-2 border-l-wine">
              <p className="text-gold text-[10px] tracking-widest mb-4">利用者へのメッセージ</p>
              <p className="text-stone text-sm leading-relaxed italic">&ldquo;{therapist.messageToUser}&rdquo;</p>
            </div>
          )}

          {/* Reviews placeholder */}
          <div>
            <p className="text-gold text-[10px] tracking-widest mb-4 flex items-center gap-2">
              <Star size={12} className="text-gold fill-gold" />
              口コミ・評価（{therapist.reviewCount}件）
            </p>
            {therapist.reviewCount > 0 ? (
              <div className="space-y-4">
                {[
                  { text: '初めて利用しましたが、とても話しやすくて時間を忘れるくらい楽しめました。また絶対利用したいです。', rating: 5 },
                  { text: '丁寧で誠実な対応が印象的でした。事前のやり取りから当日まで安心して過ごせました。', rating: 5 },
                ].map((review, i) => (
                  <div key={i} className="card-luxury p-6">
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: review.rating }).map((_, j) => (
                        <Star key={j} size={12} className="text-gold fill-gold" />
                      ))}
                    </div>
                    <p className="text-stone text-xs leading-relaxed">{review.text}</p>
                    <p className="text-mist text-[10px] mt-3">匿名ユーザー</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-mist text-sm">まだ口コミがありません。最初の口コミを投稿しませんか？</p>
            )}
          </div>

          {/* Report + Back */}
          <div className="flex items-center justify-between pt-4">
            <Link href="/therapists" className="text-gold text-xs tracking-widest hover:text-gold-light transition-colors">
              ← セラピスト一覧に戻る
            </Link>
            <Link href="/report" className="flex items-center gap-1.5 text-mist text-xs hover:text-stone transition-colors">
              <Flag size={12} />
              このプロフィールを通報する
            </Link>
          </div>
        </div>
      </section>

      {/* Related */}
      {relatedTherapists.length > 0 && (
        <section className="pb-20 px-5 bg-surface">
          <div className="max-w-6xl mx-auto">
            <p className="text-gold text-[10px] tracking-widest mb-6">同じエリアのセラピスト</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedTherapists.map((t) => (
                <TherapistCard key={t.id} therapist={t} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
