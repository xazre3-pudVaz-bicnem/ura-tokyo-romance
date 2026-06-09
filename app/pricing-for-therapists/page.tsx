import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Star, Zap, Crown } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';

export const metadata: Metadata = {
  title: '掲載プラン・料金｜女風セラピスト向け 裏東京ロマンス',
  keywords: ['女風 セラピスト 掲載料金', '女風 プラットフォーム 料金', '東京 女風 セラピスト 登録費用'],
  description:
    '裏東京ロマンスのセラピスト向け掲載プラン。無料掲載プランから始められます。グランドオープン2026年8月1日。先行登録受付中。',
  alternates: { canonical: 'https://uratokyoromance.com/pricing-for-therapists' },
};

const plans = [
  {
    id: 'free',
    icon: Star,
    name: 'フリープラン',
    price: '¥0',
    period: '永久無料',
    description: 'まずは無料でプロフィールを掲載してみましょう。本人確認完了後すぐに掲載されます。',
    features: [
      'プロフィールページ掲載',
      '本人確認済みバッジ',
      '予約相談フォーム受付',
      '基本タグ設定（3つまで）',
      'プラン・料金の掲載',
      '口コミの受け取り（閲覧のみ）',
    ],
    cta: '無料で登録する',
    ctaHref: '/register',
    highlight: false,
    note: '',
  },
  {
    id: 'standard',
    icon: Zap,
    name: 'スタンダードプラン',
    price: '先行登録受付中',
    period: '正式公開前に案内予定',
    description: '出勤情報の更新・タグ強調・検索上位表示で、より多くのユーザーに見てもらえます。',
    features: [
      'フリープランの全機能',
      '出勤情報のリアルタイム更新',
      '検索上位表示枠（週3回）',
      'タグ数無制限',
      '口コミ管理・返信機能',
      '「今日会える」バッジ表示',
      'スケジュール管理ツール',
      '閲覧数・お気に入り数の確認',
    ],
    cta: '先行登録する（無料）',
    ctaHref: '/register',
    highlight: true,
    note: 'グランドオープン前に先行登録で初月無料予定',
  },
  {
    id: 'premium',
    icon: Crown,
    name: 'プレミアムプラン',
    price: '先行登録受付中',
    period: '正式公開前に案内予定',
    description: 'トップページ特集掲載・集客につながる記事との連携で、圧倒的な掲載露出を実現します。',
    features: [
      'スタンダードプランの全機能',
      'トップページ特集欄への掲載',
      '検索上位優先表示（常時）',
      '集客につながる記事との連携',
      'ランキング強化ボーナス',
      '月1回の特集記事掲載',
      'ダッシュボード詳細分析',
      '優先サポート対応',
    ],
    cta: '先行登録する（無料）',
    ctaHref: '/register',
    highlight: false,
    note: '',
  },
];

const faqs = [
  {
    q: 'いつから有料プランが始まりますか？',
    a: 'グランドオープン（2026年8月1日予定）後に開始します。先行登録を完了したセラピストには初月無料特典を予定しています。',
  },
  {
    q: '登録・掲載費用はかかりますか？',
    a: 'フリープランは永久無料です。有料プランはグランドオープン後に申し込めます。先行登録の段階では費用は一切かかりません。',
  },
  {
    q: '有料プランに途中で変更できますか？',
    a: 'はい。グランドオープン後はダッシュボードからいつでもプランを変更できます。',
  },
  {
    q: '手数料は発生しますか？',
    a: 'セラピストとユーザー間の取引に対して手数料は発生しません。掲載プランの月額費用のみです。詳細はオープン前に確定します。',
  },
  {
    q: '登録を途中でやめたい場合はどうすればいいですか？',
    a: '有料プランはいつでも解約可能です。フリープランへのダウングレードも可能です。プロフィールの非公開・削除はダッシュボードから対応できます。',
  },
];

export default function PricingForTherapistsPage() {
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
      <section className="pt-32 pb-16 px-5 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-4">For Therapist</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-5 tracking-wide">
            掲載プラン・料金
          </h1>
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-stone leading-relaxed mb-4">
            まずは無料のフリープランで始められます。グランドオープン後に有料プランをご検討ください。
          </p>
          <div className="inline-flex items-center gap-2 bg-wine/10 border border-wine/30 px-4 py-2">
            <span className="text-wine text-xs tracking-wider">グランドオープン：2026年8月1日予定</span>
          </div>
        </div>
      </section>

      <section className="section-py px-5">
        <div className="max-w-6xl mx-auto">

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col border ${
                    plan.highlight
                      ? 'border-gold bg-elevated'
                      : 'border-border bg-surface'
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3 left-0 right-0 flex justify-center">
                      <span className="bg-gold text-base text-[9px] tracking-widest px-5 py-1">POPULAR</span>
                    </div>
                  )}

                  <div className="p-8 flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 border border-gold/30 flex items-center justify-center flex-shrink-0">
                        <Icon size={16} className="text-gold" strokeWidth={1.5} />
                      </div>
                      <p className={`text-sm ${plan.highlight ? 'text-gold' : 'text-cream'}`}>{plan.name}</p>
                    </div>

                    <p className="font-display text-3xl text-cream mb-1">{plan.price}</p>
                    <p className="text-mist text-[10px] mb-5">{plan.period}</p>
                    {plan.note && (
                      <p className="text-wine text-[10px] mb-5 border border-wine/30 px-3 py-1.5">
                        {plan.note}
                      </p>
                    )}
                    <p className="text-stone text-xs leading-relaxed mb-6">{plan.description}</p>

                    <div className="h-px bg-border mb-6" />

                    <ul className="space-y-2.5 mb-6">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-stone text-xs">
                          <Check size={12} className="text-gold flex-shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-8 pt-0">
                    <Link
                      href={plan.ctaHref}
                      className={plan.highlight ? 'btn-primary w-full text-center block py-3' : 'btn-secondary w-full text-center block py-3'}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Comparison note */}
          <div className="card-luxury p-6 text-center mb-12">
            <p className="text-stone text-xs leading-relaxed">
              ※ 料金・条件はグランドオープン前に確定します。現在は先行登録（無料）のみ受け付けています。<br />
              先行登録いただいたセラピストには初月無料・優先審査特典を予定しています。
            </p>
          </div>

          {/* FAQ */}
          <SectionTitle en="FAQ" ja="よくある質問" />
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

          {/* CTA */}
          <div className="card-luxury p-10 text-center">
            <h2 className="font-display text-2xl text-cream mb-3">まずは無料で先行登録</h2>
            <p className="text-stone text-sm mb-6 leading-relaxed">
              登録・掲載は無料から始められます。先行登録で初月無料特典を予定しています。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register" className="btn-primary">セラピスト登録（無料）</Link>
              <Link href="/contact" className="btn-secondary">詳細を問い合わせる</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
