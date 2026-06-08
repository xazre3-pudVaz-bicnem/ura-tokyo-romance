'use client';

import { useState } from 'react';
import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';

const marketRanges: Record<string, { low: number; high: number }> = {
  '60': { low: 12000, high: 22000 },
  '90': { low: 18000, high: 32000 },
  '120': { low: 25000, high: 42000 },
  '180': { low: 35000, high: 60000 },
};

const travelOptions = [
  { val: 0, label: '交通費なし / 込み' },
  { val: 500, label: '交通費 ¥500目安' },
  { val: 1000, label: '交通費 ¥1,000目安' },
];

export default function SimulationPage() {
  const [duration, setDuration] = useState('90');
  const [travel, setTravel] = useState(0);

  const range = marketRanges[duration] ?? { low: 18000, high: 32000 };
  const totalLow = range.low + travel;
  const totalHigh = range.high + travel;

  return (
    <>
      <section className="pt-32 pb-20 px-5 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-4">Price Reference</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-5 tracking-wide">料金の目安を確認する</h1>
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-stone leading-relaxed">
            東京の女風セラピストの市場相場を時間・条件ごとに確認できます。
            実際の料金は各セラピストのプロフィールで確認してください。
          </p>
        </div>
      </section>

      <section className="section-py px-5">
        <div className="max-w-2xl mx-auto">
          <div className="card-luxury p-8 md:p-12">
            {/* Duration */}
            <div className="mb-8">
              <p className="text-gold text-[10px] tracking-widest mb-4">コース時間</p>
              <div className="grid grid-cols-4 gap-2">
                {Object.keys(marketRanges).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className={`py-3 text-sm border transition-all duration-200 ${
                      duration === d ? 'border-gold text-gold bg-elevated' : 'border-border text-stone hover:border-stone'
                    }`}
                  >
                    {d}分
                  </button>
                ))}
              </div>
            </div>

            {/* Travel */}
            <div className="mb-10">
              <p className="text-gold text-[10px] tracking-widest mb-4">交通費（目安）</p>
              <div className="grid grid-cols-3 gap-2">
                {travelOptions.map((t) => (
                  <button
                    key={t.val}
                    onClick={() => setTravel(t.val)}
                    className={`py-3 text-xs border transition-all duration-200 ${
                      travel === t.val ? 'border-gold text-gold bg-elevated' : 'border-border text-stone hover:border-stone'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Result */}
            <div className="bg-elevated border border-gold/30 p-8 text-center">
              <p className="text-stone text-xs tracking-widest mb-3">東京の市場相場（目安）</p>
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="text-center">
                  <p className="text-stone text-[10px] mb-1">最安</p>
                  <p className="font-display text-3xl text-cream">¥{totalLow.toLocaleString()}</p>
                </div>
                <span className="text-gold text-2xl">〜</span>
                <div className="text-center">
                  <p className="text-stone text-[10px] mb-1">目安上限</p>
                  <p className="font-display text-3xl text-gold">¥{totalHigh.toLocaleString()}</p>
                </div>
              </div>
              <p className="text-mist text-xs mt-2">（税込・相場目安）</p>

              <div className="mt-6 pt-6 border-t border-border text-left space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-stone">{duration}分コースの相場</span>
                  <span className="text-cream">¥{range.low.toLocaleString()}〜¥{range.high.toLocaleString()}</span>
                </div>
                {travel > 0 && (
                  <div className="flex justify-between text-xs">
                    <span className="text-stone">交通費目安</span>
                    <span className="text-cream">¥{travel.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 p-4 bg-surface border border-border">
              <p className="text-mist text-[10px] text-center leading-relaxed">
                ※ 上記は東京の市場相場目安です。実際の料金はセラピストごとに異なります。<br />
                各セラピストのプロフィールページで正確な料金をご確認ください。
              </p>
            </div>
          </div>

          <div className="mt-8 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/therapists" className="btn-primary inline-flex">
              セラピストの料金を確認する
            </Link>
            <Link href="/price" className="btn-secondary inline-flex">
              料金について詳しく
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
