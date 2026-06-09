import type { Metadata } from 'next';
import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import { Check, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'セラピスト向け説明｜女風セラピスト登録 裏東京ロマンス',
  description:
    '裏東京ロマンスのセラピスト向け説明ページ。掲載の仕組み・料金・審査・プロフィール管理・禁止事項などを詳しく説明します。東京の女風マッチングプラットフォーム。',
  alternates: { canonical: 'https://uratokyoromance.com/register/info' },
};

export default function RegisterInfoPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-5 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-4">For Therapist</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-5 tracking-wide">セラピスト向け説明</h1>
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-stone leading-relaxed">
            裏東京ロマンスへの掲載・登録を検討している方へ。
            プラットフォームの仕組み・費用・ルール・サポート内容を詳しくご説明します。
          </p>
        </div>
      </section>

      <section className="section-py px-5">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* What is */}
          <div>
            <SectionTitle en="About Platform" ja="プラットフォームの概要" align="left" />
            <div className="card-luxury p-8">
              <p className="text-stone text-sm leading-relaxed mb-4">
                裏東京ロマンスは、東京で女性用風俗・女風を利用したい女性と、個人で活動したいセラピストをつなぐ<span className="text-cream">マッチングプラットフォーム</span>です。
              </p>
              <p className="text-stone text-sm leading-relaxed mb-4">
                セラピスト側では、プロフィールページを持ち、出勤情報を更新し、利用者からの相談を受けることができます。
                運営はプラットフォームの管理・審査・サポートを行いますが、セラピストと利用者の間のサービス提供に直接関与しません。
              </p>
              <p className="text-stone text-sm leading-relaxed">
                個人で活動しているセラピストが、SNSだけでなく、検索からも見つけてもらえる環境を提供します。
              </p>
            </div>
          </div>

          {/* Rules */}
          <div>
            <SectionTitle en="Rules" ja="掲載ルール・条件" align="left" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="card-luxury p-7">
                <p className="text-gold text-[10px] tracking-widest mb-4">掲載できる方</p>
                <ul className="space-y-3">
                  {[
                    '18歳以上の方（高校生不可）',
                    '本人確認書類を提出できる方',
                    '運営の審査に合格した方',
                    '東京都内で活動できる方',
                    '利用規約・禁止事項に同意できる方',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-stone text-sm">
                      <Check size={13} className="text-gold flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card-luxury p-7">
                <p className="text-wine text-[10px] tracking-widest mb-4">掲載できない方</p>
                <ul className="space-y-3">
                  {[
                    '18歳未満の方',
                    '虚偽情報を登録しようとする方',
                    '反社会的勢力と関係のある方',
                    '過去に規約違反で停止された方',
                    '運営審査に通過できなかった方',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-stone text-sm">
                      <AlertTriangle size={13} className="text-wine flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Profile management */}
          <div>
            <SectionTitle en="Profile" ja="プロフィール管理" align="left" />
            <div className="card-luxury p-8">
              <p className="text-stone text-sm leading-relaxed mb-6">
                掲載後は以下の情報を自分で管理・更新できます（プランによって機能が異なります）。
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'プロフィール写真（メイン・サブ）',
                  '自己紹介・利用者へのメッセージ',
                  '対応エリア',
                  '出勤スケジュール',
                  '料金目安・プラン',
                  '雰囲気タグ',
                  'Instagramアカウントリンク',
                  'ブログ記事の投稿',
                  '口コミの確認・返信',
                  '予約相談の受付設定',
                  '掲載ステータスの確認',
                  '退会申請',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <Check size={12} className="text-gold flex-shrink-0" />
                    <span className="text-stone text-xs">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Safety */}
          <div>
            <SectionTitle en="Safety" ja="安全面について" align="left" />
            <div className="space-y-4">
              {[
                {
                  title: '本人確認',
                  desc: '身分証明書の提出が必要です。個人情報は厳重に管理し、利用者に公開されることはありません。',
                },
                {
                  title: '口コミ・評価管理',
                  desc: '利用者からの口コミは運営が確認します。不適切なレビューは非表示にします。',
                },
                {
                  title: '通報・相談対応',
                  desc: '利用者・セラピストどちらからのトラブル報告にも対応します。問題が確認された場合はアカウントを停止します。',
                },
                {
                  title: '掲載停止基準',
                  desc: '規約違反・虚偽情報・迷惑行為・トラブル報告が確認された場合は掲載を停止します。',
                },
              ].map((item) => (
                <div key={item.title} className="card-luxury p-6">
                  <p className="text-cream text-sm mb-2">{item.title}</p>
                  <p className="text-stone text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Notice */}
          <div className="bg-wine/10 border border-wine/30 p-6">
            <p className="text-cream text-sm mb-3">登録前にご確認ください</p>
            <ul className="space-y-2 text-stone text-xs leading-relaxed">
              <li>・本サービスは正式公開前に法務確認を行い、適法性を担保したうえで運営します。</li>
              <li>・掲載の可否は運営が判断します。希望に添えない場合もございます。</li>
              <li>・サービス内容の詳細は利用者とセラピストの合意に基づき、当プラットフォームは介入しません。</li>
              <li>・違法行為・強制行為・迷惑行為は厳禁です。発覚した場合は即時掲載停止・法的対応を取ります。</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-stone text-sm mb-6">ご不明な点はお気軽にお問い合わせください。登録申請は無料です。</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register" className="btn-primary">登録申請する（無料）</Link>
              <Link href="/register/flow" className="btn-secondary">審査の流れを見る</Link>
              <Link href="/contact" className="btn-secondary">お問い合わせ</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
