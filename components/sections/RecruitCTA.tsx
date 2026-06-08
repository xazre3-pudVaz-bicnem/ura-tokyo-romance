import Link from 'next/link';
import { UserPlus, Check } from 'lucide-react';

const merits = [
  'SEOに強いプロフィールページを持てる',
  '本人確認済バッジで信頼感アップ',
  '出勤情報を自由に更新できる',
  '口コミを蓄積できる',
  'SNSだけに頼らない集客導線',
  'ランキング・新人枠で露出増',
];

export default function RecruitCTA() {
  return (
    <section className="section-py px-5 bg-elevated">
      <div className="max-w-5xl mx-auto">
        <div className="border border-wine/40 p-10 md:p-16 relative overflow-hidden">
          {/* Background accent */}
          <div className="absolute inset-0 bg-gradient-radial from-wine/5 to-transparent" />

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              {/* Left */}
              <div className="flex-1">
                <p className="text-gold text-[10px] tracking-[0.3em] uppercase mb-4">For Therapist</p>
                <h2 className="font-display text-3xl md:text-4xl text-cream mb-4 tracking-wide">
                  東京で女風セラピストとして<br />活動したい方へ
                </h2>
                <span className="block w-16 h-px bg-gradient-to-r from-transparent via-wine to-transparent mb-6" />
                <p className="text-stone text-sm leading-relaxed mb-6">
                  裏東京ロマンスは、店舗に所属せず、自分のペースで活動したいセラピストを支援するプラットフォームです。
                  プロフィールページを持ち、東京で女風を探している女性に見つけてもらいましょう。
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                  {merits.map((merit) => (
                    <div key={merit} className="flex items-center gap-2.5">
                      <Check size={13} className="text-gold flex-shrink-0" />
                      <span className="text-stone text-xs">{merit}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/register" className="btn-primary flex items-center gap-2">
                    <UserPlus size={15} />
                    セラピスト登録はこちら
                  </Link>
                  <Link href="/register/info" className="btn-secondary">
                    セラピスト向け説明を見る
                  </Link>
                </div>
              </div>

              {/* Right - Plans preview */}
              <div className="lg:w-72 flex-shrink-0 w-full">
                <p className="text-gold text-[10px] tracking-widest mb-4">掲載プラン（仮）</p>
                <div className="space-y-3">
                  {[
                    { plan: '無料掲載', desc: 'プロフィール掲載のみ', price: '¥0' },
                    { plan: 'スタンダード', desc: 'プロフィール＋出勤情報＋検索上位', price: '月額 ¥×,000〜', highlight: false },
                    { plan: 'プレミアム', desc: '特集掲載＋ランキング強化＋SEO記事', price: '月額 ¥×,000〜', highlight: true },
                  ].map((item) => (
                    <div
                      key={item.plan}
                      className={`p-4 border ${item.highlight ? 'border-gold/50 bg-gold/5' : 'border-border'}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm ${item.highlight ? 'text-gold' : 'text-cream'}`}>{item.plan}</span>
                        <span className="text-gold text-xs">{item.price}</span>
                      </div>
                      <p className="text-mist text-[10px]">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-mist text-[10px] mt-3">
                  ※料金は正式公開前に決定します
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
