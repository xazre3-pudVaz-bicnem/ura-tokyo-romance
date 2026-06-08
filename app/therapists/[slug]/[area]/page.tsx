import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Star, Heart, ShieldCheck, Clock, Eye, Check, MessageCircle } from 'lucide-react';
import { dummyTherapists, AUTH_LEVEL_LABELS, AUTH_LEVEL_COLORS } from '@/data/dummy-therapists';
import FavoriteButton from '@/components/ui/FavoriteButton';
import TherapistCard from '@/components/ui/TherapistCard';

const AREA_MAP: Record<string, { name: string; prefecture: string; nearStations: string[] }> = {
  shinjuku: { name: '新宿', prefecture: '東京都', nearStations: ['新宿駅', '西新宿駅', '新宿三丁目駅'] },
  shibuya: { name: '渋谷', prefecture: '東京都', nearStations: ['渋谷駅', '表参道駅', '恵比寿駅'] },
  ikebukuro: { name: '池袋', prefecture: '東京都', nearStations: ['池袋駅', '要町駅', '東池袋駅'] },
  ginza: { name: '銀座', prefecture: '東京都', nearStations: ['銀座駅', '有楽町駅', '東銀座駅'] },
  roppongi: { name: '六本木', prefecture: '東京都', nearStations: ['六本木駅', '麻布十番駅', '乃木坂駅'] },
  akihabara: { name: '秋葉原', prefecture: '東京都', nearStations: ['秋葉原駅', '末広町駅', '神田駅'] },
  ueno: { name: '上野', prefecture: '東京都', nearStations: ['上野駅', '上野広小路駅', '御徒町駅'] },
  asakusa: { name: '浅草', prefecture: '東京都', nearStations: ['浅草駅', '蔵前駅', '押上駅'] },
  nakameguro: { name: '中目黒', prefecture: '東京都', nearStations: ['中目黒駅', '祐天寺駅', '代官山駅'] },
  shimokitazawa: { name: '下北沢', prefecture: '東京都', nearStations: ['下北沢駅', '世田谷代田駅', '東北沢駅'] },
  ebisu: { name: '恵比寿', prefecture: '東京都', nearStations: ['恵比寿駅', '代官山駅', '広尾駅'] },
  harajuku: { name: '原宿', prefecture: '東京都', nearStations: ['原宿駅', '明治神宮前駅', '表参道駅'] },
  koenji: { name: '高円寺', prefecture: '東京都', nearStations: ['高円寺駅', '阿佐ヶ谷駅', '中野駅'] },
  kichijoji: { name: '吉祥寺', prefecture: '東京都', nearStations: ['吉祥寺駅', '西荻窪駅', '三鷹駅'] },
  gotanda: { name: '五反田', prefecture: '東京都', nearStations: ['五反田駅', '大崎駅', '目黒駅'] },
  shinagawa: { name: '品川', prefecture: '東京都', nearStations: ['品川駅', '大崎駅', '北品川駅'] },
  akasaka: { name: '赤坂', prefecture: '東京都', nearStations: ['赤坂駅', '溜池山王駅', '赤坂見附駅'] },
  toranomon: { name: '虎ノ門', prefecture: '東京都', nearStations: ['虎ノ門駅', '神谷町駅', '虎ノ門ヒルズ駅'] },
  ochanomizu: { name: 'お茶の水', prefecture: '東京都', nearStations: ['御茶ノ水駅', '新御茶ノ水駅', '小川町駅'] },
  shimbashi: { name: '新橋', prefecture: '東京都', nearStations: ['新橋駅', '内幸町駅', '汐留駅'] },
};

interface Props {
  params: Promise<{ slug: string; area: string }>;
}

