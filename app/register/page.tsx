import type { Metadata } from 'next';
import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import { Check, UserPlus, ShieldCheck, Star, TrendingUp, Calendar, Instagram, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: '女風セラピスト登録｜東京 女風 セラピスト募集 裏東京ロマンス',
  keywords: ['女風 セラピスト 登録', '東京 女風 セラピスト 募集', '女風 セラピスト 個人', '女性用風俗 男性 登録', '東京 女風 セラピスト なるには'],
  description:
    '東京で女風セラピストとして個人活動したい方へ。SNSに頼らない集客・SEOに強いプロフィールページ・本人確認済みバッジ・ランキング露出で、東京の女性に見つけてもらえる環境を提供します。女風セラピスト登録受付中。',
  alternates: { canonical: 'https://ura-tokyo-romance.com/register' },
};

const merits = [
  {
    icon: TrendingUp,
    title: 'SEOに強いプロフィールページ',
    desc: '「東京 女風 セラピスト」などのキーワードで検索されやすいプロフィールページを持てます。SNSだけに依存しない集客導線を構築できます。',
  },
  {
    icon: ShieldCheck,
    title: '本人確認済みバッジで信頼感アップ',
    desc: '本人確認を完了したセラピストには「本人確認済」バッジが表示されます。利用者からの信頼を視覚的に示せます。',
  },
  {
    icon: Calendar,
    title: '出勤情報を自由に更新',
    desc: '出勤スケジュールは自分で管理できます。いつ・どのエリアに出勤するかを都度更新できます。',
  },
  {
    icon: Star,
    title: '口コミを蓄積できる',
    desc: '利用者からの口コミが積み重なることで、新規の方からの信頼も高まります。長期的な集客に繋がります。',
  },
  {
    icon: Instagram,
    title: 'Instagram・SNSと併用できる',
    desc: 'SNSからプラットフォームへの誘導も可能です。InstagramアカウントとリンクしてSNS集客を強化できます。',
  },
  {
    icon: FileText,
    title: '料金・プラン設定が自由',
    desc: '自分の料金・プランを自由に設定できます。出勤エリア・対応時間帯・雰囲気も自分でアピールできます。',
  },
];

const steps = [
  { num: '01', title: '登録申請', desc: '登録フォームから申請します。お名前（源氏名）・年齢・対応エリアなどの基本情報を入力してください。' },
  { num: '02', title: '本人確認', desc: '運営に本人確認書類（身分証明書）を提出します。個人情報は厳重に管理し、利用者に公開されることはありません。' },
  { num: '03', title: 'プロフィール入力', desc: '自己紹介・対応エリア・出勤予定・料金目安・雰囲気タグなどをプロフィールに入力します。' },
  { num: '04', title: '運営審査', desc: '運営がプロフィール・写真・内容を確認します。審査は通常2〜5営業日以内に完了します。' },
  { num: '05', title: '掲載開始', desc: '審査完了後、プロフィールが公開されます。検索・ランキングに掲載され、利用者から見つけてもらえるようになります。' },
  { num: '06', title: '出勤情報・ブログ更新', desc: '掲載後は出勤情報の更新・ブログ投稿・口コミ確認ができるようになります。' },
];

const plans = [
  {
    name: '無料掲載プラン',
    price: '¥0',
    period: '永久無料',
    features: ['プロフィールページ掲載', '本人確認済みバッジ', '基本的な検索表示', '予約相談フォーム受付'],
    highlight: false,
    note: '',
  },
  {
    name: 'スタンダードプラン',
    price: '月額 ¥×,000〜',
    period: '仮条件',
    features: ['無料プランのすべて', '出勤情報更新', '口コミ管理', '検索上位表示枠', 'タグ・雰囲気強調表示'],
    highlight: false,
    note: '正式料金はオープン前に確定',
  },
  {
    name: 'プレミアムプラン',
    price: '月額 ¥×,000〜',
    period: '仮条件',
    features: ['スタンダードプランのすべて', '特集ページへの掲載', 'ランキング強化', 'SEO記事との連携', 'トップページ掲載枠'],
    highlight: true,
    note: '正式料金はオープン前に確定',
  },
];

