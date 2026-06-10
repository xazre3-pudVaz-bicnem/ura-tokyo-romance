import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Tag } from 'lucide-react';
import {
  getWpBlogPost,
  formatWpDate,
  stripHtml,
  getPostFeaturedImage,
  getPostCategories,
} from '@/lib/wordpress';

export const revalidate = 300;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const post = await getWpBlogPost(slug);
  if (!post) return { title: 'Not Found' };

  const title = stripHtml(post.title.rendered);
  const description = stripHtml(post.excerpt.rendered).slice(0, 120);
  const image = getPostFeaturedImage(post);

  return {
    title: `${title}｜裏東京ロマンス`,
    description,
    openGraph: {
      title: `${title}｜裏東京ロマンス`,
      description,
      images: image ? [{ url: image.src, width: 1200, height: 630, alt: image.alt }] : [],
      locale: 'ja_JP',
      type: 'article',
      publishedTime: post.date,
    },
    twitter: { card: 'summary_large_image' },
    alternates: { canonical: `https://uratokyoromance.com/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const post = await getWpBlogPost(slug);
  if (!post) notFound();

  const title = stripHtml(post.title.rendered);
  const date = formatWpDate(post.date);
  const image = getPostFeaturedImage(post);
  const categories = getPostCategories(post);
  const primaryCategory = categories[0];

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: stripHtml(post.excerpt.rendered).slice(0, 120),
    datePublished: post.date,
    ...(image ? { image: image.src } : {}),
    author: { '@type': 'Organization', name: '裏東京ロマンス' },
    publisher: {
      '@type': 'Organization',
      name: '裏東京ロマンス',
      logo: { '@type': 'ImageObject', url: 'https://uratokyoromance.com/logo.png' },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Hero */}
      <section className="pt-32 pb-16 px-5 bg-surface border-b border-border">
        <div className="max-w-3xl mx-auto">
          {/* Category + Date */}
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            {primaryCategory && (
              <span className="bg-wine text-cream text-[10px] tracking-widest px-3 py-1">
                {primaryCategory.name}
              </span>
            )}
            <p className="text-mist text-xs">{date}</p>
          </div>

          {/* Title */}
          <h1
            className="font-display text-3xl md:text-4xl text-cream mb-6 leading-snug tracking-wide"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />

          {/* Featured image */}
          {image && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={image.src}
              alt={image.alt}
              className="w-full aspect-video object-cover"
            />
          )}
        </div>
      </section>

      {/* Article body */}
      <article className="section-py px-5 pb-24">
        <div className="max-w-3xl mx-auto">
          {/* Excerpt */}
          <p className="text-stone text-base leading-relaxed mb-10 p-6 border-l-2 border-gold bg-elevated">
            {stripHtml(post.excerpt.rendered)}
          </p>

          {/* WP HTML content */}
          <div
            className="wp-content prose-luxury"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          {/* Categories / Tags */}
          <div className="flex items-center flex-wrap gap-3 mt-10 pt-8 border-t border-border">
            <Tag size={13} className="text-stone flex-shrink-0" />
            {categories.map((cat) => (
              <span key={cat.id} className="tag-pill">{cat.name}</span>
            ))}
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

          {/* Back */}
          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="text-gold text-xs tracking-widest hover:text-gold-light transition-colors"
            >
              ← コラム一覧に戻る
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
