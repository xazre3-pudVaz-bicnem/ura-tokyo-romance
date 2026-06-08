import type { Metadata } from 'next';
import Link from 'next/link';
import { dummyBlogPosts, BLOG_CATEGORIES } from '@/data/staff-blog';

export const metadata: Metadata = {
  title: 'セラピストブログ｜裏東京ロマンス',
  description: '裏東京ロマンス所属セラピストのブログ。出勤情報・日常・活動エリアの情報などを発信しています。女風セラピストの素顔を知ることができます。',
  keywords: ['女風 ブログ', 'セラピスト ブログ', '女風 出勤情報', '女風 セラピスト 日常'],
  alternates: { canonical: 'https://ura-tokyo-romance.com/staff-blog' },
};

const publishedPosts = dummyBlogPosts.filter((p) => p.status === 'published');

export default function StaffBlogPage() {
  const featured = publishedPosts[0];
  const rest = publishedPosts.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-5 bg-surface border-b border-border">
        <div className="max-w-4xl mx-auto">
          <p className="text-gold text-[10px] tracking-[0.3em] mb-4">Therapist Blog</p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-5 tracking-wide">セラピストブログ</h1>
          <span className="block w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-6" />
          <p className="text-stone leading-relaxed max-w-2xl">
            所属セラピストが日常・出勤情報・活動エリアなどを発信しています。
            プロフィールだけでは伝わらない個性や人柄を知ることができます。
          </p>

          {/* Category nav */}
          <div className="flex flex-wrap gap-2 mt-6">
            <Link href="/staff-blog" className="text-[10px] border border-gold/50 text-gold px-3 py-1.5">
              すべて
            </Link>
            {BLOG_CATEGORIES.slice(0, 5).map((cat) => (
              <Link
                key={cat}
                href={`/staff-blog/category/${encodeURIComponent(cat)}`}
                className="text-[10px] border border-border text-mist px-3 py-1.5 hover:border-gold/30 hover:text-stone transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py px-5">
        <div className="max-w-4xl mx-auto">

          {/* Featured post */}
          {featured && (
            <div className="mb-10">
              <Link href={`/staff-blog/${featured.slug}`} className="group block">
                <div className="flex flex-col md:flex-row border border-border overflow-hidden hover:border-gold/30 transition-colors">
                  {featured.image && (
                    <div className="w-full md:w-56 aspect-[16/9] md:aspect-auto flex-shrink-0 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={featured.image}
                        alt={featured.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="flex-1 bg-surface p-7 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        {featured.therapistImage && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={featured.therapistImage}
                            alt={featured.therapistName}
                            className="w-7 h-10 object-cover object-top"
                          />
                        )}
                        <span className="text-gold text-xs">{featured.therapistName}</span>
                        <span className="text-mist text-[10px]">{featured.category}</span>
                      </div>
                      <h2 className="font-display text-2xl text-cream mb-3 group-hover:text-gold transition-colors">
                        {featured.title}
                      </h2>
                      <p className="text-stone text-sm leading-relaxed line-clamp-3">{featured.excerpt}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex flex-wrap gap-1">
                        {featured.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[9px] border border-border text-mist px-1.5 py-0.5">{tag}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1.5 text-gold text-[10px]">
                        続きを読む <span>→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Blog grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {rest.map((post) => (
              <Link key={post.id} href={`/staff-blog/${post.slug}`} className="group block">
                <div className="card-luxury overflow-hidden hover:border-gold/30 transition-colors">
                  {post.image && (
                    <div className="w-full aspect-[16/9] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gold text-xs">{post.therapistName}</span>
                      <span className="text-mist text-[10px]">{post.category}</span>
                    </div>
                    <h3 className="font-display text-lg text-cream mb-2 group-hover:text-gold transition-colors line-clamp-1">
                      {post.title}
                    </h3>
                    <p className="text-stone text-xs leading-relaxed line-clamp-2">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[9px] border border-border text-mist px-1.5 py-0.5">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Coming soon */}
          {publishedPosts.length === 0 && (
            <div className="card-luxury p-10 text-center">
              <p className="text-stone text-sm mb-2">グランドオープン後に公開されます</p>
              <p className="text-mist text-xs">現在、セラピストたちが準備中です。</p>
            </div>
          )}

          {/* Therapist blog links */}
          <div className="mt-10 card-luxury p-6">
            <p className="text-gold text-[10px] tracking-widest mb-4">セラピスト個別のブログ</p>
            <div className="flex flex-wrap gap-2">
              {[
                { name: '蓮', slug: 'ren' },
                { name: '悠真', slug: 'yuma' },
                { name: '蒼', slug: 'ao' },
                { name: '玲央', slug: 'reo' },
                { name: '律', slug: 'ritsu' },
              ].map((t) => (
                <Link
                  key={t.slug}
                  href={`/therapists/${t.slug}/blog`}
                  className="text-stone text-xs border border-border px-3 py-1.5 hover:border-gold/30 hover:text-gold transition-colors"
                >
                  {t.name} のブログ
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
