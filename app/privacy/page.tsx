import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー｜裏東京ロマンス',
  description: '裏東京ロマンスのプライバシーポリシーです。お客様の個人情報の取り扱いについて説明します。',
  alternates: { canonical: 'https://ura-tokyo-romance.com/privacy' },
};

export default function PrivacyPage() {
  return (
    <>
      <section className="pt-32 pb-20 px-5 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-4">Privacy</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-5 tracking-wide">プライバシーポリシー</h1>
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
        </div>
      </section>

      <section className="section-py px-5">
        <div className="max-w-3xl mx-auto">
          <div className="prose-policy space-y-10">
            {[
              {
                title: '1. 個人情報の収集について',
                body: '当サービスでは、お問い合わせ・ご予約時にお名前（ニックネーム可）、メールアドレス等をお伺いする場合があります。収集した個人情報は、サービス提供・ご連絡に必要な範囲内でのみ使用します。',
              },
              {
                title: '2. 個人情報の利用目的',
                body: '収集した個人情報は、以下の目的に限り使用します。\n・ご予約・ご相談への対応\n・サービスに関するご連絡\n・サービス品質向上のための分析',
              },
              {
                title: '3. 個人情報の第三者提供',
                body: '当プラットフォームは、法令に基づく場合を除き、お客様の個人情報を第三者に提供することは一切ありません。掲載セラピストも同様の守秘義務を負っています。',
              },
              {
                title: '4. 個人情報の管理',
                body: 'お客様の個人情報は適切なセキュリティ環境のもとで保管し、不正アクセス・漏洩・滅失・毀損の防止に努めます。',
              },
              {
                title: '5. プラットフォームの仲介について',
                body: '当プラットフォームは掲載・マッチング支援を行うものであり、サービス提供主体は各セラピスト個人です。セラピストとのやり取りは予約相談フォームを通じて行われ、お客様の個人情報が直接セラピストに共有されることはありません。',
              },
              {
                title: '6. Cookieの使用について',
                body: '当サイトでは、ユーザー体験の向上のためCookieを使用する場合があります。ブラウザの設定によりCookieを無効にすることも可能です。',
              },
              {
                title: '7. プライバシーポリシーの変更',
                body: '本プライバシーポリシーは、必要に応じて変更する場合があります。重要な変更がある場合は、当サイト上でお知らせいたします。',
              },
              {
                title: '8. お問い合わせ',
                body: '個人情報の取り扱いに関するご質問・ご要望は、お問い合わせフォーム（/contact）よりご連絡ください。',
              },
            ].map((section) => (
              <div key={section.title} className="border-b border-border pb-8">
                <h2 className="text-cream text-lg font-sans mb-4">{section.title}</h2>
                <p className="text-stone text-sm leading-loose whitespace-pre-line">{section.body}</p>
              </div>
            ))}

            <p className="text-mist text-xs text-right">制定日：2026年8月1日</p>
          </div>
        </div>
      </section>
    </>
  );
}
