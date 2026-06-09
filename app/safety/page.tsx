import type { Metadata } from 'next';
import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import { ShieldCheck, FileCheck, Star, AlertTriangle, Eye, MessageSquare, Lock, UserX, Info, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: '安心安全への取り組み｜東京 女風マッチング 裏東京ロマンス',
  description:
    '裏東京ロマンスの安心安全への取り組み。本人確認フロー・審査基準・禁止事項・通報窓口・掲載停止基準・利用者向け注意事項を公開。18歳未満利用禁止。',
  alternates: { canonical: 'https://uratokyoromance.com/safety' },
};

export default function SafetyPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: '安心安全への取り組み - 裏東京ロマンス',
    description: '裏東京ロマンスの安全対策・利用者保護の取り組み',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="pt-32 pb-20 px-5 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-4">Safety</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-5 tracking-wide">安心安全への取り組み</h1>
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-stone leading-relaxed">
            裏東京ロマンスは、利用者・セラピスト双方が安心して利用できるプラットフォームを目指しています。
            安全のための具体的な取り組みをすべて公開します。
          </p>
        </div>
      </section>

      <section className="section-py px-5">
        <div className="max-w-5xl mx-auto space-y-16">

          {/* 18禁 */}
          <div className="border-2 border-wine/60 bg-wine/5 p-8 text-center">
            <p className="text-wine text-lg font-sans tracking-wider mb-2">18歳未満の方のご利用は固く禁じています</p>
            <p className="text-stone text-sm leading-relaxed">
              本プラットフォームは18歳以上の方のみご利用いただけます。
              年齢の虚偽申告は即時アカウント停止・法的対応の対象となります。
            </p>
          </div>

          {/* プラットフォームとしての立場 */}
          <div>
            <SectionTitle en="Platform Position" ja="当プラットフォームの立場" align="left" />
            <div className="bg-elevated border border-gold/20 p-8 md:p-10">
              <div className="flex items-start gap-4 mb-6">
                <Info size={20} className="text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <h3 className="text-cream text-sm mb-3">裏東京ロマンスはマッチング支援プラットフォームです</h3>
                  <p className="text-stone text-sm leading-relaxed mb-4">
                    当プラットフォームは、セラピストのプロフィール掲載・検索・マッチング支援を行うものです。
                    <strong className="text-cream"> 運営が直接サービスを提供することは一切ありません。</strong>
                    サービスの提供主体は各セラピスト個人であり、提供内容・料金・場所はセラピストと利用者の合意に基づくものです。
                  </p>
                  <ul className="space-y-2">
                    {[
                      '運営はサービスの仲介・支援のみを行います',
                      'セラピストと利用者の間の合意内容に運営は関与しません',
                      '違法なサービスの提供・要求は禁止事項に該当します',
                      'トラブルが発生した場合は通報フォームよりご連絡ください',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-stone text-xs">
                        <CheckCircle size={12} className="text-gold flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 本人確認フロー */}
          <div>
            <SectionTitle en="Identity Verification" ja="本人確認の仕組み・フロー" align="left" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <div className="card-luxury p-7">
                <div className="flex items-start gap-4">
                  <ShieldCheck size={20} className="text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-cream text-sm mb-2">全セラピストに本人確認を実施</h3>
                    <p className="text-stone text-xs leading-relaxed">
                      プロフィール掲載前に、身分証明書（運転免許証・パスポート・マイナンバーカード等）による本人確認を実施します。
                      確認済みのセラピストには「本人確認済」バッジを表示します。
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-luxury p-7">
                <div className="flex items-start gap-4">
                  <Lock size={20} className="text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-cream text-sm mb-2">個人情報の厳重管理</h3>
                    <p className="text-stone text-xs leading-relaxed">
                      提出された本人確認書類・個人情報は暗号化して厳重に保管します。
                      利用者に公開されることはありません。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification flow */}
            <div className="card-luxury p-8">
              <p className="text-gold text-[10px] tracking-widest mb-6">本人確認フロー（セラピスト登録時）</p>
              <div className="flex flex-col md:flex-row gap-0">
                {[
                  { step: '01', title: '登録申請', desc: '必要情報を入力してフォームを送信' },
                  { step: '02', title: '書類提出', desc: '身分証明書の画像を安全に送付' },
                  { step: '03', title: '運営審査', desc: '運営が内容を確認（1〜3営業日）' },
                  { step: '04', title: 'バッジ付与', desc: '承認後にプロフィールを公開・バッジ表示' },
                ].map((item, i, arr) => (
                  <div key={item.step} className="flex md:flex-col items-start md:items-center flex-1 gap-4 md:gap-0 mb-6 md:mb-0">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 border border-gold/40 flex items-center justify-center flex-shrink-0">
                        <span className="text-gold text-xs tracking-widest">{item.step}</span>
                      </div>
                      {i < arr.length - 1 && <div className="w-px h-full md:hidden bg-border mt-2 flex-1" />}
                    </div>
                    <div className="md:text-center md:mt-4 flex-1">
                      <p className="text-cream text-sm mb-1">{item.title}</p>
                      <p className="text-stone text-xs leading-relaxed">{item.desc}</p>
                    </div>
                    {i < arr.length - 1 && <span className="text-gold/30 text-xl hidden md:block self-center">›</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* プロフィール審査 */}
          <div>
            <SectionTitle en="Profile Review" ja="審査基準・プロフィール審査" align="left" />
            <div className="card-luxury p-8">
              <div className="flex items-start gap-4 mb-4">
                <FileCheck size={20} className="text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <h3 className="text-cream text-sm mb-3">掲載前の審査基準</h3>
                  <p className="text-stone text-sm leading-relaxed mb-4">
                    登録されたプロフィール・写真・自己紹介はすべて運営が確認します。
                    以下に該当する場合は掲載を許可しません。
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {[
                      '虚偽・誇大な情報の記載',
                      '不適切・過激な写真・表現',
                      '性的サービスの明示的な記載',
                      '個人情報（本名・住所等）の記載',
                      '他者を誹謗中傷する内容',
                      '反社会的勢力との関係が疑われる内容',
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <AlertTriangle size={11} className="text-wine flex-shrink-0" />
                        <span className="text-stone text-xs">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 口コミ管理 */}
          <div>
            <SectionTitle en="Review Management" ja="口コミ・評価管理" align="left" />
            <div className="card-luxury p-8">
              <div className="flex items-start gap-4">
                <Star size={20} className="text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <h3 className="text-cream text-sm mb-3">信頼できる口コミのみ掲載</h3>
                  <p className="text-stone text-sm leading-relaxed mb-4">
                    投稿された口コミは運営が確認します。以下の口コミは非表示または削除します。
                  </p>
                  <ul className="space-y-2">
                    {[
                      '虚偽・捏造と判断される内容',
                      '個人攻撃・誹謗中傷',
                      '誘導・スパム的な内容',
                      '実際の利用に基づかないと判断される内容',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-stone text-xs">
                        <AlertTriangle size={11} className="text-wine flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 利用者向け注意事項 */}
          <div>
            <SectionTitle en="User Guidelines" ja="利用者向け注意事項" align="left" />
            <div className="card-luxury p-8">
              <p className="text-gold text-[10px] tracking-widest mb-5">ご利用前に必ずご確認ください</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  '18歳以上であることが利用条件です',
                  'セラピストへの強制・迷惑行為は禁止です',
                  '事前に料金・内容を必ず確認してください',
                  '合意なしのサービス変更を求めないでください',
                  'セラピストの個人情報を外部に公開しないでください',
                  '口コミは事実に基づいたものを投稿してください',
                  '違法行為の要求・示唆は即時通報の対象です',
                  '不審な点があれば中止し、運営に通報してください',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <Eye size={12} className="text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-stone text-xs leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* セラピスト向け注意事項 */}
          <div>
            <SectionTitle en="Therapist Guidelines" ja="セラピスト向け注意事項" align="left" />
            <div className="card-luxury p-8">
              <p className="text-gold text-[10px] tracking-widest mb-5">登録・活動にあたってのルール</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  '18歳以上であることが登録条件です',
                  '本人確認書類の提出が必須です',
                  '料金はプロフィールに明記してください',
                  '利用者への強制・迷惑行為は厳禁です',
                  '利用者の個人情報を外部に公開しないでください',
                  '違法行為の実施・示唆は即時掲載停止の対象です',
                  '不審な利用者は運営に報告してください',
                  'サービス内容は双方の合意に基づくものにしてください',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <Eye size={12} className="text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-stone text-xs leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 通報 */}
          <div>
            <SectionTitle en="Report System" ja="通報・相談窓口" align="left" />
            <div className="card-luxury p-8">
              <div className="flex items-start gap-4">
                <MessageSquare size={20} className="text-gold flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <h3 className="text-cream text-sm mb-3">24時間受け付けの通報窓口</h3>
                  <p className="text-stone text-sm leading-relaxed mb-4">
                    不審なセラピスト・利用者・口コミを発見した場合は、通報フォームから報告してください。
                    通報を受け付けたら、2営業日以内に調査を開始します。
                    通報者の情報は外部に開示しません。
                  </p>
                  <Link href="/report" className="btn-primary inline-flex">
                    通報・相談フォームへ
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 掲載停止基準 */}
          <div>
            <SectionTitle en="Suspension Criteria" ja="掲載停止・利用停止の基準" align="left" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="card-luxury p-7">
                <p className="text-wine text-[10px] tracking-widest mb-4">セラピスト向け</p>
                <ul className="space-y-3">
                  {[
                    '虚偽情報・なりすまし登録',
                    '利用者への強制・迷惑行為',
                    '複数の通報が確認された場合',
                    '違法行為の実施・示唆',
                    '個人情報の無断公開',
                    '反社会的勢力との関係',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-stone text-xs">
                      <UserX size={11} className="text-wine flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-luxury p-7">
                <p className="text-wine text-[10px] tracking-widest mb-4">利用者向け</p>
                <ul className="space-y-3">
                  {[
                    '18歳未満の利用（虚偽申告含む）',
                    'セラピストへの強制・迷惑行為',
                    '虚偽の口コミ投稿',
                    '違法行為の要求・示唆',
                    'なりすまし・不正アクセス',
                    '反社会的勢力との関係',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-stone text-xs">
                      <UserX size={11} className="text-wine flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Legal notice */}
          <div className="bg-elevated border border-border p-8 text-center">
            <p className="text-gold text-[10px] tracking-widest mb-3">法的対応について</p>
            <p className="text-stone text-sm leading-relaxed">
              本サービスは正式公開前に法務確認を行い、適法性を担保したうえで運営します。<br />
              当プラットフォームは情報掲載・マッチング支援を行うものであり、直接サービスを提供するものではありません。<br />
              各セラピストのサービス内容はセラピストと利用者の双方合意に基づくものです。
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/terms" className="btn-secondary text-sm">利用規約</Link>
            <Link href="/prohibited" className="btn-secondary text-sm">禁止事項</Link>
            <Link href="/report" className="btn-primary text-sm">通報・相談窓口</Link>
          </div>
        </div>
      </section>
    </>
  );
}
