import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import { Shield, Search, Eye, Heart, Check, MessageCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { dummyTherapists } from '@/data/dummy-therapists';

export const metadata: Metadata = {
  title: '女風 初めての方へ｜女性用風俗 初めて 東京 裏東京ロマンス',
  keywords: ['女風 初めて', '女性用風俗 初めて 東京', '女風 使い方', '東京 女風 流れ', '女風 料金 初めて'],
  description:
    '初めて女性用風俗・女風をご利用の方へ。裏東京ロマンスでのセラピストの探し方・予約相談の流れ・料金目安・安全性を詳しくご説明します。女風初心者向けガイド。',
  alternates: { canonical: 'https://ura-tokyo-romance.com/first' },
};

const steps = [
  {
    num: '01',
    title: 'セラピストを探す・比較する',
    desc: 'エリア・雰囲気・料金・口コミなどの条件で絞り込んで、気になるセラピストを比較しましょう。本人確認済みのセラピストのみ掲載しています。',
  },
  {
    num: '02',
    title: 'プロフィール・口コミを確認する',
    desc: 'セラピストのプロフィール・自己紹介・タグ・料金・口コミをじっくり読んで、あなたに合うかどうかを確認します。',
  },
  {
    num: '03',
    title: '予約相談フォームで連絡する',
    desc: '気になるセラピストがいたら、予約相談フォームから連絡しましょう。日時・エリア・ご希望をお伝えください。セラピストが返信します。',
  },
  {
    num: '04',
    title: '日時・内容を確認する',
    desc: 'セラピストとやり取りして、日時・場所・コース・料金を確認します。すべて合意してから予約確定です。サプライズな追加料金はありません。',
  },
  {
    num: '05',
    title: '当日お会いする',
    desc: 'ご指定の場所でセラピストとお会いします。当日の流れはセラピストが丁寧にご案内します。',
  },
  {
    num: '06',
    title: '口コミを投稿する（任意）',
    desc: 'ご利用後、よかったら口コミを投稿してください。次に使う方の参考になりますし、セラピストへの応援にもなります。',
  },
];

const concerns = [
  {
    q: '初めてで何も分からないのですが',
    a: 'このページを読んでいただければ大丈夫です。探す → 相談する → 会う、この流れだけです。分からないことはお問い合わせフォームからいつでもご相談いただけます。',
  },
  {
    q: '身バレが心配です',
    a: '裏東京ロマンスは掲載プラットフォームです。各セラピストは守秘義務があります。ご利用情報がSNSや外部に漏れることのないよう、利用規約で厳しく規定しています。',
  },
  {
    q: '料金はどれくらいかかりますか',
    a: 'セラピストによって異なります。目安として60分で¥14,000〜¥20,000程度です。各セラピストのプロフィールに料金が記載されています。予約前に必ず確認してください。',
  },
  {
    q: '安全に使えますか',
    a: '全セラピストは本人確認・審査を通過しています。また通報窓口・口コミ監視など、安全な利用のための仕組みを整えています。万が一問題があればすぐに通報してください。',
  },
  {
    q: 'セラピストとどうやって連絡をとりますか',
    a: 'プロフィールページにある「予約相談する」ボタンから、フォームを通じて連絡します。個人の連絡先を直接やり取りする必要はありません。',
  },
];

const firstTimerTherapist = dummyTherapists.find((t) => t.slug === 'ritsu')!;

export default function FirstPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: concerns.map((c) => ({
      '@type': 'Question',
      name: c.q,
      acceptedAnswer: { '@type': 'Answer', text: c.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="pt-32 pb-20 px-5 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-4">For First Time</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-5 tracking-wide">初めての方へ</h1>
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-stone leading-relaxed">
            東京で女性用風俗・女風を初めて利用したいけれど、どうすればいいか分からない方へ。
            裏東京ロマンスは、セラピストを安全に探して相談できるマッチングプラットフォームです。
            このページで使い方を確認してから、ぜひ始めてみてください。
          </p>
        </div>
      </section>

      {/* What is platform */}
      <section className="section-py px-5">
        <div className="max-w-5xl mx-auto">
          <SectionTitle en="What is This" ja="裏東京ロマンスとは" />
          <div className="card-luxury p-8 mb-6">
            <p className="text-stone text-sm leading-relaxed mb-4">
              裏東京ロマンスは、<span className="text-cream">東京で女性用風俗・女風を利用したい女性</span>と、
              <span className="text-cream">個人で活動したいセラピスト</span>をつなぐマッチングプラットフォームです。
            </p>
            <p className="text-stone text-sm leading-relaxed mb-4">
              お客様を直接ご案内する店舗ではなく、セラピストのプロフィール・出勤情報・口コミ・料金を掲載し、
              あなたが自分でセラピストを選んで相談できる仕組みです。
            </p>
            <p className="text-stone text-sm leading-relaxed">
              利用者の安全のために、すべてのセラピストは本人確認・プロフィール審査を通過しています。
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { icon: Shield, t: '本人確認済みのみ掲載', d: '身分証明書による本人確認を完了したセラピストのみ掲載しています。' },
              { icon: Eye, t: '料金の完全透明性', d: '各セラピストのプロフィールに料金が記載されています。事前に確認してから相談できます。' },
              { icon: Search, t: '自分で選べる', d: 'プロフィール・タグ・口コミ・料金を比較して、あなたに合うセラピストを自分で選べます。' },
              { icon: Heart, t: '口コミで安心確認', d: '実際に利用した方の口コミを確認してから相談できます。信頼できる評価だけを掲載します。' },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="card-luxury p-7">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-gold" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-cream text-sm mb-2">{t}</h3>
                    <p className="text-stone text-xs leading-relaxed">{d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flow */}
      <section className="section-py px-5 bg-surface">
        <div className="max-w-3xl mx-auto">
          <SectionTitle en="How to Use" ja="使い方の流れ" />
          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.num} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 border border-gold flex-shrink-0 flex items-center justify-center text-gold text-xs font-display">
                    {step.num}
                  </div>
                  <div className="flex-1 w-px bg-border mt-2" />
                </div>
                <div className="pb-8">
                  <h3 className="text-cream text-base mb-2">{step.title}</h3>
                  <p className="text-stone text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured first-timer therapist */}
      <section className="section-py px-5 bg-surface">
        <div className="max-w-5xl mx-auto">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-8 text-center">初心者向けセラピスト特集</p>
          <div className="grid md:grid-cols-2 gap-0 overflow-hidden border border-border">
            {/* Photo side */}
            <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[480px] overflow-hidden">
              {firstTimerTherapist.image ? (
                <Image
                  src={firstTimerTherapist.image}
                  alt={firstTimerTherapist.name}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="img-placeholder w-full h-full" />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/60 hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-base/80 to-transparent" />
              <div className="absolute bottom-4 left-5">
                <p className="font-display text-2xl text-cream tracking-wide">{firstTimerTherapist.name}</p>
                <p className="text-stone text-xs mt-0.5">{firstTimerTherapist.age}歳 / {firstTimerTherapist.height}cm</p>
              </div>
            </div>

            {/* Info side */}
            <div className="bg-elevated p-8 md:p-10 flex flex-col justify-center">
              <div className="flex flex-wrap gap-1.5 mb-5">
                {firstTimerTherapist.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>

              <h3 className="font-display text-xl text-cream mb-4 leading-relaxed">
                「初めてでも、<br />緊張しなくて大丈夫です」
              </h3>

              <p className="text-stone text-sm leading-relaxed mb-6">
                {firstTimerTherapist.intro}
              </p>

              <div className="flex items-center gap-2 mb-6">
                {firstTimerTherapist.verifiedId && (
                  <span className="flex items-center gap-1 text-[10px] text-gold border border-gold/30 px-2.5 py-1">
                    <ShieldCheck size={9} />本人確認済
                  </span>
                )}
                <span className="flex items-center gap-1 text-[10px] text-gold border border-gold/30 px-2.5 py-1">
                  <Check size={9} />初心者向け
                </span>
              </div>

              <Link
                href={`/therapists/${firstTimerTherapist.slug}`}
                className="flex items-center gap-2 text-gold text-xs tracking-widest hover:gap-3 transition-all duration-200 group"
              >
                プロフィールを見る
                <ArrowRight size={13} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          <p className="text-mist text-[10px] text-center mt-4">
            ※ 他にも初心者向けのセラピストがいます。
            <Link href="/therapists?tag=初心者向け" className="text-gold/60 hover:text-gold ml-1 underline underline-offset-2">
              初心者向けセラピストを探す →
            </Link>
          </p>
        </div>
      </section>

      {/* Concerns FAQ */}
      <section className="section-py px-5">
        <div className="max-w-3xl mx-auto">
          <SectionTitle en="FAQ" ja="よくある不安にお答えします" />
          <div className="space-y-5">
            {concerns.map((c) => (
              <div key={c.q} className="card-luxury p-7">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-wine text-sm font-display flex-shrink-0">Q</span>
                  <p className="text-cream text-sm">{c.q}</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-gold text-sm font-display flex-shrink-0">A</span>
                  <p className="text-stone text-sm leading-relaxed">{c.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="section-py px-5 bg-surface">
        <div className="max-w-3xl mx-auto">
          <SectionTitle en="Notes" ja="ご利用にあたっての注意事項" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-luxury p-7">
              <p className="text-gold text-xs tracking-widest mb-4">ご確認ください</p>
              <ul className="space-y-3">
                {[
                  '18歳以上の女性のみご利用できます',
                  '各セラピストとの合意のもとでサービスが行われます',
                  '事前に料金・内容をセラピストと確認してください',
                  '口コミ・評価は実際の利用に基づくものに限ります',
                  '不審な点があれば運営へ通報してください',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-stone text-sm">
                    <Check size={14} className="text-gold flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-luxury p-7">
              <p className="text-wine text-xs tracking-widest mb-4">禁止事項</p>
              <ul className="space-y-3">
                {[
                  '18歳未満の利用（虚偽申告含む）',
                  '違法行為・強制行為・迷惑行為',
                  'セラピストへの無理な要求',
                  '個人情報の無断公開',
                  '虚偽の口コミ投稿',
                  'なりすまし登録',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-stone text-sm">
                    <span className="text-wine text-sm flex-shrink-0">×</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py px-5 bg-elevated">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl text-cream mb-4">まずはセラピストを探してみましょう</h2>
          <p className="text-stone text-sm mb-8 leading-relaxed">
            プロフィールを見るだけでも大丈夫です。気になるセラピストがいたら、
            予約相談フォームからご連絡ください。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/therapists" className="btn-primary">
              セラピストを探してみる
            </Link>
            <Link href="/contact" className="btn-secondary flex items-center gap-2">
              <MessageCircle size={15} />
              お問い合わせ
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
