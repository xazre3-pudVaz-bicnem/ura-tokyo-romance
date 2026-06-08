import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';

const steps = [
  {
    num: '01',
    title: 'セラピストを探す',
    desc: 'エリア・雰囲気・料金・口コミなどの条件でセラピストを絞り込みます。複数のプロフィールを比較して気になる方を見つけましょう。',
  },
  {
    num: '02',
    title: 'プロフィールを確認する',
    desc: 'セラピストの自己紹介・タグ・料金・口コミをじっくり読みます。本人確認済みバッジを確認して安心して選べます。',
  },
  {
    num: '03',
    title: '予約相談フォームで連絡する',
    desc: '気に入ったセラピストの「予約相談する」ボタンからフォームを送ります。日時・エリア・希望をお伝えください。',
  },
  {
    num: '04',
    title: '日時・料金を確認して確定',
    desc: 'セラピストからの返信で日時・場所・料金を確認します。全員が合意したら予約確定です。',
  },
  {
    num: '05',
    title: '当日お会いする',
    desc: '指定の場所でセラピストとお会いします。当日は事前に確認した内容に沿って、双方が安心できる形でお時間をお過ごしください。',
  },
];

export default function BookingFlow() {
  return (
    <section className="section-py px-5 bg-elevated">
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          en="How to Use"
          ja="予約相談の流れ"
          description="裏東京ロマンスでセラピストを探して予約相談するまでの流れです。初めての方でも分かりやすいシンプルな5ステップです。"
        />

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent hidden md:block" />

          <div className="space-y-8 md:space-y-0">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0 mb-8 md:mb-16 ${
                  i % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div
                  className={`md:w-5/12 ${
                    i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                  }`}
                >
                  <p className="text-gold text-[10px] tracking-[0.3em] mb-2">{step.num}</p>
                  <h3 className="font-display text-xl md:text-2xl text-cream mb-2">{step.title}</h3>
                  <p className="text-stone text-sm leading-relaxed">{step.desc}</p>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex md:w-2/12 justify-center">
                  <div className="w-4 h-4 border border-gold rounded-full bg-base relative z-10 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="md:w-5/12" />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <Link href="/therapists" className="btn-primary inline-flex">
            セラピストを探してみる
          </Link>
        </div>
      </div>
    </section>
  );
}
