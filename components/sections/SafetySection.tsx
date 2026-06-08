import Link from 'next/link';
import { ShieldCheck, FileCheck, Star, AlertTriangle, Eye, MessageSquare } from 'lucide-react';

const safetyItems = [
  {
    icon: ShieldCheck,
    title: '本人確認の徹底',
    desc: 'すべての掲載セラピストは、身分証明書による本人確認を完了しています。確認済みには「本人確認済」バッジを表示します。',
  },
  {
    icon: FileCheck,
    title: 'プロフィール審査',
    desc: '登録されたプロフィール・写真・自己紹介はすべて運営が確認します。虚偽記載・不適切表現が確認された場合は掲載停止します。',
  },
  {
    icon: Star,
    title: '口コミ・評価管理',
    desc: '利用者からの口コミは運営が確認し、不適切なレビューは非表示にします。真実に基づいた評価のみを掲載します。',
  },
  {
    icon: Eye,
    title: '運営による常時監視',
    desc: '不審な登録・活動・やり取りは運営が随時確認します。問題が確認された場合は即座に掲載停止・利用停止の対応を取ります。',
  },
  {
    icon: AlertTriangle,
    title: '通報・相談窓口の設置',
    desc: 'セラピスト・利用者どちらからのトラブル報告にも対応します。通報フォームから24時間受け付け、迅速に対応します。',
  },
  {
    icon: MessageSquare,
    title: '禁止事項・ガイドライン',
    desc: '違法行為・強制・虚偽登録・迷惑行為は厳禁です。違反が確認された場合はアカウント停止・法的対応を含む措置を取ります。',
  },
];

export default function SafetySection() {
  return (
    <section className="section-py px-5 bg-elevated">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <p className="text-gold text-[10px] tracking-[0.3em] uppercase mb-3">Safety</p>
          <h2 className="font-display text-3xl md:text-4xl text-cream tracking-wide mb-3">
            安心安全への取り組み
          </h2>
          <p className="text-stone text-sm max-w-xl mx-auto leading-relaxed">
            裏東京ロマンスは、利用者・セラピスト双方が安心して使えるプラットフォームを目指します。
            安全のための仕組みを透明に公開します。
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {safetyItems.map(({ icon: Icon, title, desc }) => (
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

        {/* 18歳未満禁止バナー */}
        <div className="border border-wine/40 bg-wine/5 p-6 text-center mb-8">
          <p className="text-wine text-sm font-sans tracking-wider mb-1">
            18歳未満の方のご利用は固く禁じています
          </p>
          <p className="text-stone text-xs">
            年齢確認にご協力ください。虚偽申告は即時利用停止・法的対応の対象となります。
          </p>
        </div>

        {/* Link */}
        <div className="text-center">
          <Link href="/safety" className="btn-secondary inline-flex">
            安心安全への取り組みをすべて見る
          </Link>
        </div>
      </div>
    </section>
  );
}
