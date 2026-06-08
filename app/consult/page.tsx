import type { Metadata } from 'next';
import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import ConsultForm from '@/components/sections/ConsultForm';

export const metadata: Metadata = {
  title: '相談フォーム｜女風 セラピスト相談 東京 裏東京ロマンス',
  keywords: ['女風 相談', '女性用風俗 相談', '東京 女風 初めて相談', '女風 問い合わせ'],
  description:
    '女性用風俗・女風に関するご相談はこちらから。セラピストへの予約相談・初めての利用相談・一般的なお問い合わせに対応しています。',
  alternates: { canonical: 'https://ura-tokyo-romance.com/consult' },
};

export default function ConsultPage() {
  return (
    <>
      <section className="pt-32 pb-16 px-5 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-4">Consultation</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-5 tracking-wide">
            相談フォーム
          </h1>
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-stone leading-relaxed">
            初めての利用のご相談・セラピストへの予約相談・一般的なお問い合わせに対応しています。<br />
            お気軽にご相談ください。通常2営業日以内にご連絡します。
          </p>
        </div>
      </section>

      <section className="section-py px-5">
        <div className="max-w-2xl mx-auto">
          {/* Notice */}
          <div className="bg-elevated border border-border p-5 mb-8">
            <p className="text-gold text-[10px] tracking-widest mb-3">ご確認ください</p>
            <ul className="space-y-2 text-stone text-xs leading-relaxed">
              <li>・本フォームは一般的なご相談・ご質問用です。特定のセラピストへの予約相談はセラピストのプロフィールページから行ってください。</li>
              <li>・18歳未満の方はご利用いただけません。</li>
              <li>・返信は送信いただいたメールアドレスに行います。</li>
              <li>・営業目的・スパム等は受け付けておりません。</li>
            </ul>
          </div>

          <ConsultForm />

          <div className="mt-8 text-center">
            <p className="text-stone text-sm mb-4">特定のセラピストに相談したい場合</p>
            <Link href="/therapists" className="btn-secondary">セラピスト一覧を見る</Link>
          </div>
        </div>
      </section>
    </>
  );
}
