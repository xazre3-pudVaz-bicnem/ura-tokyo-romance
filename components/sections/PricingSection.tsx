import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';

const priceGuide = [
  { time: '60分', low: '12,000', high: '22,000', popular: false },
  { time: '90分', low: '18,000', high: '32,000', popular: true },
  { time: '120分', low: '25,000', high: '42,000', popular: false },
  { time: '180分', low: '35,000', high: '60,000', popular: false },
];

const notes = [
  { label: '交通費', value: '実費または別途（セラピストにより異なる）' },
  { label: '指名・継続割引', value: 'セラピストによって設定あり' },
  { label: '支払い方法', value: '現金、電子マネー等（各セラピストに確認）' },
];

export default function PricingSection() {
  return (
    <section className="section-py px-5">
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          en="Price Guide"
          ja="料金の目安"
          description="料金はセラピストごとに異なります。下記は東京の女風市場の参考相場です。各セラピストのプロフィールで実際の料金をご確認ください。"
        />

        {/* Price ranges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {priceGuide.map((plan) => (
            <div
              key={plan.time}
              className={`relative p-6 text-center border transition-all duration-300 ${
                plan.popular ? 'border-gold bg-elevated' : 'border-border card-luxury'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-0 right-0 flex justify-center">
                  <span className="bg-gold text-base text-[9px] tracking-widest px-3 py-0.5">
                    POPULAR
                  </span>
                </div>
              )}
              <p className="text-stone text-xs tracking-widest mb-3">{plan.time}</p>
              <p className="font-display text-lg text-cream mb-0.5">
                ¥{plan.low}
              </p>
              <p className="text-mist text-[10px] mb-1">〜</p>
              <p className="font-display text-2xl text-gold mb-1">
                ¥{plan.high}
              </p>
              <p className="text-mist text-[10px]">目安（税込）</p>
            </div>
          ))}
        </div>

        {/* Notes */}
        <div className="bg-surface border border-border p-6 md:p-8 mb-8">
          <p className="text-gold text-[10px] tracking-widest mb-5">その他の費用目安</p>
          <div className="space-y-3">
            {notes.map((note) => (
              <div key={note.label} className="flex items-start justify-between gap-4">
                <span className="text-stone text-sm flex-shrink-0">{note.label}</span>
                <span className="text-cream text-xs text-right">{note.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-mist text-xs text-center mb-10">
          ※上記は参考相場です。実際の料金は各セラピストのプロフィールページでご確認ください。
          当プラットフォームは料金を定めるものではありません。
        </p>

        <div className="text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/price" className="btn-primary">
            料金について詳しく見る
          </Link>
          <Link href="/therapists" className="btn-secondary">
            セラピストの料金を確認する
          </Link>
        </div>
      </div>
    </section>
  );
}
