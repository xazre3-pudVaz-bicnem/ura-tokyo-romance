import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, XCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: '禁止事項｜裏東京ロマンス',
  description: '裏東京ロマンスの禁止事項一覧。利用者・セラピスト双方に対する禁止行為と、違反時の対応について説明します。',
  alternates: { canonical: 'https://uratokyoromance.com/prohibited' },
};

const userProhibitions = [
  { title: '18歳未満の利用', desc: '18歳未満の方の利用・登録は固く禁じます。年齢の虚偽申告も同様に禁止します。' },
  { title: '違法行為の要求', desc: '法律に違反するサービスの要求・強要は禁止します。' },
  { title: 'セラピストへの強制・脅迫', desc: 'セラピストへの強制行為・脅迫・ハラスメントは禁止します。' },
  { title: '虚偽情報の提供', desc: '氏名・年齢・連絡先等の虚偽申告、なりすましは禁止します。' },
  { title: '個人情報の無断公開', desc: 'セラピストの個人情報（本名・住所・電話番号等）を無断で公開・拡散することは禁止します。' },
  { title: '虚偽の口コミ投稿', desc: '実際の利用に基づかない虚偽・誇大な口コミの投稿は禁止します。' },
  { title: 'スパム・誘導行為', desc: '他のサービスへの誘導・広告・スパム行為は禁止します。' },
  { title: '反社会的勢力の利用', desc: '反社会的勢力（暴力団等）の関係者の利用は禁止します。' },
];

const therapistProhibitions = [
  { title: '虚偽情報の登録', desc: 'プロフィール・本人確認での虚偽情報の登録は禁止します。なりすまし登録も禁止です。' },
  { title: '利用者への強制・迷惑行為', desc: '利用者への強制行為・脅迫・ハラスメントは禁止します。' },
  { title: '違法サービスの提供', desc: '法律に違反するサービスの提供・示唆は禁止します。' },
  { title: '利用者情報の無断公開', desc: '利用者の個人情報を無断で公開・拡散することは禁止します。' },
  { title: '複数アカウントの作成', desc: '同一人物による複数アカウントの作成・運営は禁止します。' },
  { title: '金銭の不当な要求', desc: '合意外の追加料金請求・脅迫による金銭要求は禁止します。' },
  { title: '写真の無断使用', desc: '他人の写真・著作物を無断でプロフィールに使用することは禁止します。' },
  { title: '反社会的勢力との関係', desc: '反社会的勢力（暴力団等）との関係は禁止します。' },
];

const consequences = [
  '警告・注意の送付',
  '掲載内容の強制修正',
  '一時的な掲載停止・利用停止',
  '永久的なアカウント停止・利用禁止',
  '警察・関係機関への通報・協力',
  '損害賠償請求',
];

export default function ProhibitedPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-5 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-4">Prohibited</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-5 tracking-wide">禁止事項</h1>
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-stone leading-relaxed">
            裏東京ロマンスの安全な利用のため、以下の行為を禁止します。
            違反が確認された場合は、アカウント停止・法的対応等の措置を取ります。
          </p>
        </div>
      </section>

      <section className="section-py px-5">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* 18禁 */}
          <div className="border border-wine bg-wine/10 p-8 text-center">
            <AlertTriangle size={24} className="text-wine mx-auto mb-3" />
            <p className="text-wine text-lg tracking-wider mb-2">18歳未満の利用は固く禁じています</p>
            <p className="text-stone text-sm">
              年齢の虚偽申告も禁止します。違反者は即時アカウント停止・法的対応の対象となります。
            </p>
          </div>

          {/* User prohibitions */}
          <div>
            <h2 className="font-display text-2xl text-cream mb-6 flex items-center gap-3">
              <XCircle size={20} className="text-wine" />
              利用者（女性ユーザー）の禁止事項
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userProhibitions.map((item) => (
                <div key={item.title} className="card-luxury p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={14} className="text-wine flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-cream text-sm mb-1">{item.title}</p>
                      <p className="text-stone text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Therapist prohibitions */}
          <div>
            <h2 className="font-display text-2xl text-cream mb-6 flex items-center gap-3">
              <XCircle size={20} className="text-wine" />
              セラピストの禁止事項
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {therapistProhibitions.map((item) => (
                <div key={item.title} className="card-luxury p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={14} className="text-wine flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-cream text-sm mb-1">{item.title}</p>
                      <p className="text-stone text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Consequences */}
          <div className="card-luxury p-8">
            <h2 className="font-display text-2xl text-cream mb-6">違反時の対応</h2>
            <p className="text-stone text-sm leading-relaxed mb-6">
              禁止事項に違反した場合、または違反の疑いがある場合、当プラットフォームは以下の措置を取ることがあります。
            </p>
            <ul className="space-y-3">
              {consequences.map((item) => (
                <li key={item} className="flex items-center gap-3 text-stone text-sm">
                  <AlertTriangle size={13} className="text-wine flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div className="text-center flex flex-wrap justify-center gap-4">
            <Link href="/report" className="btn-primary">通報・相談窓口</Link>
            <Link href="/terms" className="btn-secondary">利用規約</Link>
            <Link href="/safety" className="btn-secondary">安心安全への取り組み</Link>
          </div>
        </div>
      </section>
    </>
  );
}
