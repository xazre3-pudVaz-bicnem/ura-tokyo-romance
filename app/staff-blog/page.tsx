import type { Metadata } from 'next';
import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';

export const metadata: Metadata = {
  title: 'スタッフブログ｜裏東京ロマンス',
  description: '裏東京ロマンスのスタッフブログ。セラピストが日常や思いを綴っています。',
  alternates: { canonical: 'https://ura-tokyo-romance.com/staff-blog' },
};

const dummyStaffPosts = [
  { id: 1, author: '咲良', date: '2026年8月1日', title: 'グランドオープンを迎えて', excerpt: 'いよいよグランドオープンを迎えました。初めてお越しくださった方、ありがとうございます。一人でも多くの方の心が少し楽になれる場所でありたいと思っています。' },
  { id: 2, author: '花音', date: '2026年8月1日', title: '初めての方へ伝えたいこと', excerpt: '初めてのご利用で緊張される方も多いかと思います。でも大丈夫です。あなたのペースで、あなたが心地よいと感じる時間をご一緒しましょう。' },
  { id: 3, author: '麗羅', date: '2026年8月1日', title: 'あなたにとっての特別な時間', excerpt: '日常の中にある、少しだけ非日常の時間。そんなひとときをご一緒できることを楽しみにしています。まずはお気軽にご相談ください。' },
];

export default function StaffBlogPage() {
  return (
    <>
      <section className="pt-32 pb-20 px-5 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-4">Staff Blog</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-5 tracking-wide">スタッフブログ</h1>
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <p className="text-stone leading-relaxed">セラピストが日常や思いを綴ったブログです。</p>
        </div>
      </section>

      <section className="section-py px-5">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-5">
            {dummyStaffPosts.map((post) => (
              <div key={post.id} className="card-luxury p-7">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-gold text-xs">{post.author}</span>
                  <span className="text-mist text-[10px]">{post.date}</span>
                </div>
                <h2 className="text-cream text-lg font-display mb-3">{post.title}</h2>
                <p className="text-stone text-sm leading-relaxed">{post.excerpt}</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-gold text-[10px] tracking-widest">続きを読む</span>
                  <span className="text-gold text-xs">→</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/therapists" className="btn-secondary inline-flex">
              セラピスト一覧を見る
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
