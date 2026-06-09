import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { dummyBlogPosts, BLOG_CATEGORIES } from '@/data/staff-blog';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_CATEGORIES.map((cat) => ({ slug: encodeURIComponent(cat) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = decodeURIComponent(slug);
  return {
    title: `${category}｜セラピストブログ｜裏東京ロマンス`,
    description: `裏東京ロマンスのセラピストブログ「${category}」カテゴリの記事一覧。`,
    alternates: { canonical: `https://uratokyoromance.com/staff-blog/category/${slug}` },
  };
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = decodeURIComponent(slug);

  if (!BLOG_CATEGORIES.includes(category)) notFound();

  const posts = dummyBlogPosts.filter(
    (p) => p.status === 'published' && p.category === category
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
            <span className="text-cream">{category}</span>
          </nav>
          <p className="text-gold text-[10px] tracking-[0.3em] mb-3">Category</p>
          <h1 className="font-display text-4xl text-cream tracking-wide">{category}</h1>
          <p className="text-stone text-sm mt-3">{posts.length}件の記事</p>
        </div>
      </section>

      <section className="section-py px-5">
        <div className="max-w-4xl mx-auto">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Link href="/staff-blog" className="text-[10px] border border-border text-mist px-3 py-1.5 hover:border-gold/30 hover:text-stone transition-colors">
              すべて
            </Link>
            {BLOG_CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/staff-blog/category/${encodeURIComponent(cat)}`}
                className={`text-[10px] border px-3 py-1.5 transition-colors ${
                  cat === category
                    ? 'border-gold/50 text-gold bg-gold/5'
                    : 'border-border text-mist hover:border-gold/30 hover:text-stone'
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>

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
                      </div>
                      <h2 className="font-display text-lg text-cream mb-2 group-hover:text-gold transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-stone text-xs leading-relaxed line-clamp-2">{post.excerpt}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="card-luxury p-10 text-center">
              <p className="text-stone text-sm">このカテゴリの記事はまだありません</p>
              <Link href="/staff-blog" className="btn-secondary mt-4 inline-flex">全記事を見る</Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
