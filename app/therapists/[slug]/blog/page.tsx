import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { dummyTherapists } from '@/data/dummy-therapists';
import { dummyBlogPosts, BLOG_STATUS_LABELS } from '@/data/staff-blog';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return dummyTherapists.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const therapist = dummyTherapists.find((t) => t.slug === slug);
  if (!therapist) return {};
  return {
    title: `${therapist.name}のブログ｜裏東京ロマンス`,
    description: `${therapist.name}（${therapist.areas.slice(0, 2).join('・')}エリア）のブログ。出勤情報・日常を発信中。`,
    keywords: [`女風 ${therapist.areas[0]}`, `${therapist.name} ブログ`, '女風 セラピスト ブログ'],
    alternates: { canonical: `https://uratokyoromance.com/therapists/${slug}/blog` },
  };
}

export default async function TherapistBlogPage({ params }: PageProps) {
  const { slug } = await params;
  const therapist = dummyTherapists.find((t) => t.slug === slug);
  if (!therapist) notFound();

  const posts = dummyBlogPosts.filter(
    (p) => p.therapistSlug === slug && p.status === 'published'
  );

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-5 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-mist text-[10px] tracking-widest mb-6">
            <Link href="/" className="hover:text-cream transition-colors">ホーム</Link>
            <span>/</span>
            <Link href="/staff-blog" className="hover:text-cream transition-colors">ブログ</Link>
            <span>/</span>
            <Link href={`/therapists/${slug}`} className="hover:text-cream transition-colors">{therapist.name}</Link>
            <span>/</span>
            <span className="text-cream">ブログ</span>
          </nav>

          <div className="flex items-center gap-5">
            {therapist.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={therapist.image}
                alt={therapist.name}
                className="w-20 h-28 object-cover object-top flex-shrink-0"
              />
            )}
            <div>
              <p className="text-gold text-[10px] tracking-[0.3em] mb-2">{therapist.areas.slice(0, 2).join('・')}</p>
              <h1 className="font-display text-4xl text-cream tracking-wide">{therapist.name}のブログ</h1>
              <p className="text-stone text-sm mt-2">{posts.length}件の記事</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-py px-5">
        <div className="max-w-3xl mx-auto">
          {posts.length > 0 ? (
            <div className="space-y-5">
              {posts.map((post) => (
                <Link key={post.id} href={`/staff-blog/${post.slug}`} className="group block">
                  <div className="card-luxury overflow-hidden hover:border-gold/30 transition-colors">
                    <div className="flex flex-col md:flex-row">
                      {post.image && (
                        <div className="w-full md:w-40 aspect-[16/9] md:aspect-auto flex-shrink-0 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="flex-1 p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-mist text-[10px]">{post.category}</span>
                          <span className="text-mist text-[10px]">
                            {post.publishedAt
                              ? new Date(post.publishedAt).toLocaleDateString('ja-JP', { year: 'numeric', month: 'numeric', day: 'numeric' })
                              : ''}
                          </span>
                        </div>
                        <h2 className="font-display text-xl text-cream mb-2 group-hover:text-gold transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-stone text-xs leading-relaxed line-clamp-2">{post.excerpt}</p>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {post.tags.slice(0, 4).map((tag) => (
                            <span key={tag} className="text-[9px] border border-border text-mist px-1.5 py-0.5">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="card-luxury p-10 text-center">
              <p className="text-stone text-sm mb-2">まだブログを書いていません</p>
              <p className="text-mist text-xs">グランドオープン後に公開されます。</p>
            </div>
          )}

          {/* Therapist profile CTA */}
          <div className="mt-10 card-luxury p-6 flex items-center gap-5">
            {therapist.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={therapist.image}
                alt={therapist.name}
                className="w-14 h-20 object-cover object-top flex-shrink-0"
              />
            )}
            <div>
              <p className="text-mist text-[10px] mb-1">プロフィール</p>
              <p className="font-display text-xl text-cream mb-1">{therapist.name}</p>
              <p className="text-stone text-xs mb-3">{therapist.areas.slice(0, 3).join('・')}エリア</p>
              <Link href={`/therapists/${slug}`} className="btn-secondary text-xs py-2 px-4 inline-flex">
                プロフィールを見る
              </Link>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link href="/staff-blog" className="flex items-center gap-2 text-stone text-sm hover:text-gold transition-colors justify-center">
              <ArrowLeft size={14} />
              全セラピストのブログを見る
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