export async function generateStaticParams() {
  const paths: { slug: string; area: string }[] = [];
  const areaKeys = Object.keys(AREA_MAP);
  for (const therapist of dummyTherapists) {
    for (const areaKey of areaKeys) {
      const areaData = AREA_MAP[areaKey];
      if (therapist.areas.some((a) => a.includes(areaData.name))) {
        paths.push({ slug: therapist.slug, area: areaKey });
      }
    }
  }
  return paths;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, area } = await params;
  const therapist = dummyTherapists.find((t) => t.slug === slug);
  const areaData = AREA_MAP[area];
  if (!therapist || !areaData) return { title: 'Not Found' };

  return {
    title: `${therapist.name} ${areaData.name}出張｜東京 ${areaData.name} 女風セラピスト｜裏東京ロマンス`,
    description: `${areaData.name}エリア出張可能なセラピスト${therapist.name}（${therapist.age}歳）のプロフィール。${areaData.nearStations.join('・')}周辺対応。${therapist.intro.slice(0, 60)}。東京女性向けサービスのマッチングプラットフォーム。`,
    keywords: [
      `${areaData.name} 女風 セラピスト`,
      `東京 ${areaData.name} 女性向け`,
      `${areaData.name} メンズエステ 女性向け`,
      `${therapist.name} ${areaData.name}`,
    ],
    alternates: { canonical: `https://ura-tokyo-romance.com/therapists/${slug}/${area}` },
  };
}

