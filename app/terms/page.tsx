import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '利用規約｜裏東京ロマンス',
  description: '裏東京ロマンスの利用規約。18歳未満利用禁止・虚偽登録禁止・禁止事項・個人情報保護など。',
  alternates: { canonical: 'https://uratokyoromance.com/terms' },
};

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 px-5 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-4">Terms of Service</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-5 tracking-wide">利用規約</h1>
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-stone text-sm">最終更新日：2026年6月1日</p>
        </div>
      </section>

      <section className="section-py px-5">
        <div className="max-w-3xl mx-auto">
          <div className="border border-wine/40 bg-wine/5 p-6 mb-10">
            <p className="text-wine text-sm font-sans tracking-wider text-center">
              本サービスは18歳以上の方のみご利用いただけます。18歳未満の方のアクセス・利用は固く禁じます。
            </p>
          </div>

          <div className="prose prose-invert max-w-none">
            <div className="space-y-10">
              {[
                {
                  title: '第1条（総則）',
                  content: `本利用規約（以下「本規約」）は、裏東京ロマンス（以下「当プラットフォーム」）が提供するサービスの利用条件を定めるものです。ユーザー（利用者・セラピスト）は本規約に同意したうえでサービスをご利用ください。

当プラットフォームは、東京で女性用風俗・女風を利用したい女性と、個人で活動したいセラピストをつなぐマッチング・情報掲載プラットフォームです。直接サービスを提供する店舗ではありません。`,
                },
                {
                  title: '第2条（年齢制限）',
                  content: `本サービスは18歳以上の方のみご利用いただけます。

高校生を含む18歳未満の方の利用は固く禁じます。年齢の虚偽申告が判明した場合は、即時アカウント停止・利用禁止とし、必要に応じて法的措置を取ります。

セラピスト登録についても同様に、18歳以上の方のみ登録できます。`,
                },
                {
                  title: '第3条（禁止事項）',
                  content: `ユーザーは以下の行為を行ってはなりません。

・18歳未満の方への利用・登録
・虚偽情報の登録・申告
・なりすまし行為
・他のユーザーへの強制・脅迫・迷惑行為
・違法行為の実施・示唆・要求
・性的サービスの強要
・プラットフォームを介さない金銭トラブルの発生
・個人情報の無断収集・公開
・スパム行為・誘導行為
・当プラットフォームへの不正アクセス・ハッキング
・反社会的勢力との関係
・本規約に反するその他の行為

詳細は<a href="/prohibited" class="text-gold hover:underline">禁止事項ページ</a>をご確認ください。`,
                },
                {
                  title: '第4条（プラットフォームの役割）',
                  content: `当プラットフォームは、セラピストの情報掲載・マッチング支援を行うものです。

各セラピストのサービス内容・料金・条件は、セラピストと利用者の合意に基づくものであり、当プラットフォームは当事者間のサービス提供に関して責任を負いません。

利用者は、サービスの利用・相談にあたって、事前にセラピストと内容・料金・条件を確認してください。`,
                },
                {
                  title: '第5条（金銭トラブル）',
                  content: `セラピストと利用者間の金銭トラブルについては、当事者間での解決を原則とします。

当プラットフォームは仲介・保証を行いません。トラブルが発生した場合は通報窓口にご連絡ください。悪質なケースについては掲載停止・利用停止等の対応を取ります。`,
                },
                {
                  title: '第6条（コンテンツの管理）',
                  content: `当プラットフォームは、掲載情報の審査・修正・削除・掲載停止を行う権限を持ちます。

以下の場合は予告なく掲載停止・アカウント停止を行うことがあります。
・本規約違反が確認された場合
・通報・苦情が多数寄せられた場合
・当プラットフォームが不適切と判断した場合`,
                },
                {
                  title: '第7条（個人情報の保護）',
                  content: `当プラットフォームは、ユーザーの個人情報を適切に管理します。詳細は<a href="/privacy" class="text-gold hover:underline">プライバシーポリシー</a>をご確認ください。

セラピストが提出した本人確認書類は、審査目的にのみ使用し、第三者に公開・提供しません。`,
                },
                {
                  title: '第8条（反社会的勢力の排除）',
                  content: `当プラットフォームは、反社会的勢力（暴力団・暴力団員・その関係者等）の利用・登録を固く禁じます。

反社会的勢力との関係が判明した場合は、即時アカウント停止・利用禁止とし、必要に応じて法的措置を取ります。`,
                },
                {
                  title: '第9条（免責事項）',
                  content: `当プラットフォームは、以下について責任を負いません。

・セラピストと利用者間のトラブル・損害
・掲載情報の正確性・完全性
・サービス内容・品質に関する事項
・サービスの一時停止・中断による損害

利用者は自己責任においてサービスをご利用ください。`,
                },
                {
                  title: '第10条（規約の変更）',
                  content: `当プラットフォームは、必要に応じて本規約を変更することがあります。変更後の規約はウェブサイトに掲載した時点で効力を生じます。`,
                },
                {
                  title: '第11条（法律・法務確認）',
                  content: `本サービスは正式公開前に法務確認を行い、適法性を担保したうえで運営します。現在の掲載内容は参考情報であり、正式なサービス内容・規約は2026年8月1日のグランドオープン時に確定します。`,
                },
                {
                  title: '第12条（管轄裁判所）',
                  content: `本規約に関する紛争については、東京地方裁判所を専属的合意管轄裁判所とします。`,
                },
              ].map((section) => (
                <div key={section.title} className="card-luxury p-8">
                  <h2 className="text-cream text-base mb-4 font-sans">{section.title}</h2>
                  <div
                    className="text-stone text-sm leading-loose whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link href="/privacy" className="btn-secondary text-sm">プライバシーポリシー</Link>
            <Link href="/prohibited" className="btn-secondary text-sm">禁止事項</Link>
            <Link href="/safety" className="btn-secondary text-sm">安心安全への取り組み</Link>
          </div>
        </div>
      </section>
    </>
  );
}
