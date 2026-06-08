import type { Metadata } from 'next';
import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';

export const metadata: Metadata = {
  title: 'スタッフブログ｜裏東京ロマンス',
  description: '裏東京ロマンスのスタッフブログ。セラピストが日常や思いを綴っています。',
  alternates: { canonical: 'https://ura-tokyo-romance.com/staff-blog' },
};

const dummyStaffPosts = [
  { id: 1, author: '蓮', date: '掲載準備中', title: 'グランドオープンに向けて', excerpt: '2026年8月1日のグランドオープンに向けて、プロフィールを準備中です。プラットフォームを通じて、より多くの方の心が少し楽になるお手伝いができれば嬉しいです。' },
  { id: 2, author: '悠真', date: '掲載準備中', title: '初めての方へ伝えたいこと', excerpt: '初めてのご利用で不安な方も多いかと思います。事前の相談フォームで気になることを何でも聞いてください。あなたのペースで、心地よい時間をご一緒しましょう。' },
  { id: 3, author: '玲央', date: '掲載準備中', title: 'セラピストとして登録しました', excerpt: '裏東京ロマンスに先行登録しました。8月1日のグランドオープン後、プロフィールが公開されます。ぜひプロフィールをチェックしてみてください。' },
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
