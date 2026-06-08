import Link from 'next/link';
import { ShieldCheck, Search, Star, MessageCircle } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';

const features = [
  {
    icon: ShieldCheck,
    title: '本人確認済みのみ掲載',
    desc: '全セラピストは身分証明書による本人確認を通過しています。信頼できるセラピストだけが掲載されています。',
  },
  {
    icon: Search,
    title: '自分でじっくり選べる',
    desc: 'プロフィール・タグ・口コミ・料金を比較して、自分のペースで選べます。急かされることはありません。',
  },
  {
    icon: Star,
    title: '口コミで安心確認',
    desc: '実際に利用した方の口コミ・評価を確認してから相談できます。信頼できる情報をもとに判断できます。',
  },
  {
    icon: MessageCircle,
    title: '予約相談フォームで安全連絡',
    desc: 'セラピストへの連絡はフォームを通じて行います。個人の連絡先を直接やり取りする必要はありません。',
  },
];

export default function FirstVisitCTA() {
  return (
    <section className="section-py px-5 bg-surface">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          en="For First Time"
          ja="初めての方へ"
          description="東京で女性用風俗・女風を探している方へ。裏東京ロマンスはセラピストを安全に探して相談できるマッチングプラットフォームです。"
        />

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="card-luxury p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 border border-gold/30 mb-4">
                  <Icon size={22} className="text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="font-sans text-sm text-cream mb-2 tracking-wide">{feature.title}</h3>
                <p className="text-stone text-xs leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Flow summary */}
        <div className="bg-elevated border border-border p-8 md:p-12 mb-10">
          <p className="text-gold text-[10px] tracking-[0.3em] uppercase mb-6 text-center">How to Use</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2">
            {['探す', '比較する', '相談する', '確認・確定', '会う'].map((step, i, arr) => (
              <div key={step} className="flex items-center gap-2 md:gap-2">
                <div className="flex flex-col items-center">
                  <span className="text-gold text-[10px] tracking-widest mb-1">0{i + 1}</span>
                  <span className="text-cream text-sm text-center leading-snug">{step}</span>
                </div>
                {i < arr.length - 1 && (
                  <span className="text-gold/40 text-lg mx-2 md:mx-3 hidden md:block">›</span>
                )}
                {i < arr.length - 1 && (
                  <span className="text-gold/40 text-lg my-1 md:hidden">↓</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/first" className="btn-primary inline-flex mr-4">
            初めての方へ詳しく見る
          </Link>
          <Link href="/therapists" className="btn-secondary inline-flex">
            セラピストを探してみる
          </Link>
        </div>
      </div>
    </section>
  );
}
