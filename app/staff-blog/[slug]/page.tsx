import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Eye, Tag, MapPin } from 'lucide-react';
import { dummyBlogPosts } from '@/data/staff-blog';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return dummyBlogPosts
    .filter((p) => p.status === 'published')
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = dummyBlogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.seoTitle || `${post.title}｜${post.therapistName}のブログ`,
    description: post.seoDescription || post.excerpt,
    keywords: post.keywords || post.tags,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: post.image ? [{ url: post.image, width: 1200, height: 630 }] : [],
    },
    alternates: { canonical: `https://uratokyoromance.com/staff-blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = dummyBlogPosts.find((p) => p.slug === slug && p.status === 'published');
  if (!post) notFound();

  const related = dummyBlogPosts
    .filter((p) => p.id !== post.id && p.status === 'published' && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 3);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://uratokyoromance.com' },
      { '@type': 'ListItem', position: 2, name: 'セラピストブログ', item: 'https://uratokyoromance.com/staff-blog' },
      { '@type': 'ListItem', position: 3, name: post.title },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.therapistName,
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    image: post.image,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Hero */}
      {post.image && (
        <div className="relative h-64 md:h-80 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base via-base/60 to-base/20" />
        </div>
      )}

      <article className="pt-10 pb-20 px-5">
        <div className="max-w-2xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-mist text-[10px] tracking-widest mb-6">
            <Link href="/" className="hover:text-cream transition-colors">ホーム</Link>
            <span>/</span>
            <Link href="/staff-blog" className="hover:text-cream transition-colors">ブログ</Link>
            <span>/</span>
            <span className="text-stone line-clamp-1">{post.title}</span>
          </nav>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-4">
            {post.therapistImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.therapistImage}
                alt={post.therapistName}
                className="w-10 h-14 object-cover object-top"
              />
            )}
            <div>
              <Link
                href={`/therapists/${post.therapistSlug}`}
                className="text-gold text-sm hover:underline"
              >
                {post.therapistName}
              </Link>
              <p className="text-mist text-[10px] mt-0.5">
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })
                  : ''}
                {' / '}{post.category}
              </p>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl md:text-4xl text-cream mb-4 tracking-wide leading-snug">
            {post.title}
          </h1>
          <span className="block w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-8" />

          {/* Tags & areas */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.areas.map((area) => (
              <Link
                key={area}
                href={`/staff-blog/tag/${encodeURIComponent(area)}`}
                className="flex items-center gap-1 text-[10px] border border-gold/30 text-gold px-2.5 py-1 hover:bg-gold/10 transition-colors"
              >
                <MapPin size={9} />
                {area}
              </Link>
            ))}
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/staff-blog/tag/${encodeURIComponent(tag)}`}
                className="flex items-center gap-1 text-[10px] border border-border text-mist px-2.5 py-1 hover:border-gold/30 hover:text-stone transition-colors"
              >
                <Tag size={9} />
                {tag}
              </Link>
            ))}
          </div>

          {/* Content */}
          <div className="text-stone text-sm leading-relaxed space-y-4 mb-10">
            {post.content.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          {/* View count */}
          {post.viewCount > 0 && (
            <div className="flex items-center gap-1.5 text-mist text-[10px] mb-8">
              <Eye size={11} />
              {post.viewCount}回閲覧
            </div>
          )}

          {/* Therapist CTA */}
          <div className="card-luxury p-6 mb-10">
            <div className="flex items-center gap-4">
              {post.therapistImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.therapistImage}
                  alt={post.therapistName}
                  className="w-14 h-20 object-cover object-top flex-shrink-0"
                />
              )}
              <div className="flex-1">
                <p className="text-mist text-[10px] mb-1">この記事を書いたセラピスト</p>
                <p className="font-display text-xl text-cream mb-2">{post.therapistName}</p>
                <Link
                  href={`/therapists/${post.therapistSlug}`}
                  className="inline-flex items-center gap-1.5 text-gold text-xs tracking-widest hover:gap-2.5 transition-all duration-200"
                >
                  プロフィールを見る →
                </Link>
              </div>
            </div>
          </div>

          {/* Back link */}
          <Link href="/staff-blog" className="flex items-center gap-2 text-stone text-sm hover:text-gold transition-colors">
            <ArrowLeft size={14} />
            ブログ一覧に戻る
          </Link>

          {/* Related posts */}
          {related.length > 0 && (
            <div className="mt-12">
              <p className="text-gold text-[10px] tracking-widest mb-4">関連記事</p>
              <div className="space-y-3">
                {related.map((rp) => (
                  <Link key={rp.id} href={`/staff-blog/${rp.slug}`} className="group flex items-center gap-3 card-luxury p-4">
                    {rp.therapistImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={rp.therapistImage} alt={rp.therapistName} className="w-8 h-11 object-cover object-top flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-mist text-[10px] mb-0.5">{rp.therapistName}</p>
                      <p className="text-cream text-sm group-hover:text-gold transition-colors truncate">{rp.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
