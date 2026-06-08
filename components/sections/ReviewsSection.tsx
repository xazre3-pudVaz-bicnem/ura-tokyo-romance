import Link from 'next/link';
import { Star } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';

export default function ReviewsSection() {
  return (
    <section className="section-py px-5 bg-surface">
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          en="Reviews"
          ja="口コミ・評価"
          description="グランドオープン後、実際に利用した方の口コミ・評価が集まります。"
        />

        {/* Pre-launch stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'グランドオープン', value: '2026.8.1', sub: '口コミ機能公開予定' },
            { label: '先行登録', value: '受付中', sub: 'セラピスト登録を募集中' },
            { label: '口コミ掲載', value: '準備中', sub: 'オープン後に実際の声を公開' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-6 bg-elevated border border-border">
              <p className="font-display text-2xl text-cream mb-1">{stat.value}</p>
              <p className="text-gold text-[9px] tracking-widest">{stat.sub}</p>
              <p className="text-stone text-[10px] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Coming soon notice */}
        <div className="bg-elevated border border-border p-8 md:p-12 text-center mb-8">
          <Star size={32} className="text-gold/30 mx-auto mb-5" strokeWidth={1} />
          <p className="text-cream text-sm mb-2 tracking-wide">口コミ機能はグランドオープン後に公開予定</p>
          <p className="text-stone text-xs leading-relaxed max-w-lg mx-auto">
            実際にセラピストを利用した方からの口コミ・評価を掲載します。
            信頼できる情報をもとにセラピストを比較・選択できるようになります。
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/register" className="btn-primary inline-flex">
            セラピスト登録申請はこちら
          </Link>
          <Link href="/signup" className="btn-secondary inline-flex">
            先行登録する（利用者）
          </Link>
        </div>
      </div>
    </section>
  );
}
