import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, Tag } from 'lucide-react';
import { blogPosts } from '@/data/blog-posts';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: 'Not Found' };

  return {
    title: `${post.title}｜裏東京ロマンス`,
    description: post.excerpt,
    alternates: { canonical: `https://uratokyoromance.com/blog/${slug}` },
  };
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 2);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Organization', name: '裏東京ロマンス' },
    publisher: {
      '@type': 'Organization',
      name: '裏東京ロマンス',
      logo: { '@type': 'ImageObject', url: 'https://uratokyoromance.com/logo.png' },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Hero */}
      <section className="pt-32 pb-16 px-5 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <span className="bg-wine text-cream text-[10px] tracking-widest px-3 py-1">{post.category}</span>
            <div className="flex items-center gap-1 text-mist text-xs">
              <Clock size={11} />
              {post.readingTime}分で読めます
            </div>
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-cream mb-4 leading-snug tracking-wide">
            {post.title}
          </h1>
          <p className="text-mist text-xs">{post.date}</p>
        </div>
      </section>

      {/* Content */}
      <article className="section-py px-5">
        <div className="max-w-3xl mx-auto">
          {/* Excerpt */}
          <p className="text-stone text-base leading-relaxed mb-10 p-6 border-l-2 border-gold bg-elevated">
            {post.excerpt}
          </p>

          {/* Body */}
          <div className="prose-luxury">
            {post.content.split('\n\n').map((block, i) => {
              if (block.startsWith('## ')) {
                return (
                  <h2 key={i} className="font-display text-2xl text-cream mt-10 mb-4 tracking-wide">
                    {block.replace('## ', '')}
                  </h2>
                );
              }
              if (block.startsWith('**') && block.endsWith('**')) {
                return (
                  <p key={i} className="text-cream text-sm font-sans font-medium mb-3">
                    {block.replace(/\*\*/g, '')}
                  </p>
                );
              }
              const processed = block.replace(/\*\*(.+?)\*\*/g, '<strong class="text-cream">$1</strong>');
              return (
                <p
                  key={i}
                  className="text-stone text-sm leading-loose mb-5"
                  dangerouslySetInnerHTML={{ __html: processed }}
                />
              );
            })}
          </div>

          {/* Tags */}
          <div className="flex items-center gap-3 mt-10 pt-8 border-t border-border">
            <Tag size={13} className="text-stone" />
            <span className="tag-pill">{post.category}</span>
            <span className="tag-pill">東京 女性用風俗</span>
            <span className="tag-pill">女風</span>
          </div>

          {/* CTA */}
          <div className="mt-10 p-8 bg-surface border border-border text-center">
            <p className="text-stone text-sm mb-4">
              東京で女風セラピストを探してみませんか？本人確認済みセラピストを一覧で確認できます。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/therapists" className="btn-primary inline-flex">
                セラピストを探す
              </Link>
              <Link href="/first" className="btn-secondary inline-flex">
                初めての方へ
              </Link>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-12">
              <p className="text-gold text-[10px] tracking-widest mb-6">関連記事</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {related.map((p) => (
                  <Link key={p.id} href={`/blog/${p.slug}`} className="card-luxury p-5 block group">
                    <span className="text-wine text-[10px] tracking-widest mb-2 block">{p.category}</span>
                    <p className="text-cream text-sm group-hover:text-gold transition-colors">{p.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 text-center">
            <Link href="/blog" className="text-gold text-xs tracking-widest hover:text-gold-light transition-colors">
              ← コラム一覧に戻る
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
