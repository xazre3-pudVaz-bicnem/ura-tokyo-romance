import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Clock, MessageCircle, Calendar, Star, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: '予約・相談の流れ｜東京 女風 予約方法 裏東京ロマンス',
  keywords: ['女風 予約方法', '女風 相談の流れ', '東京 女風 予約'],
  description: '裏東京ロマンスでの予約・相談の流れ。セラピストを探す→相談フォームで連絡→日時確認→当日お会いする。シンプルな4ステップです。',
  alternates: { canonical: 'https://ura-tokyo-romance.com/reservation-flow' },
};

const steps = [
  {
    icon: CheckCircle,
    num: '01',
    title: 'セラピストを選ぶ',
    desc: 'セラピスト一覧で条件・雰囲気・料金を比較し、気になるセラピストを見つけます。本人確認済みバッジ・口コミ・タグを参考にしてください。',
    time: '自分のペースで',
    actions: [
      { label: 'セラピストを探す', href: '/therapists' },
      { label: 'セラピスト診断', href: '/diagnosis' },
    ],
  },
  {
    icon: MessageCircle,
    num: '02',
    title: '相談フォームで連絡する',
    desc: 'プロフィールページの「相談する」ボタンから相談フォームを送信します。希望の日時・エリア・コース（時間）をお伝えください。',
    time: '2〜3日以内に返信',
    actions: [
      { label: '相談フォームとは', href: '/consult' },
    ],
  },
  {
    icon: Calendar,
    num: '03',
    title: '日時・内容を確認する',
    desc: 'セラピストからの返信を受け取り、日時・場所・コース・料金を確認します。すべて合意してから予約確定です。',
    time: 'ご自身のペースで',
    actions: [],
  },
  {
    icon: Star,
    num: '04',
    title: '当日お会いする',
    desc: '確定した日時・場所でセラピストとお会いします。当日の流れはセラピストが丁寧にご案内します。終了後、口コミを投稿できます（任意）。',
    time: '当日',
    actions: [],
  },
];

const statuses = [
  { status: '相談中', desc: '相談フォームを送信した状態。セラピストからの返信待ち。', color: 'text-stone' },
  { status: '返信あり', desc: 'セラピストから返信が届いた状態。日時や内容の調整中。', color: 'text-gold' },
  { status: '確定', desc: '日時・内容がすべて合意された予約確定状態。', color: 'text-gold' },
  { status: '完了', desc: 'サービスが終了した状態。口コミ投稿が可能。', color: 'text-cream' },
  { status: 'キャンセル', desc: '何らかの理由でキャンセルになった状態。', color: 'text-wine' },
];

export default function ReservationFlowPage() {
  return (
    <>
      <section className="pt-32 pb-16 px-5 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-4">How to Reserve</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-5 tracking-wide">
            予約・相談の流れ
          </h1>
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-stone leading-relaxed">
            裏東京ロマンスでは、お客様がご自身でセラピストを探し・相談し・予約確定できます。
            シンプルな4ステップです。
          </p>
        </div>
      </section>

      <section className="section-py px-5">
        <div className="max-w-3xl mx-auto">
          {/* Steps */}
          <div className="space-y-8 mb-16">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 border border-gold flex-shrink-0 flex items-center justify-center text-gold text-xs font-display">
                      {step.num}
                    </div>
                    {i < steps.length - 1 && <div className="flex-1 w-px bg-border mt-2" />}
                  </div>
                  <div className="pb-8 flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <Icon size={18} className="text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <h3 className="text-cream text-lg">{step.title}</h3>
                    </div>
                    <p className="text-stone text-sm leading-relaxed mb-3">{step.desc}</p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-1 text-mist">
                        <Clock size={11} />
                        <span className="text-[10px]">{step.time}</span>
                      </div>
                      {step.actions.map((action) => (
                        <Link
                          key={action.href}
                          href={action.href}
                          className="flex items-center gap-1 text-gold text-xs hover:text-gold-light transition-colors"
                        >
                          {action.label} <ArrowRight size={11} />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Status management */}
          <div className="card-luxury p-8 mb-12">
            <p className="text-gold text-[10px] tracking-widest mb-5">相談ステータスの種類</p>
            <div className="space-y-3">
              {statuses.map((s) => (
                <div key={s.status} className="flex items-start gap-4">
                  <span className={`text-xs font-display w-20 flex-shrink-0 ${s.color}`}>{s.status}</span>
                  <span className="text-stone text-xs leading-relaxed">{s.desc}</span>
                </div>
              ))}
            </div>
            <p className="text-mist text-[10px] mt-4">
              ※ステータス管理機能はグランドオープン後に提供されます。
            </p>
          </div>

          {/* Notes */}
          <div className="card-luxury p-8 mb-12">
            <p className="text-gold text-[10px] tracking-widest mb-4">ご注意事項</p>
            <ul className="space-y-2 text-stone text-xs leading-relaxed">
              <li>・18歳未満の方はご利用いただけません。</li>
              <li>・予約は各セラピストとの合意のもとで確定します。</li>
              <li>・料金・内容は事前にセラピストと確認してから確定してください。</li>
              <li>・キャンセルする場合は早めにセラピストに連絡してください。</li>
              <li>・運営はセラピストとお客様の取引に介入しません。トラブルがあった場合は通報窓口までご連絡ください。</li>
            </ul>
          </div>

          <div className="text-center">
            <Link href="/therapists" className="btn-primary mr-4">セラピストを探す</Link>
            <Link href="/first" className="btn-secondary">初めての方へ</Link>
          </div>
        </div>
      </section>
    </>
  );
}
