import type { Metadata } from 'next';
import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import { Check } from 'lucide-react';

export const metadata: Metadata = {
  title: '掲載料金・手数料｜女風セラピスト登録 裏東京ロマンス',
  description:
    '裏東京ロマンスのセラピスト掲載料金・手数料についての説明。正式料金はグランドオープン前に確定します。現在は先行登録・無料掲載を受け付けています。',
  alternates: { canonical: 'https://uratokyoromance.com/register/pricing' },
};

const plans = [
  {
    name: '無料掲載プラン',
    price: '¥0',
    period: '永久無料',
    highlight: false,
    features: [
      'プロフィールページの作成・掲載',
      '本人確認済みバッジの表示',
      '基本的な検索表示',
      '予約相談フォームの受付',
      '雰囲気タグの設定',
      '基本的な口コミ表示',
    ],
    not_included: [
      '出勤情報の更新機能',
      '検索上位表示',
      'ランキング枠',
      'トップページ掲載',
    ],
  },
  {
    name: 'スタンダードプラン',
    price: '先行登録受付中',
    period: '正式公開前に案内予定',
    highlight: false,
    features: [
      '無料プランのすべて',
      '出勤情報の日次更新',
      '出勤カレンダー掲載',
      '口コミ管理・返信機能',
      '検索上位表示枠（一部）',
      'タグ・雰囲気の強調表示',
      'ブログ記事の投稿（月3本）',
    ],
    not_included: [
      '特集ページへの掲載',
      'ランキング強化',
      'トップページ掲載枠',
    ],
  },
  {
    name: 'プレミアムプラン',
    price: '先行登録受付中',
    period: '正式公開前に案内予定',
    highlight: true,
    features: [
      'スタンダードプランのすべて',
      '特集ページへの掲載',
      'ランキング強化（加算ボーナス）',
      '集客につながる記事との連携',
      'トップページ掲載枠',
      'ブログ記事の投稿（月無制限）',
      '優先サポート対応',
    ],
    not_included: [],
  },
];

export default function RegisterPricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-5 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-4">Plans & Pricing</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-5 tracking-wide">掲載料金・手数料</h1>
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-stone leading-relaxed">
            正式な掲載料金は2026年8月1日のグランドオープン前に確定します。
            現在は無料掲載プランで先行登録を受け付けています。
          </p>
        </div>
      </section>

      <section className="section-py px-5">
        <div className="max-w-5xl mx-auto">
          <SectionTitle en="Plans" ja="掲載プラン" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative p-8 border ${plan.highlight ? 'border-gold bg-elevated' : 'card-luxury border-border'}`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-0 right-0 flex justify-center">
                    <span className="bg-gold text-base text-[9px] tracking-widest px-4 py-0.5">おすすめ</span>
                  </div>
                )}
                <p className={`text-base mb-2 ${plan.highlight ? 'text-gold' : 'text-cream'}`}>{plan.name}</p>
                <p className="font-display text-2xl text-cream mb-1">{plan.price}</p>
                <p className="text-mist text-[10px] mb-6">{plan.period}</p>
                <div className="h-px bg-border mb-6" />
                <p className="text-gold text-[10px] tracking-widest mb-3">含まれる機能</p>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-stone text-xs">
                      <Check size={12} className="text-gold flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                {plan.not_included.length > 0 && (
                  <>
                    <p className="text-mist text-[10px] tracking-widest mb-3">含まれない機能</p>
                    <ul className="space-y-2">
                      {plan.not_included.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-mist text-xs line-through">
                          <span className="text-mist text-xs flex-shrink-0">—</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Notes */}
          <div className="card-luxury p-8 mb-10">
            <p className="text-gold text-[10px] tracking-widest mb-4">手数料について</p>
            <p className="text-stone text-sm leading-relaxed mb-4">
              裏東京ロマンスでは、セラピストが利用者から受け取る料金に対して手数料をいただく予定はありません（現時点）。
              収益は掲載プランの月額料金のみで成り立つ予定です。
            </p>
            <p className="text-stone text-sm leading-relaxed">
              手数料体系については、グランドオープン前に正式に公表します。
            </p>
          </div>

          <div className="bg-wine/10 border border-wine/30 p-6 mb-10">
            <p className="text-cream text-sm mb-2">注意事項</p>
            <ul className="space-y-2 text-stone text-xs leading-relaxed">
              <li>・上記の料金はすべて仮条件です。正式料金は2026年8月1日のグランドオープン前に確定します。</li>
              <li>・先行登録期間中は無料掲載プランで掲載できます。</li>
              <li>・料金・プラン内容は予告なく変更される場合があります。</li>
            </ul>
          </div>

          <div className="text-center">
            <Link href="/register" className="btn-primary mr-4">先行登録する（無料）</Link>
            <Link href="/contact" className="btn-secondary">お問い合わせ</Link>
          </div>
        </div>
      </section>
    </>
  );
}
