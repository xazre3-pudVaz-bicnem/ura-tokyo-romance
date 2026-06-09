import type { Metadata } from 'next';
import Link from 'next/link';
import { Flag, Shield, MessageSquare, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: '通報・相談窓口｜裏東京ロマンス',
  description: '裏東京ロマンスの通報・相談窓口。不審なセラピスト・利用者・口コミ・トラブルを報告できます。24時間受付。',
  alternates: { canonical: 'https://uratokyoromance.com/report' },
};

const categories = [
  { value: 'fake-profile', label: '虚偽・なりすましプロフィール' },
  { value: 'harassment', label: 'ハラスメント・強制行為' },
  { value: 'illegal', label: '違法行為・違法サービスの示唆' },
  { value: 'money-trouble', label: '料金・金銭トラブル' },
  { value: 'fake-review', label: '虚偽口コミ' },
  { value: 'under-age', label: '未成年の可能性' },
  { value: 'antisocial', label: '反社会的勢力との関係' },
  { value: 'other', label: 'その他' },
];

export default function ReportPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-5 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-4">Report</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-5 tracking-wide">通報・相談窓口</h1>
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-stone leading-relaxed">
            不審な点・トラブル・問題を発見した場合は、このフォームからご連絡ください。
            2営業日以内に調査を開始します。
          </p>
        </div>
      </section>

      <section className="section-py px-5">
        <div className="max-w-4xl mx-auto">
          {/* Info cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {[
              { icon: Flag, title: '通報内容', desc: '不審なセラピスト・利用者・口コミ・プロフィール等をご報告ください。' },
              { icon: Shield, title: '個人情報保護', desc: '通報者の情報は厳重に保護します。通報者が特定されることはありません。' },
              { icon: MessageSquare, title: '対応について', desc: '通報受付後、2営業日以内に調査を開始します。結果は状況により個別にご連絡します。' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-luxury p-6">
                <div className="flex items-start gap-3">
                  <Icon size={18} className="text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="text-cream text-sm mb-2">{title}</p>
                    <p className="text-stone text-xs leading-relaxed">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="card-luxury p-8">
            <h2 className="font-display text-2xl text-cream mb-6">通報・相談フォーム</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-gold text-[10px] tracking-widest mb-2">通報・相談の種類 *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <label key={cat.value} className="flex items-center gap-3 card-luxury px-4 py-3 cursor-pointer hover:border-gold/30 transition-colors">
                      <input type="radio" name="category" value={cat.value} className="accent-gold" />
                      <span className="text-stone text-xs">{cat.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gold text-[10px] tracking-widest mb-2">報告対象のURL・プロフィール名</label>
                <input
                  type="text"
                  placeholder="例：https://uratokyoromance.com/therapists/sakura または「咲良（さくら）」"
                  className="w-full bg-elevated border border-border text-cream px-4 py-3 text-sm placeholder:text-mist outline-none focus:border-gold/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-gold text-[10px] tracking-widest mb-2">通報・相談内容の詳細 *</label>
                <textarea
                  rows={6}
                  placeholder="何が問題か、いつ・どのような状況で発生したかを具体的にお書きください。"
                  className="w-full bg-elevated border border-border text-cream px-4 py-3 text-sm placeholder:text-mist outline-none focus:border-gold/50 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-gold text-[10px] tracking-widest mb-2">ご連絡先メールアドレス（任意）</label>
                <input
                  type="email"
                  placeholder="調査結果のご連絡が必要な場合にご記入ください"
                  className="w-full bg-elevated border border-border text-cream px-4 py-3 text-sm placeholder:text-mist outline-none focus:border-gold/50 transition-colors"
                />
                <p className="text-mist text-[10px] mt-2">
                  未記入でも通報は受け付けますが、結果のご連絡はできません。
                </p>
              </div>

              <div className="bg-base/50 border border-border p-4">
                <p className="text-mist text-[10px] leading-relaxed">
                  <AlertTriangle size={10} className="inline text-wine mr-1" />
                  虚偽の通報・嫌がらせ目的の通報は禁止します。悪質な虚偽通報は法的措置の対象となる場合があります。
                </p>
              </div>

              <button className="btn-primary w-full flex items-center justify-center gap-2 py-4">
                <Flag size={16} />
                通報・相談を送る
              </button>
            </div>
          </div>

          <div className="mt-10 text-center">
            <p className="text-stone text-sm mb-4">緊急の場合や、深刻なトラブルについては警察等の公的機関にもご相談ください。</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/safety" className="btn-secondary text-sm">安心安全への取り組み</Link>
              <Link href="/prohibited" className="btn-secondary text-sm">禁止事項</Link>
              <Link href="/contact" className="btn-secondary text-sm">お問い合わせ</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
