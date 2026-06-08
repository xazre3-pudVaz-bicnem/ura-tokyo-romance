import type { Metadata } from 'next';
import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import { dummyTherapists } from '@/data/dummy-therapists';
import TherapistCard from '@/components/ui/TherapistCard';

export const metadata: Metadata = {
  title: '東京 女風 料金相場｜女性用風俗 料金 目安 裏東京ロマンス',
  keywords: ['東京 女風 料金', '女性用風俗 料金 相場', '女風 料金 60分', '東京 女風 いくら', '女性用風俗 東京 料金'],
  description:
    '東京の女風・女性用風俗の料金相場。60分¥12,000〜¥22,000、90分¥18,000〜¥32,000が目安です。料金はセラピストごとに異なります。詳細はセラピストのプロフィールをご確認ください。',
  alternates: { canonical: 'https://ura-tokyo-romance.com/price' },
};

const marketPrices = [
  { time: '60分', low: '14,000', high: '20,000', note: '初めての方・お試しに' },
  { time: '90分', low: '22,000', high: '28,000', note: 'ゆっくり話したい方に' },
  { time: '120分', low: '30,000', high: '38,000', note: '特別な時間を2時間' },
  { time: '180分', low: '45,000', high: '55,000', note: 'じっくり過ごしたい方に' },
];

const extras = [
  { label: '指名料', price: '¥0〜¥5,000', desc: 'セラピストによって異なります（なしの方も）' },
  { label: '交通費', price: '実費またはエリア別', desc: '移動にかかる交通費は別途ご負担いただく場合があります' },
  { label: '延長（30分）', price: '¥8,000〜', desc: 'セラピストの空き状況によります。事前にご相談ください' },
];

const faqs = [
  { q: '料金はセラピストごとに違うのですか？', a: 'はい。各セラピストが自分でプランを設定しています。各プロフィールに料金が記載されていますので、事前にご確認ください。' },
  { q: '当日に追加料金を請求されますか？', a: '事前に合意した料金以外の請求は禁止しています。不当な追加請求があった場合は運営までご連絡ください。' },
  { q: '料金はどのように支払いますか？', a: '基本は現金が多いですが、セラピストによって異なります。事前のやり取りで確認してください。' },
  { q: '上記の料金目安より安いセラピストもいますか？', a: 'はい。新人セラピストや掲載初期のセラピストはより低い料金で設定している場合があります。検索・絞り込み機能で確認できます。' },
];

export default function PricePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="pt-32 pb-20 px-5 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-4">Pricing</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-5 tracking-wide">料金目安</h1>
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-stone leading-relaxed">
            裏東京ロマンスは掲載プラットフォームのため、<span className="text-cream">料金はセラピストごとに異なります</span>。
            このページでは市場の相場目安をご案内します。詳細は各セラピストのプロフィールをご確認ください。
          </p>
        </div>
      </section>

      {/* Market price */}
      <section className="section-py px-5">
        <div className="max-w-5xl mx-auto">
          <SectionTitle en="Market Price" ja="料金の相場目安" description="掲載セラピストの料金はこの範囲内が多いです。詳細は各プロフィールで確認してください。" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {marketPrices.map((plan) => (
              <div
                key={plan.time}
                className="card-luxury p-8 text-center"
              >
                <p className="text-stone text-xs tracking-widest mb-4">{plan.time}</p>
                <p className="font-display text-2xl text-cream mb-1">
                  ¥{plan.low}
                </p>
                <p className="text-mist text-xs mb-1">〜</p>
                <p className="font-display text-2xl text-gold mb-2">
                  ¥{plan.high}
                </p>
                <p className="text-gold text-[10px] leading-relaxed">{plan.note}</p>
              </div>
            ))}
          </div>

          <div className="bg-wine/10 border border-wine/30 p-5 mb-12 text-center">
            <p className="text-stone text-xs leading-relaxed">
              ※正式な料金は各セラピストのプロフィールをご確認ください。上記はあくまで相場目安です。
            </p>
          </div>

          {/* Options */}
          <SectionTitle en="Options" ja="追加オプション目安" />
          <div className="space-y-3 mb-12">
            {extras.map((opt) => (
              <div key={opt.label} className="card-luxury p-5 flex flex-col md:flex-row md:items-center gap-3">
                <div className="md:w-1/4">
                  <p className="text-cream text-sm">{opt.label}</p>
                </div>
                <div className="md:w-1/4">
                  <p className="text-gold text-sm">{opt.price}</p>
                </div>
                <div className="md:flex-1">
                  <p className="text-stone text-xs">{opt.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <SectionTitle en="FAQ" ja="料金についてよくある質問" />
          <div className="space-y-4 mb-12">
            {faqs.map((f) => (
              <div key={f.q} className="card-luxury p-7">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-wine text-sm font-display flex-shrink-0">Q</span>
                  <p className="text-cream text-sm">{f.q}</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gold text-sm font-display flex-shrink-0">A</span>
                  <p className="text-stone text-sm leading-relaxed">{f.a}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Therapist previews with prices */}
          <SectionTitle en="Therapists" ja="料金付きのセラピストを見る" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {dummyTherapists.slice(0, 4).map((t) => (
              <TherapistCard key={t.id} therapist={t} />
            ))}
          </div>

          <div className="text-center flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/therapists" className="btn-primary">セラピスト一覧を見る</Link>
            <Link href="/simulation" className="btn-secondary">料金シミュレーション</Link>
          </div>
        </div>
      </section>
    </>
  );
}
