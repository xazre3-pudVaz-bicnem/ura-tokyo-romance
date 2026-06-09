import type { Metadata } from 'next';
import Link from 'next/link';
import { dummyBlogPosts, BLOG_TAGS } from '@/data/staff-blog';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_TAGS.map((tag) => ({ slug: encodeURIComponent(tag) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = decodeURIComponent(slug);
  return {
    title: `#${tag}｜セラピストブログ｜裏東京ロマンス`,
    description: `裏東京ロマンスのセラピストブログ「${tag}」タグの記事一覧。`,
    alternates: { canonical: `https://uratokyoromance.com/staff-blog/tag/${slug}` },
  };
}

export default async function BlogTagPage({ params }: PageProps) {
  const { slug } = await params;
  const tag = decodeURIComponent(slug);

  const posts = dummyBlogPosts.filter(
    (p) => p.status === 'published' && (p.tags.includes(tag) || p.areas.includes(tag))
  );

  return (
    <>
      <section className="pt-32 pb-16 px-5 bg-surface border-b border-border">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-mist text-[10px] tracking-widest mb-5">
            <Link href="/" className="hover:text-cream transition-colors">ホーム</Link>
            <span>/</span>
            <Link href="/staff-blog" className="hover:text-cream transition-colors">ブログ</Link>
            <span>/</span>
            <span className="text-cream">#{tag}</span>
          </nav>
          <p className="text-gold text-[10px] tracking-[0.3em] mb-3">Tag</p>
          <h1 className="font-display text-4xl text-cream tracking-wide">#{tag}</h1>
          <p className="text-stone text-sm mt-3">{posts.length}件の記事</p>
        </div>
      </section>

      <section className="section-py px-5">
        <div className="max-w-4xl mx-auto">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {posts.map((post) => (
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
                      <h2 className="font-display text-lg text-cream mb-2 group-hover:text-gold transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-stone text-xs leading-relaxed line-clamp-2">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {post.tags.map((t) => (
                          <span
                            key={t}
                            className={`text-[9px] border px-1.5 py-0.5 ${
                              t === tag ? 'border-gold/50 text-gold' : 'border-border text-mist'
                            }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="card-luxury p-10 text-center">
              <p className="text-stone text-sm">このタグの記事はまだありません</p>
              <Link href="/staff-blog" className="btn-secondary mt-4 inline-flex">全記事を見る</Link>
            </div>
          )}

          {/* Tag cloud */}
          <div className="mt-10 card-luxury p-6">
            <p className="text-gold text-[10px] tracking-widest mb-4">他のタグ</p>
            <div className="flex flex-wrap gap-2">
              {BLOG_TAGS.filter((t) => t !== tag).map((t) => (
                <Link
                  key={t}
                  href={`/staff-blog/tag/${encodeURIComponent(t)}`}
                  className="text-[10px] border border-border text-mist px-2.5 py-1 hover:border-gold/30 hover:text-stone transition-colors"
                >
                  #{t}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