export default async function TherapistAreaPage({ params }: Props) {
  const { slug, area } = await params;
  const therapist = dummyTherapists.find((t) => t.slug === slug);
  const areaData = AREA_MAP[area];

  if (!therapist || !areaData) notFound();

  const otherTherapistsInArea = dummyTherapists
    .filter((t) => t.slug !== slug && t.areas.some((a) => a.includes(areaData.name)))
    .slice(0, 4);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${therapist.name} ${areaData.name}出張サービス`,
    provider: {
      '@type': 'Person',
      name: therapist.name,
    },
    areaServed: {
      '@type': 'City',
      name: areaData.name,
    },
    url: `https://ura-tokyo-romance.com/therapists/${slug}/${area}`,
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://ura-tokyo-romance.com' },
      { '@type': 'ListItem', position: 2, name: 'セラピスト一覧', item: 'https://ura-tokyo-romance.com/therapists' },
      { '@type': 'ListItem', position: 3, name: therapist.name, item: `https://ura-tokyo-romance.com/therapists/${slug}` },
      { '@type': 'ListItem', position: 4, name: `${areaData.name}エリア`, item: `https://ura-tokyo-romance.com/therapists/${slug}/${area}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* Hero */}
      <section className="pt-32 pb-16 px-5 bg-surface border-b border-border">
        <div className="max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-mist text-[10px] tracking-widest mb-6">
            <Link href="/" className="hover:text-cream">ホーム</Link>
            <span>/</span>
            <Link href="/therapists" className="hover:text-cream">セラピスト</Link>
            <span>/</span>
            <Link href={`/therapists/${slug}`} className="hover:text-cream">{therapist.name}</Link>
            <span>/</span>
            <span className="text-cream">{areaData.name}エリア</span>
          </nav>

          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-64 flex-shrink-0">
              <div className="aspect-[3/4] bg-elevated border border-border relative overflow-hidden">
                {therapist.image ? (
                  <img src={therapist.image} alt={therapist.name} className="absolute inset-0 w-full h-full object-cover object-top" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-4xl font-display text-stone/30">{therapist.name[0]}</span>
                  </div>
                )}
                {therapist.isNew && (
                  <div className="absolute top-3 left-3 border border-gold text-gold text-[10px] tracking-widest px-3 py-1">NEW</div>
                )}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <MapPin size={14} className="text-gold" />
                <span className="text-gold text-[10px] tracking-widest">{areaData.prefecture} {areaData.name}エリア出張対応</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl text-cream tracking-wide mb-2">{therapist.name}</h1>
              <p className="text-stone text-sm mb-4">{therapist.age}歳 / {therapist.height}cm</p>

              {therapist.authLevel >= 1 && (
                <div className="flex items-center gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div key={level} className={`h-1 w-8 ${level <= therapist.authLevel ? 'bg-gold' : 'bg-border'}`} />
                  ))}
                  <span className={`text-[10px] ${AUTH_LEVEL_COLORS[therapist.authLevel]}`}>
                    {AUTH_LEVEL_LABELS[therapist.authLevel]}
                  </span>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-5">
                {therapist.tags.slice(0, 5).map((tag) => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>

              <p className="text-stone text-sm leading-relaxed mb-6">{therapist.intro}</p>

              {/* Area highlight */}
              <div className="bg-elevated border border-gold/20 p-5 mb-6">
                <h2 className="text-gold text-[10px] tracking-widest mb-3">{areaData.name}エリアでのご対応について</h2>
                <p className="text-stone text-sm leading-relaxed mb-3">
                  {therapist.name}は{areaData.name}エリアへの出張に対応しています。
                  {areaData.nearStations.join('・')}周辺のホテルへお伺いします。
                  お気軽にご相談ください。
                </p>
                <div className="flex flex-wrap gap-2">
                  {areaData.nearStations.map((st) => (
                    <span key={st} className="text-[10px] text-mist border border-border px-2 py-0.5">{st}周辺</span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={`/therapists/${slug}/consult`} className="btn-primary flex items-center justify-center gap-2">
                  <MessageCircle size={15} />
                  {areaData.name}での相談・問い合わせ
                </Link>
                <FavoriteButton slug={therapist.slug} name={therapist.name} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="section-py px-5">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Schedule */}
          <div>
            <h2 className="font-display text-xl text-cream mb-4">
              {areaData.name}エリアの出勤スケジュール
            </h2>
            <div className="card-luxury p-5">
              {therapist.scheduleNote ? (
                <div className="flex items-start gap-3">
                  <Clock size={14} className="text-gold flex-shrink-0 mt-0.5" />
                  <p className="text-stone text-sm">{therapist.scheduleNote}</p>
                </div>
              ) : (
                <p className="text-stone text-sm">出勤スケジュールはお問い合わせください。</p>
              )}
            </div>
          </div>

          {/* Plans */}
          <div>
            <h2 className="font-display text-xl text-cream mb-4">料金・コース</h2>
            <div className="space-y-2">
              {therapist.plans.map((plan) => (
                <div key={plan.name} className="card-luxury flex items-center justify-between px-5 py-3">
                  <span className="text-stone text-sm">{plan.name}</span>
                  <span className="text-gold text-sm">¥{plan.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-py px-5 bg-surface">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-2xl text-cream mb-6">{areaData.name}エリアに関するよくある質問</h2>
          <div className="space-y-4">
            {[
              {
                q: `${areaData.name}エリアはどのホテルに対応していますか？`,
                a: `${areaData.nearStations.join('・')}周辺のホテルに対応しています。詳しくはお問い合わせにてご確認ください。`,
              },
              {
                q: `${areaData.name}への出張料金はかかりますか？`,
                a: '交通費は別途いただく場合があります。詳細はセラピストにご相談ください。',
              },
              {
                q: '予約から当日までの流れを教えてください',
                a: 'サイトからお問い合わせ→セラピストと日程・場所を調整→当日ホテルにてサービス提供という流れです。サービス内容は当事者間の合意に基づきます。',
              },
            ].map((faq) => (
              <div key={faq.q} className="card-luxury">
                <div className="px-5 py-4 border-b border-border/50">
                  <p className="text-cream text-sm flex items-start gap-2">
                    <span className="text-gold font-display flex-shrink-0">Q.</span>
                    {faq.q}
                  </p>
                </div>
                <div className="px-5 py-4">
                  <p className="text-stone text-sm flex items-start gap-2">
                    <span className="text-mist font-display flex-shrink-0">A.</span>
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other therapists in area */}
      {otherTherapistsInArea.length > 0 && (
        <section className="section-py px-5">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-2xl text-cream mb-6">{areaData.name}エリアの他のセラピスト</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {otherTherapistsInArea.map((t) => (
                <TherapistCard key={t.id} therapist={t} />
              ))}
            </div>
            <div className="text-center mt-6">
              <Link href={`/therapists?area=${areaData.name}`} className="btn-secondary text-xs px-6 py-3">
                {areaData.name}の全セラピストを見る
              </Link>
            </div>
          </div>
        </section>
      )}

      <p className="text-center text-mist text-[10px] pb-6 px-5">
        ※ 当サービスは情報掲載とマッチングを提供します。実際のサービス内容は当事者間の合意に基づきます。18歳未満のご利用は禁止されています。正式公開前に法務確認を行っています。
      </p>
    </>
  );
}
