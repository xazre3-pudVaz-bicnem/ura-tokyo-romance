import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Clock, ShieldCheck, Star, ArrowRight } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import TherapistCard from '@/components/ui/TherapistCard';
import { areasData, getAreaBySlug } from '@/data/areas';
import { dummyTherapists } from '@/data/dummy-therapists';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return areasData.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) return {};
  return {
    title: area.title,
    description: area.metaDescription,
    keywords: [
      `${area.name} 女風`,
      `${area.name} 女性用風俗`,
      `${area.name} 女風 セラピスト`,
      `東京 ${area.name} 女風`,
      `${area.name} 女風 今日会える`,
    ],
    alternates: { canonical: `https://ura-tokyo-romance.com/area/${slug}` },
  };
}

export default async function AreaSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) notFound();

  const areaTherapists = dummyTherapists.filter((t) =>
    t.areas.some((a) => area.therapistKeywords.some((k) => a.includes(k)))
  );
  const todayAvailable = areaTherapists.filter((t) => t.availableToday);
  const relatedAreas = areasData.filter((a) => area.relatedSlugs.includes(a.slug));
  // Featured spotlight: urban/stylish therapist (kyohei) as the area ambassador visual
  const spotlightTherapist = dummyTherapists.find((t) => t.slug === 'kyohei')!;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: area.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://ura-tokyo-romance.com' },
      { '@type': 'ListItem', position: 2, name: 'エリア', item: 'https://ura-tokyo-romance.com/area' },
      { '@type': 'ListItem', position: 3, name: `${area.name}の女風セラピスト` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="pt-32 pb-16 px-5 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-mist text-[10px] tracking-widest mb-6">
            <Link href="/" className="hover:text-cream transition-colors">ホーム</Link>
            <span>/</span>
            <Link href="/area" className="hover:text-cream transition-colors">エリア</Link>
            <span>/</span>
            <span className="text-cream">{area.name}</span>
          </nav>

          <div className="flex items-center gap-2 mb-3">
            <MapPin size={16} className="text-gold" strokeWidth={1.5} />
            <p className="text-gold text-[10px] tracking-[0.3em]">Area Guide</p>
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-4 tracking-wide">
            {area.h1}
          </h1>
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-6" />
          <p className="text-stone leading-relaxed">{area.intro}</p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-4 mt-8">
            <div className="flex items-center gap-2 bg-elevated border border-border px-4 py-2">
              <ShieldCheck size={14} className="text-gold" strokeWidth={1.5} />
              <span className="text-stone text-xs">{areaTherapists.length}名のセラピスト</span>
            </div>
            {todayAvailable.length > 0 && (
              <div className="flex items-center gap-2 bg-wine/10 border border-wine/30 px-4 py-2">
                <Clock size={14} className="text-wine" strokeWidth={1.5} />
                <span className="text-wine text-xs">今日会える：{todayAvailable.length}名</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section-py px-5">
        <div className="max-w-5xl mx-auto">

          {/* Today available */}
          {todayAvailable.length > 0 && (
            <>
              <SectionTitle en="Available Today" ja={`${area.name}で今日会えるセラピスト`} />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {todayAvailable.map((t) => (
                  <TherapistCard key={t.id} therapist={t} badge="今日会える" />
                ))}
              </div>
            </>
          )}

          {/* All area therapists */}
          <SectionTitle
            en="Therapists"
            ja={`${area.name}エリアのセラピスト`}
            description={`${area.name}・${area.therapistKeywords.slice(1).join('・')}周辺で活動するセラピスト一覧`}
          />

          {areaTherapists.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {areaTherapists.map((t) => (
                <TherapistCard key={t.id} therapist={t} />
              ))}
            </div>
          ) : (
            <div className="card-luxury p-10 text-center mb-12">
              <p className="text-stone text-sm">
                現在{area.name}エリアのセラピストは準備中です。<br />
                グランドオープン後に公開されます。
              </p>
              <Link href="/therapists" className="btn-secondary mt-4 inline-flex">全セラピストを見る</Link>
            </div>
          )}

          {/* Spotlight therapist */}
          <div className="mb-12 border border-border overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="relative w-full md:w-52 aspect-[4/3] md:aspect-auto flex-shrink-0 overflow-hidden">
                {spotlightTherapist.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={spotlightTherapist.image}
                    alt={spotlightTherapist.name}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="img-placeholder w-full h-full" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-base/70 to-transparent" />
              </div>
              <div className="flex-1 bg-elevated p-7 flex flex-col justify-center">
                <p className="text-gold text-[10px] tracking-widest mb-3">{area.name}対応 — おすすめセラピスト</p>
                <div className="flex items-baseline gap-3 mb-2">
                  <p className="font-display text-2xl text-cream">{spotlightTherapist.name}</p>
                  <p className="text-stone text-xs">{spotlightTherapist.age}歳 / {spotlightTherapist.height}cm</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {spotlightTherapist.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="tag-pill">{tag}</span>
                  ))}
                </div>
                <p className="text-stone text-xs leading-relaxed mb-4 line-clamp-2">
                  {spotlightTherapist.recommended}
                </p>
                <Link
                  href={`/therapists/${spotlightTherapist.slug}`}
                  className="inline-flex items-center gap-1.5 text-gold text-xs tracking-widest hover:gap-2.5 transition-all duration-200 group"
                >
                  プロフィールを見る
                  <ArrowRight size={12} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Area characteristics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="card-luxury p-8">
              <p className="text-gold text-[10px] tracking-widest mb-4">エリアの特徴</p>
              <p className="text-stone text-sm leading-relaxed">{area.characteristics}</p>
            </div>
            <div className="card-luxury p-8">
              <p className="text-gold text-[10px] tracking-widest mb-4">待ち合わせのヒント</p>
              <p className="text-stone text-sm leading-relaxed">{area.meetingTips}</p>
            </div>
          </div>

          {/* Price guide */}
          <div className="card-luxury p-8 mb-12">
            <p className="text-gold text-[10px] tracking-widest mb-4">料金目安</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { time: '60分', price: '¥13,000〜¥22,000' },
                { time: '90分', price: '¥19,000〜¥30,000' },
                { time: '120分', price: '¥26,000〜¥40,000' },
                { time: '180分', price: '¥38,000〜¥58,000' },
              ].map((p) => (
                <div key={p.time} className="text-center py-4 border border-border">
                  <p className="text-stone text-xs mb-1">{p.time}</p>
                  <p className="text-gold text-sm">{p.price}</p>
                </div>
              ))}
            </div>
            <p className="text-mist text-[10px] mt-3">
              ※料金はセラピストごとに異なります。各プロフィールでご確認ください。
            </p>
          </div>

          {/* Safety guide */}
          <div className="card-luxury p-8 mb-12">
            <p className="text-gold text-[10px] tracking-widest mb-4">安全に利用するために</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                '本人確認済みバッジのあるセラピストを選ぶ',
                '料金・内容を事前に確認してから予約相談する',
                '18歳未満の方はご利用いただけません',
                '合意のもとでサービスが行われます',
                '不審な点があれば運営に通報してください',
                '個人情報を安易に共有しないでください',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <ShieldCheck size={12} className="text-gold flex-shrink-0" />
                  <span className="text-stone text-xs">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <SectionTitle en="FAQ" ja={`${area.name}エリアよくある質問`} />
          <div className="space-y-4 mb-12">
            {area.faqs.map((faq) => (
              <div key={faq.question} className="card-luxury p-7">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-wine text-sm font-display flex-shrink-0">Q</span>
                  <p className="text-cream text-sm">{faq.question}</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gold text-sm font-display flex-shrink-0">A</span>
                  <p className="text-stone text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Access */}
          <div className="card-luxury p-6 mb-12">
            <div className="flex items-start gap-3">
              <MapPin size={16} className="text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="text-cream text-sm mb-1">アクセス情報</p>
                <p className="text-stone text-xs leading-relaxed">{area.accessNote}</p>
              </div>
            </div>
          </div>

          {/* Related areas */}
          {relatedAreas.length > 0 && (
            <>
              <SectionTitle en="Related Areas" ja="近隣エリアで探す" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
                {relatedAreas.map((related) => {
                  const count = dummyTherapists.filter((t) =>
                    t.areas.some((a) => related.therapistKeywords.some((k) => a.includes(k)))
                  ).length;
                  return (
                    <Link
                      key={related.slug}
                      href={`/area/${related.slug}`}
                      className="card-luxury p-4 flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin size={13} className="text-gold" strokeWidth={1.5} />
                        <span className="text-cream text-sm">{related.name}</span>
                      </div>
                      <div className="flex items-center gap-1 text-stone text-xs">
                        <span>{count}名</span>
                        <ArrowRight size={11} className="text-gold group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}

          {/* CTA */}
          <div className="card-luxury p-10 text-center">
            <Star size={24} className="text-gold mx-auto mb-4" strokeWidth={1} />
            <h2 className="font-display text-2xl text-cream mb-3">
              {area.name}でセラピストを見つけましょう
            </h2>
            <p className="text-stone text-sm mb-6 leading-relaxed">
              全セラピストは本人確認・審査を通過しています。<br />
              プロフィールで料金・雰囲気を確認してから相談できます。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={`/therapists?area=${encodeURIComponent(area.therapistKeywords[0])}`} className="btn-primary">
                {area.name}のセラピストを見る
              </Link>
              <Link href="/first" className="btn-secondary">初めての方へ</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