export default function RegisterPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: '女風セラピスト登録 - 裏東京ロマンス',
    description: '東京で女風セラピストとして活動したい方向けの登録ページ',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="pt-32 pb-20 px-5 bg-surface border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-wine/5 to-transparent" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-4">For Therapist</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-5 tracking-wide">
            東京で女風セラピストとして<br />活動したい方へ
          </h1>
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-stone leading-relaxed mb-8">
            裏東京ロマンスは、東京で女性向けサービスを提供したいセラピストと、
            安心して利用したい女性をつなぐマッチングプラットフォームです。
            店舗に所属せず、自分のペースで活動したい方をサポートします。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#apply-form" className="btn-primary flex items-center gap-2">
              <UserPlus size={15} />
              登録申請する（無料）
            </a>
            <Link href="/register/info" className="btn-secondary">
              詳細説明を読む
            </Link>
          </div>
        </div>
      </section>

      {/* Merits */}
      <section className="section-py px-5">
        <div className="max-w-6xl mx-auto">
          <SectionTitle en="Why Register" ja="登録するメリット" description="裏東京ロマンスに掲載することで、個人活動がより効率的・安全になります。" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {merits.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-luxury p-7">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-gold" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-cream text-sm mb-2">{title}</h3>
                    <p className="text-stone text-xs leading-relaxed">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flow */}
      <section className="section-py px-5 bg-surface">
        <div className="max-w-3xl mx-auto">
          <SectionTitle en="Registration Flow" ja="登録の流れ" />
          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.num} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 border border-gold flex-shrink-0 flex items-center justify-center text-gold text-xs font-display">
                    {step.num}
                  </div>
                  <div className="flex-1 w-px bg-border mt-2" />
                </div>
                <div className="pb-8">
                  <h3 className="text-cream text-base mb-2">{step.title}</h3>
                  <p className="text-stone text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/register/flow" className="text-gold text-xs tracking-widest hover:text-gold-light transition-colors">
              審査の詳細な流れを見る →
            </Link>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="section-py px-5">
        <div className="max-w-5xl mx-auto">
          <SectionTitle en="Plans" ja="掲載プラン（仮）" description="正式な料金はグランドオープン前に確定します。現在は無料掲載プランで先行登録を受け付けています。" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative p-8 border ${plan.highlight ? 'border-gold bg-elevated' : 'card-luxury border-border'}`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-0 right-0 flex justify-center">
                    <span className="bg-gold text-base text-[9px] tracking-widest px-4 py-0.5">PREMIUM</span>
                  </div>
                )}
                <p className={`text-sm mb-1 ${plan.highlight ? 'text-gold' : 'text-cream'}`}>{plan.name}</p>
                <p className="font-display text-2xl text-cream mb-1">{plan.price}</p>
                {plan.note && <p className="text-mist text-[10px] mb-4">{plan.note}</p>}
                <div className="my-4 h-px bg-border" />
                <ul className="space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-stone text-xs">
                      <Check size={12} className="text-gold flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-center text-mist text-xs mb-8">
            ※料金は正式公開前に確定します。先行登録は無料で受け付けています。
          </p>
          <div className="text-center">
            <Link href="/register/pricing" className="text-gold text-xs tracking-widest hover:text-gold-light transition-colors">
              掲載料金・手数料の詳細を見る →
            </Link>
          </div>
        </div>
      </section>

      {/* Apply form */}
      <section id="apply-form" className="section-py px-5 bg-elevated">
        <div className="max-w-2xl mx-auto">
          <SectionTitle en="Apply" ja="登録申請フォーム" description="以下のフォームから登録申請をお送りください。運営からご連絡します（通常2営業日以内）。" />

          <div className="card-luxury p-8">
            <div className="space-y-5">
              <div>
                <label className="block text-gold text-[10px] tracking-widest mb-2">源氏名（活動名）*</label>
                <input
                  type="text"
                  placeholder="例：さくら"
                  className="w-full bg-elevated border border-border text-cream px-4 py-3 text-sm placeholder:text-mist outline-none focus:border-gold/50 transition-colors"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gold text-[10px] tracking-widest mb-2">年齢 *</label>
                  <input
                    type="number"
                    placeholder="例：25"
                    className="w-full bg-elevated border border-border text-cream px-4 py-3 text-sm placeholder:text-mist outline-none focus:border-gold/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gold text-[10px] tracking-widest mb-2">身長</label>
                  <input
                    type="number"
                    placeholder="例：162"
                    className="w-full bg-elevated border border-border text-cream px-4 py-3 text-sm placeholder:text-mist outline-none focus:border-gold/50 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gold text-[10px] tracking-widest mb-2">主な活動エリア *</label>
                <input
                  type="text"
                  placeholder="例：渋谷、新宿、恵比寿"
                  className="w-full bg-elevated border border-border text-cream px-4 py-3 text-sm placeholder:text-mist outline-none focus:border-gold/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-gold text-[10px] tracking-widest mb-2">連絡先メールアドレス *</label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  className="w-full bg-elevated border border-border text-cream px-4 py-3 text-sm placeholder:text-mist outline-none focus:border-gold/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-gold text-[10px] tracking-widest mb-2">現在の活動状況・質問など</label>
                <textarea
                  rows={4}
                  placeholder="例：現在インスタで活動中です。掲載プランについて詳しく聞きたいです。"
                  className="w-full bg-elevated border border-border text-cream px-4 py-3 text-sm placeholder:text-mist outline-none focus:border-gold/50 transition-colors resize-none"
                />
              </div>

              <div className="bg-base/50 border border-border p-4">
                <p className="text-mist text-[10px] leading-relaxed">
                  本申請を送信することで、<Link href="/terms" className="text-gold hover:underline">利用規約</Link>および
                  <Link href="/privacy" className="text-gold hover:underline">プライバシーポリシー</Link>に同意したものとみなします。
                  送信いただいた情報は審査のみに使用し、利用者に公開されることはありません。
                </p>
              </div>

              <button className="btn-primary w-full flex items-center justify-center gap-2 py-4">
                <UserPlus size={16} />
                登録申請を送る
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-stone text-xs mb-4">ご不明な点はお気軽にお問い合わせください</p>
            <Link href="/contact" className="btn-secondary">
              お問い合わせ
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
